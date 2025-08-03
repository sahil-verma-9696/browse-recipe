import React from "react";
import Image from "../../../../components/image";
import { Link } from "react-router";

export default function CategoryCard({ categoryData = {} }) {
  const { idCategory, strCategory, strCategoryDescription, strCategoryThumb } =
    categoryData;

  return (
    <div className="group bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-orange-100 hover:border-orange-200 relative ">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={strCategoryThumb}
          alt={strCategory}
          className="group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-200">
          {strCategory}
        </h3>

        {strCategoryDescription && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {strCategoryDescription}
          </p>
        )}

        {/* Category ID Badge */}
        {idCategory && (
          <div className="absolute top-4 right-4 bg-orange-100/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-orange-700 shadow-sm">
            #{idCategory}
          </div>
        )}
      </div>

      {/* Hover Action */}
      <div className="px-6 pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Link
          to={`/category/${strCategory}`}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm shadow-md hover:shadow-lg"
        >
          View Category
        </Link>
      </div>
    </div>
  );
}
