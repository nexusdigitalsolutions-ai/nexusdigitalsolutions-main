
import { Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  FileSearch,
  Volume2,
  MessageSquare,
  Activity,
  MessagesSquare,
  Mic,
  Hand,
  Fingerprint,
  Heart,
  Loader
} from 'lucide-react';

// Import feature images
import documentProcessingImg from '@/assets/feature-document-processing.jpg';
import textToSpeechImg from '@/assets/feature-text-to-speech.jpg';
import audioAnalysisImg from '@/assets/feature-audio-analysis.jpg';
import sentimentRadarImg from '@/assets/feature-sentiment-radar.jpg';
import conversationalFormsImg from '@/assets/feature-conversational-forms.jpg';
import voiceControlImg from '@/assets/feature-voice-control.jpg';
import signLanguageImg from '@/assets/feature-sign-language.jpg';
import biometricSecurityImg from '@/assets/feature-biometric-security.jpg';
import accessibilityImg from '@/assets/feature-accessibility.jpg';
import CapabilitiesTree from '../three/CapabilitiesTree';

interface FeatureCardProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: React.ReactNode;
  index: number;
  tag?: string;
}

// ... (Loader remains same)

// Compact FeatureCard
function FeatureCard({ title, description, features, image, icon, index, tag }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Height - Compact */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 z-10 group-hover:bg-transparent transition-colors duration-300" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {/* Icon Overlay */}
        <div className="absolute bottom-3 left-3 z-20 w-10 h-10 rounded-lg bg-background/90 backdrop-blur border border-primary/20 flex items-center justify-center text-primary shadow-sm">
          {icon}
        </div>

        {/* Feature Tag (Top Right) */}
        {tag && (
          <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider font-bold shadow-sm backdrop-blur-md border border-white/10">
            {tag}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Compact Features List - Fade in on hover/always visible but small */}
        <ul className="space-y-1.5 mt-auto pt-4 border-t border-border/30">
          {features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-foreground/70">
              <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
              <span className="truncate">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function CapabilitiesSection() {
  const features = [
    {
      title: 'Intelligent Document Processing (RAG)',
      description: 'Transform how you interact with documents using AI-powered semantic search and contextual understanding.',
      features: ['Semantic Search', 'Context-Aware Chat', 'Citation-Backed Answers'],
      image: documentProcessingImg,
      icon: <FileSearch className="w-6 h-6" />,
      tag: 'Core',
    },
    {
      title: 'Neural Text-to-Speech (TTS)',
      description: 'Human-like voice synthesis that enables natural listening experiences for document content.',
      features: ['Human-Like Voice', 'Multi-Task Listening', 'Natural Speech Patterns'],
      image: textToSpeechImg,
      icon: <Volume2 className="w-6 h-6" />,
    },
    {
      title: 'Advanced Audio & Conversation Analysis',
      description: 'Real-time transcription with intelligent extraction of key insights and action items.',
      features: ['Live Transcription', 'Action Item Extraction', 'Speaker Analysis'],
      image: audioAnalysisImg,
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      title: 'Real-Time Sentiment Radar',
      description: 'Monitor emotional dynamics in conversations for improved communication quality.',
      features: ['Emotion Detection', 'Call Quality Monitoring', 'Tone Visualization'],
      image: sentimentRadarImg,
      icon: <Activity className="w-6 h-6" />,
    },
    {
      title: 'Smart Conversational Forms',
      description: 'Replace complex forms with natural conversation interfaces accessible to everyone.',
      features: ['Chat-Based Form Filling', 'Auto-Profile Population', 'Voice or Text Input'],
      image: conversationalFormsImg,
      icon: <MessagesSquare className="w-6 h-6" />,
    },
    {
      title: 'Voice Control & Live Transcription',
      description: 'Hands-free interface interaction with real-time speech-to-text capabilities.',
      features: ['Hands-Free UI Interaction', 'Real-Time Speech-to-Text', 'Command Recognition'],
      image: voiceControlImg,
      icon: <Mic className="w-6 h-6" />,
      tag: 'Accessibility',
    },
    {
      title: 'Sign Language Avatar',
      description: 'Inclusive communication through AI-powered text and voice to sign language translation.',
      features: ['Text → Sign Language', 'Voice → Sign Language', 'Inclusive Communication'],
      image: signLanguageImg,
      icon: <Hand className="w-6 h-6" />,
      tag: 'Comming Soon',
    },
    {
      title: 'Neural Biometric Security',
      description: 'Secure, accessible authentication through multiple biometric modalities.',
      features: ['Face Recognition', 'Fingerprint Authentication', 'Voice-Based Security'],
      image: biometricSecurityImg,
      icon: <Fingerprint className="w-6 h-6" />,
      tag: 'Secure',
    },
    {
      title: 'Accessibility-First AI Experience',
      description: 'Designed from the ground up for users with diverse abilities and needs.',
      features: ['Physically Disabled Users', 'Hearing & Speech Impaired', 'Neurodiverse Users'],
      image: accessibilityImg,
      icon: <Heart className="w-6 h-6" />,
      tag: 'Foundation',
    },
  ];

  // ... rest of component


  return (
    <section
      id="capabilities"
      className="relative py-12 md:py-20"
      aria-labelledby="capabilities-title"
    >
      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="capabilities-title"
            className="text-2xl md:text-3xl font-bold text-foreground mb-4"
          >
            Ensuring Equal Access to{' '}
            <span className="gradient-text">AI for All</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ACCESS.AI is an intelligent accessibility platform built to enhance inclusivity, productivity, and user experience across enterprise systems. Each capability is designed as a modular, reusable component that can be seamlessly integrated into existing applications, enabling organizations to deliver accessible and efficient digital experiences at scale.
          </p>
        </motion.div>

        {/* 3D Capabilities Tree */}
        <div className="w-full h-[85vh] rounded-2xl overflow-hidden border border-primary/10 bg-background/30 backdrop-blur-sm relative">
          <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur px-4 py-2 rounded-full border border-primary/20">
            <p className="text-sm font-medium text-muted-foreground">
              <span className="animate-pulse mr-2">●</span>
              Drag to rotate • Hover for details
            </p>
          </div>

          <Suspense fallback={<Loader />}>
            <CapabilitiesTree />
          </Suspense>
        </div>

        {/* Feature Grid Header */}
        <div className="mt-24 mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Explore in Detail
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dive deeper into the specific technologies powering our capability system.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
