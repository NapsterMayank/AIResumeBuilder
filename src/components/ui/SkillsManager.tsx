// Skills management component
import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SkillsManagerProps {
  technicalSkills: string[];
  softSkills: string[];
  onTechnicalSkillsChange: (skills: string[]) => void;
  onSoftSkillsChange: (skills: string[]) => void;
}

const SkillsManager = ({ 
  technicalSkills, 
  softSkills, 
  onTechnicalSkillsChange, 
  onSoftSkillsChange 
}: SkillsManagerProps) => {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState("");
  const [newSoftSkill, setNewSoftSkill] = useState("");

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim() && !technicalSkills.includes(newTechnicalSkill.trim())) {
      onTechnicalSkillsChange([...technicalSkills, newTechnicalSkill.trim()]);
      setNewTechnicalSkill("");
    }
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim() && !softSkills.includes(newSoftSkill.trim())) {
      onSoftSkillsChange([...softSkills, newSoftSkill.trim()]);
      setNewSoftSkill("");
    }
  };

  const removeTechnicalSkill = (skillToRemove: string) => {
    onTechnicalSkillsChange(technicalSkills.filter(skill => skill !== skillToRemove));
  };

  const removeSoftSkill = (skillToRemove: string) => {
    onSoftSkillsChange(softSkills.filter(skill => skill !== skillToRemove));
  };

  const handleTechnicalKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnicalSkill();
    }
  };

  const handleSoftKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSoftSkill();
    }
  };

  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">
          Technical Skills ({technicalSkills.length})
        </h4>
        
        <div className="flex gap-2">
          <Input
            placeholder="Add technical skill (e.g., React, Python)"
            value={newTechnicalSkill}
            onChange={(e) => setNewTechnicalSkill(e.target.value)}
            onKeyPress={handleTechnicalKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={addTechnicalSkill}
            size="sm"
            disabled={!newTechnicalSkill.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {technicalSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technicalSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="flex items-center gap-1 px-2 py-1"
              >
                {skill}
                <button
                  onClick={() => removeTechnicalSkill(skill)}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Soft Skills */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">
          Soft Skills ({softSkills.length})
        </h4>
        
        <div className="flex gap-2">
          <Input
            placeholder="Add soft skill (e.g., Leadership, Communication)"
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            onKeyPress={handleSoftKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={addSoftSkill}
            size="sm"
            disabled={!newSoftSkill.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {softSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className="flex items-center gap-1 px-2 py-1"
              >
                {skill}
                <button
                  onClick={() => removeSoftSkill(skill)}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsManager;