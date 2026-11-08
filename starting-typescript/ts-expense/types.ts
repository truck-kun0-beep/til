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

function first<T>(list: T[]): T | undefined {
  return list[0]
}

first([1, 2, 3])        // TS infers T = number, returns number | undefined
first(["a", "b"])       // T = string

function addExpense(list: Expense[], input: unknown): Result<Expense[]> {
  const parsed = ExpenseSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: formatZodError(parsed.error) }
  }
  return { ok: true, data: [...list, parsed.data] }
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

  await writeFile("expenses.json", JSON.stringify(result.data, null, 2))
  return result
}

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

function deleteExpense(list: Expense[], id: number): Expense[] {
  return list.filter(e => e.id !== id)
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
          const filtered = filterByMonth(list, month)
          for (const e of filtered) {
            console.log(`${e.id}. ${e.date}  ${e.category}  ${e.amount}`)
          }
        }
    } else if (command === "delete") {
      const id = Number(process.argv[3])
      if (!id) {
        console.log("Usage: npx tsx types.ts delete <id>")
      } else {
        const newList = deleteExpense(list, id)
        if (newList.length === list.length) {
          console.log(`No expense with id ${id}.`)
        } else {
          await writeFile("expenses.json", JSON.stringify(newList, null, 2))
          console.log("Deleted!")
        }
      }
    } else {
      console.log("Usage: npx tsx types.ts list | total | add <amount> <category> [note] | month <month> | delete <id>")
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