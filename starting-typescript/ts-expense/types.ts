import { z } from "zod"
import { readFile, writeFile } from "fs/promises"

type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string }

const CategorySchema = z.enum(["food", "transport", "other"])
type Category = z.infer<typeof CategorySchema>

const ExpenseSchema = z.object({
  id: z.number(),
  amount: z.number().positive(),
  category: CategorySchema,
  date: z.string(),
  note: z.string().optional(),
})
type Expense = z.infer<typeof ExpenseSchema>

const ExpensesSchema = z.array(ExpenseSchema)

function describePath(path: PropertyKey[]): string {
  const first = path[0]
  if (typeof first === "number") {
    return `Row ${first + 1}, field "${String(path[1])}"`
  }
  return `field "${String(first)}"`
}

function formatZodError(error: z.ZodError): string {
  return error.issues
    .map(issue => `${describePath(issue.path)}: ${issue.message}`)
    .join("\n")
}

function first<T>(list: T[]): T | undefined {
  return list[0]
}

function groupBy<T, K>(list: T[], keyFn: (item: T) => K): Map<K, T[]> {
  const groups = new Map<K, T[]>()

  for (const item of list) {
    const key = keyFn(item)
    const existing = groups.get(key)

    if (existing) {
      existing.push(item)
    } else {
      groups.set(key, [item])
    }
  }

  return groups
}

function addExpense(list: Expense[], input: unknown): Result<Expense[]> {
  const parsed = ExpenseSchema.safeParse(input)

  if (!parsed.success) {
    return { ok: false, error: formatZodError(parsed.error) }
  }
  return { ok: true, data: [...list, parsed.data] }
}

function deleteExpense(list: Expense[], id: number): Result<Expense[]> {
  const exists = list.some(e => e.id === id)

  if (!exists) {
    return { ok: false, error: `No expense with id ${id}` }
  }

  return { ok: true, data: list.filter(e => e.id !== id) }
}

function updateExpense(
  list: Expense[],
  id: number,
  changes: Partial<Omit<Expense, "id">>,
): Result<Expense[]> {
  const existing = list.find(e => e.id === id)

  if (!existing) {
    return { ok: false, error: `No expense with id ${id}` }
  }

  const parsed = ExpenseSchema.safeParse({ ...existing, ...changes })

  if (!parsed.success) {
    return { ok: false, error: formatZodError(parsed.error) }
  }

  return {
    ok: true,
    data: list.map(e => (e.id === id ? parsed.data : e)),
  }
}

function totalByCategory(list: Expense[]): Record<Category, number> {
  const totals: Record<Category, number> = {
    food: 0,
    transport: 0,
    other: 0,
  }

  for (const e of list) {
    totals[e.category] += e.amount
  }

  return totals
}

function filterByMonth(list: Expense[], month: string): Expense[] {
  const result: Expense[] = []

  for (const e of list) {
    if (e.date.startsWith(month)) {
      result.push(e)
    }
  }

  return result
}

async function loadExpenses(): Promise<Expense[]> {
  const text = await readFile("expenses.json", "utf-8")
  const data = JSON.parse(text)
  return ExpensesSchema.parse(data)
}

async function saveExpenses(list: Expense[]): Promise<void> {
  await writeFile("expenses.json", JSON.stringify(list, null, 2))
}

async function addFromCommand(list: Expense[]): Promise<Result<Expense[]>> {
  const note = process.argv[5]

  const result = addExpense(list, {
    id: Math.max(0, ...list.map(e => e.id)) + 1,
    amount: Number(process.argv[3]),
    category: process.argv[4],
    date: new Date().toISOString().slice(0, 10),
    ...(note ? { note } : {}),
  })

  if (!result.ok) return result

  await saveExpenses(result.data)
  return result
}

async function main() {
  const command = process.argv[2]

  try {
    const list = await loadExpenses()

    if (command === "list") {
      for (const e of list) {
        console.log(`${e.id}. ${e.date}  ${e.category}  ${e.amount}`)
      }
    } else if (command === "total") {
      console.log(totalByCategory(list))
    } else if (command === "add") {
      const result = await addFromCommand(list)
      if (result.ok) {
        console.log("Added!")
      } else {
        console.log(`Could not add:\n${result.error}`)
      }
    } else if (command === "month") {
      const month = process.argv[3]
      if (!month) {
        console.log("Usage: npx tsx types.ts month <YYYY-MM>")
      } else {
        for (const e of filterByMonth(list, month)) {
          console.log(`${e.id}. ${e.date}  ${e.category}  ${e.amount}`)
        }
      }
    } else if (command === "delete") {
      const id = Number(process.argv[3])
      if (!id) {
        console.log("Usage: npx tsx types.ts delete <id>")
      } else {
        const result = deleteExpense(list, id)
        if (result.ok) {
          await saveExpenses(result.data)
          console.log("Deleted!")
        } else {
          console.log(result.error)
        }
      }
    } else if (command === "update") {
      const id = Number(process.argv[3])
      const amount = Number(process.argv[4])
      if (!id || Number.isNaN(amount)) {
        console.log("Usage: npx tsx types.ts update <id> <newAmount>")
      } else {
        const result = updateExpense(list, id, { amount })
        if (result.ok) {
          await saveExpenses(result.data)
          console.log("Updated!")
        } else {
          console.log(`Could not update:\n${result.error}`)
        }
      }
    } else if (command === "monthly") {
      const byMonth = groupBy(list, e => e.date.slice(0, 7))
      for (const [month, items] of byMonth) {
        const sum = items.reduce((acc, e) => acc + e.amount, 0)
        console.log(`${month}: ${sum} (${items.length} expenses)`)
      }
    } else if (command === "bycategory") {
      const byCategory = groupBy(list, e => e.category)
      for (const [category, items] of byCategory) {
        console.log(`${category}: ${items.length} expenses`)
      }
    } else {
      console.log(
        "Usage: npx tsx types.ts list | total | add <amount> <category> [note] | month <YYYY-MM> | delete <id> | update <id> <amount> | monthly | bycategory",
      )
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Invalid data:")
      for (const issue of error.issues) {
        console.log(`  ${describePath(issue.path)}: ${issue.message}`)
      }
    } else {
      throw error
    }
  }
}

main()
//cd G:/beginner/starting-typescript/ts-expense
//npx tsx types.ts
//npx tsx types.ts add -5 food
//npx tsx types.ts add 100 gaming