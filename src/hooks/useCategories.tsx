import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "./useApiRequest"

export interface Category {
  id: number;
  name: string;
  products: string[];
}

// получаем список категорий с сервера

export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: () => apiRequest("http://localhost:3000/categories"),
  });
};

