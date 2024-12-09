import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Пример товаров
const products = [
  {
    id: 2,
    name: 'Цепочка SEXSOUND W',
    description: 'Цепочка "SEXSOUND W" станет универсальным дополнением к любому образу...',
    price: 2500,
    material: 'Высококачественная сталь и белоснежные бусы',
    images: ['/imgs/woman.jpg', '/imgs/woman_side.jpg', '/imgs/woman_close.jpg'],
  },
  {
    id: 3,
    name: 'Цепочка SEXSOUND M',
    description: 'Погрузитесь в мир утончённого стиля с нашей цепочкой...',
    price: 2500,
    material: 'Высококачественная сталь',
    images: ['/imgs/man.jpg', '/imgs/man_side.jpg', '/imgs/man_close.jpg'],
  },
];

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [cart, setCart] = useState<any[]>([]); // Состояние для корзины

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((product) => product.id === Number(id));
      setProduct(foundProduct);
    }
  }, [id]);

  useEffect(() => {
    // Получение корзины из localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleAddToCart = () => {
    if (product) {
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Если товар уже в корзине, увеличиваем количество
        const updatedCart = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Сохраняем в localStorage
      } else {
        // Если товара нет в корзине, добавляем новый товар
        const newCart = [...cart, { ...product, quantity: 1 }];
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart)); // Сохраняем в localStorage
      }
      alert(`${product.name} добавлен в корзину!`);
    }
  };

  if (!product) {
    return <p>Товар не найден</p>;
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
          <div className="w-full md:w-1/3 relative">
            <img
              src={product.images[currentImage]}
              alt={`${product.name} - изображение ${currentImage + 1}`}
              className="w-full h-auto object-cover rounded-md mb-4"
            />
          </div>

          <div className="md:ml-6">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-bold mb-4">Цена: {product.price} руб.</p>
            <p className="mb-4"><strong>Материал:</strong> {product.material}</p>
            <button
              onClick={handleAddToCart}
              className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors mb-4"
            >
              Добавить в корзину
            </button>
            <Link to="/cart" className="inline-block px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
              Перейти в корзину
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
