import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useConversionData } from "../hooks/useConversionData";

export function ConversionChart() {
  const [origin, setOrigin] = useState("email");
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");

  const filters = useMemo(
    () => ({ origin, startDate, endDate }),
    [origin, startDate, endDate]
  );

  const { data, loading } = useConversionData(filters);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-xl font-semibold mb-4">Evolução da Conversão</h2>

      <div className="flex flex-wrap items-center gap-4 mb-6">
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
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="responseDate"
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString("pt-BR")
              }
            />
            <YAxis tickFormatter={(val) => `${val}%`} />
            <Tooltip
              formatter={(value) => `${value}%`}
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("pt-BR")
              }
            />
            <Line
              type="monotone"
              dataKey="conversionRate"
              stroke="#8884d8"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
