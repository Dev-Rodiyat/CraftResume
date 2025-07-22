import { useState } from "react";
import ResumeList from "../components/craft/ResumeList";
import { FiSearch, FiX } from "react-icons/fi";

export default function MyCraft() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 relative">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">My Resumes</h1>

      <div className="mb-8 flex justify-center md:justify-start">
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search resumes by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          )}
        </div>
      </div>

      <ResumeList searchQuery={searchQuery} />
    </section>
  );
}
