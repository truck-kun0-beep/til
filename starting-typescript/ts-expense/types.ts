
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
addExpense([], lunch)

console.log(addExpense([], lunch).length)  
