import { ICategory, IExpense } from "@/lib/types";

interface IExpenseFormProps {
  formData: IExpense;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleAdd: (e: React.FormEvent) => void;
  categories: ICategory[];
}

const ExpenseForm = ({ formData, handleChange, handleAdd, categories }: IExpenseFormProps) => {
  return (
    <form
      onSubmit={handleAdd}
      className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
    >
      <input
        name="name"
        placeholder="Nazwa"
        value={formData.name}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded px-4 py-2"
      />
      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Kwota"
        value={formData.price}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded px-4 py-2"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border border-gray-300 rounded px-4 py-2"
      >
        {Array.isArray(categories) &&
          categories.map((c: ICategory) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
      </select>
      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded px-4 py-2"
      />
      <button
        type="submit"
        className="md:col-span-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded py-2"
      >
        Dodaj wydatek
      </button>
    </form>
  );
};

export default ExpenseForm;
