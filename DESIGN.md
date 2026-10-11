# Daily Prep

## Intent
A standalone personal recipe and grocery-planning PWA, hosted on MatthewG6's GitHub Pages. The app supplies a substantial built-in library rather than requiring users to write recipes. Library: 400 original recipes in 16 cooking families, with meaningful ingredient combinations and complete methods. Original recipes are starter formulations, not claims of kitchen testing, nutrition analysis, or copied publisher recipes.

## Visual direction
Sibling of Daily Fuel: ink navy, electric blue, bright pink, violet, and cyan; large warm serif headings and clear sans-serif controls. Recipe cards use self-contained food illustrations, category labels, cooking time, and a short description. The phone is the primary canvas. Four destinations: Discover, Plan, Groceries, You. Built-in browsing is prominent; personal recipe creation lives under You. Touch controls at least 44px, form inputs 16px, reduced-motion support, semantic headings, labeled inputs, and visible keyboard focus.

## First run and preferences
Four short screens: preferred proteins/ingredients, cuisines, dietary choices and ingredients to avoid, then total cooking time and default servings. Likes/cuisines affect ranking; diet and avoid filters are strict. Users can skip with transparent defaults, return to preferences, and browse all eligible recipes. No accounts. Diet/allergen flags derive from recipe ingredients. Filters refer to listed ingredients; users still need to check product labels and substitutions. No claim of allergen-safe food preparation. Recipes do not display fabricated calorie/protein values.

## Recipes and planning
Search built-in and personal recipes by name, ingredient, or cuisine. Filter by cuisine, category, breakfast/lunch/dinner, and cooking time, save favorites, and open full ingredients and numbered cooking steps. Scale ingredients to a positive integer number of servings. Methods describe technique for base servings; for large batches, use more pans or batches. Built-ins cannot be overwritten by personal records. Adding a personal recipe is a side option using the known ingredient registry, cooking steps, time, cuisine, and base servings.

Weekly planning uses local calendar dates, with explicit breakfast/lunch/dinner slots and target servings per meal. The same recipe may appear multiple times. Editing servings and deleting a plan item recompute groceries. Browsing a recipe does not add it to the plan. Changing week changes the grocery scope; label the active week clearly.

## Groceries
Aggregate ingredients from the active week's planned portions. Combine only the same canonical ingredient and compatible units. Mass (g/oz/lb) and volume (ml/tsp/tbsp/cup) normalize within their own dimensions. Count stays count. Raw rice and cooked rice are separate ingredients. No guessed mass-to-volume/count conversion. Display sensible US cooking units without implying package sizes. Group by department. Each line can be checked while shopping or marked already owned; owned items have a separate restore section. A change to required quantity resets that line's checked/owned status so newly needed food is not silently hidden. Additional manual items belong to the active week and work even without planned recipes.

## Local persistence and offline
Store one namespaced versioned record under daily-prep:v1. No data is sent to GitHub. Validate on read/write/import; storage errors must not silently discard records or claim a save succeeded. Prefer transaction-like write-before-render. Request navigator.storage.persist() and display the actual result, not guaranteed protection. Website-data deletion can erase local records. Export/import JSON supports backup; preview and confirm replacement and download a safety backup before restoring. Validate recipe references, dates, quantities, metadata, and bounds. Escape all rendered user input. Offline precache includes the complete library, fonts, icons, and code. Service-worker caches and scope must not overlap Daily Fuel or Daily Water. Update shell without clearing local records.

## Cooking content
USDA minimum temperatures are included for raw chicken/turkey (165°F), ground beef (160°F), fish/shrimp (145°F), and reheated cooked poultry (165°F). Methods tell users to verify doneness rather than treating a cooking-time estimate as sufficient. Source: https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart

## Acceptance criteria
1. At least 400 built-in recipes have distinct IDs, names, ingredient combinations, positive quantities, valid ingredient references, nonempty steps, times, servings, and dietary metadata.
2. Onboarding persists and materially changes recommended order. Diet/avoid constraints exclude incompatible recipes, including ingredients in sauces.
3. Scaling a 2-serving recipe to 3 multiplies each quantity by 1.5.
4. Repeated weekly plans combine groceries; 1 lb + 8 oz chicken becomes 1.5 lb, while 1 onion and 100g onion remain separate lines.
5. Changing planned servings resets shopping state only for quantities that changed.
6. Monday–Sunday week boundaries work across months/year boundaries with local dates.
7. Favorites, plans, preferences, custom recipes, and list checks survive reload and backup round-trip.
8. Invalid data/imports fail without overwriting valid records. Any imported content renders as text.
9. Core catalog, plans, and lists remain usable offline after installation.
10. Phone layouts fit 390px and narrower without horizontal overflow; keyboard and dialog flows remain usable.

## Delivery
Separate daily-prep Git repository and GitHub Pages workflow. Dependency-free browser ES modules with locally bundled fonts. node:test runs before static packaging. No backend, subscriptions, accounts, recipe scraping, or nutrition API keys.

## Asian library expansion
240 new records represent 40 distinct dishes, each adapted for chicken, sirloin steak, shrimp, salmon, tofu, and edamame. Counts: Hibachi 36, Japanese 72, Chinese 36, Korean 36, Thai 30, Vietnamese 30. Hibachi refers to American Japanese-steakhouse cooking; other cuisine labels describe home adaptations, not authenticity claims. Each record has measured sauce ingredients and dish-specific preparation, cooking, and assembly steps. Specialty foods keep explicit allergen and dietary metadata, including fish sauce in plant-protein dishes. Steak is a separate grocery ingredient from ground beef. Whole steak cooks to 145°F with a 3-minute rest; shrimp cooks until pearly and opaque. Rice-based meals distinguish dry rice from refrigerated cooked rice; fried-rice time assumes ready-cooked rice. Recipes remain original starter formulations awaiting kitchen testing.

The original 160 IDs, ingredient metadata, and storage version stay unchanged. Exact cuisine likes rank ahead of related cuisine matches. Existing Asian likes match the expanded Asian cuisines; Japanese likes also match hibachi. Discover includes quick cuisine chips and an explicit cuisine selector that honors all dietary exclusions. Selecting Japanese includes hibachi; selecting Hibachi shows only that collection. New cuisines also appear in onboarding and personal recipe creation. All content ships in the offline precache. Sources for added cooking guidance: https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures and https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts.
