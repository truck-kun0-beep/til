import { readFile, writeFile } from "fs/promises"
import { ExpensesSchema } from "./types.js"
import type { Expense } from "./types.js"
import { StorageError } from "./errors.js"

const FILE = "expenses.json"

export async function loadExpenses(): Promise<Expense[]> {
  let text: string
  try {
    text = await readFile(FILE, "utf-8")
  } catch {
    throw new StorageError(`Could not read ${FILE}. Does it exist?`)
  }

  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    throw new StorageError(`${FILE} is not valid JSON.`)
  }

  return ExpensesSchema.parse(data) // still throws ZodError for bad shape
}

export async function saveExpenses(list: Expense[]): Promise<void> {
  await writeFile(FILE, JSON.stringify(list, null, 2))
}