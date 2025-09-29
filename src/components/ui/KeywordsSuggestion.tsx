// Keywords suggestion component for ObjectiveStep
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KeywordsSuggestionProps {
  suggestions: string[];
  onAddKeyword: (keyword: string) => void;
  selectedKeywords: string[];
}

const KeywordsSuggestion = ({
  suggestions,
  onAddKeyword,
  selectedKeywords,
}: KeywordsSuggestionProps) => {
  const [showAllKeywords, setShowAllKeywords] = useState(false);

  const displayedKeywords = showAllKeywords
    ? suggestions
    : suggestions.slice(0, 12);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-gray-700">
          Suggested Keywords ({suggestions.length} available)
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {displayedKeywords.map((keyword, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={`text-xs transition-all duration-200 ${
              selectedKeywords.includes(keyword)
                ? "bg-blue-50 border-blue-300 text-blue-700"
                : "hover:bg-gray-50"
            }`}
            onClick={() => onAddKeyword(keyword)}
            disabled={selectedKeywords.includes(keyword)}
          >
            <Plus className="h-3 w-3 mr-1" />
            {keyword}
          </Button>
        ))}
      </div>

      {suggestions.length > 12 && (
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-800"
          onClick={() => setShowAllKeywords(!showAllKeywords)}
        >
          {showAllKeywords
            ? "Show Less"
            : `Show ${suggestions.length - 12} More`}
        </Button>
      )}
    </div>
  );
};

export default KeywordsSuggestion;
