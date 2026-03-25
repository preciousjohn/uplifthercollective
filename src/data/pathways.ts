import { Pathway } from '../types';

export const pathways: Pathway[] = [
  {
    id: 'tech',
    label: 'Technology',
    emoji: '💻',
    color: '#6C5CE7',
    textClass: 'text-tech',
    bgClass: 'bg-purple-50',
    borderClass: 'border-purple-200',
    description: 'Build digital tools and systems that shape how people live and work. From software to AI to design.',
  },
  {
    id: 'business',
    label: 'Business',
    emoji: '📈',
    color: '#00B894',
    textClass: 'text-business',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    description: 'Launch ventures, lead teams, and drive strategy. Entrepreneurship, finance, marketing, and beyond.',
  },
  {
    id: 'creative',
    label: 'Creative',
    emoji: '🎨',
    color: '#E17055',
    textClass: 'text-creative',
    bgClass: 'bg-orange-50',
    borderClass: 'border-orange-200',
    description: 'Tell stories that move people. Design, film, journalism, fashion, music, and the arts.',
  },
  {
    id: 'health',
    label: 'Health & Science',
    emoji: '🔬',
    color: '#0984E3',
    textClass: 'text-health',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
    description: 'Improve lives through medicine, research, and science. Clinical, research, and public health pathways.',
  },
  {
    id: 'social',
    label: 'Social Impact',
    emoji: '✊',
    color: '#FDCB6E',
    textClass: 'text-social',
    bgClass: 'bg-yellow-50',
    borderClass: 'border-yellow-200',
    description: 'Fix broken systems, advocate for communities, and drive policy change that lasts.',
  },
];

export const pathwayMap = Object.fromEntries(pathways.map((p) => [p.id, p])) as Record<string, Pathway>;
