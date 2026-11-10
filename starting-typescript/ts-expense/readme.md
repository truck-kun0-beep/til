# ts-expense

A small command-line expense tracker written in TypeScript.
It saves expenses in a JSON file and checks every row with Zod,
so bad data is caught with a clear error instead of silently
breaking your totals.

## Setup

```
npm install
```

## Usage

```
npx tsx types.ts list
npx tsx types.ts total
npx tsx types.ts add <amount> <category> [note]
```

Categories: `food`, `transport`, `other`

## Examples

```
npx tsx types.ts add 150 food "Dinner"
npx tsx types.ts list
npx tsx types.ts total
```

## What I learned

- TypeScript types, union types, and `Record`
- async/await and reading/writing files with `fs/promises`
- Validating data with Zod

## API

Run: `npx tsx api.ts` (port 3000)

- GET  /expenses          list all expenses
- POST /expenses          add one, body: { amount, category, note? }, 400 if invalid
- GET  /expenses/summary  totals by category and by month

## Tests

`npm test` (Vitest)