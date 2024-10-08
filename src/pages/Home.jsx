import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Oval } from 'react-loader-spinner';

const Home = () => {
  const booksRef = useRef([]);
  const queryRef = useRef("");
  const minPagesRef = useRef("");
  const maxPagesRef = useRef("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = (searchQuery = "", minPages = "", maxPages = "") => {
    setLoading(true);
    let url = "https://fn27.vimlc.uz/books";
    
    if (searchQuery) {
      url = `https://fn27.vimlc.uz/books/search?query=${encodeURIComponent(searchQuery)}`;
    } else if (minPages && maxPages) {
      url = `https://fn27.vimlc.uz/books/filter?minPages=${minPages}&maxPages=${maxPages}`;
    }

    axios.get(url)
      .then(response => {
        booksRef.current = response.data.books || response.data;
      })
      .catch(error => {
        console.error("Error fetching books:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(queryRef.current.value.trim(), minPagesRef.current.value, maxPagesRef.current.value);
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100">
      <form onSubmit={handleSearch} className="mb-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
        <input type="text" placeholder="Kitob qidirish..." onChange={(e) => queryRef.current = e.target.value} className="border-2 border-indigo-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
        <input type="number" placeholder="Min sahifalar" onChange={(e) => minPagesRef.current = e.target.value} className="border-2 border-indigo-300 rounded-lg px-4 py-2 w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
        <input type="number" placeholder="Max sahifalar" onChange={(e) => maxPagesRef.current = e.target.value} className="border-2 border-indigo-300 rounded-lg px-4 py-2 w-full md:w-1/6 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
        <button type="submit" className="bg-indigo-600 text-white rounded-lg px-6 py-2 hover:bg-indigo-700 transition-colors duration-300 w-full md:w-auto">Qidirish</button>
      </form>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Oval height={80} width={80} color="#4f46e5" visible={true} ariaLabel='oval-loading' secondaryColor="#818cf8" strokeWidth={2} strokeWidthSecondary={2} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {booksRef.current.map((book) => (
            <Link key={book.id} to={`/books/${book.id}`} className="block bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
              <div className="aspect-w-3 aspect-h-4 w-full">
                <img src={book.thumbnailUrl || "https://via.placeholder.com/300x400?text=No+Image"} alt={book.title} className="object-cover w-full h-full" />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">Kitob nomi:{book.title}</h2>
                <p className="text-gray-600 mb-2">Sahifalar: {book.pageCount}</p>
                <p className="text-gray-500 text-sm line-clamp-1">Mualliflar: {book.authors.join(", ")}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;