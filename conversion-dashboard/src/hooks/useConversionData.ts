import { useEffect, useState } from "react";
import { api } from "../services/api";

export type ConversionData = {
  origin: string;
  responseDate: string;
  totalResponses: number;
  totalConverted: number;
  conversionRate: number;
};

export function useConversionData(filters: {
  origin: string;
  startDate: string;
  endDate: string;
}) {
  const [data, setData] = useState<ConversionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/user-engagement/conversion-evolution", {
        params: {
          origin: filters.origin,
          startDate: filters.startDate,
          endDate: filters.endDate,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  return { data, loading };
}
