import React from "react";

const NotesCard = ({ title, content }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600"
        dangerouslySetInnerHTML={{ __html: content }}
      ></p>
    </div>
  );
};

export default NotesCard;