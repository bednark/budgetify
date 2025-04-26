"use client";

interface ISummaryProps {
  dateFrom: string;
  dateTo: string;
  total: number;
}

const Summary = ({ dateFrom, dateTo, total }: ISummaryProps) => (
  <div className="text-center mb-6 text-lg text-gray-700 font-semibold">
    Suma wydatków od <span className="text-cyan-600">{dateFrom}</span> do{" "}
    <span className="text-cyan-600">{dateTo}</span>:{" "}
    <span className="text-cyan-600">{total.toFixed(2)} zł</span>
  </div>
);

export default Summary;
