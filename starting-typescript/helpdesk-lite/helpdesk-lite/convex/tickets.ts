import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listTickets = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tickets").collect();
  },
});

export const createTicket = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("tickets", {
      title: args.title,
      status: "open",
    });
  },
});