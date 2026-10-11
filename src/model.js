import {recipes,ingredients,allergens,cuisines,proteinOptions,familyInfo} from './catalog.js';

export const KEY='daily-prep:v1';
export const units=['each','g','oz','lb','ml','cup','tbsp','tsp'];
const conversions={each:['count',1],g:['mass',1],oz:['mass',28.349523125],lb:['mass',453.59237],ml:['volume',1],cup:['volume',236.5882365],tbsp:['volume',14.78676478125],tsp:['volume',4.92892159375]};
const requireValue=(condition,message)=>{if(!condition)throw new Error(message);};
const object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const text=(value,max=200)=>typeof value==='string'&&value.trim().length>0&&value.length<=max;
const identifier=value=>typeof value==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(value);
const quantity=value=>Number.isFinite(value)&&value>0&&value<=10000;
const servings=value=>Number.isInteger(value)&&value>=1&&value<=24;
const subset=(value,choices,max=100)=>Array.isArray(value)&&value.length<=max&&new Set(value).size===value.length&&value.every(v=>choices.includes(v));
const statuses=['needed','checked','owned'];

export function emptyState(){return {version:1,onboarded:false,preferences:{proteins:[],cuisines:[],diet:'any',avoid:[],allergens:[],maxTime:90,servings:2},favorites:[],plans:[],customRecipes:[],shopping:{},extras:[]};}
export function recipeMetadata(list){
  const values=list.map(i=>ingredients[i.id]);
  requireValue(values.every(Boolean),'Unknown ingredient.');
  return {allergens:[...new Set(values.flatMap(v=>v.allergens))],vegan:values.every(v=>v.vegan),vegetarian:values.every(v=>v.vegetarian),proteins:[...new Set(values.map(v=>v.protein).filter(Boolean))]};
}
export function validateRecipe(r){
  requireValue(object(r)&&identifier(r.id)&&text(r.name,120)&&text(r.description,500),'Invalid recipe name or description.');
  requireValue(servings(r.servings)&&Number.isInteger(r.time)&&r.time>=1&&r.time<=360,'Invalid recipe time or servings.');
  requireValue(cuisines.includes(r.cuisine)&&Object.hasOwn(familyInfo,r.family),'Unknown recipe cuisine or category.');
  requireValue(subset(r.meals,['breakfast','lunch','dinner'])&&r.meals.length>0,'Choose at least one meal.');
  requireValue(Array.isArray(r.ingredients)&&r.ingredients.length>=1&&r.ingredients.length<=60,'Invalid ingredient list.');
  for(const i of r.ingredients)requireValue(object(i)&&Object.hasOwn(ingredients,i.id)&&quantity(i.quantity)&&units.includes(i.unit),'Invalid ingredient or quantity.');
  requireValue(Array.isArray(r.steps)&&r.steps.length>=1&&r.steps.length<=50&&r.steps.every(s=>text(s,2000)),'Invalid cooking steps.');
  const derived=recipeMetadata(r.ingredients);
  requireValue(subset(r.allergens,allergens)&&subset(r.proteins,proteinOptions)&&r.vegan===derived.vegan&&r.vegetarian===derived.vegetarian&&JSON.stringify(r.allergens.slice().sort())===JSON.stringify(derived.allergens.slice().sort())&&JSON.stringify(r.proteins.slice().sort())===JSON.stringify(derived.proteins.slice().sort()),'Recipe dietary metadata does not match its ingredients.');
  if(r.chill!==undefined)requireValue(text(r.chill,100),'Invalid recipe preparation note.');
  return r;
}
function validDate(value){
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
  const d=new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===value&&value>='2000-01-01'&&value<='2100-12-31';
}
function validatePlan(plan,list){
  requireValue(object(plan)&&identifier(plan.id)&&list.some(r=>r.id===plan.recipeId)&&validDate(plan.date)&&['breakfast','lunch','dinner'].includes(plan.meal)&&servings(plan.servings),'Invalid plan date, recipe, meal, or servings.');
  return plan;
}
export function validateState(s){
  requireValue(object(s)&&s.version===1&&typeof s.onboarded==='boolean','This is not a supported Daily Prep backup.');
  const p=s.preferences;
  requireValue(object(p)&&subset(p.proteins,proteinOptions)&&subset(p.cuisines,cuisines)&&['any','vegetarian','vegan'].includes(p.diet)&&subset(p.avoid,Object.keys(ingredients))&&subset(p.allergens,allergens)&&[15,30,45,90].includes(p.maxTime)&&servings(p.servings),'Invalid preferences.');
  requireValue(Array.isArray(s.customRecipes)&&s.customRecipes.length<=500,'Invalid personal recipe list.');
  s.customRecipes.forEach(validateRecipe);
  requireValue(s.customRecipes.every(r=>r.id.startsWith('custom-'))&&new Set(s.customRecipes.map(r=>r.id)).size===s.customRecipes.length,'Personal recipe IDs must be unique and separate from built-ins.');
  const list=[...recipes,...s.customRecipes];
  requireValue(subset(s.favorites,list.map(r=>r.id),1000),'Invalid saved recipe list.');
  requireValue(Array.isArray(s.plans)&&s.plans.length<=5000&&new Set(s.plans.map(p=>p.id)).size===s.plans.length,'Invalid meal plan.');
  s.plans.forEach(p=>validatePlan(p,list));
  requireValue(object(s.shopping)&&Object.keys(s.shopping).length<=300,'Invalid grocery checks.');
  for(const [week,checks]of Object.entries(s.shopping)){
    requireValue(validDate(week)&&weekDates(week)[0]===week&&object(checks)&&Object.keys(checks).length<=500,'Invalid grocery week.');
    for(const [key,check]of Object.entries(checks)){
      const [id,dimension,...extra]=key.split(':');
      requireValue(Object.hasOwn(ingredients,id)&&['mass','volume','count'].includes(dimension)&&extra.length===0&&object(check)&&Number.isFinite(check.amount)&&check.amount>0&&check.amount<=1e9&&statuses.includes(check.status),'Invalid shopping state.');
    }
  }
  requireValue(Array.isArray(s.extras)&&s.extras.length<=2000&&new Set(s.extras.map(e=>e.id)).size===s.extras.length,'Invalid extra groceries.');
  for(const e of s.extras)requireValue(object(e)&&identifier(e.id)&&validDate(e.week)&&weekDates(e.week)[0]===e.week&&text(e.name,120)&&quantity(e.quantity)&&units.includes(e.unit)&&statuses.includes(e.status),'Invalid extra grocery item.');
  return s;
}
export function readState(store){const value=store.getItem(KEY);return value===null?emptyState():validateState(JSON.parse(value));}
export function writeState(store,state){store.setItem(KEY,JSON.stringify(validateState(state)));}
export function eligible(recipe,p){
  if(p.diet==='vegan'&&!recipe.vegan||p.diet==='vegetarian'&&!recipe.vegetarian)return false;
  if(recipe.time>p.maxTime)return false;
  if(recipe.allergens.some(a=>p.allergens.includes(a)))return false;
  const forms={tomato:['tomato','cherry-tomato','tomato-can','passata','tomato-paste','salsa'],onion:['onion','red-onion','scallion']};
  const avoided=new Set(p.avoid.flatMap(id=>forms[id]||[id]));
  return !recipe.ingredients.some(i=>avoided.has(i.id));
}
export function cuisineMatches(actual,selected){
  return actual===selected||(selected==='Asian'&&['Japanese','Hibachi','Chinese','Korean','Thai','Vietnamese','Indian'].includes(actual))||(selected==='Japanese'&&actual==='Hibachi');
}
export function recommend(list,p){
  const score=r=>r.proteins.filter(v=>p.proteins.includes(v)).length*5+(p.cuisines.includes(r.cuisine)?8:p.cuisines.some(c=>cuisineMatches(r.cuisine,c))?6:0);
  return list.filter(r=>eligible(r,p)).sort((a,b)=>score(b)-score(a));
}
export function scaleIngredients(recipe,count){
  requireValue(servings(count)&&servings(recipe.servings),'Servings must be a whole number from 1 to 24.');
  return recipe.ingredients.map(i=>{requireValue(quantity(i.quantity)&&units.includes(i.unit),'Invalid ingredient amount.');return {...i,quantity:i.quantity*count/recipe.servings};});
}
export function groceryKey(item){return `${item.id}:${item.dimension}`;}
export function groceryList(plans,list){
  const result=new Map();
  for(const plan of plans){
    const recipe=list.find(r=>r.id===plan.recipeId);
    requireValue(recipe,'A planned recipe is missing. Restore a backup containing that recipe.');
    for(const i of scaleIngredients(recipe,plan.servings)){
      if(i.id==='water')continue;
      const [dimension,factor]=conversions[i.unit];
      const key=`${i.id}:${dimension}`,existing=result.get(key);
      if(existing)existing.amount+=i.quantity*factor;
      else result.set(key,{id:i.id,dimension,amount:i.quantity*factor,name:ingredients[i.id].name,department:ingredients[i.id].department});
    }
  }
  return [...result.values()].sort((a,b)=>a.name.localeCompare(b.name));
}
export function groceryStatus(item,checks){const check=checks[groceryKey(item)];return check&&Math.abs(check.amount-item.amount)<1e-6?check.status:'needed';}
export function reconcileShopping(state,list=[...recipes,...state.customRecipes]){
  for(const [week,checks]of Object.entries(state.shopping)){
    const dates=weekDates(week),items=new Map(groceryList(state.plans.filter(p=>dates.includes(p.date)),list).map(i=>[groceryKey(i),i]));
    for(const [key,check]of Object.entries(checks)){
      const item=items.get(key);
      if(!item||Math.abs(check.amount-item.amount)>1e-6)delete checks[key];
    }
  }
  return state;
}
export function numberText(value){
  const whole=Math.floor(value),part=value-whole;
  const fractions=[[.125,'⅛'],[.25,'¼'],[.333333333,'⅓'],[.375,'⅜'],[.5,'½'],[.625,'⅝'],[.666666667,'⅔'],[.75,'¾'],[.875,'⅞']];
  const f=fractions.find(([n])=>Math.abs(n-part)<.00001);
  return f?`${whole||''}${f[1]}`:Number(value.toFixed(2)).toString();
}
export function formatQuantity(item){
  if(item.dimension==='count')return `${numberText(item.amount)} each`;
  if(item.dimension==='mass'){
    const oz=item.amount/conversions.oz[1];
    return oz>=16-1e-7?`${numberText(oz/16)} lb`:`${numberText(oz)} oz`;
  }
  const cup=item.amount/conversions.cup[1];
  if(cup>=.25-1e-7)return `${numberText(cup)} cup${cup>1?'s':''}`;
  const tbsp=item.amount/conversions.tbsp[1];
  return tbsp>=1-1e-7?`${numberText(tbsp)} tbsp`:`${numberText(item.amount/conversions.tsp[1])} tsp`;
}
export function ingredientQuantity(i){return `${numberText(i.quantity)} ${i.unit==='cup'&&i.quantity>1?'cups':i.unit}`;}
export function shiftDate(value,days){
  requireValue(validDate(value)&&Number.isInteger(days),'Invalid calendar date.');
  const d=new Date(`${value}T12:00:00Z`);d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10);
}
export function weekDates(value){
  requireValue(validDate(value),'Invalid week.');
  const day=new Date(`${value}T12:00:00Z`).getUTCDay();
  const monday=shiftDate(value,-((day+6)%7));return Array.from({length:7},(_,i)=>shiftDate(monday,i));
}
export function localToday(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function savePlan(state,list,plan){
  validatePlan(plan,list);
  const next=structuredClone(state),index=next.plans.findIndex(p=>p.id===plan.id);
  if(index<0)next.plans.push(plan);else next.plans[index]=plan;
  return reconcileShopping(next,list);
}
