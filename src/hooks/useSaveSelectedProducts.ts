import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "./useApiRequest"


// добавляем выбранные продукты в итоговый список

export const useSaveSelectedProducts = () => {
    return useMutation({
      mutationFn: (selectedProducts: { categoryId: number; products: string[] }) =>
        apiRequest("http://localhost:3000/selectedProducts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedProducts),
        }),
    });
  };