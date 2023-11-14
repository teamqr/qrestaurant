import { theme } from "@/common/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useFixedInsets = () => {
  const { bottom, ...rest } = useSafeAreaInsets();

  return {
    ...rest,
    bottom: bottom || theme.spacing(4),
  };
};
