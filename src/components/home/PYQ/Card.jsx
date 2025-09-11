import { Link } from "react-router-dom";

export function Card({ children, className = "",linkto }) {
  return (
    <Link
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 ${className}`} to={linkto}
    >
      {children}
    </Link>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
