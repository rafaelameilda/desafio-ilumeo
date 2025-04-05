import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export function ConversionChart({ data }: { data: unknown[] }) {
  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Evolução da Conversão</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="responseDate"
            tickFormatter={(date) => new Date(date).toLocaleDateString("pt-BR")}
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
    </div>
  );
}
