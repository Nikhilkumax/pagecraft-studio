import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { TemplateGallery } from '@/components/TemplateGallery';
import { FeaturesSection } from '@/components/FeaturesSection';
import { Footer } from '@/components/Footer';
import { Template } from '@/types/editor';
import { useEditor } from '@/context/EditorContext';

const Index = () => {
  const navigate = useNavigate();
  const { createPage } = useEditor();

  const handleSelectTemplate = (template: Template) => {
    createPage(template.name, template.sections, template.theme);
    navigate('/editor');
  };

  const handleGetStarted = () => {
    const gallerySection = document.getElementById('templates');
    gallerySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection onGetStarted={handleGetStarted} />
      <div id="templates">
        <TemplateGallery onSelectTemplate={handleSelectTemplate} />
      </div>
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
