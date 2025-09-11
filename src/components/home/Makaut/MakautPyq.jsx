import React from "react";
import { Card, CardContent } from "../PYQ/Card";

const MakautPyq = () => {
  const departments = [
    { name: "Computer Science & Engineering", title: "cse", logo: "💻" },
    { name: "Electronics & Communication Engineering", title: "ece", logo: "📡" },
    { name: "Mechanical Engineering", title: "me", logo: "⚙️" },
    { name: "Civil Engineering", title: "ce", logo: "🏗️" },
    { name: "Electrical Engineering", title: "ee", logo: "🔌" },
    { name: "Information Technology", title: "it", logo: "🌐" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700 drop-shadow-lg">
        Makaut All Departments
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {departments.map((dept, index) => (
          <Card
            key={index}
            linkto={`/pyq/makaut/${dept.title}`}
            className="relative group cursor-pointer overflow-hidden"
          >
            {/* Only lift card on hover, no scaling for text */}
            <CardContent className="flex flex-col items-center justify-center p-8 transition-transform duration-500 transform group-hover:-translate-y-2">
              {/* Logo scales and rotates independently */}
              <div className="text-7xl mb-5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125">
                {dept.logo}
              </div>

              {/* Text stays stable, only color changes */}
              <h2 className="text-xl font-semibold text-gray-700 text-center group-hover:text-blue-700 transition-colors duration-300">
                {dept.name}
              </h2>

              {/* Animated underline */}
              <div className="h-1 w-0 bg-blue-500 mt-3 transition-all duration-500 group-hover:w-16"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MakautPyq;
