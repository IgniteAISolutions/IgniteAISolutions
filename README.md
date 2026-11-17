# AI Readiness Scorecard

The free scorecard at https://scorecard.igniteaisolutions.co.uk/. The main site shows it inside a frame on https://www.igniteaisolutions.co.uk/assessment; when framed, the app hides its own menu and footer.

## What a visitor does

1. Answers 20 questions: 2 about the business (team size, main AI tool) and 18 scored.
2. Is offered a short details form, with a link to skip it.
3. Sees a score out of 100, a band, a score for each of six areas, one thing to do this week for the two weakest areas, and one suggested next step with Ignite AI.

## The scoring model

All of it lives in `utils/constants.ts` (questions, bands, advice) and `utils/scoring.ts` (the sums).

- Six areas, three questions each: Rules and data, Direction, Tools and set-up, Skills and habits, Work it is used on, Measuring value.
- Every question has four answers scored 0, 1, 2, 3. Each answer describes something that can be seen in the business, so two people from the same business should choose the same one.
- Area score: points earned out of nine, as a percentage.
- Overall score: the plain average of the six areas. No area is weighted.
- Bands: Not started (0 to 24), Trying it out (25 to 49), Building (50 to 74), Working (75 to 100).
- Two caps, so a high average cannot hide a missing foundation:
  - Working needs every area at 50 or more.
  - Rules and data below 25 holds the band at Trying it out.
- The result names the areas weakest first. Equal scores are ordered foundations first (the order of `AREA_ORDER`).

`utils/nextStep.ts` picks the suggested next step from the weakest area, team size and main tool.

To change a question, an answer, a band or the advice, edit `utils/constants.ts`. Keep three questions for each area and four answers scored 0 to 3, or the sums in `utils/scoring.ts` need changing too.

## Lead capture

`api/lead.js` is a Vercel function that writes to NotionOS: it finds or adds the person in People, then creates an Opportunity with the score in its Notes.

- `NOTION_TOKEN` is a server-only Vercel environment variable. Never give it a `VITE_` prefix, or Vite puts it in the public bundle.
- `NOTION_PEOPLE_DATABASE_ID` and `NOTION_OPPORTUNITIES_DATABASE_ID` are optional overrides.
- The details form is optional. A visitor who skips it sees the same result and nothing is saved.
- No email is sent by this app. The Opportunity carries a next action for Chris, due the next day.

## Run it

```bash
npm install
npm run dev
```

```bash
npm run build
```

Pushing to `main` deploys to Vercel.
