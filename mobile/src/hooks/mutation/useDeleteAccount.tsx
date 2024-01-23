import { useMutation } from "@tanstack/react-query";

import axios from "@/services/axios";

const deleteAccount = async () => {
  await axios.delete("/api/app/user");
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
  });
};
