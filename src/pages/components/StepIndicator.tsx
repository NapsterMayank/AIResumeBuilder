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
  const currentIndex = steps.findIndex(step => step.key === currentStep);
  const progressPercent = Math.max(0, Math.min(100, Math.round((currentIndex / (steps.length - 1)) * 100)));

  return (
    <div className="mb-8 px-1">
      {/* Track */}
      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded-full shadow-glow"
          style={{ width: `${progressPercent}%`, backgroundImage: 'var(--gradient-primary)' }}
        />

        {/* Steps */}
        <div className="grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          {steps.map((step, index) => {
            const isCompleted = completedSteps.has(step.key) || index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={step.key} className="flex flex-col items-center">
                <div className="relative z-10">
                  <div
                    className={`
                      flex items-center justify-center rounded-full text-[11px] sm:text-xs font-semibold border
                      w-7 h-7 sm:w-9 sm:h-9 
                      ${isCompleted ? 'bg-green-500 text-white border-green-500' : isCurrent ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-300'}
                    `}
                    style={isCurrent ? { backgroundImage: 'var(--gradient-primary)' } : undefined}
                    title={step.label}
                    aria-label={step.label}
                  >
                    {isCompleted ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : index + 1}
                  </div>
                </div>
                <div className={`hidden sm:block mt-2 text-[11px] sm:text-sm font-medium text-center ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-gray-700' : 'text-gray-500'}`}>
                  {step.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile current step label */}
      <div className="sm:hidden mt-3 text-xs text-center text-gray-600">
        {steps[currentIndex]?.label} • {currentIndex + 1} of {steps.length}
      </div>
    </div>
  );
}


