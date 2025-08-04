import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl font-medium text-gray-800 mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;