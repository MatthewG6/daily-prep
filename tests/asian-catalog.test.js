import test from 'node:test';
import assert from 'node:assert/strict';
import {recipes,cuisines,ingredients} from '../src/catalog.js';
import {emptyState,recommend,validateState,eligible,groceryList} from '../src/model.js';

test('expanded library adds 240 Asian recipes while retaining all original recipe IDs',()=>{
  assert.equal(recipes.length,400);
  const counts={Hibachi:36,Japanese:72,Chinese:36,Korean:36,Thai:30,Vietnamese:30};
  for(const [cuisine,count]of Object.entries(counts)){
    assert.ok(cuisines.includes(cuisine));
    assert.equal(recipes.filter(r=>r.cuisine===cuisine).length,count,cuisine);
  }
  for(const family of ['bowls','pasta','tray','skillet','tacos','salads','wraps','soups','eggs','oats','smoothies','toast','noodles','curries','potatoes','burgers'])
    for(let i=1;i<=10;i++)assert.ok(recipes.some(r=>r.id===`recipe-${family}-${i}`));
  for(const r of recipes.filter(r=>r.id.startsWith('asian-'))){
    assert.ok(r.steps.length>=6,r.name);
    assert.ok(r.steps.join(' ').length>700,r.name);
  }
});

test('Asian and Japanese preferences include related cuisines; explicit hibachi likes rank first',()=>{
  const pick=cuisine=>recommend(recipes,{...emptyState().preferences,cuisines:[cuisine]});
  assert.equal(pick('Hibachi')[0].cuisine,'Hibachi');
  assert.equal(pick('Japanese')[0].cuisine,'Japanese');
  assert.equal(pick('Korean')[0].cuisine,'Korean');
  const plain=recipes.find(r=>r.cuisine==='American');
  const japanese=recipes.find(r=>r.cuisine==='Japanese');
  const hibachi=recipes.find(r=>r.cuisine==='Hibachi');
  assert.equal(recommend([plain,japanese],{...emptyState().preferences,cuisines:['Asian']})[0].id,japanese.id);
  assert.equal(recommend([plain,hibachi],{...emptyState().preferences,cuisines:['Japanese']})[0].id,hibachi.id);
  const legacy=emptyState();legacy.onboarded=true;legacy.preferences.cuisines=['Asian'];
  legacy.favorites=['recipe-bowls-1'];legacy.plans=[{id:'old',recipeId:'recipe-bowls-1',date:'2026-10-12',meal:'dinner',servings:2}];
  assert.doesNotThrow(()=>validateState(legacy));
});

test('hibachi directions explain rice, cold yum yum sauce, and protein-specific cooking',()=>{
  const rice=recipes.find(r=>r.name==='Hibachi garlic-butter chicken fried rice');
  assert.ok(rice,'Chicken fried rice exists');
  assert.ok(rice.ingredients.some(i=>i.id==='rice-cooked'));
  assert.match(rice.steps.join(' '),/refrigerat/i);
  assert.match(rice.steps.join(' '),/165°F/);
  assert.match(rice.steps.join(' '),/160°F/);
  assert.ok(rice.allergens.includes('egg'));
  assert.ok(!rice.steps.join(' ').includes('shred cabbage'));
  const yum=recipes.find(r=>r.name==='Hibachi yum yum steak bowl');
  assert.ok(yum,'Steak yum yum bowl exists');
  assert.match(yum.steps.join(' '),/145°F/);
  assert.match(yum.steps.join(' '),/3 minutes/);
  assert.match(yum.steps.join(' '),/mayonnaise/);
  assert.match(yum.steps.join(' '),/refrigerat/i);
  assert.ok(yum.allergens.includes('egg'));
  const p={...emptyState().preferences,diet:'vegan'};
  assert.ok(recipes.some(r=>r.cuisine==='Hibachi'&&eligible(r,p)));
});

test('specialty ingredients retain dietary exclusions and grocery identities',()=>{
  assert.equal(ingredients.steak.protein,'beef');
  assert.notEqual(ingredients.steak.name,ingredients.beef.name);
  assert.ok(ingredients.miso.allergens.includes('soy'));
  assert.ok(ingredients.udon.allergens.includes('gluten'));
  assert.ok(ingredients['fish-sauce'].allergens.includes('fish'));
  assert.equal(ingredients['fish-sauce'].vegetarian,false);
  const p={...emptyState().preferences,allergens:['soy','gluten','egg','fish']};
  for(const r of recipes.filter(r=>eligible(r,p)))assert.ok(!r.allergens.some(a=>p.allergens.includes(a)));
  const steak=recipes.find(r=>r.name==='Hibachi yum yum steak bowl');
  const list=groceryList([{recipeId:steak.id,servings:4}],recipes);
  assert.equal(list.find(i=>i.id==='steak').name,ingredients.steak.name);
  assert.ok(!list.some(i=>i.id==='beef'));
});
