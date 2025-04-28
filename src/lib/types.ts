export interface IExpense {
  _id?: string;
  name: string;
  price: number | string;
  category: string;
  date: string;
  notified?: boolean;
}

export interface ICategory {
  _id?: string;
  name: string;
}

export interface ICategoryWithTotal {
  category: string;
  total: number;
}

export interface IExpensesGroupedByDay {
  date: string;
  total: number;
}

export interface IIncome {
  _id?: string;
  name: string;
  price: number | string;
  date: string;
}