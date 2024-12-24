import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-emerald-800 px-4 py-4 uppercase shadow-md sm:px-6">
      <Link
        to="/"
        className="text-xl font-bold tracking-widest text-white transition-colors duration-500 hover:text-emerald-200"
      >
        Aj-Pizza
      </Link>

      <div className="flex items-center gap-6">
        <SearchOrder />
        <Username />
      </div>
    </header>
  );
}

export default Header;
