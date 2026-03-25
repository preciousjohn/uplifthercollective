export type PathwayId = 'tech' | 'business' | 'creative' | 'health' | 'social';
export type ResourceType = 'program' | 'course' | 'mentorship' | 'community' | 'guide';

export interface Pathway {
  id: PathwayId;
  label: string;
  emoji: string;
  color: string;       // hex — used for inline styles
  textClass: string;   // tailwind text class
  bgClass: string;     // tailwind bg class (light tint)
  borderClass: string; // tailwind border class
  description: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  pathway: PathwayId;
  type: ResourceType;
  url: string;
  cost: string;
  tags: string[];
  created_at: string;
}

export interface DiscoveryOption {
  label: string;
  pathways: PathwayId[];
}

export interface DiscoveryQuestion {
  id: number;
  question: string;
  subtext: string;
  options: DiscoveryOption[];
}

/** questionId → selected option label */
export type UserAnswers = Record<number, string>;

export interface PathwayResult {
  id: string;
  rank: number;
  headline: string;
  explainer: string;
}

export interface ResourceRecommendation {
  resource_id: string;
  reason: string;
  what_to_expect: string;
}

export interface RecommendationResult {
  pathways: PathwayResult[];
  recommendations: ResourceRecommendation[];
  message: string;
}
