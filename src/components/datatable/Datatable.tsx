interface IDatatableProps<T extends { _id?: string }> {
  data: T[];
  headers: string[];
  fields: (keyof T)[];
}

const Datatable = <T extends object>({ data, headers, fields }: IDatatableProps<T>) => (
  <div className="overflow-auto w-[calc(100vw-50px)] sm:w-full h-96 mx-auto">
    <table className="w-full table-auto border border-gray-700 text-white">
      <thead className="bg-gray-800">
        <tr>
          {headers.map((header) => (
            <th key={header} className="px-6 py-3 border-b text-left">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="bg-gray-900 even:bg-gray-800">
            {fields.map((field) => (
              <td key={String(field)} className="px-6 py-3 border-b whitespace-normal break-words">
                {String(item[field])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Datatable;
