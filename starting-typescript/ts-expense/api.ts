import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { loadExpenses, saveExpenses } from "./storage.js"
import { addExpense, totalByCategory, groupBy } from "./logic.js"
import { NewExpenseSchema } from "./types.js"
import { formatZodError } from "./errors.js"

const app = new Hono()

// GET /expenses -> everything
app.get("/expenses", async c => {
  const list = await loadExpenses()
  return c.json(list)
})

// POST /expenses -> validate body, add, save
app.post("/expenses", async c => {
  // 1. Is the body even valid JSON?
  let body: unknown
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: "Body must be valid JSON" }, 400)
  }

  // 2. Does it match our schema? If not: 400 (bad request)
  const parsed = NewExpenseSchema.safeParse(body)
  if (!parsed.success) {
    return c.json({ error: formatZodError(parsed.error) }, 400)
  }

  // 3. Server fills in id and date, then reuse addExpense (same Result pattern)
  const list = await loadExpenses()
  const result = addExpense(list, {
    ...parsed.data,
    id: Math.max(0, ...list.map(e => e.id)) + 1,
    date: new Date().toISOString().slice(0, 10),
  })

  if (!result.ok) {
    return c.json({ error: result.error }, 400)
  }

  await saveExpenses(result.data)
  return c.json(result.data.at(-1), 201) // 201 = created
})

// GET /expenses/summary -> totals per category + per month
app.get("/expenses/summary", async c => {
  const list = await loadExpenses()

  const byMonth = Array.from(
    groupBy(list, e => e.date.slice(0, 7)),
    ([month, items]) => ({
      month,
      total: items.reduce((sum, e) => sum + e.amount, 0),
      count: items.length,
    }),
  )

  return c.json({ byCategory: totalByCategory(list), byMonth })
})

serve({ fetch: app.fetch, port: 4000 })
console.log("API running on http://localhost:4000")