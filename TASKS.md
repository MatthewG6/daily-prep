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
- [x] Publish separate MatthewG6/daily-prep repository and verify GitHub Pages deployment.
- [ ] Physical iPhone installation and day-to-day use (user verification).

## Asian food expansion
- [x] Record failing acceptance tests for a 400-recipe library, cuisine ranking, legacy saves, hibachi directions, and specialty ingredient metadata.
- [x] Add 240 original recipes across 40 dishes, each with six protein options: 36 hibachi, 72 Japanese, 36 Chinese, 36 Korean, 30 Thai, 30 Vietnamese.
- [x] Provide dish-specific measured sauces, prep, cooking, and finishing instructions; preserve the original 160 IDs and existing local records.
- [x] Add cuisine browsing and quick hibachi/Japanese collections, plus onboarding options.
- [x] Run tests/build and verify phone recipe/planner/grocery flows.
- [x] Publish the update and verify the live deployment.

## Verification record
- TDD: initial model stubs failed 9 behavioral tests; implemented preference filtering/ranking, portion scaling, compatible-unit aggregation, calendar arithmetic, planning, validated storage, and backup round-trip. Added failing regressions for tomato/onion forms, permanently clearing stale shopping checks, and service-worker cache isolation; each now passes.
- 13 automated tests pass. Static production build validates all 160 recipe records and precaches 15 local assets, including the full catalog and bundled fonts. No runtime package or remote recipe dependencies.
- Browser at 390px: four-step onboarding saved liked chicken/beans, Mexican/Italian cuisines, excluded mushrooms, and a 30-minute limit. Recommendations changed; searching for mushrooms returned zero results.
- Browser: a 2-serving black bean bowl scaled to 3 (2¼ cups beans, ¾ cup rice), favorite saved, and meals planned for Monday (3 servings) and Tuesday (2). Groceries merged to 3¾ cups beans and 1¼ cups rice.
- Browser: shopping checks, owned salt, a coffee extra, and a personal recipe survived backup export/restore and reload. A personal recipe containing literal HTML characters rendered as text. Changing Monday to 4 servings recalculated rice to 1½ cups and reset checked/owned states whose quantities changed.
- Browser: narrow 320px/390px layouts had no horizontal overflow; Tab from search focused the All filter. Console showed no app errors during the online flows. Physical iPhone installation remains for user verification.
- Offline test initially exposed an old Daily Water HTML cache at the reused localhost address. Added a failing cache-isolation regression and scoped navigation/asset reads to the active Daily Prep cache; automated regression passes. With the preview server stopped, the browser successfully reloaded Daily Prep, opened saved plans, and generated the correct grocery list. Preview server stopped after verification.
- Repository: https://github.com/MatthewG6/daily-prep. Published app: https://matthewg6.github.io/daily-prep/.
- GitHub Actions run 38117607011 successfully ran tests, built, and deployed commit 9f12791. The public URL returned HTTP 200 over HTTPS, and the live app rendered its first-run onboarding. Live 390px DOM width matched scroll width; no console errors. Screenshot captured at /private/tmp/daily-prep-live-onboarding.png. Preview servers stopped and temporary viewport reset.
- Daily Fuel source and deployment remained unchanged (e31d834). Daily Prep lives in its own nested checkout, with independent storage and service-worker scope.

## Expansion verification
- TDD: all four new acceptance tests failed before implementation (160 rather than 400 records, missing cuisine ranking, missing hibachi recipes, and missing specialty ingredients). All 17 tests now pass. The production build validates 400 distinct recipe records and precaches 16 local assets.
- Browser at 390px: applying the service-worker update retained previous preferences, favorites, two planned meals, shopping records, and the existing personal recipe. New Japanese and Hibachi onboarding choices saved and changed the featured meal to hibachi chicken fried rice. Quick Hibachi matched 36 recipes; Japanese matched 108 including hibachi; Thai selector matched 30. Search found the single yum yum steak bowl.
- Recipe detail showed measured cold yum yum sauce, whole-steak searing/rest instructions, and numbered cooking steps without dialog overflow. Chicken fried rice scaled to 3 servings (4½ cups cooked rice, 1⅛ lb chicken), and planning it for Monday preserved both older black-bean meals. Groceries showed cooked rice 4½ cups and dry rice 1½ cups as separate ingredients, plus 3 tbsp tamari.
- Offline browser: with the preview server stopped, Daily Prep reloaded, filtered the full hibachi collection, and opened the new chicken fried rice recipe with eggs and all seven steps. The new catalog module is included in the offline precache.
- GitHub Actions run 38118565244 successfully tested, built, and deployed commit 1637638. The live app offered its update and rendered the new Japanese/Hibachi/Chinese/Korean/Thai/Vietnamese onboarding choices. Physical phone cooking/installation remains user verification.
- Phone screenshot review caught the cuisine selector collapsing to an arrow due to an older first-child flex rule. Overrode that rule; on narrow screens the cuisine selector gets its own full-width row above category/time controls.
- Corrected 390px picker width verified at 350px with no page overflow. Phone screenshot shows the full Hibachi label, cuisine chips, result count, and new recipe cards.
