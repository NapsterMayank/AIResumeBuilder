// Refactored ObjectiveStep component following FE_GUIDELINES
import { useState, useEffect } from "react";
import { Lightbulb, Wand2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import KeywordsSuggestion from "@/components/ui/KeywordsSuggestion";
import GeneratedObjectives from "@/components/ui/GeneratedObjectives";
import SkillsManager from "@/components/ui/SkillsManager";
import { useObjectiveGenerator } from "@/hooks/useObjectiveGenerator";
import { KEYWORD_SUGGESTIONS } from "@/utils/constants";

interface ObjectiveStepProps {
  data: string;
  onUpdate: (data: string) => void;
}

const ObjectiveStep = ({ data, onUpdate }: ObjectiveStepProps) => {
  // Component state
  const [experienceLevel, setExperienceLevel] = useState("mid-level");
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
  const [softSkills, setSoftSkills] = useState<string[]>([]);

  // Custom hook for objective generation
  const {
    generatedObjectives,
    isGenerating,
    showGeneratedOptions,
    error,
    generateObjective,
    selectObjective,
    regenerateObjectives,
    hideGeneratedOptions
  } = useObjectiveGenerator({
    currentObjective: data,
    technicalSkills,
    softSkills,
    experienceLevel
  });

  // Load saved skills from localStorage on mount
  useEffect(() => {
    const savedSkills = localStorage.getItem("resumeSkills");
    if (savedSkills) {
      try {
        const parsedSkills = JSON.parse(savedSkills);
        setTechnicalSkills(parsedSkills.technical || []);
        setSoftSkills(parsedSkills.soft || []);
      } catch (error) {
        console.error("Failed to parse saved skills:", error);
      }
    }
  }, []);

  // Save skills to localStorage when they change
  useEffect(() => {
    const skillsData = {
      technical: technicalSkills,
      soft: softSkills
    };
    localStorage.setItem("resumeSkills", JSON.stringify(skillsData));
  }, [technicalSkills, softSkills]);

  const handleObjectiveSelect = (objective: string) => {
    const selected = selectObjective(objective);
    onUpdate(selected);
  };

  const addKeyword = (keyword: string) => {
    // Determine if it's a technical or soft skill based on keyword type
    const isTechnicalSkill = KEYWORD_SUGGESTIONS.technical.includes(keyword);
    
    if (isTechnicalSkill) {
      if (!technicalSkills.includes(keyword)) {
        setTechnicalSkills([...technicalSkills, keyword]);
      }
    } else {
      if (!softSkills.includes(keyword)) {
        setSoftSkills([...softSkills, keyword]);
      }
    }
  };

  const totalSkills = technicalSkills.length + softSkills.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Professional Objective
          </CardTitle>
          <p className="text-sm text-gray-600">
            Craft a compelling professional objective that highlights your goals and value proposition.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Objective Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Your Professional Objective
            </label>
            <Textarea
              placeholder="Write a brief professional objective that summarizes your career goals and what you bring to potential employers..."
              value={data}
              onChange={(e) => onUpdate(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>

          {/* Experience Level Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Experience Level
            </label>
            <Select value={experienceLevel} onValueChange={setExperienceLevel}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry-level">Entry Level (0-2 years)</SelectItem>
                <SelectItem value="mid-level">Mid Level (3-5 years)</SelectItem>
                <SelectItem value="senior-level">Senior Level (6-10 years)</SelectItem>
                <SelectItem value="executive">Executive (10+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Skills Management */}
          <SkillsManager
            technicalSkills={technicalSkills}
            softSkills={softSkills}
            onTechnicalSkillsChange={setTechnicalSkills}
            onSoftSkillsChange={setSoftSkills}
          />

          {/* Keywords Suggestions */}
          <KeywordsSuggestion
            suggestions={KEYWORD_SUGGESTIONS.all}
            onAddKeyword={addKeyword}
            selectedKeywords={[...technicalSkills, ...softSkills]}
          />

          {/* AI Generation Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={generateObjective}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Wand2 className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? "Generating..." : "Generate AI Objective"}
            </Button>
          </div>

          {/* Status Information */}
          <div className="text-center text-sm text-gray-600">
            {totalSkills > 0 && (
              <p>Using {totalSkills} skills for personalization</p>
            )}
            {error && (
              <p className="text-red-600 mt-2">Error: {error}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generated Objectives Modal/Panel */}
      {showGeneratedOptions && (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">AI Generated Objectives</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={hideGeneratedOptions}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <GeneratedObjectives
              objectives={generatedObjectives}
              onSelect={handleObjectiveSelect}
              onRegenerate={regenerateObjectives}
              isGenerating={isGenerating}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ObjectiveStep;