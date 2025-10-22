import React from "react";
import { Link } from "react-router-dom";

const NotesCard = ({ title, content, to = '/notes' }) => {

  const cleanContent = content.replace(/<a\b[^>]*>|<\/a>/gi, "");


  return (
    <Link to={to}>
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 pointer-events-auto"
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        ></p>
      </div>
    </Link>
  );
};

export default NotesCard;