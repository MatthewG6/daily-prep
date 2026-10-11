export const allergens = ['gluten','milk','egg','soy','peanut','tree-nut','fish','shellfish','sesame'];
export const cuisines = ['American','Mexican','Mediterranean','Italian','Asian','Indian'];
export const proteinOptions = ['chicken','turkey','beef','fish','seafood','tofu','beans','eggs','dairy'];
export const departments = ['Produce','Meat & seafood','Dairy & eggs','Bakery','Pantry','Frozen'];

const I = (name, department='Pantry', allergens=[], flags={}) => ({name,department,allergens,vegan:true,vegetarian:true,...flags});
const meat = {vegan:false,vegetarian:false};
const dairy = {vegan:false,protein:'dairy'};
export const ingredients = {
  chicken:I('Chicken breast','Meat & seafood',[],{...meat,protein:'chicken'}),
  'chicken-cooked':I('Cooked chicken','Meat & seafood',[],{...meat,protein:'chicken'}),
  turkey:I('Ground turkey','Meat & seafood',[],{...meat,protein:'turkey'}),
  beef:I('Lean ground beef','Meat & seafood',[],{...meat,protein:'beef'}),
  salmon:I('Salmon fillet','Meat & seafood',['fish'],{...meat,protein:'fish'}),
  cod:I('Cod fillet','Meat & seafood',['fish'],{...meat,protein:'fish'}),
  shrimp:I('Peeled shrimp','Meat & seafood',['shellfish'],{...meat,protein:'seafood'}),
  tuna:I('Canned tuna, drained','Meat & seafood',['fish'],{...meat,protein:'fish'}),
  tofu:I('Firm tofu','Produce',['soy'],{protein:'tofu'}),
  chickpea:I('Canned chickpeas, drained','Pantry',[],{protein:'beans'}),
  'black-bean':I('Canned black beans, drained','Pantry',[],{protein:'beans'}),
  'white-bean':I('Canned white beans, drained','Pantry',[],{protein:'beans'}),
  'kidney-bean':I('Canned kidney beans, drained','Pantry',[],{protein:'beans'}),
  lentil:I('Canned lentils, drained','Pantry',[],{protein:'beans'}),
  edamame:I('Shelled edamame','Frozen',['soy'],{protein:'tofu'}),
  egg:I('Eggs','Dairy & eggs',['egg'],{vegan:false,protein:'eggs'}),
  yogurt:I('Plain Greek yogurt','Dairy & eggs',['milk'],dairy),
  milk:I('Milk','Dairy & eggs',['milk'],dairy),
  'oat-milk':I('Oat milk (certified gluten-free)','Dairy & eggs'),
  cottage:I('Cottage cheese','Dairy & eggs',['milk'],dairy),
  feta:I('Feta','Dairy & eggs',['milk'],dairy),
  cheddar:I('Cheddar','Dairy & eggs',['milk'],dairy),
  mozzarella:I('Mozzarella','Dairy & eggs',['milk'],dairy),
  parmesan:I('Vegetarian Parmesan-style cheese','Dairy & eggs',['milk'],dairy),
  ricotta:I('Ricotta','Dairy & eggs',['milk'],dairy),
  butter:I('Butter','Dairy & eggs',['milk'],{vegan:false}),
  rice:I('Dry rice'), 'rice-cooked':I('Cooked rice'), quinoa:I('Dry quinoa'),
  pasta:I('Dry pasta','Pantry',['gluten']), noodles:I('Rice noodles'), couscous:I('Dry couscous','Pantry',['gluten']),
  oats:I('Rolled oats (certified gluten-free)'), bread:I('Whole-grain bread','Bakery',['gluten']),
  tortilla:I('Flour tortillas','Bakery',['gluten']), 'corn-tortilla':I('Corn tortillas','Bakery'),
  pita:I('Pita bread','Bakery',['gluten']), bun:I('Burger buns','Bakery',['gluten']),
  breadcrumb:I('Plain breadcrumbs','Pantry',['gluten']),
  potato:I('Potatoes','Produce'), sweetpotato:I('Sweet potatoes','Produce'),
  broccoli:I('Broccoli florets','Produce'), pepper:I('Bell pepper','Produce'), onion:I('Onion','Produce'),
  'red-onion':I('Red onion','Produce'), garlic:I('Garlic cloves','Produce'), spinach:I('Baby spinach','Produce'),
  kale:I('Kale','Produce'), lettuce:I('Romaine lettuce','Produce'), cabbage:I('Shredded cabbage','Produce'),
  carrot:I('Carrots','Produce'), zucchini:I('Zucchini','Produce'), mushroom:I('Mushrooms','Produce'),
  cucumber:I('Cucumber','Produce'), tomato:I('Tomatoes','Produce'), 'cherry-tomato':I('Cherry tomatoes','Produce'),
  avocado:I('Avocado','Produce'), corn:I('Corn kernels','Frozen'), peas:I('Peas','Frozen'),
  greenbean:I('Green beans','Produce'), cauliflower:I('Cauliflower florets','Produce'), asparagus:I('Asparagus','Produce'),
  lemon:I('Lemon','Produce'), lime:I('Lime','Produce'), ginger:I('Fresh ginger','Produce'),
  parsley:I('Fresh parsley','Produce'), cilantro:I('Fresh cilantro','Produce'), basil:I('Fresh basil','Produce'),
  scallion:I('Scallions','Produce'), mint:I('Fresh mint','Produce'),
  apple:I('Apple','Produce'), banana:I('Banana','Produce'), blueberry:I('Blueberries','Produce'),
  strawberry:I('Strawberries','Produce'), raspberry:I('Raspberries','Produce'),
  mango:I('Mango chunks','Frozen'), pineapple:I('Pineapple chunks','Frozen'), peach:I('Peach','Produce'),
  pear:I('Pear','Produce'), orange:I('Orange','Produce'), date:I('Pitted dates','Pantry'),
  'olive-oil':I('Olive oil'), 'sesame-oil':I('Sesame oil','Pantry',['sesame']),
  salt:I('Salt'), peppercorn:I('Black pepper'), cumin:I('Ground cumin'), paprika:I('Smoked paprika'),
  chili:I('Chili powder'), oregano:I('Dried oregano'), cinnamon:I('Ground cinnamon'),
  curry:I('Curry powder'), turmeric:I('Turmeric'), garam:I('Garam masala'),
  'red-pepper':I('Red pepper flakes'), vanilla:I('Vanilla extract'), cocoa:I('Unsweetened cocoa'),
  'soy-sauce':I('Soy sauce','Pantry',['soy','gluten']), tamari:I('Gluten-free tamari','Pantry',['soy']),
  tahini:I('Tahini','Pantry',['sesame']), 'peanut-butter':I('Peanut butter','Pantry',['peanut']),
  'almond-butter':I('Almond butter','Pantry',['tree-nut']), walnut:I('Walnuts','Pantry',['tree-nut']),
  almond:I('Almonds','Pantry',['tree-nut']), cashew:I('Cashews','Pantry',['tree-nut']),
  chia:I('Chia seeds'), flax:I('Ground flaxseed'), pumpkinseed:I('Pumpkin seeds'),
  sesame:I('Sesame seeds','Pantry',['sesame']), coconut:I('Unsweetened shredded coconut'),
  'coconut-milk':I('Canned coconut milk'), maple:I('Maple syrup'), honey:I('Honey','Pantry',[],{vegan:false}),
  mustard:I('Dijon mustard'), balsamic:I('Balsamic vinegar'), 'rice-vinegar':I('Rice vinegar'),
  salsa:I('Tomato salsa'), 'tomato-can':I('Canned diced tomatoes'), passata:I('Tomato passata'),
  'tomato-paste':I('Tomato paste'), broth:I('Vegetable broth'),
  olive:I('Pitted olives'), pickle:I('Pickles','Produce'), hummus:I('Hummus','Dairy & eggs',['sesame']),
  'hot-sauce':I('Hot sauce'), water:I('Water'),
};

export const avoidOptions = ['mushroom','onion','garlic','avocado','cucumber','tomato','pepper','broccoli','spinach','cilantro','olive','banana'];
export const familyInfo = {
  bowls:{label:'Bowls',icon:'bowl',color:'blue',meals:['lunch','dinner'],time:30,servings:2},
  pasta:{label:'Pasta',icon:'pasta',color:'pink',meals:['lunch','dinner'],time:25,servings:2},
  tray:{label:'Sheet pan',icon:'pan',color:'violet',meals:['dinner'],time:40,servings:2},
  skillet:{label:'One pan',icon:'pan',color:'cyan',meals:['lunch','dinner'],time:25,servings:2},
  tacos:{label:'Tacos',icon:'taco',color:'pink',meals:['lunch','dinner'],time:25,servings:2},
  salads:{label:'Salads',icon:'salad',color:'cyan',meals:['lunch','dinner'],time:20,servings:2},
  wraps:{label:'Wraps',icon:'wrap',color:'blue',meals:['lunch','dinner'],time:20,servings:2},
  soups:{label:'Soups',icon:'soup',color:'violet',meals:['lunch','dinner'],time:35,servings:2},
  eggs:{label:'Breakfast skillet',icon:'pan',color:'pink',meals:['breakfast','lunch'],time:15,servings:2},
  oats:{label:'Overnight oats',icon:'oats',color:'violet',meals:['breakfast'],time:10,servings:1,chill:'Chill 6 hours'},
  smoothies:{label:'Smoothies',icon:'smoothie',color:'pink',meals:['breakfast'],time:5,servings:1},
  toast:{label:'Toast',icon:'toast',color:'blue',meals:['breakfast','lunch'],time:10,servings:1},
  noodles:{label:'Noodles',icon:'pasta',color:'cyan',meals:['lunch','dinner'],time:25,servings:2},
  curries:{label:'Curries',icon:'soup',color:'violet',meals:['lunch','dinner'],time:35,servings:2},
  potatoes:{label:'Loaded potatoes',icon:'potato',color:'blue',meals:['lunch','dinner'],time:25,servings:2},
  burgers:{label:'Burgers',icon:'burger',color:'pink',meals:['lunch','dinner'],time:30,servings:2},
};

const parse = text => text.split(';').filter(Boolean).map(part => {
  const [id,q,unit] = part.split('|');
  if (!ingredients[id]) throw new Error(`Unknown catalog ingredient ${id}`);
  return {id,quantity:Number(q),unit};
});
const proteinAmount = {chicken:'chicken|0.75|lb',turkey:'turkey|0.75|lb',beef:'beef|0.75|lb',salmon:'salmon|0.75|lb',cod:'cod|0.75|lb',shrimp:'shrimp|0.75|lb',tofu:'tofu|12|oz',chickpea:'chickpea|1.5|cup','black-bean':'black-bean|1.5|cup','white-bean':'white-bean|1.5|cup',lentil:'lentil|1.5|cup',tuna:'tuna|6|oz','chicken-cooked':'chicken-cooked|8|oz',edamame:'edamame|1.5|cup'};
const prepProtein = id => ({
  chicken:'Cut the chicken into even bite-size pieces. Sauté in half the oil over medium-high heat, turning, until the thickest pieces reach 165°F. Transfer to a clean plate.',
  turkey:'Sauté the ground turkey in half the oil, breaking it into small pieces, until it reaches 165°F. Transfer to a clean plate.',
  beef:'Sauté the ground beef in half the oil, breaking it into small pieces, until it reaches 160°F. Drain excess fat and transfer to a clean plate.',
  salmon:'Pat the salmon dry and cut into large pieces. Sear in half the oil, turning gently, until the center reaches 145°F. Transfer to a clean plate.',
  cod:'Pat the cod dry. Sear in half the oil, turning gently, until the center reaches 145°F. Break into large flakes on a clean plate.',
  shrimp:'Pat the shrimp dry. Sauté in half the oil until opaque and the thickest shrimp reach 145°F, then transfer to a clean plate.',
  tofu:'Drain and pat the tofu dry, then cut into cubes. Sauté in half the oil for 8–10 minutes, turning, until golden.',
  tuna:'Drain the canned tuna and flake it with a fork.',
  'chicken-cooked':'Shred the cooked chicken. For a hot meal, reheat it separately to 165°F before assembling.',
  edamame:'Cook the shelled edamame according to the package directions, then drain.',
  chickpea:'Rinse and drain the canned chickpeas. Warm in a small pan with a splash of water for 3–4 minutes.',
  'black-bean':'Rinse and drain the canned black beans. Warm in a small pan with a splash of water for 3–4 minutes.',
  'white-bean':'Rinse and drain the canned white beans. Warm in a small pan with a splash of water for 3–4 minutes.',
  lentil:'Rinse and drain the canned lentils. Warm in a small pan with a splash of water for 3–4 minutes.',
}[id]);
const finish = 'Taste and adjust the listed salt and pepper. Divide between servings; cook in batches if increasing the recipe so the pan is not crowded.';
const joined=values=>values.length<2?values[0]||'':`${values.slice(0,-1).join(', ')} and ${values.at(-1)}`;
function prepareStep(items){
  const has=id=>items.some(i=>i.id===id);
  const names=ids=>joined(ids.filter(has).map(id=>ingredients[id].name.toLowerCase()));
  const firm=names(['broccoli','pepper','onion','red-onion','carrot','zucchini','mushroom','greenbean','cauliflower','asparagus']);
  const leafy=names(['spinach','kale','lettuce','cabbage','scallion']);
  const fresh=names(['cucumber','tomato','cherry-tomato','avocado','apple','mango','pineapple']);
  const aromatic=names(['garlic','ginger']);const citrus=names(['lemon','lime']);const herbs=names(['parsley','cilantro','basil','mint']);
  return [firm?`Chop ${firm} into even bite-size pieces.`:'',leafy?`Wash and slice ${leafy}.`:'',fresh?`Wash or peel and chop ${fresh}.`:'',aromatic?`Mince ${aromatic}.`:'',citrus?`Juice the ${citrus}.`:'',herbs?`Chop the ${herbs}.`:''].filter(Boolean).join(' ')||'Set out and measure the listed ingredients.';
}

function method(family, protein, items) {
  const flavorStep=prepareStep(items);
  const has=id=>items.some(i=>i.id===id);
  const names=ids=>joined(ids.filter(has).map(id=>ingredients[id].name.toLowerCase()));
  const firm=names(['broccoli','pepper','onion','red-onion','carrot','zucchini','mushroom','greenbean','cauliflower','asparagus']);
  const greens=names(['spinach','kale']);const warm=names(['corn','peas']);
  const grain = items.find(i => ['rice','quinoa','couscous'].includes(i.id));
  const cookGrain = grain ? `Cook the ${ingredients[grain.id].name.toLowerCase()} according to its package directions, using the listed dry amount and water as needed.` : '';
  const p = prepProtein(protein);
  const named = items.filter(i => !['salt','peppercorn','olive-oil','water'].includes(i.id)).map(i => ingredients[i.id].name.toLowerCase());
  const dressing=names(['tamari','soy-sauce','rice-vinegar','balsamic','mustard','honey','lime','lemon','salsa','tahini','peanut-butter','hot-sauce','yogurt','cumin','paprika','chili','ginger']);
  const sauce=dressing?`Mix ${dressing} into a dressing, using juiced citrus. Thin tahini or peanut butter with water until pourable if included. Keep fresh toppings and cheese for serving.`:'Keep the listed fresh toppings, herbs, and cheese ready for serving.';
  switch(family) {
    case 'bowls': return [cookGrain,flavorStep,p,[firm?`Sauté ${firm} in the remaining oil until tender.`:'',greens?`Wilt the ${greens} at the end.`:'',warm?`Add ${warm} and heat through.`:''].filter(Boolean).join(' '),sauce,'Layer the cooked grain, protein, vegetables, and fresh toppings in bowls. Spoon the dressing over and add the listed cheese, seeds, or herbs.',finish].filter(Boolean);
    case 'pasta': return ['Bring a pot of water to a boil. Cook the pasta according to its package directions; reserve ½ cup cooking water before draining.',flavorStep,p,'Sauté the firm vegetables, garlic, and spices in the remaining oil until tender. Add listed tomatoes or passata and simmer 5 minutes; wilt greens at the end. If yogurt is listed, stir it in off the heat.', 'Toss pasta and protein through the sauce. Loosen with reserved pasta water. Add citrus, cheese, olives, and fresh herbs as listed.',finish];
    case 'tray': return ['Heat the oven to 425°F. Line a large sheet pan; use additional pans for larger batches.',flavorStep,'Cut potatoes or sweet potatoes into ½-inch cubes and other vegetables into even pieces. Toss with the listed oil and seasonings. Roast potatoes first for 15 minutes, then add the other vegetables.',p,'Continue roasting the vegetables until tender, about 15–20 minutes more. The protein is cooked separately so each ingredient can finish properly. Mix listed citrus, vinegar, or tahini into a finishing sauce, thinning tahini with water.', 'Serve the roasted vegetables with the protein, finishing sauce, and any fresh herbs or cheese.',finish];
    case 'skillet': return [flavorStep,p,'Sauté firm vegetables, garlic, and dry spices in the remaining oil until tender. Add listed canned tomatoes, beans, corn, peas, or cooked rice and a splash of water. Simmer 5 minutes.', 'Fold in the cooked protein. Wilt leafy greens at the end; heat until the dish is steaming. Add any yogurt off the heat.', 'Top with listed cheese, citrus juice, avocado, herbs, or olives.',finish];
    case 'tacos': return [flavorStep,p,'Sauté any pepper, onion, mushrooms, or corn in the remaining oil. Stir the listed spices into the warm protein and vegetables with a splash of water.', 'Warm the corn tortillas in a dry skillet. Mix any yogurt, tahini, salsa, or hot sauce with the listed citrus juice for a topping.', 'Fill tortillas with protein and vegetables. Add fresh cabbage, avocado, herbs, cheese, and sauce as listed.',finish];
    case 'salads': return [flavorStep,p,'Let any cooked protein cool slightly. Wash and dry the greens; chop the remaining salad vegetables and fruit. Add any beans straight from the drained can.',sauce,'Toss vegetables with dressing, then add protein, any cheese, nuts, seeds, or olives. Keep dressing separate if serving later.',finish];
    case 'wraps': return [flavorStep,p,'Let the filling cool slightly. Mix the listed yogurt, hummus, tahini, salsa, or other dressing with the spices and citrus; thin tahini with a little water if needed.', 'Warm the tortillas briefly to make them flexible. Spread dressing over each tortilla, then divide the protein, vegetables, and any cheese between them.', 'Fold in the sides, roll tightly, and slice in half. Serve immediately.',finish];
    case 'soups': return [flavorStep,p,'In a saucepan, sauté onion, garlic, firm vegetables, and spices in the remaining oil for 5 minutes. Add the broth and any canned tomatoes.', 'Add potatoes, if listed, and simmer until tender. Add beans, lentils, corn, or peas and simmer 8–10 minutes. If pasta or rice noodles are listed, add them for their package cooking time.', 'Return the protein to the soup. Add greens and heat until wilted; reheated cooked chicken must reach 165°F. Add any coconut milk, citrus, or herbs at the end.',finish];
    case 'eggs': return [flavorStep,has('edamame')?'Cook the edamame according to the package directions, then drain.':'','Beat the eggs with the listed salt and pepper. Sauté the firm vegetables and spices in the oil over medium heat until tender; wilt greens and warm any beans.', 'Lower the heat and pour in the eggs. Stir gently until fully set with no runny liquid; mixed egg dishes should reach 160°F.', 'Fold in cheese if listed. Serve with the listed avocado, salsa, herbs, or other fresh toppings.',finish].filter(Boolean);
    case 'oats': return [`In a jar or bowl, mix the oats, listed milk, chia seeds, and flavorings. This recipe uses ${named.filter(n=>!n.includes('oats')&&!n.includes('milk')&&!n.includes('chia')).join(', ')}.`, `Chop the listed fruit or dates and juice citrus if included. Stir half the fruit into the oats${has('yogurt')?', along with the yogurt':''}; reserve the rest and any nuts or seeds for serving.`, 'Cover and refrigerate for at least 6 hours or overnight. This chilling time is in addition to the listed active preparation time.', 'Stir well before eating, adding a splash of the listed milk if needed. Top with the reserved fruit and nuts or seeds.'];
    case 'smoothies': return ['Peel or trim fresh fruit and cut into chunks. Wash any greens. Frozen fruit can go straight into the blender.', `Add the listed milk first, followed by ${named.filter(n=>!n.includes('milk')).join(', ')}.`, 'Blend until smooth, about 30–60 seconds. Add a small splash of water if too thick, then blend again.', 'Pour into a glass and serve immediately.'];
    case 'toast': return ['Toast the bread to your liking.', 'Wash, trim, and slice any fruit or vegetables. Mash avocado or beans, if listed, with citrus juice and seasonings.', 'Spread the listed yogurt, cottage cheese, ricotta, nut butter, hummus, or mashed topping on the toast. Add sliced produce, nuts, seeds, and any herbs or drizzle.', 'Serve immediately while the toast is crisp.'];
    case 'noodles': return ['Cook the rice noodles according to package directions, then rinse and drain.',flavorStep,p,sauce,'Sauté firm vegetables, garlic, and ginger in the remaining oil until tender. Add the noodles, protein, and sauce with a splash of water; toss over medium heat until hot.', 'Finish with fresh citrus, herbs, scallions, nuts, or sesame as listed.',finish];
    case 'curries': return [cookGrain,flavorStep,p,'Sauté the onion, garlic, ginger, and listed spices in the remaining oil for 2–3 minutes. Add firm vegetables and stir to coat.', 'Pour in the coconut milk and any canned tomatoes. Add a splash of water as needed and simmer gently until the vegetables are tender, 10–15 minutes.', 'Add the cooked protein, beans, or lentils and any greens. Simmer until hot; stir yogurt in off the heat if listed. Finish with listed citrus or herbs and serve over the grain.',finish].filter(Boolean);
    case 'potatoes': return ['Scrub the potatoes and pierce with a fork. Microwave on a microwave-safe plate for 8–12 minutes, turning halfway, until tender; time varies with size. Add more time in 1-minute increments if needed.',flavorStep,p,'Sauté any firm vegetables, garlic, and spices in the oil until tender. Warm any beans, corn, salsa, or passata with the protein.', 'Split the potatoes and fluff the centers with a fork. Divide the warm filling over them, then add any listed yogurt, cheese, fresh herbs, avocado, or sauce.',finish];
    case 'burgers': return [flavorStep, ['beef','turkey'].includes(protein) ? 'Mix the ground meat with the oats and listed dry spices. Shape into two patties. Cook in the oil over medium heat, turning carefully, until ground beef reaches 160°F or turkey reaches 165°F.' : 'Mash the drained beans or lentils with the oats and listed dry spices. Add a splash of water only if dry. Shape into two compact patties and let stand 5 minutes. Pan-fry in the oil, turning gently, until both sides are browned and the centers are hot.', 'Toast the buns. Stir any yogurt, mustard, tahini, salsa, or other dressing together; thin tahini with water as needed.', 'Assemble buns with patties, lettuce, and the listed sliced vegetables, cheese, pickles, and sauce.',finish];
  }
}

const built = [];
function add(family, variants) {
  for (const [name,cuisine,protein,text] of variants) {
    const info = familyInfo[family];
    let base = '';
    if (family==='pasta') base='pasta|6|oz;';
    if (family==='tacos') base='corn-tortilla|6|each;';
    if (family==='salads') base='lettuce|3|cup;';
    if (family==='wraps') base='tortilla|2|each;';
    if (family==='soups') base='broth|3|cup;';
    if (family==='eggs') base='egg|4|each;';
    if (family==='oats') base='oats|0.5|cup;oat-milk|0.5|cup;chia|1|tsp;';
    if (family==='smoothies') base='oat-milk|0.75|cup;';
    if (family==='toast') base='bread|2|each;';
    if (family==='noodles') base='noodles|5|oz;';
    if (family==='curries') base='rice|0.5|cup;coconut-milk|1|cup;';
    if (family==='potatoes') base='potato|2|each;';
    if (family==='burgers') base='bun|2|each;oats|0.25|cup;lettuce|1|cup;';
    if (!['oats','smoothies','toast'].includes(family)) base+='olive-oil|1|tbsp;salt|0.25|tsp;peppercorn|0.125|tsp;';
    if (protein && proteinAmount[protein]) base+=proteinAmount[protein]+';';
    const list = parse(base+text);
    const flags = list.map(i=>ingredients[i.id]);
    const featureNames = parse(text).filter(i=>!['salt','peppercorn','water','cumin','paprika','chili','oregano','cinnamon','vanilla'].includes(i.id)).slice(0,3).map(i=>ingredients[i.id].name.toLowerCase());
    const r = {
      id:`recipe-${family}-${built.filter(r=>r.family===family).length+1}`,
      name, family,cuisine,meals:info.meals,time:info.time,servings:info.servings,
      description:`${featureNames.join(', ').replace(/^./,s=>s.toUpperCase())} come together in a ${info.label.toLowerCase()} recipe made for everyday cooking.`,
      ingredients:list,steps:method(family,protein,list),
      allergens:[...new Set(flags.flatMap(i=>i.allergens))],
      vegan:flags.every(i=>i.vegan),vegetarian:flags.every(i=>i.vegetarian),
      proteins:[...new Set(flags.map(i=>i.protein).filter(Boolean))],
      ...(info.chill?{chill:info.chill}:{}),
    };
    built.push(r);
  }
}

add('bowls',[
  ['Lemon chicken & quinoa','Mediterranean','chicken','quinoa|0.5|cup;cucumber|0.5|each;cherry-tomato|1|cup;lemon|1|each;feta|2|oz;parsley|2|tbsp'],
  ['Smoky black bean rice bowl','Mexican','black-bean','rice|0.5|cup;corn|0.5|cup;avocado|1|each;lime|1|each;paprika|1|tsp;salsa|0.25|cup'],
  ['Ginger sesame tofu bowl','Asian','tofu','rice|0.5|cup;broccoli|2|cup;carrot|1|each;tamari|1|tbsp;ginger|1|tbsp;sesame|1|tsp'],
  ['Honey lime salmon bowl','American','salmon','rice|0.5|cup;cabbage|1|cup;avocado|0.5|each;lime|1|each;honey|1|tbsp'],
  ['Cumin chickpea couscous','Mediterranean','chickpea','couscous|0.5|cup;pepper|1|each;spinach|2|cup;lemon|1|each;cumin|1|tsp;tahini|1|tbsp'],
  ['Turkey taco rice bowl','Mexican','turkey','rice|0.5|cup;pepper|1|each;corn|0.5|cup;salsa|0.25|cup;cheddar|2|oz;chili|1|tsp'],
  ['Chili shrimp & mango bowl','Mexican','shrimp','rice|0.5|cup;mango|1|cup;cabbage|1|cup;lime|1|each;chili|1|tsp;cilantro|2|tbsp'],
  ['Greek lentil quinoa bowl','Mediterranean','lentil','quinoa|0.5|cup;cucumber|0.5|each;tomato|1|each;olive|0.25|cup;lemon|1|each;oregano|1|tsp'],
  ['Garlic beef & broccoli bowl','Asian','beef','rice|0.5|cup;broccoli|2|cup;garlic|2|each;tamari|1|tbsp;rice-vinegar|1|tbsp;scallion|2|each'],
  ['Roasted pepper white bean bowl','Italian','white-bean','quinoa|0.5|cup;pepper|1|each;zucchini|1|each;balsamic|1|tbsp;basil|2|tbsp'],
]);
add('pasta',[
  ['Chicken spinach tomato pasta','Italian','chicken','passata|1|cup;spinach|2|cup;garlic|2|each;parmesan|2|tbsp;oregano|1|tsp'],
  ['Lemon shrimp linguine','Italian','shrimp','zucchini|1|each;lemon|1|each;garlic|2|each;parsley|2|tbsp;red-pepper|0.25|tsp'],
  ['White bean basil pasta','Italian','white-bean','cherry-tomato|1.5|cup;spinach|1|cup;basil|3|tbsp;garlic|2|each'],
  ['Turkey mushroom marinara','Italian','turkey','passata|1|cup;mushroom|1.5|cup;onion|0.5|each;oregano|1|tsp;parmesan|2|tbsp'],
  ['Creamy yogurt chicken pasta','American','chicken','yogurt|0.5|cup;peas|1|cup;lemon|0.5|each;garlic|2|each'],
  ['Mediterranean tuna pasta','Mediterranean','tuna','cherry-tomato|1|cup;olive|0.25|cup;lemon|1|each;parsley|2|tbsp'],
  ['Smoky chickpea tomato pasta','Italian','chickpea','passata|1|cup;pepper|1|each;paprika|1|tsp;garlic|2|each'],
  ['Beef zucchini pasta','Italian','beef','passata|1|cup;zucchini|1|each;garlic|2|each;oregano|1|tsp'],
  ['Salmon pea lemon pasta','Italian','salmon','peas|1|cup;lemon|1|each;yogurt|0.25|cup;parsley|2|tbsp'],
  ['Lentil mushroom bolognese','Italian','lentil','passata|1|cup;mushroom|1|cup;carrot|1|each;onion|0.5|each;oregano|1|tsp'],
]);
add('tray',[
  ['Lemon chicken & potatoes','Mediterranean','chicken','potato|2|each;greenbean|2|cup;lemon|1|each;oregano|1|tsp'],
  ['Smoky tofu & sweet potato','American','tofu','sweetpotato|2|each;broccoli|2|cup;paprika|1|tsp;garlic|2|each'],
  ['Salmon with asparagus','American','salmon','asparagus|2|cup;potato|2|each;lemon|1|each;mustard|1|tbsp'],
  ['Cumin chickpea & cauliflower','Mediterranean','chickpea','cauliflower|3|cup;carrot|2|each;cumin|1|tsp;tahini|2|tbsp;lemon|1|each'],
  ['Garlic shrimp & zucchini','Italian','shrimp','zucchini|2|each;cherry-tomato|1|cup;garlic|3|each;lemon|1|each;parsley|2|tbsp'],
  ['Chili chicken & peppers','Mexican','chicken','pepper|2|each;onion|1|each;sweetpotato|1|each;chili|1|tsp;lime|1|each'],
  ['Balsamic white beans & veg','Italian','white-bean','zucchini|1|each;pepper|1|each;red-onion|0.5|each;balsamic|1|tbsp;oregano|1|tsp'],
  ['Sesame tofu & broccoli','Asian','tofu','broccoli|3|cup;carrot|2|each;tamari|1|tbsp;sesame|1|tsp;rice-vinegar|1|tbsp'],
  ['Paprika cod & green beans','Mediterranean','cod','greenbean|2|cup;potato|2|each;paprika|1|tsp;lemon|1|each'],
  ['Herby lentils & root vegetables','Mediterranean','lentil','carrot|2|each;sweetpotato|1|each;red-onion|0.5|each;parsley|3|tbsp;lemon|1|each'],
]);
add('skillet',[
  ['Turkey taco skillet','Mexican','turkey','black-bean|0.5|cup;corn|0.5|cup;pepper|1|each;salsa|0.5|cup;chili|1|tsp;cheddar|2|oz'],
  ['Garlic chicken & spinach','Italian','chicken','mushroom|2|cup;spinach|3|cup;garlic|3|each;lemon|1|each'],
  ['Smoky beans & peppers','Mexican','black-bean','pepper|2|each;tomato-can|1|cup;corn|0.5|cup;paprika|1|tsp;avocado|1|each'],
  ['Ginger tofu fried rice','Asian','tofu','rice-cooked|2|cup;peas|0.5|cup;carrot|1|each;ginger|1|tbsp;tamari|1|tbsp;scallion|2|each'],
  ['Beef tomato cabbage skillet','American','beef','cabbage|3|cup;tomato-can|1|cup;onion|0.5|each;paprika|1|tsp'],
  ['Lemon shrimp & white beans','Mediterranean','shrimp','white-bean|1|cup;spinach|2|cup;lemon|1|each;garlic|2|each'],
  ['Italian chickpea & zucchini','Italian','chickpea','zucchini|2|each;passata|1|cup;garlic|2|each;basil|2|tbsp'],
  ['Curry lentil & pea skillet','Indian','lentil','peas|1|cup;spinach|2|cup;tomato-can|1|cup;curry|1|tsp;yogurt|0.25|cup'],
  ['Honey mustard chicken & beans','American','chicken','greenbean|2|cup;carrot|1|each;mustard|1|tbsp;honey|1|tbsp'],
  ['Salmon tomato rice skillet','Mediterranean','salmon','rice-cooked|2|cup;tomato-can|1|cup;spinach|1|cup;lemon|1|each;oregano|1|tsp'],
]);
add('tacos',[
  ['Smoky chicken avocado tacos','Mexican','chicken','avocado|1|each;cabbage|1|cup;lime|1|each;paprika|1|tsp;salsa|0.25|cup'],
  ['Black bean corn tacos','Mexican','black-bean','corn|0.75|cup;pepper|1|each;cumin|1|tsp;lime|1|each;cilantro|2|tbsp'],
  ['Chili lime shrimp tacos','Mexican','shrimp','cabbage|1.5|cup;yogurt|0.25|cup;lime|1|each;chili|1|tsp'],
  ['Turkey pepper tacos','Mexican','turkey','pepper|1|each;onion|0.5|each;chili|1|tsp;cheddar|2|oz;salsa|0.25|cup'],
  ['Crispy tofu mango tacos','Mexican','tofu','mango|0.75|cup;cabbage|1|cup;lime|1|each;paprika|1|tsp;hot-sauce|1|tsp'],
  ['Cumin beef & tomato tacos','Mexican','beef','tomato|1|each;lettuce|1|cup;cumin|1|tsp;lime|1|each;cheddar|2|oz'],
  ['Chickpea cauliflower tacos','Mexican','chickpea','cauliflower|2|cup;paprika|1|tsp;cumin|0.5|tsp;lime|1|each;tahini|1|tbsp'],
  ['Lemon cod cabbage tacos','Mexican','cod','cabbage|1.5|cup;lemon|1|each;yogurt|0.25|cup;paprika|1|tsp'],
  ['Lentil mushroom tacos','Mexican','lentil','mushroom|1.5|cup;onion|0.5|each;chili|1|tsp;salsa|0.25|cup;avocado|0.5|each'],
  ['Salmon pineapple tacos','Mexican','salmon','pineapple|0.75|cup;cabbage|1|cup;lime|1|each;cilantro|2|tbsp;chili|0.5|tsp'],
]);
add('salads',[
  ['Greek chicken crunch salad','Mediterranean','chicken','cucumber|1|each;cherry-tomato|1|cup;feta|2|oz;olive|0.25|cup;lemon|1|each;oregano|1|tsp'],
  ['Apple walnut chickpea salad','American','chickpea','apple|1|each;walnut|0.25|cup;carrot|1|each;mustard|1|tbsp;lemon|1|each'],
  ['Lime black bean corn salad','Mexican','black-bean','corn|0.75|cup;tomato|1|each;avocado|1|each;lime|1|each;cilantro|2|tbsp'],
  ['Sesame tofu cucumber salad','Asian','tofu','cucumber|1|each;carrot|1|each;tamari|1|tbsp;rice-vinegar|1|tbsp;sesame|1|tsp'],
  ['Tuna white bean chopped salad','Mediterranean','tuna','white-bean|1|cup;tomato|1|each;red-onion|0.25|each;lemon|1|each;parsley|2|tbsp'],
  ['Strawberry chicken salad','American','chicken','strawberry|1|cup;almond|0.25|cup;feta|2|oz;balsamic|1|tbsp'],
  ['Lentil rainbow crunch salad','Mediterranean','lentil','carrot|1|each;cucumber|0.5|each;pepper|1|each;tahini|1|tbsp;lemon|1|each'],
  ['Mango shrimp crunch salad','Asian','shrimp','mango|1|cup;cabbage|1|cup;lime|1|each;ginger|1|tsp;rice-vinegar|1|tbsp'],
  ['Salmon avocado garden salad','American','salmon','avocado|1|each;cucumber|0.5|each;cherry-tomato|1|cup;mustard|1|tbsp;lemon|1|each'],
  ['Edamame sesame chopped salad','Asian','edamame','cabbage|2|cup;carrot|1|each;cucumber|0.5|each;sesame|1|tsp;tamari|1|tbsp;rice-vinegar|1|tbsp'],
]);
add('wraps',[
  ['Lemon chicken hummus wraps','Mediterranean','chicken-cooked','hummus|0.25|cup;cucumber|0.5|each;lettuce|1|cup;lemon|0.5|each'],
  ['Smoky black bean avocado wraps','Mexican','black-bean','avocado|1|each;salsa|0.25|cup;lettuce|1|cup;paprika|1|tsp'],
  ['Crunchy peanut tofu wraps','Asian','tofu','cabbage|1.5|cup;carrot|1|each;peanut-butter|1|tbsp;lime|1|each;tamari|1|tsp'],
  ['Tuna yogurt cucumber wraps','American','tuna','yogurt|0.25|cup;cucumber|0.5|each;mustard|1|tsp;lettuce|1|cup'],
  ['Chickpea lemon tahini wraps','Mediterranean','chickpea','tahini|1|tbsp;lemon|1|each;carrot|1|each;spinach|1|cup'],
  ['Turkey salsa crunch wraps','Mexican','turkey','salsa|0.25|cup;lettuce|1|cup;tomato|1|each;cheddar|2|oz;chili|0.5|tsp'],
  ['White bean basil wraps','Italian','white-bean','tomato|1|each;basil|2|tbsp;spinach|1|cup;mozzarella|2|oz;balsamic|1|tsp'],
  ['Shrimp mango lime wraps','Mexican','shrimp','mango|0.75|cup;cabbage|1|cup;lime|1|each;yogurt|0.25|cup'],
  ['Lentil curry yogurt wraps','Indian','lentil','yogurt|0.25|cup;carrot|1|each;spinach|1|cup;curry|1|tsp;lemon|0.5|each'],
  ['Chicken apple mustard wraps','American','chicken-cooked','apple|1|each;lettuce|1|cup;yogurt|0.25|cup;mustard|1|tbsp'],
]);
add('soups',[
  ['Chicken white bean soup','Italian','chicken','white-bean|1|cup;carrot|1|each;onion|0.5|each;spinach|1|cup;oregano|1|tsp'],
  ['Smoky black bean soup','Mexican','black-bean','tomato-can|1|cup;corn|0.5|cup;onion|0.5|each;cumin|1|tsp;paprika|1|tsp;lime|1|each'],
  ['Lentil tomato vegetable soup','Mediterranean','lentil','tomato-can|1|cup;carrot|1|each;zucchini|1|each;garlic|2|each;cumin|1|tsp'],
  ['Ginger tofu noodle soup','Asian','tofu','noodles|2|oz;mushroom|1|cup;spinach|1|cup;ginger|1|tbsp;tamari|1|tbsp'],
  ['Turkey minestrone','Italian','turkey','pasta|2|oz;tomato-can|1|cup;zucchini|1|each;white-bean|0.5|cup;oregano|1|tsp'],
  ['Coconut chickpea spinach soup','Indian','chickpea','coconut-milk|0.5|cup;spinach|2|cup;curry|1|tsp;onion|0.5|each;lemon|1|each'],
  ['Shrimp corn lime soup','Mexican','shrimp','corn|1|cup;tomato-can|1|cup;pepper|1|each;lime|1|each;chili|0.5|tsp'],
  ['White bean kale potato soup','Italian','white-bean','potato|1|each;kale|2|cup;onion|0.5|each;garlic|2|each;oregano|1|tsp'],
  ['Beef cabbage tomato soup','American','beef','cabbage|2|cup;tomato-can|1|cup;carrot|1|each;paprika|1|tsp'],
  ['Lemon chicken noodle soup','American','chicken-cooked','noodles|2|oz;carrot|1|each;peas|0.5|cup;lemon|1|each;parsley|2|tbsp'],
]);
add('eggs',[
  ['Spinach feta breakfast scramble','Mediterranean','','spinach|2|cup;feta|2|oz;cherry-tomato|0.5|cup;oregano|0.5|tsp'],
  ['Black bean salsa scramble','Mexican','','black-bean|0.75|cup;salsa|0.25|cup;avocado|0.5|each;cumin|0.5|tsp'],
  ['Mushroom cheddar scramble','American','','mushroom|1.5|cup;cheddar|2|oz;scallion|2|each'],
  ['Tomato basil mozzarella eggs','Italian','','cherry-tomato|1|cup;mozzarella|2|oz;basil|2|tbsp'],
  ['Pepper onion breakfast skillet','American','','pepper|1|each;onion|0.5|each;cheddar|1|oz;paprika|0.5|tsp'],
  ['Curry pea breakfast scramble','Indian','','peas|0.75|cup;spinach|1|cup;curry|0.5|tsp;cilantro|2|tbsp'],
  ['Corn chili lime eggs','Mexican','','corn|0.75|cup;pepper|0.5|each;chili|0.5|tsp;lime|0.5|each'],
  ['Zucchini ricotta scramble','Italian','','zucchini|1|each;ricotta|0.25|cup;basil|2|tbsp'],
  ['Ginger scallion edamame eggs','Asian','','edamame|0.5|cup;scallion|2|each;ginger|1|tsp;tamari|1|tsp'],
  ['Chickpea cumin breakfast skillet','Mediterranean','','chickpea|0.75|cup;tomato|1|each;cumin|0.5|tsp;parsley|2|tbsp'],
]);
add('oats',[
  ['Blueberry almond overnight oats','American','','blueberry|0.5|cup;almond|1|tbsp;maple|1|tsp;vanilla|0.25|tsp'],
  ['Peanut butter banana oats','American','','banana|1|each;peanut-butter|1|tbsp;cinnamon|0.25|tsp'],
  ['Apple cinnamon overnight oats','American','','apple|1|each;cinnamon|0.5|tsp;walnut|1|tbsp;maple|1|tsp'],
  ['Strawberry yogurt overnight oats','American','','strawberry|0.5|cup;yogurt|0.25|cup;vanilla|0.25|tsp'],
  ['Chocolate raspberry oats','American','','raspberry|0.5|cup;cocoa|1|tbsp;maple|2|tsp'],
  ['Mango coconut overnight oats','Asian','','mango|0.5|cup;coconut|1|tbsp;lime|0.25|each'],
  ['Peach vanilla overnight oats','American','','peach|1|each;vanilla|0.25|tsp;almond|1|tbsp'],
  ['Pear walnut overnight oats','American','','pear|1|each;walnut|1|tbsp;cinnamon|0.25|tsp'],
  ['Date tahini overnight oats','Mediterranean','','date|2|each;tahini|1|tbsp;cinnamon|0.25|tsp'],
  ['Pineapple chia coconut oats','American','','pineapple|0.5|cup;coconut|1|tbsp;maple|1|tsp'],
]);
add('smoothies',[
  ['Blueberry banana yogurt smoothie','American','','blueberry|0.75|cup;banana|0.5|each;yogurt|0.5|cup'],
  ['Strawberry peanut butter smoothie','American','','strawberry|1|cup;banana|0.5|each;peanut-butter|1|tbsp'],
  ['Mango spinach lime smoothie','Asian','','mango|1|cup;spinach|1|cup;lime|0.5|each;chia|1|tsp'],
  ['Chocolate banana oat smoothie','American','','banana|1|each;cocoa|1|tbsp;oats|0.25|cup;peanut-butter|1|tbsp'],
  ['Pineapple coconut yogurt smoothie','American','','pineapple|1|cup;coconut|1|tbsp;yogurt|0.5|cup'],
  ['Peach almond smoothie','American','','peach|1|each;banana|0.5|each;almond-butter|1|tbsp;cinnamon|0.25|tsp'],
  ['Raspberry vanilla smoothie','American','','raspberry|1|cup;yogurt|0.5|cup;vanilla|0.25|tsp;maple|1|tsp'],
  ['Apple cinnamon oat smoothie','American','','apple|1|each;oats|0.25|cup;cinnamon|0.5|tsp;yogurt|0.25|cup'],
  ['Orange mango ginger smoothie','Asian','','orange|1|each;mango|0.5|cup;ginger|1|tsp;flax|1|tsp'],
  ['Pear date tahini smoothie','Mediterranean','','pear|1|each;date|2|each;tahini|1|tbsp;cinnamon|0.25|tsp'],
]);
add('toast',[
  ['Avocado tomato toast','Mediterranean','','avocado|0.5|each;tomato|0.5|each;lemon|0.25|each;red-pepper|0.125|tsp'],
  ['Cottage cheese berry toast','American','','cottage|0.5|cup;blueberry|0.25|cup;strawberry|0.25|cup;honey|1|tsp'],
  ['Peanut butter banana toast','American','','peanut-butter|2|tbsp;banana|1|each;cinnamon|0.25|tsp'],
  ['Hummus cucumber toast','Mediterranean','','hummus|0.25|cup;cucumber|0.25|each;paprika|0.25|tsp;parsley|1|tbsp'],
  ['Ricotta peach toast','Italian','','ricotta|0.25|cup;peach|1|each;honey|1|tsp;almond|1|tbsp'],
  ['White bean basil toast','Italian','','white-bean|0.5|cup;lemon|0.25|each;cherry-tomato|0.5|cup;basil|1|tbsp'],
  ['Almond butter apple toast','American','','almond-butter|2|tbsp;apple|0.5|each;cinnamon|0.25|tsp'],
  ['Avocado black bean toast','Mexican','','avocado|0.5|each;black-bean|0.25|cup;salsa|2|tbsp;lime|0.25|each'],
  ['Yogurt strawberry chia toast','American','','yogurt|0.25|cup;strawberry|0.5|cup;chia|1|tsp;maple|1|tsp'],
  ['Cottage cheese tomato herb toast','Mediterranean','','cottage|0.5|cup;tomato|0.5|each;parsley|1|tbsp;peppercorn|0.125|tsp'],
]);
add('noodles',[
  ['Peanut chicken noodles','Asian','chicken','carrot|1|each;pepper|1|each;peanut-butter|2|tbsp;tamari|1|tbsp;lime|1|each'],
  ['Sesame tofu vegetable noodles','Asian','tofu','broccoli|2|cup;carrot|1|each;tamari|1|tbsp;sesame|1|tsp;rice-vinegar|1|tbsp'],
  ['Ginger shrimp noodles','Asian','shrimp','cabbage|2|cup;ginger|1|tbsp;garlic|2|each;tamari|1|tbsp;scallion|2|each'],
  ['Chili beef broccoli noodles','Asian','beef','broccoli|2|cup;tamari|1|tbsp;hot-sauce|1|tsp;garlic|2|each;rice-vinegar|1|tbsp'],
  ['Lime edamame crunch noodles','Asian','edamame','cabbage|2|cup;carrot|1|each;lime|1|each;tamari|1|tbsp;sesame|1|tsp'],
  ['Coconut curry chickpea noodles','Asian','chickpea','coconut-milk|0.5|cup;spinach|2|cup;curry|1|tsp;lime|1|each'],
  ['Turkey ginger pepper noodles','Asian','turkey','pepper|1|each;ginger|1|tbsp;tamari|1|tbsp;scallion|2|each'],
  ['Lemon garlic salmon noodles','Asian','salmon','zucchini|1|each;lemon|1|each;garlic|2|each;tamari|1|tsp'],
  ['Tahini tofu mushroom noodles','Asian','tofu','mushroom|2|cup;tahini|2|tbsp;tamari|1|tbsp;lime|1|each'],
  ['Cashew chicken veggie noodles','Asian','chicken','pepper|1|each;peas|0.5|cup;cashew|0.25|cup;tamari|1|tbsp;ginger|1|tbsp'],
]);
add('curries',[
  ['Chicken spinach coconut curry','Indian','chicken','spinach|3|cup;onion|0.5|each;ginger|1|tbsp;curry|2|tsp'],
  ['Chickpea cauliflower curry','Indian','chickpea','cauliflower|3|cup;tomato-can|0.5|cup;curry|2|tsp;garlic|2|each'],
  ['Tofu broccoli ginger curry','Asian','tofu','broccoli|2|cup;carrot|1|each;ginger|1|tbsp;curry|2|tsp;lime|1|each'],
  ['Lentil tomato garam curry','Indian','lentil','tomato-can|1|cup;onion|0.5|each;garam|1|tsp;turmeric|0.5|tsp;spinach|1|cup'],
  ['Shrimp pea coconut curry','Indian','shrimp','peas|1|cup;pepper|1|each;curry|2|tsp;lime|1|each'],
  ['Turkey zucchini curry','Indian','turkey','zucchini|1|each;tomato-can|0.5|cup;curry|2|tsp;garlic|2|each'],
  ['White bean sweet potato curry','Indian','white-bean','sweetpotato|1|each;spinach|2|cup;curry|2|tsp;ginger|1|tbsp'],
  ['Salmon tomato coconut curry','Asian','salmon','tomato-can|1|cup;spinach|1|cup;curry|1|tsp;ginger|1|tbsp;lime|1|each'],
  ['Black bean pepper curry','Indian','black-bean','pepper|1|each;tomato-can|0.5|cup;cumin|1|tsp;garam|1|tsp;onion|0.5|each'],
  ['Chickpea mango coconut curry','Asian','chickpea','mango|0.75|cup;pepper|1|each;curry|2|tsp;lime|1|each;cilantro|2|tbsp'],
]);
add('potatoes',[
  ['Chicken broccoli cheddar potatoes','American','chicken-cooked','broccoli|2|cup;cheddar|2|oz;yogurt|0.25|cup'],
  ['Black bean salsa potatoes','Mexican','black-bean','salsa|0.5|cup;corn|0.5|cup;avocado|0.5|each;cumin|1|tsp'],
  ['Turkey chili loaded potatoes','American','turkey','passata|0.5|cup;kidney-bean|0.5|cup;chili|1|tsp;cheddar|2|oz'],
  ['Tuna yogurt scallion potatoes','American','tuna','yogurt|0.5|cup;scallion|2|each;mustard|1|tsp;lemon|0.5|each'],
  ['Chickpea spinach tahini potatoes','Mediterranean','chickpea','spinach|2|cup;tahini|1|tbsp;lemon|1|each;cumin|0.5|tsp'],
  ['Beef mushroom loaded potatoes','American','beef','mushroom|1.5|cup;onion|0.5|each;cheddar|2|oz;paprika|0.5|tsp'],
  ['White bean basil potatoes','Italian','white-bean','passata|0.5|cup;mozzarella|2|oz;basil|2|tbsp;garlic|2|each'],
  ['Lentil curry loaded potatoes','Indian','lentil','peas|0.5|cup;curry|1|tsp;yogurt|0.25|cup;cilantro|2|tbsp'],
  ['Shrimp lime corn potatoes','Mexican','shrimp','corn|0.75|cup;lime|1|each;yogurt|0.25|cup;chili|0.5|tsp'],
  ['Smoky tofu pepper potatoes','American','tofu','pepper|1|each;paprika|1|tsp;hot-sauce|1|tsp;scallion|2|each'],
]);
add('burgers',[
  ['Classic beef cheddar burger','American','beef','cheddar|2|oz;tomato|1|each;pickle|2|each;mustard|1|tbsp'],
  ['Turkey avocado lime burger','American','turkey','avocado|1|each;lime|1|each;yogurt|0.25|cup;paprika|0.5|tsp'],
  ['Smoky black bean burger','American','black-bean','paprika|1|tsp;cumin|0.5|tsp;tomato|1|each;mustard|1|tbsp'],
  ['Chickpea lemon tahini burger','Mediterranean','chickpea','cumin|1|tsp;tahini|1|tbsp;lemon|1|each;cucumber|0.5|each'],
  ['Turkey feta herb burger','Mediterranean','turkey','feta|2|oz;oregano|1|tsp;cucumber|0.5|each;yogurt|0.25|cup'],
  ['Beef salsa pepper burger','Mexican','beef','salsa|0.25|cup;pepper|0.5|each;chili|0.5|tsp;cheddar|2|oz'],
  ['Lentil curry burger','Indian','lentil','curry|1|tsp;yogurt|0.25|cup;tomato|1|each;cilantro|2|tbsp'],
  ['White bean basil burger','Italian','white-bean','basil|2|tbsp;garlic|1|each;tomato|1|each;mozzarella|2|oz'],
  ['Black bean avocado salsa burger','Mexican','black-bean','avocado|1|each;salsa|0.25|cup;chili|1|tsp;lime|0.5|each'],
  ['Turkey apple mustard burger','American','turkey','apple|1|each;mustard|1|tbsp;yogurt|0.25|cup;paprika|0.5|tsp'],
]);

export const recipes = built;
