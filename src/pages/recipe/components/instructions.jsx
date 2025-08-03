import { Clock } from "lucide-react";
import React, { memo } from "react";

const Instructions = memo(function Instructions(props) {
  const { strInstructions } = props;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <Clock className="text-orange-500 w-6 h-6" />
        Instructions
      </h2>
      <div className="prose prose-orange max-w-none">
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border-l-4 border-orange-500">
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            {strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
});

export default Instructions;
