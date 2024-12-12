import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartButton from '@/components/CartButton';

const products = [
  { id: 2, name: 'Цепочка SEXSOUND W', description: 'Цепочка "SEXSOUND W" станет...', price: 2500, image: '/imgs/woman.jpg' },
  { id: 3, name: 'Цепочка SEXSOUND M', description: 'Погрузитесь в мир утончённого...', price: 2500, image: '/imgs/man.jpg' },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem('cartItems') || '[]'); // Инициализация из localStorage
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated')); // Генерация события
  }, [cartItems]);

  const handleToggleCartItem = (productId: number) => {
    setCartItems((prevCartItems) => {
      if (prevCartItems.includes(productId)) {
        return prevCartItems.filter((id) => id !== productId); // Удаляем товар
      } else {
        return [...prevCartItems, productId]; // Добавляем товар
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-secondary shadow-sm">
        <div className="container mx-auto px-2 py-2 flex justify-between items-center">
          {/* Левый блок */}
          <div className="flex-1">
            <Link to="/" className="text-white text-lg">Главная</Link>
          </div>

          {/* Центр - логотип */}
          <div className="flex justify-center">
            <Link to="/">
              <img src="/imgs/logotip.png" alt="Sold Soul" className="h-12" />
            </Link>
          </div>

          {/* Правый блок */}
          <div className="flex-1 text-right">
          <CartButton itemCount={cartItems.length} />
          </div>
        </div>
      </header>


      <main className="container mx-auto px-2 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full"
            >
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2 truncate-text">{product.description}</p>
              </Link>

              <div className="flex flex-col justify-between mt-auto">
                <p className="text-xl font-bold mb-2">{product.price} ₽</p>
                <button
                  onClick={() => handleToggleCartItem(product.id)}
                  className={`px-4 py-2 text-white font-semibold rounded-lg ${
                    cartItems.includes(product.id)
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-primary hover:bg-primary-dark'
                  }`}
                >
                  {cartItems.includes(product.id) ? 'Удалить из корзины' : 'Добавить в корзину'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
