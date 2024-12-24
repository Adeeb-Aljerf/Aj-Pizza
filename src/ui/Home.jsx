import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="mx-auto mt-20 max-w-3xl px-4 pb-16 pt-10">
      <div className="mb-12 text-center">
        <h1 className="mb-6 text-xl font-bold text-stone-800 sm:text-3xl">
          Pizza That Makes Memories
        </h1>
        <p className="text-sm font-medium text-emerald-800 sm:text-xl">
          Straight out of the oven, straight to you.
        </p>
      </div>

      <div className="mt-12">
        {!username ? (
          <CreateUser />
        ) : (
          <div className="text-center">
            <Button type="primary" to="/menu">
              Continue ordering, {username}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
