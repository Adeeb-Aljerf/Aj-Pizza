import { useSelector } from 'react-redux';

function Username() {
  const username = useSelector((state) => state.user.username);
  if (!username) return null;
  return (
    <div className="hidden text-sm md:block">
      <span className="border-l-2 border-white/30 px-3 py-1.5 font-medium text-white">
        {username}
      </span>
    </div>
  );
}

export default Username;
