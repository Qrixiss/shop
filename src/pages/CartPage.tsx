import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [products] = useState([
    { id: 2, name: 'Цепочка SEXSOUND W', price: 2500, image: '/imgs/woman.jpg' },
    { id: 3, name: 'Цепочка SEXSOUND M', price: 2500, image: '/imgs/man.jpg' },
  ]);

  // Загружаем корзину из localStorage при монтировании компонента
  useEffect(() => {
    const loadCart = () => {
      const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartItems(savedCartItems);
    };

    loadCart();
    window.addEventListener('cartUpdated', loadCart); // Подписка на событие

    return () => {
      window.removeEventListener('cartUpdated', loadCart); // Отписка при размонтировании
    };
  }, []);

  // Удалить товар из корзины
  const removeFromCart = (productId: number) => {
    const updatedCart = cartItems.filter((item) => item !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated')); // Генерация события
  };

  const cartProducts = products.filter((product) => cartItems.includes(product.id));
  const totalAmount = cartProducts.reduce((total, product) => total + product.price, 0);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-secondary shadow-sm">
        <div className="container mx-auto px-2 py-2 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Корзина</h1>
        </div>
      </header>

      <main className="container mx-auto px-2 py-4">
        {cartProducts.length === 0 ? (
          <p>В вашей корзине нет товаров.</p>
        ) : (
          <ul>
            {cartProducts.map((product) => (
              <li key={product.id} className="flex items-center justify-between mb-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <p>{product.name}</p>
                  <p>{product.price} ₽</p>
                </div>
                <button onClick={() => removeFromCart(product.id)} className="text-red-500">
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between mt-4">
          <Link to="/" className="bg-black text-white p-2 rounded-md">
            Вернуться на главную
          </Link>
          <div className="bg-black text-white p-4 rounded-md text-center min-w-[100px]">
            {Math.round(totalAmount)} ₽
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
