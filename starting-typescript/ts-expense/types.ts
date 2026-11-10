import { z } from "zod"

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string }

export const CategorySchema = z.enum(["food", "transport", "other"])
export type Category = z.infer<typeof CategorySchema>

export const ExpenseSchema = z.object({
  id: z.number(),
  amount: z.number().positive(),
  category: CategorySchema,
  date: z.string(),
  note: z.string().optional(),
})
export type Expense = z.infer<typeof ExpenseSchema>

export const ExpensesSchema = z.array(ExpenseSchema)
export const NewExpenseSchema = ExpenseSchema.omit({ id: true, date: true })
//cd G:/beginner/starting-typescript/ts-expense
//npx tsx types.ts