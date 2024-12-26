import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link
        to="/cart"
        className="rounded-full bg-stone-200 px-4 py-2 font-semibold uppercase text-stone-800 transition-all duration-300 hover:scale-105 hover:bg-stone-300 active:scale-95 active:bg-stone-400"
      >
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
