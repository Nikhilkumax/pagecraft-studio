import { useState } from 'react';
import { motion } from 'framer-motion';
import { useEditor } from '@/context/EditorContext';
import { EditorHeader } from '@/components/editor/EditorHeader';
import { EditorSidebar } from '@/components/editor/EditorSidebar';
import { EditorCanvas } from '@/components/editor/EditorCanvas';
import { Navigate } from 'react-router-dom';

export default function Editor() {
  const { state } = useEditor();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Redirect to home if no page is loaded
  if (!state.currentPage) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <EditorHeader />
      <div className="flex-1 flex overflow-hidden">
        <EditorSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        <EditorCanvas />
      </div>
    </div>
  );
}
