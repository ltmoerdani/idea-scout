export interface User {
  id: string;
  email: string;
  name: string;
  subscription_tier: 'free' | 'premium';
  created_at: string;
}

export interface SearchQuery {
  id: string;
  query: string;
  category?: string;
  filters?: {
    duration?: string;
    subscribers?: string;
    engagement_rate?: string;
  };
  created_at: string;
}

export interface YouTubeChannel {
  id: string;
  youtube_id: string;
  name: string;
  subscriber_count: number;
  category: string;
  engagement_rate: number;
  thumbnail: string;
  description: string;
  last_updated: string;
}

export interface YouTubeVideo {
  id: string;
  channel_id: string;
  youtube_id: string;
  title: string;
  description: string;
  view_count: number;
  comment_count: number;
  like_count: number;
  dislike_count: number;
  thumbnail: string;
  duration: string;
  published_at: string;
}

export interface SearchResult {
  id: string;
  channel: YouTubeChannel;
  video: YouTubeVideo;
  relevance_score: number;
  insights: string[];
  engagement_metrics: {
    avg_comments_per_video: number;
    response_rate: number;
    sentiment_score: number;
  };
}

export interface Analysis {
  id: string;
  search_id: string;
  sentiment_analysis: {
    positive: number;
    negative: number;
    neutral: number;
  };
  pain_points: {
    category: string;
    frequency: number;
    keywords: string[];
  }[];
  opportunities: {
    feature_requests: string[];
    unmet_needs: string[];
    competitive_gaps: string[];
  };
  insights: string[];
  created_at: string;
}