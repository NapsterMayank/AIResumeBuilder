import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface SkillsStepProps {
  data: {
    technical: string[];
    soft: string[];
  };
  onUpdate: (data: { technical: string[]; soft: string[] }) => void;
}

const popularTechnicalSkills = [
  'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++', 'SQL',
  'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Git', 'REST APIs',
  'GraphQL', 'Express.js', 'Spring Boot', 'Django', 'Flask', 'Angular', 'Vue.js',
  'Redux', 'Jest', 'Cypress', 'Jenkins', 'CI/CD', 'Linux', 'Microservices'
];

const popularSoftSkills = [
  'Team Leadership', 'Project Management', 'Communication', 'Problem Solving',
  'Critical Thinking', 'Collaboration', 'Adaptability', 'Time Management',
  'Mentoring', 'Agile Methodologies', 'Scrum', 'Cross-functional Collaboration',
  'Technical Writing', 'Code Review', 'Debugging', 'System Design'
];

export default function SkillsStep({ data, onUpdate }: SkillsStepProps) {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [showTechnicalSuggestions, setShowTechnicalSuggestions] = useState(false);
  const [showSoftSuggestions, setShowSoftSuggestions] = useState(false);

  const addTechnicalSkill = (skill: string) => {
    if (skill.trim() && !data.technical.includes(skill.trim())) {
      onUpdate({
        ...data,
        technical: [...data.technical, skill.trim()]
      });
    }
    setNewTechnicalSkill('');
  };

  const addSoftSkill = (skill: string) => {
    if (skill.trim() && !data.soft.includes(skill.trim())) {
      onUpdate({
        ...data,
        soft: [...data.soft, skill.trim()]
      });
    }
    setNewSoftSkill('');
  };

  const removeTechnicalSkill = (skill: string) => {
    onUpdate({
      ...data,
      technical: data.technical.filter(s => s !== skill)
    });
  };

  const removeSoftSkill = (skill: string) => {
    onUpdate({
      ...data,
      soft: data.soft.filter(s => s !== skill)
    });
  };

  const addSuggestedSkill = (skill: string, type: 'technical' | 'soft') => {
    if (type === 'technical') {
      addTechnicalSkill(skill);
    } else {
      addSoftSkill(skill);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
        <p className="text-gray-600">
          Add your technical and soft skills to showcase your capabilities.
        </p>
      </div>

      {/* Technical Skills */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Skills</h3>
          
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {data.technical.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {skill}
                  <button
                    onClick={() => removeTechnicalSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={newTechnicalSkill}
                onChange={(e) => setNewTechnicalSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTechnicalSkill(newTechnicalSkill)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a technical skill"
              />
              <button
                onClick={() => addTechnicalSkill(newTechnicalSkill)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div>
              <button
                onClick={() => setShowTechnicalSuggestions(!showTechnicalSuggestions)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {showTechnicalSuggestions ? 'Hide' : 'Show'} Popular Skills
              </button>
              
              {showTechnicalSuggestions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {popularTechnicalSkills
                    .filter(skill => !data.technical.includes(skill))
                    .map((skill) => (
                      <button
                        key={skill}
                        onClick={() => addSuggestedSkill(skill, 'technical')}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                      >
                        + {skill}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Soft Skills */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Soft Skills</h3>
          
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {data.soft.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                >
                  {skill}
                  <button
                    onClick={() => removeSoftSkill(skill)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={newSoftSkill}
                onChange={(e) => setNewSoftSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSoftSkill(newSoftSkill)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a soft skill"
              />
              <button
                onClick={() => addSoftSkill(newSoftSkill)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div>
              <button
                onClick={() => setShowSoftSuggestions(!showSoftSuggestions)}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                {showSoftSuggestions ? 'Hide' : 'Show'} Popular Skills
              </button>
              
              {showSoftSuggestions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {popularSoftSkills
                    .filter(skill => !data.soft.includes(skill))
                    .map((skill) => (
                      <button
                        key={skill}
                        onClick={() => addSuggestedSkill(skill, 'soft')}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                      >
                        + {skill}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">ATS Tip</h4>
        <p className="text-yellow-800 text-sm">
          Include 10-15 technical skills and 5-8 soft skills. Match skills mentioned in job descriptions you're targeting for better ATS compatibility.
        </p>
      </div>
    </div>
  );
}