import { useState, useMemo } from "react";
import { useConversionData } from "./hooks/useConversionData";
import { ConversionChart } from "./components/ConversionChart";
import { ConversionAreaChart } from "./components/ConversionAreaChart";

export default function App() {
  const [origin, setOrigin] = useState("email");
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");

  const filters = useMemo(
    () => ({ origin, startDate, endDate }),
    [origin, startDate, endDate]
  );

  const { data, loading } = useConversionData(filters);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Dashboard de Conversão
      </h1>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-4 max-w-4xl mx-auto mb-6">
        <label className="flex flex-col text-sm">
          Origem:
          <select
            className="border rounded p-2 mt-1"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          >
            <option value="email">E-mail</option>
            <option value="MOBILE">Mobile</option>
            <option value="wpp">WhatsApp</option>
          </select>
        </label>

        <label className="flex flex-col text-sm">
          Data início:
          <input
            type="date"
            className="border rounded p-2 mt-1"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label className="flex flex-col text-sm">
          Data fim:
          <input
            type="date"
            className="border rounded p-2 mt-1"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      {loading ? (
        <p className="text-center">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConversionChart data={data} />
          <ConversionAreaChart data={data} />
        </div>
      )}
    </div>
  );
}
