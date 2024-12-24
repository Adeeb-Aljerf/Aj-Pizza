import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center bg-stone-100 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-[95%] rounded-lg bg-white p-6 text-center shadow-lg sm:max-w-md sm:p-8">
        <h1 className="mb-3 text-2xl font-bold text-red-500 sm:mb-4 sm:text-3xl">
          Something went wrong 😢
        </h1>
        <p className="mb-4 break-words text-sm text-stone-600 sm:mb-6 sm:text-base">
          {error.data || error.message}
        </p>

        <div className="mt-3 sm:mt-4">
          <LinkButton
            to="-1"
            className="w-full bg-stone-800 text-sm transition-colors hover:bg-stone-700 sm:w-auto sm:text-base"
          >
            &larr; Go back
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

export default Error;
