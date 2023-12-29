import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { SectionList, StyleSheet, View } from "react-native";

import { theme } from "@/common/theme";
import { OrderSummary } from "@/common/types";
import { ReceiptItem } from "@/components/@orders/receipt";
import { AppText } from "@/components/text";
import { useFixedInsets } from "@/hooks/useFixedInsets";
import axios from "@/services/axios";

const getOrders = async () => {
  const { data } = await axios.get<{ orders: OrderSummary[] }>(
    "/api/app/order",
  );
  return data;
};

export default function OrdersPage() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  const { bottom } = useFixedInsets();

  const inProgress = useMemo(
    () => data?.orders.filter((order) => order.status === "IN_PROGRESS") ?? [],
    [data],
  );
  const rest = useMemo(
    () => data?.orders.filter((order) => order.status !== "IN_PROGRESS") ?? [],
    [data],
  );

  return (
    <View style={styles.container}>
      <SectionList
        refreshing={isLoading}
        onRefresh={async () => {
          await refetch();
        }}
        sections={[
          { title: "W trakcie przygotowania", data: inProgress },
          { title: "Historia zamówień", data: rest },
        ]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ReceiptItem order={item} />}
        style={{
          marginTop: theme.spacing(2),
        }}
        contentContainerStyle={{
          gap: theme.spacing(3),
          paddingBottom: bottom + theme.spacing(3),
        }}
        renderSectionHeader={({ section: { title, data } }) =>
          data.length > 0 ? (
            <View
              style={{
                paddingVertical: theme.spacing(1),
                backgroundColor: theme.colors.background,
              }}
            >
              <AppText
                weight="bold"
                style={{
                  color: theme.colors.textOnBackground,
                }}
              >
                {title}
              </AppText>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing(3),
  },
});
