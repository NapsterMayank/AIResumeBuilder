import { templates } from "../config/templates";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Template</h3>
      <div className="grid grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id
                ? "border-blue-500 shadow-md"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="aspect-[3/4] bg-gray-100">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-200 flex items-center justify-center">
              {selectedTemplate === template.id && (
                <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                  Selected
                </div>
              )}
            </div>
            <div className="p-2 bg-white">
              <h4 className="text-sm font-medium text-gray-900">{template.name}</h4>
              <p className="text-xs text-gray-600">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}