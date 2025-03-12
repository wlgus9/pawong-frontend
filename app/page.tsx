"use client";

import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Home from "@/components/Home";

export default function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <Home />
      <Navigation />
    </div>
  );
}