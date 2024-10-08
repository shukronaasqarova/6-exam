import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white shadow-lg">
        <nav className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold hover:text-indigo-200 transition-all duration-300 transform hover:scale-105"><span className="text-yellow-300">Book</span>Store</Link>
            <ul className="flex space-x-6 items-center">
              <li><Link to="/" className="hover:text-yellow-300 transition-colors duration-200">Home</Link></li>
              <li><Link to="/about" className="hover:text-yellow-300 transition-colors duration-200">About</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-300 transition-colors duration-200">Contact</Link></li>
              <li><button onClick={handleLogout}className="bg-indigo-800 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">Logout</button></li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto p-8">
        <Outlet />
      </main>


    </div>
  );
};

export default MainLayout;