import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/auth";

export const useSetupAuth = () => {
  const [loading, setLoading] = useState(true);
  const validateToken = useAuthStore((state) => state.validateToken);

  useEffect(() => {
    validateToken().finally(() => {
      setLoading(false);
    });
  }, [validateToken]);

  return { loading };
};
