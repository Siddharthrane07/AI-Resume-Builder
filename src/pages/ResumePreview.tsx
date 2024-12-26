// src/pages/ResumePreview.tsx
import { useEffect, useState } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { jsPDF } from 'jspdf';
import { marked } from 'marked';

const ResumePreview: React.FC = () => {
  const { selectedTemplate, currentResume } = useResumeStore();
  const [templateContent, setTemplateContent] = useState<string>('');
  const [markdown, setMarkdown] = useState<string>('# My Resume\n\nThis is my resume in **Markdown**.');
  const [css, setCss] = useState<string>('body { font-family: Arial, sans-serif; } h1 { color: #333; } p { font-size: 16px; }');

  useEffect(() => {
    if (selectedTemplate) {
      import(`../${selectedTemplate}`).then((module) => {
        setTemplateContent(module.default);
      });
    }
  }, [selectedTemplate]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.html(document.getElementById('preview') as HTMLElement, {
      callback: (doc) => {
        doc.save('resume.pdf');
      },
      x: 10,
      y: 10,
    });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Markdown Resume Builder</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
          >
            Export PDF
          </button>
          <button
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
          >
            Export Markdown
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Markdown & CSS Editors */}
        <div className="w-1/2 overflow-hidden border-r border-gray-300">
          <textarea
            className="flex-1 w-full p-4 resize-none border-none outline-none"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write your resume here..."
          />
          <textarea
            className="flex-1 w-full p-4 resize-none border-none outline-none"
            value={css}
            onChange={(e) => setCss(e.target.value)}
            placeholder="Write your custom CSS here..."
          />
        </div>

        {/* Preview Section */}
        <div className="flex-1 p-4">
          <div id="preview" className="prose prose-indigo max-w-full">
            <div dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
          </div>
          <style>{css}</style>
          <div>{templateContent}</div>
        </div>
      </div>

      {/* Styling Options */}
      <div className="p-4 bg-gray-100 border-t border-gray-300">
        {/* Add options for theme color, font family, etc. */}
      </div>
    </div>
  );
};

export default ResumePreview;