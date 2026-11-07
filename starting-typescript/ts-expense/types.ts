import { z } from "zod"

import { readFile, writeFile } from "fs/promises"

type Category = "food" | "transport" | "other"

type Expense = {
  id: number
  amount: number
  category: Category
  date: string
  note?: string | undefined
}

const ExpenseSchema = z.object({
  id: z.number(),
  amount: z.number().positive(),
  category: z.enum(["food", "transport", "other"]),
  date: z.string(),
  note: z.string().optional(),
})

const ExpensesSchema = z.array(ExpenseSchema)

function addExpense(list: Expense[], expense: Expense): Expense[] {
  return [...list, expense]
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

async function addFromCommand(list: Expense[]): Promise<Expense[]> {
  const amount = Number(process.argv[3])
  const category = process.argv[4]
  const note = process.argv[5]

  const parsed = ExpenseSchema.parse({
    id: list.length + 1,
    amount,
    category,
    date: new Date().toISOString().slice(0, 10),
    ...(note ? { note } : {}),
  })

  const newList = addExpense(list, parsed)
  await writeFile("expenses.json", JSON.stringify(newList, null, 2))
  return newList
}

function describePath(path: PropertyKey[]): string {
  const first = path[0]
  if (typeof first === "number") {
    return `Row ${first + 1}, field "${String(path[1])}"`
  }
  return `field "${String(first)}"`
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
      await addFromCommand(list)
      console.log("Added!")
    } else {
      console.log("Usage: npx tsx types.ts list | total | add <amount> <category> [note]")
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