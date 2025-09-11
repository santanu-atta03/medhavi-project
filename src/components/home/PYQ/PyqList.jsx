import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaCloudDownloadAlt } from "react-icons/fa";
const PyqList = () => {
  const { dept } = useParams();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/pyq/departments/${dept}/pyqs`)
      .then((res) => {
        setFiles(res.data.files || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching PYQs:", err);
        setLoading(false);
      });
  }, [dept]);

  const getYear = (filename) => {
    const match = filename.match(/\d{4}/);
    return match ? match[0] : "Unknown Year";
  };

  if (loading) {
    return (
      <p className="text-center text-white mt-20 text-lg animate-pulse">
        Loading PYQs...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-blue-900 drop-shadow-lg">
        {dept.toUpperCase()} Department PYQs
      </h1>

      {files.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">
          No PYQs available for this department.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col items-center justify-center p-6 group"
            >
              {/* PDF Icon + Year */}
              <div className="flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-30">
                <AiOutlineFilePdf className="text-6xl text-red-600 mb-4" />
                <h2 className="text-xl font-semibold text-gray-800">
                  {getYear(file)}
                </h2>
              </div>

              {/* Tailwind Download Button */}
              <a
                href={`http://localhost:4000/api/v1/pyq/departments/${dept}/download/${file}`}
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full w-[100px] h-[100px] shadow-lg transform transition-transform duration-300 hover:scale-110">
                  <div className="relative w-8 h-8 mb-2">
                    {/* Arrow line */}
                    <div className="absolute  animate-bounce animate-delay-150">
                        <FaCloudDownloadAlt size={30}/>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">Download</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PyqList;
