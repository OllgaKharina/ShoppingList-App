import React from "react";
import { useSaveSelectedProducts } from "../hooks/useSaveSelectedProducts";

export interface ProductListProps {
  id: number;
  name: string;
  products: string[];
}

const ProductList: React.FC<ProductListProps> = ({ id, name, products }) => {
  
  const { mutate: updateSelectedProducts } = useSaveSelectedProducts();
  const [selectedProducts, setSelectedProducts] = React.useState<string[]>([]);

  const handleProductToggle = (product: string) => {
    const updatedProducts = selectedProducts.includes(product)
      ? selectedProducts.filter((p) => p !== product)
      : [...selectedProducts, product];
    setSelectedProducts(updatedProducts);

    // Отправка выбранных продуктов на сервер
    updateSelectedProducts({ categoryId: id, products: updatedProducts });
  };

  return (
    <div className="form-container">
      <h2>{name}</h2>
      <form className="product-form">
        <div className="items-wrap">
          {products.map((product, index) => (
            <div key={index} className="checkbox-item">
              <input
                type="checkbox"
                id={`${id}-${index}`}
                checked={selectedProducts.includes(product)}
                onChange={() => handleProductToggle(product)}
              />
              <label htmlFor={`${id}-${index}`} className="checkbox-label">
                {product}
              </label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default ProductList;

