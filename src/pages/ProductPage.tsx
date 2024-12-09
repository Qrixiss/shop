import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

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
  const [currentImage, setCurrentImage] = useState<number>(0); // Индекс текущего изображения
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Хранение ссылки на таймер

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((product) => product.id === Number(id));
      setProduct(foundProduct);
    }
  }, [id]);

  useEffect(() => {
    if (!product || product.images.length <= 1) return;

    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % product.images.length); // Автопереключение
      }, 3000);
    };

    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current); // Очистка таймера при размонтировании компонента
      }
    };
  }, [product]);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // Очистка текущего таймера
    }
    if (product && product.images.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % product.images.length); // Новый таймер
      }, 3000);
    }
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
    resetTimer(); // Обнуление таймера
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    resetTimer(); // Обнуление таймера
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
          {/* Слайдер изображений */}
          <div className="w-full md:w-1/3 relative">
            <img
              src={product.images[currentImage]}
              alt={`${product.name} - изображение ${currentImage + 1}`}
              className="w-full h-auto object-cover rounded-md mb-4"
            />
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded-full"
            >
              &lt;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded-full"
            >
              &gt;
            </button>
          </div>

          {/* Описание товара */}
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
