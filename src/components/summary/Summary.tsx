"use client";

interface ISummaryProps {
  header: "wydatków" | "przychodów"
  dateFrom: string;
  dateTo: string;
  total: string;
}

const Summary = ({ header, dateFrom, dateTo, total }: ISummaryProps) => (
  <div className="text-center mb-6 text-lg text-gray-700 font-semibold">
    Suma {header} od <span className="text-cyan-600">{dateFrom}</span> do{" "}
    <span className="text-cyan-600">{dateTo}</span>:{" "}
    <span className="text-cyan-600">{total} zł</span>
  </div>
);

export default Summary;
