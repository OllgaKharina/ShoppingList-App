import React, { useState } from "react";
import ProductList from "./ProductsList";
import FinalList from "./FinalList";
import { Category, useCategories } from "../hooks/useCategories";
import { useDeleteSelectedList } from "../hooks/useDeleteSelectedList";

const CategoriesList: React.FC = () => {

  const { status, data: categories, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showFinalList, setShowFinalList] = useState(false);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

 const handleClearList = () => {
    clearProducts();
  };

  const { mutate: clearProducts } = useDeleteSelectedList();  
 
  if (status === "pending") return <span>Загрузка...</span>;
  if (status === "error") return <span>Произошла ошибка: {error.message}</span>;

  return (
    <div>
      {!showFinalList ? (
        <>
          {!selectedCategory ? (
            <div>
              <h2>Список покупок</h2>
              <ul className="category-list">
                {categories?.map((category: Category) => (
                  <li key={category.id}>
                    <button
                      className="button category-button"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="button-container">
                <button onClick={handleClearList} className="button clear-btn">
                  Очистить список
                </button>
                <button
                  onClick={() => setShowFinalList(true)}
                  className="button save-btn"
                >
                  Готовый список
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="button"
              >
                Назад
              </button>
              <ProductList
                id={selectedCategory}
                name={
                  categories.find((cat) => cat.id === selectedCategory)?.name ||
                  ""
                }
                products={
                  categories.find((cat) => cat.id === selectedCategory)
                    ?.products || []
                }
              />
            </div>
          )}
        </>
      ) : (
        <FinalList onBack={() => setShowFinalList(false)} />
      )}
    </div>
  );
};

export default CategoriesList;
