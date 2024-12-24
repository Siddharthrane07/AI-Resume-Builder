import { FC } from 'react';
import { FormField } from '../ui/FormField';
import { Project } from '../../types/resume';

interface ProjectsFormProps {
  initialData?: Project[];
  onSubmit: (data: { projects: Project[] }) => void;
}

const ProjectsForm: FC<ProjectsFormProps> = ({ initialData = [], onSubmit }) => {
  const handleSubmit = () => {
    // Mock data for now
    const projects = [
      { id: '1', name: 'Project 1', description: 'Description 1' },
      { id: '2', name: 'Project 2', description: 'Description 2' },
    ];
    onSubmit({ projects });
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900">Projects</h2>
      <FormField label="Project Name" error="">
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </FormField>
      <FormField label="Project Description" error="">
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        ></textarea>
      </FormField>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
};

export default ProjectsForm;