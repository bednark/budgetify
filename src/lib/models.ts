import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 20
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    max: 20
  },
  date: {
    type: Date,
    required: true
  }
}, { versionKey: false });

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 20
  },
}, { versionKey: false });

export const ExpensesModel = mongoose.models.Expenses || mongoose.model("Expenses", expensesSchema, "expenses");
export const CategoriesModel = mongoose.models.Categories || mongoose.model("Categories", categoriesSchema, "categories");