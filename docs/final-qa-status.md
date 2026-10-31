# Portfolio QA checkpoint — 31 October 2026

## Working preview and Git state

- Existing development command: `npm run dev` (`tsx server.ts`), localhost port 3000.
- Preview restored by running the existing command with sandbox escalation. No new deployment project or configuration was created.
- Browser loaded the actual portfolio. The earlier generated mockup is not a screenshot or QA evidence.
- Branch: main. HEAD: 83ccfe47cd55ea0d5010177a84ce0a32995b4c7d. No commit or push performed.
- GitHub production deployment 7403140441 succeeded for that SHA; remote main matched it. This is evidence for the existing production workflow, not direct inspection of Vercel's branch setting.
- User explicitly confirmed replacing featured VisionControl with Axiom and removing the four old certificate SVGs. Do not restore them.
- Latest user instruction requires approval before either committing or pushing.
- Unrelated generate_resume.py and output/ artifacts must stay outside a portfolio commit.

## Actual browser checks across this resumed QA session

Used the Codex in-app browser with real DOM interactions and screenshots, not device emulators or physical phones.

- Document width checked at 320, 375, 430, 768, 1024, 1280, 1440, 1920px in both themes. No document horizontal overflow found. Decorative overflow and intentionally scrollable contribution charts were distinguished from document overflow.
- Additional 900x600 landscape check. All eight Screens destinations traversed in light mode at this size, and in dark mode at 320px.
- Every mobile drawer destination traversed in Full Feed at tablet width, with destination hash verification.
- Screens/Full Feed switching, next/previous controls, brand/home navigation and back-to-top exercised.
- Navigation dialog keyboard containment and Escape focus restoration checked.
- Hero code snapshot expansion and copy feedback checked. About inspect/stack/status tabs, skills filters, LeetCode history/language tabs and sync action, GitHub tabs/search/category controls exercised.
- Both project case studies opened and closed. Algorand audit button entered its scanning state. All four Axiom signal selectors selected successfully.
- All six 2026 participation detail dialogs opened. All four photos, the graphic, and video viewers opened. Achievement detail and nested photo viewer opened. The 2025 presentation photo/detail opened with 13 October 2025 preserved.
- Gallery verified in ascending date order: April 25–26, April 28, April 29, October 18, October 24, October 25 (2026).
- Video decoded at 860x640 with readyState 4 and advancing currentTime; pause/play controls exercised. Full Feed video viewer also played successfully.
- 2027 empty-state navigation and return checked; keyboard year selection exercised.
- CV dialog opened in mobile light mode and tablet layout; Escape worked.
- Contact form open/close, inbox open/close and invalid-email constraint validation checked. No message was sent.
- Hero pointer interaction produced translateY/rotateX/rotateY changes. Network running state switched true onscreen/false offscreen; animated dash offsets observed.
- Light and dark hero screenshots inspected. Mobile project modal, tablet project layout, media viewer and light CV screenshots inspected.
- No console errors in the sampled browser log checks.

## Confirmed fixes from this pass

- Algorand preview header wraps instead of clipping its connection badge at 320px.
- Algorand modal metrics stack on small screens, fixing overlapping values; terminal heading wraps. Modal width rechecked after the fix.
- Invalid fallback GitHub profile URLs no longer generate unusable git clone commands. Only repository URLs expose cloning; clipboard success feedback waits for the write to resolve.
- Previously interrupted ProjectModal syntax repair remains preserved.

## Checks

- Direct tsc --noEmit: passed.
- npm run lint: passed (this project defines lint as tsc --noEmit; no separate ESLint check).
- npm run build: passed, frontend and server bundles.
- git diff --check: passed.
- Referenced local media in chaptersData.ts and portfolioData.ts: no missing assets.
- No configured automated test script or Playwright test configuration found. Browser interactions above were tool-driven tests.
- Main bundle warning remains: about 577.4kB minified / 169.4kB gzip. No Lighthouse score or 60fps claim.

## Limits and follow-up

- Not an exhaustive certification of every link, hover state or viewport/content combination.
- External LinkedIn/social redirects were inspected as destinations, not all opened and independently validated.
- Real email delivery, authenticated inbox access, Gmail/mail-app handoff and PDF printing remain untested.
- Clipboard feedback was observed, but browser clipboard readback was inconsistent with UI writes; complete OS clipboard integration remains unverified.
- Reduced-motion behavior was inspected in code, not browser-emulated in this pass. Physical iOS/Android/Safari, touch swipes and measured frame rate/Lighthouse remain unverified.
- Existing GitHub/LeetCode fallback metrics are not proof of live verified statistics. Their content provenance was not independently audited in this pass.
- Production remains unchanged. Obtain approval before commit, and explicit push approval before triggering existing Vercel deployment. Then verify the deployment and nealsk.vercel.app.
