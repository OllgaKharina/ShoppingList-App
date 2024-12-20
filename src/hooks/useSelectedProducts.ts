import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "./useApiRequest";

export interface ProductItem {
  id: string;
  categoryId: string;
  products: string[];
}
// получаем окончательный список продуктов
export const useSelectedProducts = () => {
  return useQuery<ProductItem[]>({
    queryKey: ["selectedProducts"],
    queryFn: () => apiRequest("http://localhost:3000/selectedProducts"),
    });
  };

  