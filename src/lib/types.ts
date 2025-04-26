export interface IExpense {
  _id?: string;
  name: string;
  price: number | string;
  category: string;
  date: string;
}

export interface ICategory {
  _id?: string;
  name: string;
}