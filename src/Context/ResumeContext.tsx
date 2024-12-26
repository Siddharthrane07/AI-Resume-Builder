// src/Context/ResumeContext.tsx
import React, { createContext, useState, useContext } from 'react';

// Define the shape of the context data
interface ResumeContextData {
  showComponent: boolean;
  setShowComponent: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  handlePrint: () => void;
}

// Create the context with default values
const ResumeContext = createContext<ResumeContextData | undefined>(undefined);

// Create a provider component
export const ResumeProvider: React.FC = ({ children }) => {
  const [showComponent, setShowComponent] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePrint = () => {
    // Printing logic here
    console.log('Printing resume...');
  };

  return (
    <ResumeContext.Provider value={{ showComponent, setShowComponent, loading, setLoading, handlePrint }}>
      {children}
    </ResumeContext.Provider>
  );
};

// Create a custom hook to use the ResumeContext
export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};

export default ResumeContext;