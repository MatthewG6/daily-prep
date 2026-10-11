# Daily Prep

A standalone phone PWA with 160 original built-in recipes, taste onboarding, a weekly meal planner, and a combined grocery list. A sister to Daily Fuel and Daily Water.

App URL: https://matthewg6.github.io/daily-prep/

## Development

Requires Node 24; no install or runtime package dependencies.

```sh
npm test
npm run build
npm run preview
```

Open the printed local URL. Rebuild after changing source. The production workflow runs tests and packages static assets for GitHub Pages.

## Included

- Four-step onboarding for preferred ingredients, cuisines, dietary exclusions, cooking time, and default servings.
- 160 original recipes in 16 categories; all included offline. Saved favorites, search, and filters.
- Full ingredients, scaled servings, and numbered cooking methods.
- Weekly breakfast/lunch/dinner plans; quantities update the grocery list automatically.
- Groceries grouped by department, shopping checks, already-owned ingredients, and manual extras.
- Optional personal recipes; all dietary metadata derives from selected ingredients.
- Local device storage, requested persistent storage, JSON backup/restore, and installable offline PWA.

## Data and recipe notes

Personal data stays under localStorage `daily-prep:v1`; it is not committed or uploaded. Explicit website-data deletion can erase it. Use export/restore backups. Daily Prep has its own manifest, service-worker scope, and cache prefix and does not share Daily Fuel/Water records.

Recipes are original starter formulations, not kitchen-tested or nutritionally analyzed. The app does not invent nutrition totals. Ingredient filters use the listed ingredient metadata; labels and substitutions still need review. Cuisine tags are browsing categories, not authenticity claims. Standard US volume measures are used; mass, volume, and count are never guessed to convert across dimensions. Cooking time is an estimate; overnight oats also list chilling time. Cooking temperatures follow the [USDA safe minimum chart](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart).

Locally bundled fonts: DM Sans and DM Serif Display, used under the SIL Open Font License. Recipe illustrations and app icon are original SVG artwork.

See DESIGN.md for decisions and TASKS.md for the TDD and verification record.
