import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { LandingPage, PageSection, PageElement, PageTheme, DeviceView, defaultTheme } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

interface EditorState {
  pages: LandingPage[];
  currentPage: LandingPage | null;
  selectedSectionId: string | null;
  selectedElementId: string | null;
  deviceView: DeviceView;
  isPreviewMode: boolean;
}

type EditorAction =
  | { type: 'CREATE_PAGE'; payload: { title: string; sections: PageSection[]; theme: PageTheme } }
  | { type: 'SET_CURRENT_PAGE'; payload: LandingPage }
  | { type: 'UPDATE_PAGE'; payload: Partial<LandingPage> }
  | { type: 'UPDATE_THEME'; payload: Partial<PageTheme> }
  | { type: 'SET_SELECTED_SECTION'; payload: string | null }
  | { type: 'SET_SELECTED_ELEMENT'; payload: string | null }
  | { type: 'SET_DEVICE_VIEW'; payload: DeviceView }
  | { type: 'TOGGLE_PREVIEW'; payload?: boolean }
  | { type: 'ADD_SECTION'; payload: PageSection }
  | { type: 'UPDATE_SECTION'; payload: { id: string; updates: Partial<PageSection> } }
  | { type: 'DELETE_SECTION'; payload: string }
  | { type: 'REORDER_SECTIONS'; payload: PageSection[] }
  | { type: 'DUPLICATE_SECTION'; payload: string }
  | { type: 'ADD_ELEMENT'; payload: { sectionId: string; element: PageElement } }
  | { type: 'UPDATE_ELEMENT'; payload: { sectionId: string; elementId: string; updates: Partial<PageElement> } }
  | { type: 'DELETE_ELEMENT'; payload: { sectionId: string; elementId: string } };

const initialState: EditorState = {
  pages: [],
  currentPage: null,
  selectedSectionId: null,
  selectedElementId: null,
  deviceView: 'desktop',
  isPreviewMode: false,
};

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'CREATE_PAGE': {
      const newPage: LandingPage = {
        id: uuidv4(),
        title: action.payload.title,
        slug: action.payload.title.toLowerCase().replace(/\s+/g, '-'),
        description: '',
        sections: action.payload.sections,
        theme: action.payload.theme,
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        ...state,
        pages: [...state.pages, newPage],
        currentPage: newPage,
      };
    }

    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };

    case 'UPDATE_PAGE':
      if (!state.currentPage) return state;
      return {
        ...state,
        currentPage: { ...state.currentPage, ...action.payload, updatedAt: new Date() },
      };

    case 'UPDATE_THEME':
      if (!state.currentPage) return state;
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          theme: { ...state.currentPage.theme, ...action.payload },
          updatedAt: new Date(),
        },
      };

    case 'SET_SELECTED_SECTION':
      return { ...state, selectedSectionId: action.payload, selectedElementId: null };

    case 'SET_SELECTED_ELEMENT':
      return { ...state, selectedElementId: action.payload };

    case 'SET_DEVICE_VIEW':
      return { ...state, deviceView: action.payload };

    case 'TOGGLE_PREVIEW':
      return { 
        ...state, 
        isPreviewMode: action.payload !== undefined ? action.payload : !state.isPreviewMode 
      };

    case 'ADD_SECTION':
      if (!state.currentPage) return state;
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          sections: [...state.currentPage.sections, action.payload],
          updatedAt: new Date(),
        },
      };

    case 'UPDATE_SECTION':
      if (!state.currentPage) return state;
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          sections: state.currentPage.sections.map((section) =>
            section.id === action.payload.id
              ? { ...section, ...action.payload.updates }
              : section
          ),
          updatedAt: new Date(),
        },
      };

    case 'DELETE_SECTION':
      if (!state.currentPage) return state;
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          sections: state.currentPage.sections.filter((s) => s.id !== action.payload),
          updatedAt: new Date(),
        },
        selectedSectionId: state.selectedSectionId === action.payload ? null : state.selectedSectionId,
      };

    case 'REORDER_SECTIONS':
      if (!state.currentPage) return state;
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          sections: action.payload,
          updatedAt: new Date(),
        },
      };

    case 'DUPLICATE_SECTION':
      if (!state.currentPage) return state;
      const sectionToDuplicate = state.currentPage.sections.find((s) => s.id === action.payload);
      if (!sectionToDuplicate) return state;
      const duplicatedSection: PageSection = {
        ...sectionToDuplicate,
        id: uuidv4(),
        title: `${sectionToDuplicate.title} (Copy)`,
        elements: sectionToDuplicate.elements.map((el) => ({ ...el, id: uuidv4() })),
      };
      const sectionIndex = state.currentPage.sections.findIndex((s) => s.id === action.payload);
      const newSections = [...state.currentPage.sections];
      newSections.splice(sectionIndex + 1, 0, duplicatedSection);
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          sections: newSections,
          updatedAt: new Date(),
        },
      };

    case 'ADD_ELEMENT':
      if (!state.currentPage) return state;
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          sections: state.currentPage.sections.map((section) =>
            section.id === action.payload.sectionId
              ? { ...section, elements: [...section.elements, action.payload.element] }
              : section
          ),
          updatedAt: new Date(),
        },
      };

    case 'UPDATE_ELEMENT':
      if (!state.currentPage) return state;
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          sections: state.currentPage.sections.map((section) =>
            section.id === action.payload.sectionId
              ? {
                  ...section,
                  elements: section.elements.map((el) =>
                    el.id === action.payload.elementId
                      ? { ...el, ...action.payload.updates, content: { ...el.content, ...action.payload.updates.content } }
                      : el
                  ),
                }
              : section
          ),
          updatedAt: new Date(),
        },
      };

    case 'DELETE_ELEMENT':
      if (!state.currentPage) return state;
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          sections: state.currentPage.sections.map((section) =>
            section.id === action.payload.sectionId
              ? { ...section, elements: section.elements.filter((el) => el.id !== action.payload.elementId) }
              : section
          ),
          updatedAt: new Date(),
        },
        selectedElementId: state.selectedElementId === action.payload.elementId ? null : state.selectedElementId,
      };

    default:
      return state;
  }
}

interface EditorContextType {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
  createPage: (title: string, sections: PageSection[], theme: PageTheme) => void;
  updateTheme: (theme: Partial<PageTheme>) => void;
  selectSection: (id: string | null) => void;
  selectElement: (id: string | null) => void;
  addSection: (section: PageSection) => void;
  updateSection: (id: string, updates: Partial<PageSection>) => void;
  deleteSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  reorderSections: (sections: PageSection[]) => void;
  addElement: (sectionId: string, element: PageElement) => void;
  updateElement: (sectionId: string, elementId: string, updates: Partial<PageElement>) => void;
  deleteElement: (sectionId: string, elementId: string) => void;
  setDeviceView: (view: DeviceView) => void;
  togglePreview: (value?: boolean) => void;
  getSelectedSection: () => PageSection | null;
  getSelectedElement: () => PageElement | null;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  const createPage = (title: string, sections: PageSection[], theme: PageTheme) => {
    dispatch({ type: 'CREATE_PAGE', payload: { title, sections, theme } });
  };

  const updateTheme = (theme: Partial<PageTheme>) => {
    dispatch({ type: 'UPDATE_THEME', payload: theme });
  };

  const selectSection = (id: string | null) => {
    dispatch({ type: 'SET_SELECTED_SECTION', payload: id });
  };

  const selectElement = (id: string | null) => {
    dispatch({ type: 'SET_SELECTED_ELEMENT', payload: id });
  };

  const addSection = (section: PageSection) => {
    dispatch({ type: 'ADD_SECTION', payload: section });
  };

  const updateSection = (id: string, updates: Partial<PageSection>) => {
    dispatch({ type: 'UPDATE_SECTION', payload: { id, updates } });
  };

  const deleteSection = (id: string) => {
    dispatch({ type: 'DELETE_SECTION', payload: id });
  };

  const duplicateSection = (id: string) => {
    dispatch({ type: 'DUPLICATE_SECTION', payload: id });
  };

  const reorderSections = (sections: PageSection[]) => {
    dispatch({ type: 'REORDER_SECTIONS', payload: sections });
  };

  const addElement = (sectionId: string, element: PageElement) => {
    dispatch({ type: 'ADD_ELEMENT', payload: { sectionId, element } });
  };

  const updateElement = (sectionId: string, elementId: string, updates: Partial<PageElement>) => {
    dispatch({ type: 'UPDATE_ELEMENT', payload: { sectionId, elementId, updates } });
  };

  const deleteElement = (sectionId: string, elementId: string) => {
    dispatch({ type: 'DELETE_ELEMENT', payload: { sectionId, elementId } });
  };

  const setDeviceView = (view: DeviceView) => {
    dispatch({ type: 'SET_DEVICE_VIEW', payload: view });
  };

  const togglePreview = (value?: boolean) => {
    dispatch({ type: 'TOGGLE_PREVIEW', payload: value });
  };

  const getSelectedSection = (): PageSection | null => {
    if (!state.currentPage || !state.selectedSectionId) return null;
    return state.currentPage.sections.find((s) => s.id === state.selectedSectionId) || null;
  };

  const getSelectedElement = (): PageElement | null => {
    const section = getSelectedSection();
    if (!section || !state.selectedElementId) return null;
    return section.elements.find((e) => e.id === state.selectedElementId) || null;
  };

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
        createPage,
        updateTheme,
        selectSection,
        selectElement,
        addSection,
        updateSection,
        deleteSection,
        duplicateSection,
        reorderSections,
        addElement,
        updateElement,
        deleteElement,
        setDeviceView,
        togglePreview,
        getSelectedSection,
        getSelectedElement,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}
