import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { TemplateType, templateConfigs } from "./TemplateRenderer";
import { useState } from "react";

interface TemplateSelectionProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

export default function TemplateSelection({
  selectedTemplate,
  onTemplateChange,
}: TemplateSelectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedConfig = templateConfigs[selectedTemplate];

  // If selectedTemplate is invalid, default to professional and show expanded
  if (!selectedConfig) {
    if (selectedTemplate) {
      onTemplateChange("professional");
    }
    return (
      <div className="bg-white rounded-lg border border-border p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Choose Template
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(templateConfigs).map(([key, config]) => (
            <Card
              key={key}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                "professional" === key
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onTemplateChange(key as TemplateType)}
            >
              <div className="p-3 text-center">
                <div
                  className={`w-full h-24 rounded-md mb-2 bg-gradient-to-br ${
                    key === "professional"
                      ? "from-blue-100 to-blue-200"
                      : key === "creative"
                      ? "from-purple-100 to-pink-200"
                      : key === "executive"
                      ? "from-gray-100 to-gray-200"
                      : key === "minimal"
                      ? "from-green-100 to-green-200"
                      : key === "tech"
                      ? "from-cyan-100 to-cyan-200"
                      : key === "classic"
                      ? "from-amber-100 to-amber-200"
                      : "from-indigo-100 to-indigo-200"
                  } flex items-center justify-center`}
                >
                  <div className="text-xs text-gray-600 font-mono">
                    {config.name}
                  </div>
                </div>
                <h4 className="font-medium text-sm text-gray-900 mb-1">
                  {config.name}
                </h4>
                <p className="text-xs text-gray-600 leading-tight">
                  {config.description}
                </p>
                {"professional" === key && (
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                      Selected
                    </span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Compact view when template is selected
  if (!isExpanded && selectedTemplate) {
    return (
      <div className="bg-white rounded-lg border border-border p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-8 rounded bg-gradient-to-br ${
                selectedTemplate === "professional"
                  ? "from-blue-100 to-blue-200"
                  : selectedTemplate === "creative"
                  ? "from-purple-100 to-pink-200"
                  : selectedTemplate === "executive"
                  ? "from-gray-100 to-gray-200"
                  : selectedTemplate === "minimal"
                  ? "from-green-100 to-green-200"
                  : selectedTemplate === "tech"
                  ? "from-cyan-100 to-cyan-200"
                  : selectedTemplate === "classic"
                  ? "from-amber-100 to-amber-200"
                  : "from-indigo-100 to-indigo-200"
              } flex items-center justify-center`}
            >
              <Check className="w-3 h-3 text-gray-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                {selectedConfig.name} Template
              </h4>
              <p className="text-sm text-gray-600">
                {selectedConfig.description}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            Change
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  }

  // Expanded view for template selection
  return (
    <div className="bg-white rounded-lg border border-border p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Choose Template</h3>
        {selectedTemplate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
            className="text-gray-600 hover:text-gray-700"
          >
            <ChevronUp className="w-4 h-4 mr-1" />
            Collapse
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(templateConfigs).map(([key, config]) => (
          <Card
            key={key}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
              selectedTemplate === key
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onTemplateChange(key as TemplateType)}
          >
            <div className="p-3 text-center">
              <div
                className={`w-full h-24 rounded-md mb-2 bg-gradient-to-br ${
                  key === "professional"
                    ? "from-blue-100 to-blue-200"
                    : key === "creative"
                    ? "from-purple-100 to-pink-200"
                    : key === "executive"
                    ? "from-gray-100 to-gray-200"
                    : key === "minimal"
                    ? "from-green-100 to-green-200"
                    : key === "tech"
                    ? "from-cyan-100 to-cyan-200"
                    : key === "classic"
                    ? "from-amber-100 to-amber-200"
                    : "from-indigo-100 to-indigo-200"
                } flex items-center justify-center`}
              >
                <div className="text-xs text-gray-600 font-mono">
                  {config.name}
                </div>
              </div>
              <h4 className="font-medium text-sm text-gray-900 mb-1">
                {config.name}
              </h4>
              <p className="text-xs text-gray-600 leading-tight">
                {config.description}
              </p>
              {selectedTemplate === key && (
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                    Selected
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
