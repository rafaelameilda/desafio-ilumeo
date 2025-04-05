import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export function ConversionAreaChart({ data }: { data: unknown[] }) {
  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Área de Conversão</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
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
          <Area
            type="monotone"
            dataKey="conversionRate"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorRate)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
