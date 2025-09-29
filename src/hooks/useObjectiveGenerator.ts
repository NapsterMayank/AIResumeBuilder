// Custom hook for objective generation logic
import { useState, useCallback } from 'react';
import { resumeService } from '@/services';
import { RegenerateRequest } from '@/models';

interface UseObjectiveGeneratorProps {
  currentObjective: string;
  technicalSkills: string[];
  softSkills: string[];
  experienceLevel: string;
}

export const useObjectiveGenerator = ({
  currentObjective,
  technicalSkills,
  softSkills,
  experienceLevel
}: UseObjectiveGeneratorProps) => {
  const [generatedObjectives, setGeneratedObjectives] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGeneratedOptions, setShowGeneratedOptions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateObjective = useCallback(async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setError(null);

    try {
      const allSkills = [...technicalSkills, ...softSkills];
      
      const requestData: RegenerateRequest = {
        text: currentObjective || "Generate a professional objective for me",
        type: 'objective',
        context: {
          skills: allSkills,
          jobTitle: experienceLevel
        }
      };

      const rewrittenText = await resumeService.regenerateContent(requestData);
      
      setGeneratedObjectives([rewrittenText]);
      setShowGeneratedOptions(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      
      // Show error message to user
      const errorObjective = `API Error: ${errorMessage}. Please check your backend server and try again.`;
      setGeneratedObjectives([errorObjective]);
      setShowGeneratedOptions(true);
    } finally {
      setIsGenerating(false);
    }
  }, [currentObjective, technicalSkills, softSkills, experienceLevel, isGenerating]);

  const selectObjective = useCallback((objective: string) => {
    setShowGeneratedOptions(false);
    setError(null);
    return objective;
  }, []);

  const regenerateObjectives = useCallback(() => {
    generateObjective();
  }, [generateObjective]);

  const hideGeneratedOptions = useCallback(() => {
    setShowGeneratedOptions(false);
    setError(null);
  }, []);

  return {
    generatedObjectives,
    isGenerating,
    showGeneratedOptions,
    error,
    generateObjective,
    selectObjective,
    regenerateObjectives,
    hideGeneratedOptions
  };
};