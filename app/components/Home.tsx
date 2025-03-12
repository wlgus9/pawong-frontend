"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  const handleJoin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.text(); // "ok" 응답 받기
      setMessage(result);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4">
      <h2 className="text-lg font-semibold">Welcome to My App! 🎉</h2>
      <button
        onClick={handleJoin}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
      >
        회원가입 테스트
      </button>
      {message && <p className="mt-2 text-gray-700">응답: {message}</p>}
    </div>
  );
}