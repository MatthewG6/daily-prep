# Daily Prep — tasks and verification

## Working agreement
- Test-driven development for preference matching, serving calculations, grocery aggregation, planning, persistence, and backup validation. Record a failing test before implementation.
- Keep Daily Fuel unchanged. Daily Prep is a separate phone PWA on GitHub Pages.
- Built-in recipes are the primary experience; adding a personal recipe is optional.

## Foundation
- [x] Confirm standalone sister app and retain Daily Fuel's dark, vibrant design family.
- [x] Write DESIGN.md and core acceptance tests.
- [x] Observe the initial test failure, then implement the model.
- [x] Add 160 original built-in recipes with complete ingredients, quantities, servings, methods, and dietary metadata.
- [x] Validate catalog integrity and recommendation exclusions.

## Phone experience
- [x] Four-step preference onboarding, editable later; no forced signup.
- [x] Personalized discovery, search, meal/time filters, favorites, full recipe view, and serving adjustment.
- [x] Weekly meal planner with day/meal/serving selection, edits, and removal.
- [x] Grocery aggregation, department grouping, already-have controls, shopping checks, and extra items.
- [x] Optional personal-recipe editor using known ingredients.
- [x] Versioned local data, requested persistent storage, JSON export/import, and storage failure handling.
- [x] Installable PWA and offline catalog/planning/list.

## Delivery
- [x] Core tests and production build pass.
- [x] Browser: onboarding, preferences, recipe scaling, favorites, planning, grocery arithmetic, custom recipe, backup/reload.
- [x] Browser: narrow viewport, accessibility, no overflow, service-worker/offline verification.
- [ ] Publish separate MatthewG6/daily-prep repository and verify GitHub Pages deployment.
- [ ] Physical iPhone installation and day-to-day use (user verification).

## Verification record
- TDD: initial model stubs failed 9 behavioral tests; implemented preference filtering/ranking, portion scaling, compatible-unit aggregation, calendar arithmetic, planning, validated storage, and backup round-trip. Added failing regressions for tomato/onion forms, permanently clearing stale shopping checks, and service-worker cache isolation; each now passes.
- 13 automated tests pass. Static production build validates all 160 recipe records and precaches 15 local assets, including the full catalog and bundled fonts. No runtime package or remote recipe dependencies.
- Browser at 390px: four-step onboarding saved liked chicken/beans, Mexican/Italian cuisines, excluded mushrooms, and a 30-minute limit. Recommendations changed; searching for mushrooms returned zero results.
- Browser: a 2-serving black bean bowl scaled to 3 (2¼ cups beans, ¾ cup rice), favorite saved, and meals planned for Monday (3 servings) and Tuesday (2). Groceries merged to 3¾ cups beans and 1¼ cups rice.
- Browser: shopping checks, owned salt, a coffee extra, and a personal recipe survived backup export/restore and reload. A personal recipe containing literal HTML characters rendered as text. Changing Monday to 4 servings recalculated rice to 1½ cups and reset checked/owned states whose quantities changed.
- Browser: narrow 320px/390px layouts had no horizontal overflow; Tab from search focused the All filter. Console showed no app errors during the online flows. Physical iPhone installation remains for user verification.
- Offline test initially exposed an old Daily Water HTML cache at the reused localhost address. Added a failing cache-isolation regression and scoped navigation/asset reads to the active Daily Prep cache; automated regression passes. With the preview server stopped, the browser successfully reloaded Daily Prep, opened saved plans, and generated the correct grocery list. Preview server stopped after verification.
- Repository created: https://github.com/MatthewG6/daily-prep. GitHub Pages configured for Actions; deployment pending.
