import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "./useApiRequest"

export const useDeleteSelectedList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Получаем текущий список выбранных продуктов
      const products: { id: string }[] = await apiRequest("http://localhost:3000/selectedProducts");

      // Отправляем DELETE-запрос 
      await Promise.all(
        products.map((product: { id: string }) =>
          apiRequest(`http://localhost:3000/selectedProducts/${product.id}`, {
            method: "DELETE",
          })
        )
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["selected-products"] });
      console.log("Список выбранных продуктов успешно очищен.");
    },
    onError: (error) => {
      console.error("Ошибка при удалении списка продуктов:", error);
    },
  });
};