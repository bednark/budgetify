"use server";

import { IExpense } from "@/lib/types";
import { ExpensesModel } from "@/lib/models";
import connectToDatabase from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { formatDate } from "@/lib/functions";

export const addExpense = async (expense: IExpense): Promise<string> => {
  try {
    await connectToDatabase()
    console.log(expense)

    if (!expense) {
      throw new Error("Expense data is required");
    }
    if (!expense.name || !expense.price || !expense.category || !expense.date) {
      throw new Error("All fields are required");
    }
    if (isNaN(expense.price as number)) {
      throw new Error("Price must be a number");
    }
    if (expense.price as number <= 0) {
      throw new Error("Price must be a positive number");
    }    

    const newExpense: IExpense = {
      name: expense.name,
      price: expense.price,
      category: expense.category,
      date: formatDate(new Date(expense.date))
    };

    const addedExpense = await ExpensesModel.create(newExpense);
    revalidatePath("/");
    revalidatePath("/wydatki");
    return addedExpense._id.toString();
  }
  catch (error) {
    console.error("Error adding expense:", error);
    return "error";
  }
}