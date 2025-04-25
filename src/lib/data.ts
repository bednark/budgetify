import connectToDatabase from "@/lib/utils";
import { CategoriesModel, ExpensesModel } from "@/lib/models";
import { ICategory, IExpense } from "@/lib/types";
import { formatDate } from "@/lib/functions";

export const fetchCategories = async (): Promise<ICategory[]> => {
  try {
    await connectToDatabase();

    const categories: ICategory[] = await CategoriesModel.find();

    return categories.map((category) => ({
      _id: category._id?.toString(),
      name: category.name,
    }));
  }
  catch (error) { 
    console.error("Error connecting to database:", error);
    return [];
  }
};

export const fetchExpenses = async (): Promise<IExpense[]> => {
  try {
    await connectToDatabase();

    const expenses = await ExpensesModel.find().sort({ date: -1 });

    return expenses.map((expense) => ({
      _id: expense._id.toString(),
      name: expense.name,
      price: expense.price,
      category: expense.category,
      date: formatDate(expense.date),
    }));
  }
  catch (error) {
    console.error("Error connecting to database:", error);
    return [];
  }
};