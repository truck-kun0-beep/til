import { z } from "zod"

// A custom error: same as Error, but with its own name,
// so catch blocks can tell "file problem" from "other problem".
export class StorageError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "StorageError"
  }
}

export function describePath(path: PropertyKey[]): string {
  const first = path[0]
  if (typeof first === "number") {
    return `Row ${first + 1}, field "${String(path[1])}"`
  }
  return `field "${String(first)}"`
}

export function formatZodError(error: z.ZodError): string {
  return error.issues
    .map(issue => `${describePath(issue.path)}: ${issue.message}`)
    .join("\n")
}