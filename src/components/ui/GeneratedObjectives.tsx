// Generated objectives display component
import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface GeneratedObjectivesProps {
  objectives: string[];
  onSelect: (objective: string) => void;
  onRegenerate: () => void;
  isGenerating: boolean;
}

const GeneratedObjectives = ({ 
  objectives, 
  onSelect, 
  onRegenerate, 
  isGenerating 
}: GeneratedObjectivesProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">
          Generated Objectives
        </h4>
        <Button
          variant="outline"
          size="sm"
          onClick={onRegenerate}
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
          Regenerate
        </Button>
      </div>

      <div className="space-y-3">
        {objectives.map((objective, index) => (
          <Card 
            key={index} 
            className="cursor-pointer transition-all hover:shadow-md hover:border-blue-300"
            onClick={() => onSelect(objective)}
          >
            <CardContent className="p-4">
              <p className="text-sm leading-relaxed mb-3">{objective}</p>
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(objective);
                  }}
                  className="text-xs"
                >
                  Use This Objective
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(objective, index);
                  }}
                  className="text-xs flex items-center gap-1"
                >
                  {copiedIndex === index ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copiedIndex === index ? "Copied!" : "Copy"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GeneratedObjectives;