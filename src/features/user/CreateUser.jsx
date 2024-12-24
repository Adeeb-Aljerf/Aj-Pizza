import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit} className="text-center">
      <p className="mb-6 text-base text-stone-600 md:text-lg">
        👋 Enter your name to begin
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-8 w-72 rounded-full border border-stone-200 px-4 py-2.5 text-stone-800 transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-opacity-50"
      />

      {username !== '' && (
        <div className="transform transition-all duration-300">
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
