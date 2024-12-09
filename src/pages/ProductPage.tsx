import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const products = [
  {
    id: 2,
    name: 'Цепочка SEXSOUND W',
    description: 'Стильная женская цепочка, идеально подходит для вечернего наряда.',
    price: 2500,
    material: 'Золото',
    image: '/imgs/woman.jpg',
  },
  {
    id: 3,
    name: 'Цепочка SEXSOUND M',
    description: 'Мужская цепочка, созданная для любителей элегантности.',
    price: 2500,
    material: 'Серебро',
    image: '/imgs/man.jpg',
  },
];

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();  // Получаем id товара из URL
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Ищем товар с соответствующим id
      const foundProduct = products.find((product) => product.id === Number(id));
      setProduct(foundProduct);  // Обновляем состояние с найденным товаром
    }
  }, [id]);

  if (!product) {
    return <p>Товар не найден</p>;  // Если товар не найден
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-secondary shadow-sm">
        <div className="container mx-auto px-2 py-2 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">{product.name}</h1>
        </div>
      </header>

      <main className="container mx-auto px-2 py-4">
        <div className="flex flex-col md:flex-row">
          <img src={product.image} alt={product.name} className="w-full md:w-1/3 h-auto object-cover rounded-md mb-4 md:mb-0" />
          <div className="md:ml-6">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-bold mb-4">Цена: {product.price} руб.</p>
            <p className="mb-4"><strong>Материал:</strong> {product.material}</p>
            <Link to="/" className="inline-block px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
