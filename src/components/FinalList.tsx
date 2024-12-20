import React, { useState } from "react";
import { ProductItem, useSelectedProducts } from "../hooks/useSelectedProducts"; 

interface FinalListProps {
  onBack: () => void;
}

const FinalList: React.FC<FinalListProps> = ({ onBack }) => {

  // Получаем список продуктов с сервера
  const { data: finalProducts, isLoading, isError } = useSelectedProducts();

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (productId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка при загрузке списка продуктов</div>;

  return (
    <div className="form-container">
      <h2>Что купить?</h2>
      <form className="product-form">
        <div className="items-wrap">
          {finalProducts?.map((item: ProductItem) =>
            item.products.map((product) => (
              <div key={`${item.id}-${product}`} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`${item.id}-${product}`}
                  checked={checkedItems[`${item.id}-${product}`] || false}
                  onChange={() => handleCheckboxChange(`${item.id}-${product}`)}
                />
                <label
                  htmlFor={`${item.id}-${product}`}
                  className="checkbox-label"
                >
                  {product}
                </label>
              </div>
            ))
          )}
        </div>
      </form>
      <button className="button" onClick={onBack}>Назад</button>
    </div>
  );
};

export default FinalList;