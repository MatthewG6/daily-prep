import test from 'node:test';
import assert from 'node:assert/strict';
import { recipes, ingredients, allergens } from '../src/catalog.js';
import { emptyState, validateState, readState, writeState, validateRecipe, eligible, recommend, scaleIngredients, groceryList, groceryKey, groceryStatus, formatQuantity, weekDates, shiftDate, savePlan } from '../src/model.js';

test('built-in library has 400 complete, distinct recipes and accurate ingredient metadata', () => {
  assert.ok(recipes.length >= 400);
  assert.equal(new Set(recipes.map(r => r.id)).size, recipes.length);
  assert.equal(new Set(recipes.map(r => r.name)).size, recipes.length);
  assert.equal(new Set(recipes.map(r => JSON.stringify(r.ingredients.map(i => [i.id,i.quantity,i.unit]).sort()))).size, recipes.length);
  for (const r of recipes) {
    assert.doesNotThrow(() => validateRecipe(r));
    assert.ok(r.steps.length >= 3);
    assert.ok(r.description.length > 20);
    for (const i of r.ingredients) { assert.ok(ingredients[i.id]); assert.ok(i.quantity > 0); }
    for (const a of r.allergens) assert.ok(allergens.includes(a));
    assert.deepEqual(r.allergens.slice().sort(), [...new Set(r.ingredients.flatMap(i => ingredients[i.id].allergens))].sort());
  }
});

test('preferences strictly exclude diets, avoided ingredients, and allergens including sauces', () => {
  const p = { ...emptyState().preferences, diet:'vegan', avoid:['mushroom'], allergens:['soy','sesame'], maxTime:90 };
  const matches = recipes.filter(r => eligible(r,p));
  assert.ok(matches.length > 5);
  for (const r of matches) {
    assert.ok(r.vegan);
    assert.ok(!r.ingredients.some(i => i.id === 'mushroom'));
    assert.ok(!r.allergens.some(a => ['soy','sesame'].includes(a)));
  }
  const sesame = recipes.find(r => r.ingredients.some(i => i.id === 'tahini'));
  assert.ok(sesame); assert.equal(eligible(sesame,{...emptyState().preferences,allergens:['sesame']}),false);
  for (const r of recipes.filter(r => eligible(r,{...p,diet:'vegetarian',allergens:[]}))) assert.ok(r.vegetarian);
});

test('likes and cuisines change recommendations without excluding other compatible food', () => {
  const p = {...emptyState().preferences,proteins:['tofu'],cuisines:['Asian'],maxTime:90};
  const ranked = recommend(recipes,p);
  assert.ok(ranked[0].proteins.includes('tofu'));
  assert.equal(ranked[0].cuisine,'Asian');
  assert.equal(ranked.length,recipes.length);
  assert.notEqual(ranked[0].id,recipes[0].id);
});

test('avoiding tomatoes or onions also excludes their listed forms and sauces', () => {
  const p={...emptyState().preferences,avoid:['tomato','onion']};
  const bad=new Set(['tomato','cherry-tomato','tomato-can','passata','tomato-paste','salsa','onion','red-onion','scallion']);
  for(const r of recipes.filter(r=>eligible(r,p)))assert.ok(!r.ingredients.some(i=>bad.has(i.id)),r.name);
});

const chickenRecipe = {id:'test-chicken',name:'Chicken',servings:2,ingredients:[{id:'chicken',quantity:1,unit:'lb'}]};
test('portion scaling and grocery merging combine compatible units, never count or cooked/raw', () => {
  assert.equal(scaleIngredients(chickenRecipe,3)[0].quantity,1.5);
  const other = {id:'test-other',servings:2,ingredients:[{id:'chicken',quantity:8,unit:'oz'},{id:'rice',quantity:1,unit:'cup'},{id:'rice-cooked',quantity:1,unit:'cup'},{id:'onion',quantity:1,unit:'each'},{id:'onion',quantity:100,unit:'g'},{id:'olive-oil',quantity:3,unit:'tsp'},{id:'olive-oil',quantity:1,unit:'tbsp'}]};
  const list = groceryList([{recipeId:'test-chicken',servings:2},{recipeId:'test-other',servings:2}],[chickenRecipe,other]);
  assert.equal(list.filter(i => i.id==='chicken').length,1);
  assert.equal(formatQuantity(list.find(i => i.id==='chicken')),'1½ lb');
  assert.equal(list.filter(i => i.id==='onion').length,2);
  assert.equal(list.filter(i => i.id.startsWith('rice')).length,2);
  assert.equal(formatQuantity(list.find(i => i.id==='olive-oil')),'2 tbsp');
});

test('invalid quantities cannot produce a plan or grocery list; missing recipes fail visibly', () => {
  assert.throws(() => scaleIngredients(chickenRecipe,0));
  assert.throws(() => scaleIngredients(chickenRecipe,Infinity));
  assert.throws(() => groceryList([{recipeId:'missing',servings:2}],[chickenRecipe]));
  assert.throws(() => savePlan(emptyState(),recipes,{id:'p1',recipeId:recipes[0].id,date:'2026-02-30',meal:'dinner',servings:2}));
});

test('shopping states survive equal quantities and reset when planned quantity changes', () => {
  const list = groceryList([{recipeId:'test-chicken',servings:2}],[chickenRecipe]);
  const item = list[0], checks = {[groceryKey(item)]:{amount:item.amount,status:'owned'}};
  assert.equal(groceryStatus(item,checks),'owned');
  assert.equal(groceryStatus({...item,amount:item.amount*2},checks),'needed');
});

test('a changed plan permanently invalidates old shopping checks, even when portions change back', () => {
  let s=emptyState(),plan={id:'meal',recipeId:recipes[0].id,date:'2026-10-12',meal:'dinner',servings:2};
  s=savePlan(s,recipes,plan);
  const item=groceryList(s.plans,recipes)[0];
  s.shopping['2026-10-12']={[groceryKey(item)]:{amount:item.amount,status:'checked'}};
  s=savePlan(s,recipes,{...plan,servings:3});
  s=savePlan(s,recipes,plan);
  assert.equal(groceryStatus(groceryList(s.plans,recipes)[0],s.shopping['2026-10-12']),'needed');
});

test('weeks and date shifts use calendar days across years and leap days', () => {
  assert.deepEqual(weekDates('2027-01-01'),['2026-12-28','2026-12-29','2026-12-30','2026-12-31','2027-01-01','2027-01-02','2027-01-03']);
  assert.equal(shiftDate('2028-02-28',1),'2028-02-29');
  assert.equal(shiftDate('2026-12-31',1),'2027-01-01');
});

test('plan updates replace one entry and preserve separate uses of the same recipe', () => {
  let s=emptyState();
  s=savePlan(s,recipes,{id:'a',recipeId:recipes[0].id,date:'2026-10-11',meal:'dinner',servings:2});
  s=savePlan(s,recipes,{id:'b',recipeId:recipes[0].id,date:'2026-10-12',meal:'lunch',servings:3});
  s=savePlan(s,recipes,{id:'a',recipeId:recipes[0].id,date:'2026-10-11',meal:'dinner',servings:4});
  assert.equal(s.plans.length,2); assert.equal(s.plans[0].servings,4);
});

test('storage/backup round-trip all state and invalid input cannot replace valid storage', () => {
  const memory=new Map(), store={getItem:k=>memory.get(k)??null,setItem:(k,v)=>memory.set(k,v)};
  const s=emptyState(); s.onboarded=true; s.preferences.cuisines=['Mexican']; s.favorites=[recipes[0].id];
  s.customRecipes=[{...recipes[0],id:'custom-one',name:'My own meal'}];
  s.plans=[{id:'p',recipeId:'custom-one',date:'2026-10-11',meal:'dinner',servings:3}];
  s.extras=[{id:'e',week:'2026-10-05',name:'Coffee',quantity:1,unit:'each',status:'needed'}];
  writeState(store,s); assert.deepEqual(readState(store),s);
  const before=store.getItem('daily-prep:v1');
  assert.throws(() => writeState(store,{...s,version:99}));
  assert.equal(store.getItem('daily-prep:v1'),before);
  assert.throws(() => validateState({...s,plans:[{...s.plans[0],recipeId:'missing'}]}));
  assert.throws(() => validateState({...s,customRecipes:[{...s.customRecipes[0],id:recipes[0].id}]}));
  assert.throws(() => validateState({...s,preferences:{...s.preferences,allergens:['made-up']}}));
  assert.throws(() => validateState({...s,onboarded:'true'}));
  memory.set('daily-prep:v1','{broken'); assert.throws(() => readState(store));
});

test('write failures propagate; no success is reported for a failed save', () => {
  assert.throws(() => writeState({setItem:()=>{throw new Error('full');}},emptyState()),/full/);
});
