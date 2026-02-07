import { motion } from 'framer-motion';
import { Palette, Layout, Smartphone, Zap, Globe, Shield } from 'lucide-react';

const features = [
  {
    icon: Layout,
    title: 'Drag & Drop Builder',
    description: 'Intuitive visual editor with snap-to-grid layouts. No coding required.',
  },
  {
    icon: Palette,
    title: 'Custom Themes',
    description: 'Full control over colors, fonts, and styling. Make it truly yours.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Responsive designs that look perfect on every device.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for speed with fast loading times and great SEO.',
  },
  {
    icon: Globe,
    title: 'One-Click Publish',
    description: 'Instantly publish your pages with custom URLs and meta tags.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'SSL certificates included. Your pages are always available.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features that make building landing pages a breeze
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-card rounded-xl p-6 border border-border h-full transition-shadow hover:shadow-lg">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
