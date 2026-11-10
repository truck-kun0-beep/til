import { ExpenseSchema } from "./types.js"
import type { Category, Expense, Result } from "./types.js"
import { formatZodError } from "./errors.js"

export function groupBy<T, K>(list: T[], keyFn: (item: T) => K): Map<K, T[]> {
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

export function addExpense(list: Expense[], input: unknown): Result<Expense[]> {
  const parsed = ExpenseSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: formatZodError(parsed.error) }
  }
  return { ok: true, data: [...list, parsed.data] }
}

export function deleteExpense(list: Expense[], id: number): Result<Expense[]> {
  if (!list.some(e => e.id === id)) {
    return { ok: false, error: `No expense with id ${id}` }
  }
  return { ok: true, data: list.filter(e => e.id !== id) }
}

export function updateExpense(
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
  return { ok: true, data: list.map(e => (e.id === id ? parsed.data : e)) }
}

export function totalByCategory(list: Expense[]): Record<Category, number> {
  const totals: Record<Category, number> = { food: 0, transport: 0, other: 0 }
  for (const e of list) {
    totals[e.category] += e.amount
  }
  return totals
}

export function filterByMonth(list: Expense[], month: string): Expense[] {
  return list.filter(e => e.date.startsWith(month))
}