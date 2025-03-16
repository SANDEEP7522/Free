"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const imageRef = useRef(null); // ✅ Properly initialized

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return; // ✅ Prevent errors if ref is not attached

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
     <h1 className="bg-gradient-to-br from-gray-500 via-gray-600  to-gray-700 text-gray-300 font-extrabold tracking-tight pr-2 pb-2 bg-clip-text text-5xl sm:text-6xl md:text-7xl text-center transition-transform duration-300 hover:scale-105">
  Manage Your Finance <br /> with AI
</h1>

<p className="text-lg text-gray-600 text-center max-w-xl mx-auto mt-4 leading-relaxed">
  An AI-powered tool to help you manage your finances with a simple and 
  easy-to-use interface, in real-time.
</p>

<div className="flex gap-4 flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-6">
  <Link href="/dashboard">
    <Button
      size="lg"
      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-transform duration-300 hover:bg-blue-700 hover:scale-105"
    >
      Get Started
    </Button>
  </Link>

  <Link href="https://www.linkedin.com/in/sandeep-kumar-sahu-ab9a73303/" target="_blank">
    <Button
      size="lg"
      className="bg-gray-800 text-white  px-6 py-3 rounded-lg font-semibold shadow-lg transition-transform duration-300 hover:bg-gray-900 hover:scale-105"
    >
      LinkedIn
    </Button>
  </Link>
</div>

      <div className="hero-image-wrapper mt-6">
        <div ref={imageRef} className="hero-image">
          <img
            src="https://media0.giphy.com/media/oZ9TPyHgEDA1gfqhtr/giphy.gif"
            alt="Dashboard Preview"
            className="w-full h-[30rem] mb-5"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
