import React, { memo } from "react";

const DEFAULT_TAGS = "no tags";

const Tags = memo(function Tags(props) {
  const { strTags = DEFAULT_TAGS } = props;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {strTags.split(",").map((tag, index) => (
          <span
            key={index}
            className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {tag.trim()}
          </span>
        ))}
      </div>
    </div>
  );
});

export default Tags;
