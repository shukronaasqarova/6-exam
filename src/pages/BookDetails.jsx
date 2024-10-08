import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Oval } from 'react-loader-spinner';

const BookDetails = () => {
  const { id } = useParams();
  const bookRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = () => {
      setLoading(true);
      axios.get(`https://fn27.vimlc.uz/books/${id}`)
        .then(response => {
          bookRef.current = response.data;
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Oval height={80} width={80} color="#4f46e5" visible={true} ariaLabel='oval-loading' secondaryColor="#818cf8" strokeWidth={2} strokeWidthSecondary={2} />
      </div>
    );
  }


  if (!bookRef.current) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">Kitob topilmadi</p>
      </div>
    );
  }

  const book = bookRef.current;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-xl">
        <div className="flex flex-col md:flex-row gap-8">
          <img src={book.thumbnailUrl} alt={book.title} className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{book.title}</h1>
            <p className="text-lg mb-2"><strong>Sahifalar:</strong> {book.pageCount}</p>
            <p className="text-lg mb-2"><strong>Mualliflar:</strong> {book.authors|| book.authors.join(", ")}</p>
            <p className="text-lg mb-4"><strong>Tavsif:</strong> {book.shortDescription || book.longDescription}</p>
            {book.categories && (
              <p className="text-lg mb-2"><strong>Kategoriyalar:</strong> {book.categories.join(", ")}</p>
            )}
            {book.publishedDate && (
              <p className="text-lg mb-2"><strong>Nashr etilgan sana:</strong> {new Date(book.publishedDate.$date).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;