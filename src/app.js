import {recipes,ingredients,allergens,cuisines,proteinOptions,avoidOptions,familyInfo,departments} from './catalog.js';
import {KEY,emptyState,readState,writeState,validateState,validateRecipe,recipeMetadata,recommend,cuisineMatches,eligible,scaleIngredients,ingredientQuantity,groceryList,groceryKey,groceryStatus,reconcileShopping,formatQuantity,weekDates,shiftDate,localToday,savePlan,units} from './model.js';
import {icon,foodArt} from './art.js';

const $=s=>document.querySelector(s),app=$('#app'),modal=$('#modal');
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels={chicken:'Chicken',turkey:'Turkey',beef:'Beef',fish:'Fish',seafood:'Shrimp & seafood',tofu:'Tofu & edamame',beans:'Beans & lentils',eggs:'Eggs',dairy:'Yogurt & cheese',gluten:'Wheat / gluten',milk:'Dairy',egg:'Eggs',soy:'Soy',peanut:'Peanuts','tree-nut':'Tree nuts',shellfish:'Shellfish',sesame:'Sesame',any:'No diet preference',vegetarian:'Vegetarian',vegan:'Vegan'};
let state,loadError='';
try{state=readState(localStorage);}catch(error){loadError=error.message;state=emptyState();}
let page='discover',week=weekDates(localToday())[0],onboarding=!state.onboarded&&!loadError,step=0,draft=structuredClone(state.preferences),editingPreferences=false;
let query='',mealFilter='all',familyFilter='',cuisineFilter='',timeFilter=90,savedOnly=false,visibleCount=24,recipeId='',recipeServings=2,toastTimer,restoreCandidate=null,offlineReady=false,persistence='Not protected',lastFocus=null;
const allRecipes=()=>[...recipes,...state.customRecipes];
const activeDates=()=>weekDates(week);
const activePlans=()=>state.plans.filter(p=>activeDates().includes(p.date));
const findRecipe=id=>allRecipes().find(r=>r.id===id);
const titleDate=(date,options={month:'short',day:'numeric'})=>new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US',{...options,timeZone:'UTC'});
const weekLabel=()=>`${titleDate(week)} – ${titleDate(shiftDate(week,6))}`;
const button=(a,text,cls='primary',attrs='')=>`<button class="${cls}" data-action="${a}" ${attrs}>${text}</button>`;
const empty=(heading,copy,action='')=>`<div class="empty"><span class="empty-symbol">${icon('spark')}</span><h2>${heading}</h2><p>${copy}</p>${action}</div>`;

function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),4500);}
function commit(change,message){
  if(loadError){toast('Your existing data could not be read. Export it or restore a valid backup before making changes.');return false;}
  try{const next=structuredClone(state);const result=reconcileShopping(change(next)||next);writeState(localStorage,result);state=result;render();if(message)toast(message);return true;}
  catch(error){toast(`Could not save: ${error.message}`);return false;}
}
function shell(content){
  return `<div class="shell"><header class="brand-bar"><button class="brand" data-action="nav" data-page="discover" aria-label="Daily Prep home"><span class="brand-mark">${icon('basket')}</span>daily prep<span class="brand-dot">.</span></button><span class="local-tag">${icon('shield')} Just for you</span></header><main id="main" tabindex="-1">${content}</main><footer class="page-footer">Good food. Less thinking. <span>Part of your daily.</span></footer></div>${onboarding?'':`<nav class="bottom-nav" aria-label="Main navigation">${[['discover','spark','Discover'],['plan','calendar','Plan'],['groceries','basket','Groceries'],['you','user','You']].map(([id,i,name])=>`<button class="nav-item ${page===id?'active':''}" data-action="nav" data-page="${id}" ${page===id?'aria-current="page"':''}>${icon(i)}<span>${name}</span></button>`).join('')}</nav>`}`;
}
function render(){
  if(loadError){app.innerHTML=shell(`<section class="intro"><p class="eyebrow">YOUR DATA IS STILL HERE</p><h1>Let’s recover your prep.</h1><p>We couldn’t read the saved record. It hasn’t been replaced.</p></section><div class="panel"><p class="notice">${esc(loadError)}</p><div class="button-row">${button('export-raw','Download existing data')}${importControl()}</div><p class="small">Restore a valid Daily Prep backup to continue.</p></div>`);return;}
  app.innerHTML=shell(onboarding?onboardingView():page==='discover'?discoverView():page==='plan'?planView():page==='groceries'?groceriesView():youView());
  if(page==='discover'&&!onboarding)renderResults();
}
const choices=(name,options,selected,display=id=>labels[id]||id)=>`<div class="choices">${options.map(id=>`<label class="choice"><input type="checkbox" name="${name}" value="${esc(id)}" ${selected.includes(id)?'checked':''}><span>${esc(display(id))}</span></label>`).join('')}</div>`;
function onboardingView(){
  const titles=['What sounds good?','Pick your flavor.','What’s off the menu?','Make it fit your day.'];
  const copy=['Choose ingredients you enjoy. We’ll bring those meals to the front.','Choose the cuisines you reach for. Pick a few, or keep an open mind.','Tell us what to leave out. You can change this anytime.','A little planning now. A lot less “what’s for dinner?” later.'];
  const content=step===0?`<fieldset><legend>Ingredients you like</legend>${choices('proteins',proteinOptions,draft.proteins)}</fieldset>`:step===1?`<fieldset><legend>Cuisines you enjoy</legend>${choices('cuisines',cuisines,draft.cuisines)}</fieldset>`:step===2?`<label>Dietary preference<select name="diet">${['any','vegetarian','vegan'].map(v=>`<option value="${v}" ${draft.diet===v?'selected':''}>${labels[v]}</option>`).join('')}</select></label><fieldset><legend>Ingredients to leave out</legend>${choices('avoid',avoidOptions,draft.avoid,id=>ingredients[id].name)}</fieldset><details><summary>Exclude common allergens</summary>${choices('allergens',allergens,draft.allergens)}<p class="small">Filters use listed ingredients. Check product labels and substitutions.</p></details>`:`<label>Your usual cooking time<select name="maxTime">${[[15,'15 minutes or less'],[30,'30 minutes or less'],[45,'45 minutes or less'],[90,'Any time — show me everything']].map(([v,l])=>`<option value="${v}" ${draft.maxTime===v?'selected':''}>${l}</option>`).join('')}</select></label><label>How many servings do you usually make?<input type="number" name="servings" min="1" max="24" step="1" required value="${draft.servings}"></label><div class="onboarding-note">${icon('book')}<div><strong>${recipes.length} recipes, already here.</strong><p>Your picks shape recommendations. No need to add recipes to get started.</p></div></div>`;
  return `<section class="onboarding"><div class="onboard-art art-violet">${foodArt(step===3?'tacos':'bowls',step)}<span class="art-spark">${icon('spark')}</span></div><div class="step-line"><p class="eyebrow">${editingPreferences?'YOUR TASTES':'LET’S MAKE THIS YOURS'} · ${step+1} OF 4</p><div class="step-dots" aria-label="Step ${step+1} of 4">${Array.from({length:4},(_,i)=>`<i class="${i<=step?'lit':''}"></i>`).join('')}</div></div><h1>${titles[step]}</h1><p class="intro-copy">${copy[step]}</p><form id="onboarding-form">${content}<div class="onboard-actions">${step>0?button('onboard-back',icon('chevron'),'icon-button back','aria-label="Previous step"'):''}<button class="primary" type="submit">${step===3?'Find my recipes':'Continue'} ${icon('arrow')}</button></div></form>${button(editingPreferences?'onboard-cancel':'onboard-skip',editingPreferences?'Cancel changes':'Skip setup · browse all recipes','text-button skip')}</section>`;
}
function readDraft(){
  const f=$('#onboarding-form');if(!f)return;
  const data=new FormData(f);
  if(step===0)draft.proteins=data.getAll('proteins');
  if(step===1)draft.cuisines=data.getAll('cuisines');
  if(step===2){draft.diet=data.get('diet');draft.avoid=data.getAll('avoid');draft.allergens=data.getAll('allergens');}
  if(step===3){draft.maxTime=Number(data.get('maxTime'));draft.servings=Number(data.get('servings'));}
}
function filtered(){
  const q=query.trim().toLowerCase();
  return recommend(allRecipes(),state.preferences).filter(r=>(mealFilter==='all'||r.meals.includes(mealFilter))&&(!familyFilter||r.family===familyFilter)&&(!cuisineFilter||cuisineMatches(r.cuisine,cuisineFilter))&&r.time<=timeFilter&&(!savedOnly||state.favorites.includes(r.id))&&(!q||`${r.name} ${r.cuisine} ${r.ingredients.map(i=>ingredients[i.id].name).join(' ')}`.toLowerCase().includes(q)));
}
function discoverView(){
  const matches=recommend(allRecipes(),state.preferences),featured=matches[0];
  return `<section class="intro"><p class="eyebrow">A LITTLE INSPIRATION, A LOT LESS EFFORT</p><h1>Good food.<br><span class="gradient-text">Your kind of food.</span></h1><p class="intro-copy">${recipes.length} built-in recipes. A week that tastes like you.</p></section>${featured?`<button class="feature-card" data-action="recipe" data-id="${featured.id}"><div class="feature-copy"><span class="pill">${icon('spark')} PICKED FOR YOU</span><h2>${esc(featured.name)}</h2><p>${featured.time} min <span>·</span> ${esc(featured.cuisine)}${featured.vegan?' · Plant based':''}</p><span class="feature-link">Let’s make this ${icon('arrow')}</span></div><div class="feature-art">${foodArt(featured.family,0)}</div></button>`:`<div class="notice">No recipes match all your current preferences. ${button('preferences','Adjust your preferences','text-button')}</div>`}<section class="library" aria-labelledby="library-heading"><div class="section-head"><div><p class="eyebrow">YOUR NEXT FAVORITE IS HERE</p><h2 id="library-heading">Find something good.</h2></div>${button('preferences',icon('sliders'),'icon-button','aria-label="Edit food preferences"')}</div><div class="search-box">${icon('search')}<input id="recipe-search" type="search" placeholder="Hibachi, ramen, something quick…" aria-label="Search recipes" value="${esc(query)}"></div><div class="filter-row"><div class="meal-tabs" role="group" aria-label="Filter by meal">${[['all','All'],['breakfast','Breakfast'],['lunch','Lunch'],['dinner','Dinner']].map(([id,l])=>button('meal-filter',l,mealFilter===id?'selected':'',`data-value="${id}" aria-pressed="${mealFilter===id}"`)).join('')}</div>${button('saved-filter',icon('heart'),`icon-button saved-filter ${savedOnly?'is-saved':''}`,`aria-label="${savedOnly?'Show all recipes':'Show saved recipes'}" aria-pressed="${savedOnly}"`)}</div><div class="cuisine-picks" role="group" aria-label="Quick cuisine collections">${[['','All cuisines'],['Hibachi','Hibachi'],['Japanese','Japanese'],['Korean','Korean']].map(([id,l])=>button('cuisine-filter',l,cuisineFilter===id?'selected':'',`data-value="${id}" aria-pressed="${cuisineFilter===id}"`)).join('')}</div><div class="select-filters"><label><span class="sr-only">Recipe cuisine</span><select id="cuisine-filter"><option value="">All cuisines</option>${cuisines.map(c=>`<option value="${c}" ${cuisineFilter===c?'selected':''}>${c==='Asian'?'All Asian':c==='Japanese'?'Japanese & hibachi':c}</option>`).join('')}</select></label><label><span class="sr-only">Recipe category</span><select id="family-filter"><option value="">All categories</option>${Object.entries(familyInfo).map(([id,f])=>`<option value="${id}" ${familyFilter===id?'selected':''}>${f.label}</option>`).join('')}</select></label><label><span class="sr-only">Maximum cooking time</span><select id="time-filter">${[[90,'Any time'],[15,'≤ 15 min'],[30,'≤ 30 min'],[45,'≤ 45 min']].map(([v,l])=>`<option value="${v}" ${timeFilter===v?'selected':''}>${l}</option>`).join('')}</select></label></div><p id="result-count" class="result-count" aria-live="polite"></p><div id="recipe-results"></div></section>`;
}
function recipeCard(r,index){
  const f=familyInfo[r.family];
  return `<article class="recipe-card"><button class="recipe-open" data-action="recipe" data-id="${r.id}"><div class="card-art art-${f.color}">${foodArt(r.family,index)}<span class="category-tag">${f.label}</span></div><div class="recipe-copy"><p class="recipe-meta">${esc(r.cuisine)}${r.vegan?' · Plant based':r.vegetarian?' · Vegetarian':''}</p><h3>${esc(r.name)}</h3><p class="recipe-time">${icon('clock')} ${r.time} min${r.chill?(r.ingredients.some(i=>i.id==='rice-cooked')?' · cooked rice':' + chill'):''}</p></div></button><button class="save-button ${state.favorites.includes(r.id)?'is-saved':''}" data-action="favorite" data-id="${r.id}" aria-label="${state.favorites.includes(r.id)?'Unsave':'Save'} ${esc(r.name)}" aria-pressed="${state.favorites.includes(r.id)}">${icon('heart')}</button></article>`;
}
function renderResults(){
  const list=filtered();$('#result-count').textContent=`${list.length} recipe${list.length===1?'':'s'}${savedOnly?' saved':''} match your tastes${list.length>visibleCount?` · showing ${visibleCount}`:''}`;
  $('#recipe-results').innerHTML=list.length?`<div class="recipe-grid">${list.slice(0,visibleCount).map(recipeCard).join('')}</div>${list.length>visibleCount?button('more',`More good food ${icon('plus')}`,'secondary show-more'):''}`:empty('Nothing on the menu yet.',savedOnly?'Save recipes with the heart to find them here.':'Try another search or loosen your filters.',button('clear-filters','Clear search & filters','secondary')+button('preferences','Edit food preferences','text-button'));
}
function weekControls(){return `<div class="week-control">${button('previous-week',icon('chevron'),'icon-button back','aria-label="Previous week"')}<span>${weekLabel()}</span>${button('next-week',icon('chevron'),'icon-button','aria-label="Next week"')}</div>`;}
function planView(){
  const plans=activePlans();
  return `<section class="intro"><p class="eyebrow">A PLAN YOU’LL LOOK FORWARD TO</p><h1>Your week,<br><span class="gradient-text">served.</span></h1><p class="intro-copy">Pick your meals. We’ll handle the grocery list.</p></section><div class="planner-top">${weekControls()}${button('this-week','This week','text-button')}</div><div class="plan-summary"><div><strong>${plans.length}</strong><span>planned meal${plans.length===1?'':'s'}</span></div><div><strong>${new Set(plans.map(p=>p.date)).size}<small>/7</small></strong><span>days ready</span></div>${button('nav',`Groceries ${icon('arrow')}`,'text-button','data-page="groceries"')}</div><div class="week-plan">${activeDates().map(date=>{const entries=plans.filter(p=>p.date===date).sort((a,b)=>['breakfast','lunch','dinner'].indexOf(a.meal)-['breakfast','lunch','dinner'].indexOf(b.meal));return `<section class="day-card ${date===localToday()?'today':''}"><div class="day-heading"><h2>${titleDate(date,{weekday:'long'})}<small>${titleDate(date)}</small></h2>${button('browse-for-day',icon('plus'),'icon-button',`data-date="${date}" aria-label="Find a recipe for ${titleDate(date,{weekday:'long'})}"`)}</div>${entries.length?entries.map(p=>{const r=findRecipe(p.recipeId);return `<div class="planned-meal"><button class="planned-open" data-action="recipe" data-id="${r.id}"><span class="plan-art art-${familyInfo[r.family].color}">${foodArt(r.family,0)}</span><span><small>${p.meal} · ${p.servings} servings</small><strong>${esc(r.name)}</strong></span></button>${button('edit-plan',icon('sliders'),'icon-button',`data-id="${p.id}" aria-label="Edit ${esc(r.name)} plan"`)}</div>`;}).join(''):`<button class="unplanned" data-action="browse-for-day" data-date="${date}">Room for something good. <span>Choose a recipe ${icon('arrow')}</span></button>`}</section>`;}).join('')}</div>`;
}
function currentGroceries(){return groceryList(activePlans(),allRecipes()).map(i=>({...i,key:groceryKey(i),status:groceryStatus(i,state.shopping[week]||{})}));}
function groceryRow(item,extra=false){
  const id=extra?item.id:item.key;
  return `<div class="grocery-row ${item.status==='checked'?'checked':''}"><button class="grocery-check" data-action="grocery-check" data-id="${id}" data-extra="${extra}" aria-label="${item.status==='checked'?'Uncheck':'Check off'} ${esc(item.name)}" aria-pressed="${item.status==='checked'}">${item.status==='checked'?icon('check'):''}</button><div class="grocery-name"><strong>${esc(item.name)}</strong><span>${extra?ingredientQuantity(item):formatQuantity(item)}</span></div>${button(extra?'delete-extra':'grocery-owned',icon(extra?'trash':'pantry'),'icon-button',`data-id="${id}" aria-label="${extra?'Remove':'Already have'} ${esc(item.name)}"`)}</div>`;
}
function groceriesView(){
  const items=currentGroceries(),extras=state.extras.filter(e=>e.week===week),owned=items.filter(i=>i.status==='owned'),shopping=items.filter(i=>i.status!=='owned'),checked=[...shopping,...extras].filter(i=>i.status==='checked').length,total=shopping.length+extras.length;
  return `<section class="intro"><p class="eyebrow">FROM YOUR PLAN TO YOUR PANTRY</p><h1>A little list.<br><span class="gradient-text">A lighter week.</span></h1><p class="intro-copy">Combined ingredients. Nothing to work out in the aisle.</p></section><div class="planner-top">${weekControls()}${button('this-week','This week','text-button')}</div><div class="shopping-summary"><div class="shopping-count"><strong>${checked}<small> / ${total}</small></strong><span>items picked up</span></div><span class="summary-icon">${icon('basket')}</span><div class="progress-track"><i style="width:${total?checked/total*100:0}%"></i></div></div><div class="section-head"><div><p class="eyebrow">${activePlans().length} PLANNED MEALS · ${weekLabel().toUpperCase()}</p><h2>Your grocery list.</h2></div>${button('add-extra',icon('plus'),'icon-button','aria-label="Add an extra grocery item"')}</div><p class="small list-hint">Check off purchases. Tap ${icon('pantry')} for ingredients you already have.</p>${shopping.length||extras.length?`<div class="grocery-groups">${departments.map(d=>{const group=shopping.filter(i=>i.department===d);return group.length?`<section class="grocery-group"><h3>${d}<span>${group.length}</span></h3>${group.map(i=>groceryRow(i)).join('')}</section>`:'';}).join('')}${extras.length?`<section class="grocery-group"><h3>Your extras<span>${extras.length}</span></h3>${extras.map(e=>groceryRow(e,true)).join('')}</section>`:''}</div>`:empty(owned.length?'You have everything.':'Your list starts with a meal.',owned.length?'Your planned ingredients are in “Already have” below.':'Add recipes to your week and their ingredients appear here.',button('nav','Pick some recipes','primary','data-page="discover"'))}${owned.length?`<details class="owned-section"><summary>Already have · ${owned.length}</summary>${owned.map(i=>`<div class="owned-row"><span>${esc(i.name)} <small>${formatQuantity(i)}</small></span>${button('grocery-restore','Need it','text-button',`data-id="${i.key}"`)}</div>`).join('')}</details>`:''}<div class="button-row">${button('add-extra',`${icon('plus')} Add extras`,'secondary')}${total?button('copy-list',`${icon('download')} Download list`,'secondary'):''}${checked?button('reset-checks','Uncheck purchases','text-button'):''}</div><p class="small footnote">Amounts are recipe quantities, not package sizes. Different units combine only when compatible. Changing a required amount makes that ingredient needed again.</p>`;
}
function importControl(){return `<label class="secondary file-button">${icon('download')} Restore backup<input id="import-file" type="file" accept="application/json,.json" aria-label="Restore Daily Prep backup"></label>`;}
function youView(){
  const p=state.preferences;
  return `<section class="intro"><p class="eyebrow">YOUR DAILY, YOUR WAY</p><h1>Made around<br><span class="gradient-text">you.</span></h1><p class="intro-copy">A few preferences. Better ideas for dinner.</p></section><section class="panel preferences-panel"><span class="panel-symbol">${icon('sliders')}</span><h2>Your tastes.</h2><p>${p.cuisines.length?esc(p.cuisines.join(' · ')):'Every cuisine welcome'}</p><div class="preference-tags"><span>${p.diet==='any'?'No diet preference':labels[p.diet]}</span><span>${p.maxTime===90?'Any cooking time':`Up to ${p.maxTime} min`}</span><span>${p.servings} servings</span>${p.avoid.length?`<span>${p.avoid.length} ingredients excluded</span>`:''}${p.allergens.length?`<span>${p.allergens.length} allergen filters</span>`:''}</div>${button('preferences',`Fine-tune my tastes ${icon('arrow')}`,'secondary')}</section><section class="panel"><div class="section-head"><div><p class="eyebrow">THE ONES YOU LOVE</p><h2>Saved recipes.</h2></div><span class="count-badge">${state.favorites.length}</span></div><p>Your favorites are one tap away.</p>${button('view-saved',`Browse saved ${icon('heart')}`,'secondary')}</section><section class="panel"><div class="section-head"><div><p class="eyebrow">A SIDE DISH, NOT HOMEWORK</p><h2>Your own recipes.</h2></div>${button('custom-recipe',icon('plus'),'icon-button','aria-label="Add a personal recipe"')}</div><p>${state.customRecipes.length?'Your recipes join the built-in library.':'Already have a go-to meal? Add it here whenever you like.'}</p>${state.customRecipes.length?`<div class="custom-list">${state.customRecipes.map(r=>`<div><button data-action="recipe" data-id="${r.id}">${esc(r.name)} ${icon('chevron')}</button>${button('edit-custom',icon('sliders'),'icon-button',`data-id="${r.id}" aria-label="Edit ${esc(r.name)}"`)}</div>`).join('')}</div>`:button('custom-recipe',`${icon('plus')} Add my own recipe`,'secondary')}</section><section class="panel"><span class="panel-symbol pink">${icon('shield')}</span><h2>Keep your prep.</h2><p>Preferences, plans, and shopping checks stay on this device. Clearing website data can erase them, so keep a backup.</p><p class="storage-line"><span class="status-dot"></span> ${offlineReady?'Ready for offline use':'Offline cache preparing'}<br>Storage protection: ${esc(persistence)}</p><div class="button-row">${button('persist','Request storage protection','secondary')}${button('export',`${icon('download')} Export backup`,'secondary')}${importControl()}</div></section><section class="panel install-panel"><h2>Make yourself at home.</h2><p>On iPhone: open in Safari, tap Share, then <strong>Add to Home Screen</strong>. Your library and plans work offline after the first full load.</p></section><section class="about"><span class="brand">daily prep<span class="brand-dot">.</span></span><p>${recipes.length} original starter recipes · no account · no subscription</p><p class="small">Recipes are original formulations, not kitchen-tested or nutritionally analyzed. Ingredient filters depend on listed ingredients; check product labels. Cooking temperature guidance follows <a href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart" target="_blank" rel="noopener">USDA</a>.</p><div class="sister-links"><a href="https://matthewg6.github.io/daily-fuel/">Daily Fuel ${icon('arrow')}</a><a href="https://matthewg6.github.io/water-tracker/">Daily Water ${icon('arrow')}</a></div></section>`;
}
function showDialog(html){lastFocus=document.activeElement;modal.innerHTML=html;if(!modal.open)modal.showModal();modal.scrollTop=0;}
const dialogHead=(eyebrow,heading)=>`<div class="dialog-head"><div><p class="eyebrow">${eyebrow}</p><h2 id="modal-heading">${heading}</h2></div>${button('close',icon('close'),'icon-button','aria-label="Close dialog"')}</div>`;
function closeDialog(){modal.close();recipeId='';restoreCandidate=null;lastFocus?.isConnected&&lastFocus.focus();}
function openRecipe(id,count=state.preferences.servings){
  const r=findRecipe(id);if(!r)return;
  recipeId=id;recipeServings=count;
  showDialog(`<div class="recipe-detail-art art-${familyInfo[r.family].color}">${foodArt(r.family,0)}</div>${dialogHead(esc(r.cuisine)+' · '+familyInfo[r.family].label,esc(r.name))}<div class="detail-meta"><span>${icon('clock')} ${r.time} min${r.chill?` · ${esc(r.chill.toLowerCase())}`:''}</span><span>${r.vegan?'Plant based':r.vegetarian?'Vegetarian':esc(r.proteins.map(p=>labels[p]).join(' · '))}</span></div><p class="detail-description">${esc(r.description)}</p><div class="detail-actions">${button('add-plan',`${icon('calendar')} Add to my week`,'primary',`data-id="${id}"`)}${button('favorite',icon('heart'),`secondary ${state.favorites.includes(id)?'is-saved':''}`,`data-id="${id}" aria-label="${state.favorites.includes(id)?'Unsave':'Save'} recipe" aria-pressed="${state.favorites.includes(id)}"`)}</div><div class="ingredients-head"><h3>Ingredients</h3><div class="serving-picker">${button('serving-down',icon('minus'),'icon-button','aria-label="Fewer servings"')}<span><strong id="serving-count">${count}</strong> servings</span>${button('serving-up',icon('plus'),'icon-button','aria-label="More servings"')}</div></div><ul id="detail-ingredients" class="ingredient-list">${scaledList(r,count)}</ul><h3 class="method-heading">Let’s make it.</h3><p class="small">Method is written for ${r.servings} serving${r.servings===1?'':'s'}. Use more pans or batches when scaling up.</p><ol class="method-list">${r.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol>${r.allergens.length?`<p class="small allergen-note">Listed ingredients include: ${r.allergens.map(a=>labels[a]).join(', ')}. Check product labels and substitutions.</p>`:''}`);
}
const scaledList=(r,count)=>scaleIngredients(r,count).map(i=>`<li><span>${esc(ingredients[i.id].name)}</span><strong>${ingredientQuantity(i)}</strong></li>`).join('');
let suggestedDate=localToday();
function openPlan(id,existing=null){
  const r=findRecipe(id),p=existing||{id:'',date:suggestedDate,meal:r.meals.includes('dinner')?'dinner':r.meals[0],servings:recipeId===id?recipeServings:state.preferences.servings};
  showDialog(`${dialogHead('MAKE ROOM FOR SOMETHING GOOD',existing?'Edit this meal.':'Add to your week.')}<p class="plan-recipe-name">${esc(r.name)}</p><form id="plan-form"><input type="hidden" name="id" value="${p.id}"><input type="hidden" name="recipeId" value="${id}"><label>Day<input type="date" name="date" value="${p.date}" min="2000-01-01" max="2100-12-31" required></label><div class="form-grid"><label>Meal<select name="meal">${['breakfast','lunch','dinner'].map(m=>`<option value="${m}" ${p.meal===m?'selected':''}>${m[0].toUpperCase()+m.slice(1)}</option>`).join('')}</select></label><label>Servings<input type="number" name="servings" min="1" max="24" step="1" value="${p.servings}" required></label></div><button class="primary full" type="submit">${existing?'Save changes':'Add meal'} ${icon('check')}</button><p class="form-error" role="alert"></p></form>${existing?button('remove-plan','Remove this meal','danger-button',`data-id="${p.id}"`):''}`);
}
function openExtra(){showDialog(`${dialogHead('COFFEE COUNTS TOO','Add an extra.')}<form id="extra-form"><label>What do you need?<input name="name" maxlength="120" placeholder="Coffee, apples, snacks…" required></label><div class="form-grid"><label>Amount<input name="quantity" type="number" min="0.01" max="10000" step="any" value="1" required></label><label>Unit<select name="unit">${units.map(u=>`<option>${u}</option>`).join('')}</select></label></div><button class="primary full" type="submit">Add to list ${icon('plus')}</button></form>`);}
const ingredientOptions=()=>Object.entries(ingredients).sort((a,b)=>a[1].name.localeCompare(b[1].name)).map(([id,i])=>`<option value="${id}">${esc(i.name)}</option>`).join('');
function customRow(i={id:'chicken',quantity:1,unit:'lb'}){return `<div class="custom-ingredient"><label><span class="sr-only">Ingredient</span><select name="ingredient">${ingredientOptions().replace(`value="${i.id}"`,`value="${i.id}" selected`)}</select></label><label><span class="sr-only">Quantity</span><input name="quantity" type="number" min="0.001" max="10000" step="any" value="${i.quantity}" required></label><label><span class="sr-only">Unit</span><select name="unit">${units.map(u=>`<option ${u===i.unit?'selected':''}>${u}</option>`).join('')}</select></label>${button('remove-ingredient',icon('close'),'icon-button','aria-label="Remove ingredient row"')}</div>`;}
function openCustom(id=''){
  const r=id?findRecipe(id):null;
  showDialog(`${dialogHead('YOUR OWN LITTLE CLASSIC',r?'Edit your recipe.':'Save a favorite meal.')}<p class="small">Use ingredients from the list so grocery amounts and ingredient filters work together.</p><form id="custom-form"><input type="hidden" name="id" value="${r?.id||''}"><label>Recipe name<input name="name" value="${esc(r?.name||'')}" maxlength="120" required placeholder="Your go-to dinner"></label><div class="form-grid"><label>Base servings<input name="servings" type="number" min="1" max="24" value="${r?.servings||2}" required></label><label>Total minutes<input name="time" type="number" min="1" max="360" value="${r?.time||20}" required></label><label>Cuisine<select name="cuisine">${cuisines.map(c=>`<option ${c===r?.cuisine?'selected':''}>${c}</option>`).join('')}</select></label><label>Category<select name="family">${Object.entries(familyInfo).map(([id,f])=>`<option value="${id}" ${id===r?.family?'selected':''}>${f.label}</option>`).join('')}</select></label></div><fieldset><legend>Meals</legend>${choices('meals',['breakfast','lunch','dinner'],r?.meals||['dinner'],id=>id[0].toUpperCase()+id.slice(1))}</fieldset><h3 class="method-heading">Ingredients for the base servings</h3><div id="custom-ingredients">${(r?.ingredients||[{id:'chicken',quantity:1,unit:'lb'}]).map(customRow).join('')}</div>${button('add-ingredient',`${icon('plus')} Another ingredient`,'text-button')}<label>Cooking steps <span class="small">One step per line</span><textarea name="steps" rows="5" maxlength="20000" required placeholder="Prepare your ingredients.&#10;Cook…&#10;Serve…">${esc(r?.steps.join('\n')||'')}</textarea></label><button class="primary full" type="submit">Save my recipe ${icon('check')}</button><p class="form-error" role="alert"></p></form>${r?button('delete-custom','Delete this recipe','danger-button',`data-id="${id}"`):''}`);
}
function download(text,filename,type='application/json'){const blob=new Blob([text],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function exportBackup(){download(JSON.stringify(state,null,2),`daily-prep-${localToday()}.json`);toast('Backup downloaded. Keep it somewhere you can find it.');}
async function storageProtection(){try{if(navigator.storage?.persist)persistence=await navigator.storage.persist()?'Granted':'Not granted by this browser';else persistence='Unavailable in this browser';if(page==='you')render();}catch{persistence='Could not check';}}

document.addEventListener('click',async event=>{
  const target=event.target.closest('[data-action]');if(!target)return;
  if(target.closest('form')&&target.tagName==='BUTTON')event.preventDefault();
  const action=target.dataset.action,id=target.dataset.id;
  if(action==='nav'){page=target.dataset.page;if(onboarding&&!state.onboarded)return;render();window.scrollTo({top:0});}
  if(action==='close')closeDialog();
  if(action==='onboard-back'){readDraft();step--;render();}
  if(action==='onboard-cancel'){onboarding=false;render();}
  if(action==='onboard-skip'){if(commit(s=>{s.onboarded=true;s.preferences=emptyState().preferences;})){onboarding=false;render();storageProtection();}}
  if(action==='preferences'){editingPreferences=true;draft=structuredClone(state.preferences);step=0;onboarding=true;render();window.scrollTo({top:0});}
  if(action==='meal-filter'){mealFilter=target.dataset.value;visibleCount=24;render();}
  if(action==='cuisine-filter'){cuisineFilter=target.dataset.value;visibleCount=24;render();}
  if(action==='saved-filter'){savedOnly=!savedOnly;visibleCount=24;render();}
  if(action==='view-saved'){savedOnly=true;query='';mealFilter='all';familyFilter='';cuisineFilter='';timeFilter=90;page='discover';render();window.scrollTo({top:0});}
  if(action==='clear-filters'){query='';mealFilter='all';familyFilter='';cuisineFilter='';timeFilter=90;savedOnly=false;visibleCount=24;render();}
  if(action==='more'){visibleCount+=24;renderResults();}
  if(action==='recipe')openRecipe(id);
  if(action==='favorite'){
    const openId=recipeId,count=recipeServings;
    if(commit(s=>{s.favorites=s.favorites.includes(id)?s.favorites.filter(v=>v!==id):[...s.favorites,id];},state.favorites.includes(id)?'Removed from saved recipes.':'Saved for another day.')){
      if(modal.open&&openId===id)openRecipe(id,count);
      else app.querySelector(`[data-action="favorite"][data-id="${CSS.escape(id)}"]`)?.focus();
    }
  }
  if(action==='serving-down'||action==='serving-up'){
    recipeServings=Math.max(1,Math.min(24,recipeServings+(action==='serving-up'?1:-1)));$('#serving-count').textContent=recipeServings;$('#detail-ingredients').innerHTML=scaledList(findRecipe(recipeId),recipeServings);
  }
  if(action==='add-plan')openPlan(id);
  if(action==='edit-plan'){const p=state.plans.find(p=>p.id===id);openPlan(p.recipeId,p);}
  if(action==='remove-plan'){if(commit(s=>{s.plans=s.plans.filter(p=>p.id!==id);},'Meal removed. Grocery amounts updated.'))closeDialog();}
  if(action==='browse-for-day'){suggestedDate=target.dataset.date;page='discover';render();window.scrollTo({top:0});toast(`Choose a recipe for ${titleDate(suggestedDate,{weekday:'long'})}.`);}
  if(action==='previous-week'||action==='next-week'){week=shiftDate(week,action==='previous-week'?-7:7);render();}
  if(action==='this-week'){week=weekDates(localToday())[0];render();}
  if(action==='add-extra')openExtra();
  if(action==='delete-extra')commit(s=>{s.extras=s.extras.filter(e=>e.id!==id);},'Extra removed.');
  if(['grocery-check','grocery-owned','grocery-restore'].includes(action)){
    if(target.dataset.extra==='true')commit(s=>{const e=s.extras.find(e=>e.id===id);e.status=e.status==='checked'?'needed':'checked';});
    else{const i=currentGroceries().find(i=>i.key===id);if(i)commit(s=>{s.shopping[week]||={};s.shopping[week][id]={amount:i.amount,status:action==='grocery-owned'?'owned':action==='grocery-restore'?'needed':i.status==='checked'?'needed':'checked'};});}
  }
  if(action==='reset-checks')commit(s=>{const items=currentGroceries();s.shopping[week]||={};for(const i of items)if(i.status==='checked')s.shopping[week][i.key]={amount:i.amount,status:'needed'};for(const e of s.extras)if(e.week===week&&e.status==='checked')e.status='needed';},'Shopping checks cleared.');
  if(action==='copy-list'){const list=currentGroceries().filter(i=>i.status!=='owned').map(i=>`${i.status==='checked'?'[x]':'[ ]'} ${i.name} — ${formatQuantity(i)}`),extras=state.extras.filter(e=>e.week===week).map(e=>`${e.status==='checked'?'[x]':'[ ]'} ${e.name} — ${ingredientQuantity(e)}`);download(`Daily Prep · ${weekLabel()}\n\n${[...list,...extras].join('\n')}`,`daily-prep-groceries-${week}.txt`,'text/plain');toast('Grocery list downloaded.');}
  if(action==='custom-recipe')openCustom();
  if(action==='edit-custom')openCustom(id);
  if(action==='add-ingredient'){$('#custom-ingredients').insertAdjacentHTML('beforeend',customRow());}
  if(action==='remove-ingredient'){const rows=$('#custom-ingredients').children;if(rows.length>1)target.closest('.custom-ingredient').remove();else toast('Keep at least one ingredient.');}
  if(action==='delete-custom'){
    const usage=state.plans.filter(p=>p.recipeId===id).length;
    showDialog(`${dialogHead('REMOVE PERSONAL RECIPE','Delete this recipe?')}<p class="detail-description">${usage?`This also removes ${usage} planned meal${usage===1?'':'s'} using it and updates your grocery lists.`:'Your built-in recipes will stay available.'}</p>${button('confirm-delete-custom','Delete recipe','danger-button',`data-id="${id}"`)}${button('close','Keep it','secondary')}`);
  }
  if(action==='confirm-delete-custom'){if(commit(s=>{s.customRecipes=s.customRecipes.filter(r=>r.id!==id);s.favorites=s.favorites.filter(v=>v!==id);s.plans=s.plans.filter(p=>p.recipeId!==id);},'Personal recipe deleted.'))closeDialog();}
  if(action==='persist'){await storageProtection();toast(`Storage protection: ${persistence}. Backups are still useful.`);}
  if(action==='export')exportBackup();
  if(action==='export-raw'){download(localStorage.getItem(KEY)||'',`daily-prep-recovery-${localToday()}.json`);}
  if(action==='confirm-restore'&&restoreCandidate){
    try{const raw=localStorage.getItem(KEY);if(raw)download(raw,`daily-prep-before-restore-${localToday()}.json`);writeState(localStorage,restoreCandidate);state=restoreCandidate;loadError='';onboarding=!state.onboarded;draft=structuredClone(state.preferences);step=0;closeDialog();render();toast('Backup restored. A safety copy of previous data was downloaded.');}catch(e){toast(`Could not restore: ${e.message}`);}
  }
  if(action==='update'){window.prepWaitingWorker?.postMessage({type:'SKIP_WAITING'});}
});

document.addEventListener('input',event=>{if(event.target.id==='recipe-search'){query=event.target.value;visibleCount=24;renderResults();}});
document.addEventListener('change',async event=>{
  if(event.target.id==='family-filter'){familyFilter=event.target.value;visibleCount=24;renderResults();}
  if(event.target.id==='cuisine-filter'){cuisineFilter=event.target.value;visibleCount=24;render();}
  if(event.target.id==='time-filter'){timeFilter=Number(event.target.value);visibleCount=24;renderResults();}
  if(event.target.id==='import-file'){
    const file=event.target.files?.[0];if(!file)return;
    try{if(file.size>3000000)throw new Error('Backup is too large.');restoreCandidate=validateState(JSON.parse(await file.text()));showDialog(`${dialogHead('CHECK BEFORE RESTORING','Restore this backup?')}<p class="detail-description">${restoreCandidate.plans.length} planned meals, ${restoreCandidate.customRecipes.length} personal recipes, and ${restoreCandidate.favorites.length} saved recipes.</p><p class="notice">This replaces the current Daily Prep data on this device. We’ll download a safety copy first.</p>${button('confirm-restore','Restore backup','primary')}${button('close','Cancel','secondary')}`);}catch(error){toast(`Backup wasn’t imported: ${error.message}`);}event.target.value='';
  }
});
document.addEventListener('submit',event=>{
  event.preventDefault();const f=event.target,formId=f.getAttribute('id'),data=new FormData(f);
  try{
    if(formId==='onboarding-form'){
      readDraft();if(step<3){step++;render();window.scrollTo({top:0});return;}
      if(commit(s=>{s.preferences=structuredClone(draft);s.onboarded=true;},'Your recipes are ready.')){onboarding=false;editingPreferences=false;page='discover';render();window.scrollTo({top:0});storageProtection();}
    }
    if(formId==='plan-form'){
      const p={id:data.get('id')||crypto.randomUUID(),recipeId:data.get('recipeId'),date:data.get('date'),meal:data.get('meal'),servings:Number(data.get('servings'))};
      const newWeek=weekDates(p.date)[0];
      if(commit(s=>savePlan(s,allRecipes(),p),'Meal saved. Your grocery list is ready.')){week=newWeek;page='plan';closeDialog();render();}
    }
    if(formId==='extra-form'){
      const e={id:crypto.randomUUID(),week,name:data.get('name').trim(),quantity:Number(data.get('quantity')),unit:data.get('unit'),status:'needed'};
      if(commit(s=>{s.extras.push(e);},'Added to your grocery list.'))closeDialog();
    }
    if(formId==='custom-form'){
      const rows=[...f.querySelectorAll('.custom-ingredient')].map(row=>({id:row.querySelector('[name="ingredient"]').value,quantity:Number(row.querySelector('[name="quantity"]').value),unit:row.querySelector('[name="unit"]').value}));
      const r={id:data.get('id')||`custom-${crypto.randomUUID()}`,name:data.get('name').trim(),description:'A personal recipe from your own kitchen.',servings:Number(data.get('servings')),time:Number(data.get('time')),cuisine:data.get('cuisine'),family:data.get('family'),meals:data.getAll('meals'),ingredients:rows,steps:data.get('steps').split('\n').map(s=>s.trim()).filter(Boolean),...recipeMetadata(rows)};
      validateRecipe(r);
      if(commit(s=>{const index=s.customRecipes.findIndex(v=>v.id===r.id);if(index<0)s.customRecipes.push(r);else s.customRecipes[index]=r;},'Your recipe is in the library.'))closeDialog();
    }
  }catch(error){const el=f.querySelector('.form-error');if(el)el.textContent=error.message;else toast(error.message);}
});
modal.addEventListener('cancel',()=>{recipeId='';restoreCandidate=null;});
render();

if('serviceWorker'in navigator){
  window.addEventListener('load',async()=>{
    try{
      const registration=await navigator.serviceWorker.register('./sw.js');
      if(registration.waiting)offerUpdate(registration.waiting);
      registration.addEventListener('updatefound',()=>{const installing=registration.installing;installing?.addEventListener('statechange',()=>{if(installing.state==='installed'&&navigator.serviceWorker.controller)offerUpdate(installing);});});
      await navigator.serviceWorker.ready;offlineReady=true;if(page==='you')render();
    }catch{offlineReady=false;}
  });
  let refreshing=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(window.prepWaitingWorker&&!refreshing){refreshing=true;location.reload();}});
}
function offerUpdate(worker){window.prepWaitingWorker=worker;if(!$('#update-banner')){const banner=document.createElement('div');banner.id='update-banner';banner.className='update-banner';banner.innerHTML=`Fresh prep is ready. ${button('update','Update app','text-button')}`;document.body.append(banner);}}
if(navigator.storage?.persisted)navigator.storage.persisted().then(granted=>{if(granted)persistence='Granted';if(page==='you')render();}).catch(()=>{});
