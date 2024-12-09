import React from 'react';
import { Link } from 'react-router-dom';

interface CartButtonProps {
  itemCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount }) => {
  return (
    <Link to="/cart" className="relative">
      <button className="bg-primary text-white py-2 px-4 rounded-lg flex items-center">
        Корзина
        <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {itemCount}
        </span>
      </button>
    </Link>
  );
};

export default CartButton;
