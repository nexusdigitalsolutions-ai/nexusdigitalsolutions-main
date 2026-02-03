import documentProcessingImg from '@/assets/feature-document-processing.jpg';
import textToSpeechImg from '@/assets/feature-text-to-speech.jpg';
import audioAnalysisImg from '@/assets/feature-audio-analysis.jpg';
import sentimentRadarImg from '@/assets/feature-sentiment-radar.jpg';
import conversationalFormsImg from '@/assets/feature-conversational-forms.jpg';
import voiceControlImg from '@/assets/feature-voice-control.jpg';
import signLanguageImg from '@/assets/feature-sign-language.jpg';
import biometricSecurityImg from '@/assets/feature-biometric-security.jpg';
import accessibilityImg from '@/assets/feature-accessibility.jpg';

export interface CapabilityFeature {
    title: string;
    description: string;
    features: string[];
    image: string;
    id: string;
}

export const capabilitiesData: CapabilityFeature[] = [
    {
        id: 'doc-processing',
        title: 'Intelligent Document Processing (RAG)',
        description: 'Transform how you interact with documents using AI-powered semantic search and contextual understanding.',
        features: ['Semantic Search', 'Context-Aware Chat', 'Citation-Backed Answers'],
        image: documentProcessingImg,
    },
    {
        id: 'tts',
        title: 'Neural Text-to-Speech (TTS)',
        description: 'Human-like voice synthesis that enables natural listening experiences for document content.',
        features: ['Human-Like Voice', 'Multi-Task Listening', 'Natural Speech Patterns'],
        image: textToSpeechImg,
    },
    {
        id: 'audio-analysis',
        title: 'Advanced Audio & Conversation Analysis',
        description: 'Real-time transcription with intelligent extraction of key insights and action items.',
        features: ['Live Transcription', 'Action Item Extraction', 'Speaker Analysis'],
        image: audioAnalysisImg,
    },
    {
        id: 'sentiment',
        title: 'Real-Time Sentiment Radar',
        description: 'Monitor emotional dynamics in conversations for improved communication quality.',
        features: ['Emotion Detection', 'Call Quality Monitoring', 'Tone Visualization'],
        image: sentimentRadarImg,
    },
    {
        id: 'conv-forms',
        title: 'Smart Conversational Forms',
        description: 'Replace complex forms with natural conversation interfaces accessible to everyone.',
        features: ['Chat-Based Form Filling', 'Auto-Profile Population', 'Voice or Text Input'],
        image: conversationalFormsImg,
    },
    {
        id: 'voice-control',
        title: 'Voice Control & Live Transcription',
        description: 'Hands-free interface interaction with real-time speech-to-text capabilities.',
        features: ['Hands-Free UI Interaction', 'Real-Time Speech-to-Text', 'Command Recognition'],
        image: voiceControlImg,
    },
    {
        id: 'sign-language',
        title: 'Sign Language Avatar',
        description: 'Inclusive communication through AI-powered text and voice to sign language translation.',
        features: ['Text → Sign Language', 'Voice → Sign Language', 'Inclusive Communication'],
        image: signLanguageImg,
    },
    {
        id: 'biometric',
        title: 'Neural Biometric Security',
        description: 'Secure, accessible authentication through multiple biometric modalities.',
        features: ['Face Recognition', 'Fingerprint Authentication', 'Voice-Based Security'],
        image: biometricSecurityImg,
    },
    {
        id: 'accessibility',
        title: 'Accessibility-First AI Experience',
        description: 'Designed from the ground up for users with diverse abilities and needs.',
        features: ['Physically Disabled Users', 'Hearing & Speech Impaired', 'Neurodiverse Users'],
        image: accessibilityImg,
    },
];
