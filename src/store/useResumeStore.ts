// src/store/useResumeStore.ts
import create from 'zustand';

interface ResumeStore {
  templates: string[];
  selectedTemplate: string;
  currentResume: any;
  setSelectedTemplate: (template: string) => void;
  setCurrentResume: (resume: any) => void;
  fetchTemplates: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  templates: [],
  selectedTemplate: '',
  currentResume: null,
  setSelectedTemplate: (template: string) => set({ selectedTemplate: template }),
  setCurrentResume: (resume: any) => set({ currentResume: resume }),
  fetchTemplates: async () => {
    const templatePaths = [
      'Themes/Theme1/Theme1.jsx',
      'Themes/Theme2/Theme2.jsx',
      'Themes/Theme3/Theme3.jsx',
      'Themes/Theme4/Theme4.jsx'
    ];
    set({ templates: templatePaths });
  },
}));