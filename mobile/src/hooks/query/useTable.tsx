import { useQuery } from "@tanstack/react-query";

import { Table } from "@/common/types";
import axios from "@/services/axios";
import { wait } from "@/utils/promise";

const getTableData = async (code: string) => {
  await wait(1000);

  const { data } = await axios.get<{ table: Table }>(`/api/app/table/${code}`);
  return data;
};

export const useTable = ({
  restaurantId,
  code,
}: {
  restaurantId: number;
  code?: string;
}) => {
  return useQuery({
    queryKey: ["restaurant", restaurantId, "table", code],
    queryFn: () => getTableData(code!),
    enabled: !!code && !!restaurantId,
  });
};
