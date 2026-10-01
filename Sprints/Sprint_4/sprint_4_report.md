# Sprint 4 Report (August 27 to September 30, 2026)

Artifact Webapp MVP  |  Jefferson Kline, Luis Garcia Rangel, Nicholas Vendeland

## YouTube link of Sprint 4 Video (Make this video unlisted)

> Video link to be added before submission.

## What's New (User Facing)

- The artifact catalog now opens with a dedicated sign-in flow. Approved users return to the page they requested after signing in.

- Five predefined accounts can enter the application. Anonymous visitors and other Clerk accounts cannot read catalog data or use the API.

- A [working Vercel demo](https://artifact-webapp-demo.vercel.app) was verified early on October 1, shortly after the Sprint 4 close. All five approved accounts signed in and out; an approved account reached the catalog. The catalog is currently empty, so imported artifacts and images are not yet shown.

## Work Summary (Developer Facing)

Building on Sprint 3's existing Clerk authentication and record-management foundation, the team focused on private access and data preparation. Jefferson added a dedicated login flow, five repeatable development accounts, protected routes and API checks, then a site-wide allowlist on top of Nick's latest branch. Nick corrected collection lookup, record-list refresh after create and delete, and API helper calls; the search route is present, but its page remains a placeholder. Luis's Excel-to-JSON conversion issue was closed during the sprint; his implementation details and validation evidence belong in the block below. Backend and frontend builds, frontend lint, and all 10 local browser tests passed. The main integration gap is data: the live Neon database was reachable on October 1 but held zero artifact records and collections. The Vercel demo is live, although the GitHub connection did not work, so updates currently require manual deployment.

> **Luis - replace this entire block before submission:** Explain the source workbook, the fields and cleanup rules used in conversion, the JSON output and row count, how you validated the result, whether and where it was imported, and the relevant code or demo link. The live Neon database had no artifact records at the October 1 check, so distinguish completed conversion from live database import.

**Responsible use of AI:** ChatGPT/Codex helped organize the sprint evidence, draft this report, and implement the access wall. The team checked report claims against the sprint documents, issues, code, and deployment checks. The code was checked with builds, lint, 10 local browser tests, and live sign-in and anonymous API checks. The empty live database showed why a closed conversion issue alone cannot prove that artifacts were imported. The team remains responsible for reviewing and accepting the code and report.

## Unfinished Work

The converted artifact data has not been demonstrated in the hosted database. The October 1 verification found zero artifact records and zero collections, so record/image display and the planned image-storage linkage remain unverified. Search is still a placeholder, and the broader user-management issue remains open. Pull requests #7, #8, and #9 are open; PR #9 is a draft stacked on Nick's PR #8. The Vercel deployment is live, but automatic deployment from GitHub needs its repository connection fixed. These items need tracked acceptance criteria, issue comments explaining the remaining work, and placement in the next sprint.

## Completed Issues/User Stories

- [#36 Schema update](https://github.com/6arcia-Lui5/CPTS-421-423-Captsone-Documentation/issues/36) - closed during Sprint 4.

- [#39 Website hosting](https://github.com/6arcia-Lui5/CPTS-421-423-Captsone-Documentation/issues/39) - closed during Sprint 4; the [Vercel demo](https://artifact-webapp-demo.vercel.app) was verified shortly after sprint close.

- [#40 Excel to JSON conversion](https://github.com/6arcia-Lui5/CPTS-421-423-Captsone-Documentation/issues/40) - closed during Sprint 4. The conversion details will be supplied in Luis's account above.

- [#41 Website login for five set users](https://github.com/6arcia-Lui5/CPTS-421-423-Captsone-Documentation/issues/41) - closed during Sprint 4. Implementation is in [PR #7](https://github.com/6arcia-Lui5/Artifact-Webapp-MVP/pull/7) and the expanded access wall in [draft PR #9](https://github.com/6arcia-Lui5/Artifact-Webapp-MVP/pull/9).

## Incomplete Issues/User Stories

- [#37 Establish some user-management features](https://github.com/6arcia-Lui5/CPTS-421-423-Captsone-Documentation/issues/37) - the five-account wall is implemented and demonstrated, but the broader issue is still open while the PR stack and hosted account policy are reviewed.

- [#38 Search function](https://github.com/6arcia-Lui5/CPTS-421-423-Captsone-Documentation/issues/38) - Nick's [PR #8](https://github.com/6arcia-Lui5/Artifact-Webapp-MVP/pull/8) adds the route, but the search page has no search behavior yet.

## Code Files for Review

- [LoginPage.jsx](https://github.com/6arcia-Lui5/Artifact-Webapp-MVP/blob/e4e6d12/frontend/src/pages/LoginPage.jsx) - sign-in flow and development-only account setup.

- [RequireSiteAccess.jsx](https://github.com/6arcia-Lui5/Artifact-Webapp-MVP/blob/e4e6d12/frontend/src/components/RequireSiteAccess.jsx) - checks approval before showing artifact pages.

- [requireSiteAccess.ts](https://github.com/6arcia-Lui5/Artifact-Webapp-MVP/blob/e4e6d12/backend/src/middleware/requireSiteAccess.ts) - enforces the five-account allowlist across backend endpoints.

## Retrospective Summary

**Here's what went well:**

- The team produced a reachable demo with verified sign-in and sign-out for all five accounts.

- Local tests covered login, protected routes, and anonymous API denial; the hosted check also returned 401 for anonymous API requests.

- The September 14 client consultation prioritized tangible private access, and the demo now supports that form of review.

**Here's what we'd like to improve:**

- Complete the path from Luis's converted data to visible artifact records and images in the hosted database.

- Review and merge the open PR stack, and connect Vercel to GitHub so later changes deploy automatically.

- Capture direct evidence for the closed conversion and schema issues, including samples, tests, and a before/after video where required.

**Here are changes we plan to implement in the next sprint:**

- Import and verify representative artifact records and linked images in Neon.

- Complete search and resolve the remaining user-management acceptance criteria.

- Use client feedback from the hosted demo to prioritize the next fixes.
