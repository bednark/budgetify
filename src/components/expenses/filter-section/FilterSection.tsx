interface IFilterSectionProps {
  dateFrom: string;
  dateTo: string;
  setDateFrom: (val: string) => void;
  setDateTo: (val: string) => void;
}

const FilterSection = ({ dateFrom, dateTo, setDateFrom, setDateTo }: IFilterSectionProps) => (
  <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
    <label className="flex items-center gap-2">
      Od:
      <input
        type="date"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      />
    </label>
    <label className="flex items-center gap-2">
      Do:
      <input
        type="date"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      />
    </label>
  </div>
);

export default FilterSection;