import { z } from "zod"
import { loadExpenses, saveExpenses } from "./storage.js"
import {
  addExpense,
  deleteExpense,
  updateExpense,
  totalByCategory,
  filterByMonth,
  groupBy,
} from "./logic.js"
import type { Expense, Result } from "./types.js"
import { StorageError, describePath } from "./errors.js"

function printExpense(e: Expense): void {
  console.log(`${e.id}. ${e.date}  ${e.category}  ${e.amount}`)
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
      list.forEach(printExpense)
    } else if (command === "total") {
      console.log(totalByCategory(list))
    } else if (command === "add") {
      const result = await addFromCommand(list)
      console.log(result.ok ? "Added!" : `Could not add:\n${result.error}`)
    } else if (command === "month") {
      const month = process.argv[3]
      if (!month) {
        console.log("Usage: npx tsx cli.ts month <YYYY-MM>")
      } else {
        filterByMonth(list, month).forEach(printExpense)
      }
    } else if (command === "delete") {
      const id = Number(process.argv[3])
      if (!id) {
        console.log("Usage: npx tsx cli.ts delete <id>")
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
        console.log("Usage: npx tsx cli.ts update <id> <newAmount>")
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
      for (const [month, items] of groupBy(list, e => e.date.slice(0, 7))) {
        const sum = items.reduce((acc, e) => acc + e.amount, 0)
        console.log(`${month}: ${sum} (${items.length} expenses)`)
      }
    } else {
      console.log(
        "Usage: npx tsx cli.ts list | total | add <amount> <category> [note] | month <YYYY-MM> | delete <id> | update <id> <amount> | monthly",
      )
    }
  } catch (error) {
    // Typed errors: check WHICH kind of error it is
    if (error instanceof StorageError) {
      console.log(`File problem: ${error.message}`)
    } else if (error instanceof z.ZodError) {
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