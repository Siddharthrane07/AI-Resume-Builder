// src/pages/Templates.tsx
import { FC, useEffect, useState } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { useNavigate } from 'react-router-dom';

const Templates: FC = () => {
  const navigate = useNavigate();
  const { templates, selectedTemplate, setSelectedTemplate, fetchTemplates } = useResumeStore();
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  useEffect(() => {
    templates.forEach((template) => {
      import(`../${template}`).then((module) => {
        setPreviews((prev) => ({ ...prev, [template]: module.default }));
      });
    });
  }, [templates]);

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    navigate('/editor');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Choose a Template</h1>
        <p className="mt-1 text-sm text-gray-500">
          Select a template to get started with your resume
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <button
            key={template}
            onClick={() => handleTemplateSelect(template)}
            className={`p-4 rounded-lg border-2 ${
              selectedTemplate === template
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
          >
            <div className="aspect-[8.5/11] bg-white rounded shadow-sm mb-4">
              <div>{previews[template]}</div>
            </div>
            <h3 className="text-sm font-medium text-gray-900 capitalize">
              {template.split('/').pop()?.replace(/-/g, ' ').replace('.jsx', '')}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Templates;