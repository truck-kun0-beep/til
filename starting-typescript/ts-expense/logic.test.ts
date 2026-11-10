import { describe, test, expect } from "vitest"
import {
  addExpense,
  deleteExpense,
  updateExpense,
  totalByCategory,
  filterByMonth,
  groupBy,
} from "./logic.js"
import type { Expense } from "./types.js"

const sample: Expense[] = [
  { id: 1, amount: 100, category: "food", date: "2026-10-05" },
  { id: 2, amount: 150, category: "food", date: "2026-11-02" },
  { id: 3, amount: 40, category: "transport", date: "2026-11-10" },
]

describe("totalByCategory", () => {
  test("adds up food", () => {
    expect(totalByCategory(sample).food).toBe(250)
  })
  test("adds up transport", () => {
    expect(totalByCategory(sample).transport).toBe(40)
  })
  test("empty category is 0", () => {
    expect(totalByCategory(sample).other).toBe(0)
  })
})

describe("filterByMonth", () => {
  test("keeps only November", () => {
    expect(filterByMonth(sample, "2026-11").length).toBe(2)
  })
})

describe("addExpense", () => {
  test("adds a valid expense", () => {
    const result = addExpense(sample, {
      id: 4, amount: 20, category: "other", date: "2026-11-09",
    })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.length).toBe(4)
    }
  })
  test("rejects a negative amount", () => {
    const result = addExpense(sample, {
      id: 4, amount: -5, category: "food", date: "2026-11-09",
    })
    expect(result.ok).toBe(false)
  })
})

describe("deleteExpense", () => {
  test("fails for an id that doesn't exist", () => {
    const result = deleteExpense(sample, 999)
    expect(result.ok).toBe(false)
  })
})

describe("updateExpense", () => {
  test("changes only the amount", () => {
    const result = updateExpense(sample, 1, { amount: 500 })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data[0]?.amount).toBe(500)
      expect(result.data[0]?.category).toBe("food")
    }
  })
})

describe("groupBy", () => {
  test("groups by month", () => {
    const groups = groupBy(sample, e => e.date.slice(0, 7))
    expect(groups.size).toBe(2)
    expect(groups.get("2026-11")?.length).toBe(2)
  })
})