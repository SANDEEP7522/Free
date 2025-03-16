import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://media3.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif?cid=6c09b952m8pluyejj2bxq3480hbxs5q5ozl0eoahw5d8pyn0&ep=v1_gifs_search&rid=giphy.gif&ct=g')",
      }}
    >
      <div className="bg-opacity-10 backdrop-blur-md p-8 rounded-lg text-center max-w-md">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <Link href="/">
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 cursor-pointer transition-transform duration-300 transform hover:scale-105 rounded-lg text-white font-semibold">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
