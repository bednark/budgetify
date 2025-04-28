import { IIncome } from "@/lib/types";

interface IIncomeFormProps {
  formData: IIncome;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleAdd: (e: React.FormEvent) => void;
}

const IncomeForm = ({ formData, handleChange, handleAdd }: IIncomeFormProps) => {
  return (
    <form
      onSubmit={handleAdd}
      className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
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
        className="md:col-span-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded py-2"
      >
        Dodaj przychód
      </button>
    </form>
  );
};

export default IncomeForm;
