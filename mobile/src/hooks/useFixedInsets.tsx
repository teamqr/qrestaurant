import { useSafeAreaInsets } from "react-native-safe-area-context";

import { theme } from "@/common/theme";

export const useFixedInsets = () => {
  const { bottom, ...rest } = useSafeAreaInsets();

  return {
    ...rest,
    bottom: bottom || theme.spacing(4),
  };
};
