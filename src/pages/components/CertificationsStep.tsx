import { useState } from 'react';
import { Plus, Trash2, Award } from 'lucide-react';
import { Certification } from '../types/resume';

interface CertificationsStepProps {
  data: Certification[];
  onUpdate: (data: Certification[]) => void;
}

export default function CertificationsStep({ data, onUpdate }: CertificationsStepProps) {
  const [expandedId, setExpandedId] = useState<string | null>(data[0]?.id || null);

  const addCertification = () => {
    const newCertification: Certification = { id: Date.now().toString(), name: '', issuer: '', date: '', link: '', };
    onUpdate([...data, newCertification]);
    setExpandedId(newCertification.id);
  };

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    onUpdate(data.map(cert => cert.id === id ? { ...cert, ...updates } : cert));
  };

  const removeCertification = (id: string) => {
    onUpdate(data.filter(cert => cert.id !== id));
    if (expandedId === id) setExpandedId(data.find(cert => cert.id !== id)?.id || null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Certifications</h2>
        <p className="text-gray-600">Add your professional certifications to strengthen your credentials.</p>
      </div>

      <div className="space-y-4">
        {data.map((certification) => (
          <div key={certification.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setExpandedId(expandedId === certification.id ? null : certification.id)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{certification.name || 'New Certification'}</h3>
                    <p className="text-sm text-gray-500">{certification.issuer}</p>
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeCertification(certification.id); }} className="text-red-500 hover:text-red-700 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {expandedId === certification.id && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certification Name *</label>
                    <input type="text" value={certification.name} onChange={(e) => updateCertification(certification.id, { name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="AWS Certified Solutions Architect" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Organization *</label>
                    <input type="text" value={certification.issuer} onChange={(e) => updateCertification(certification.id, { issuer: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Amazon Web Services" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date *</label>
                    <input type="month" value={certification.date} onChange={(e) => updateCertification(certification.id, { date: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Verification Link (Optional)</label>
                    <input type="url" value={certification.link || ''} onChange={(e) => updateCertification(certification.id, { link: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://credly.com/badges/..." />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <button onClick={addCertification} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add Certification</span>
        </button>
      </div>

      {data.length === 0 && (
        <div className="text-center py-8">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No certifications added yet.</p>
          <p className="text-sm text-gray-400 mt-1">Skip this step if you don't have any certifications to add.</p>
        </div>
      )}
    </div>
  );
}


