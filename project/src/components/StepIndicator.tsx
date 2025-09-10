import { Check } from 'lucide-react';
import { ResumeStep } from '../types/resume';

interface StepIndicatorProps {
  currentStep: ResumeStep;
  completedSteps: Set<ResumeStep>;
}

const steps: { key: ResumeStep; label: string }[] = [
  { key: 'personal', label: 'Personal Info' },
  { key: 'objective', label: 'Objective' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'review', label: 'Review' },
];

export default function StepIndicator({ currentStep, completedSteps }: StepIndicatorProps) {
  const currentStepIndex = steps.findIndex(step => step.key === currentStep);

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.has(step.key);
        const isCurrent = step.key === currentStep;
        const isPast = index < currentStepIndex;

        return (
          <div key={step.key} className="flex items-center">
            <div className={`
              flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium
              ${isCompleted || isPast 
                ? 'bg-green-500 text-white' 
                : isCurrent 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-600'
              }
            `}>
              {isCompleted || isPast ? (
                <Check className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            <span className={`
              ml-2 text-sm font-medium
              ${isCurrent ? 'text-blue-600' : 'text-gray-500'}
            `}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`
                w-8 h-px mx-4
                ${isPast ? 'bg-green-500' : 'bg-gray-300'}
              `} />
            )}
          </div>
        );
      })}
    </div>
  );
}