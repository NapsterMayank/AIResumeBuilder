import { useState } from "react";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { Education } from "../types/resume";

interface EducationStepProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
}

export default function EducationStep({ data, onUpdate }: EducationStepProps) {
  const [expandedId, setExpandedId] = useState<string | null>(data[0]?.id || null);

  const addEducation = () => {
    const newEducation: Education = { id: Date.now().toString(), degree: "", institution: "", graduationDate: "", gpa: "", relevantCourses: [], };
    onUpdate([...data, newEducation]);
    setExpandedId(newEducation.id);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onUpdate(data.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu)));
  };

  const removeEducation = (id: string) => {
    onUpdate(data.filter((edu) => edu.id !== id));
    if (expandedId === id) setExpandedId(data.find((edu) => edu.id !== id)?.id || null);
  };

  const updateCourses = (id: string, courses: string) => {
    const courseArray = courses.split(",").map((c) => c.trim()).filter((c) => c);
    updateEducation(id, { relevantCourses: courseArray });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Education</h2>
        <p className="text-gray-600">Add your educational background and relevant coursework.</p>
      </div>

      <div className="space-y-4">
        {data.map((education) => (
          <div key={education.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setExpandedId(expandedId === education.id ? null : education.id)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{education.degree || "New Degree"}</h3>
                    <p className="text-sm text-gray-500">{education.institution}</p>
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeEducation(education.id); }} className="text-red-500 hover:text-red-700 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {expandedId === education.id && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
                    <input type="text" value={education.degree} onChange={(e) => updateEducation(education.id, { degree: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Bachelor of Science in Computer Science" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Institution *</label>
                    <input type="text" value={education.institution} onChange={(e) => updateEducation(education.id, { institution: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="University of California, Berkeley" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Date *</label>
                    <input type="month" value={education.graduationDate} onChange={(e) => updateEducation(education.id, { graduationDate: e.target.value })} min="2000-01" max="2030-12" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
                    <input type="text" value={education.gpa || ""} onChange={(e) => updateEducation(education.id, { gpa: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="3.8/4.0" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relevant Coursework (Optional)</label>
                  <textarea value={education.relevantCourses?.join(", ") || ""} onChange={(e) => updateCourses(education.id, e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="Data Structures, Algorithms, Database Systems, Software Engineering" />
                  <div className="text-sm text-gray-500 mt-1">Separate courses with commas</div>
                </div>
              </div>
            )}
          </div>
        ))}

        <button onClick={addEducation} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add Education</span>
        </button>
      </div>
    </div>
  );
}


