
type Category = "food" | "transport" | "other"

type Expense = {
  id: number
  amount: number
  category: Category
  date: string
  note?: string
}

const lunch: Expense = {
  id: 1,
  amount: 120,
  category: "food",
  date: "2026-10-23",
  note: "Lunch at a restaurant"
}

const bad: Expense = {
  id: 3,
  amount: 1000,
  category: "other",
  date: "2026-10-23",
}

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
const all = addExpense(addExpense([], lunch), bad)
console.log(totalByCategory(all))
