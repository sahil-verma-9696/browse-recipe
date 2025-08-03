import { ExternalLink } from "lucide-react";
import React, { memo } from "react";

const Externallink = memo(function Externallink(props) {
  const { strSource } = props;

  if (!strSource) {
    return null;
  }

  return (
    <a
      href={strSource}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
    >
      <ExternalLink className="w-6 h-6" />
      <span className="font-semibold">Original Recipe</span>
    </a>
  );
});

export default Externallink;
