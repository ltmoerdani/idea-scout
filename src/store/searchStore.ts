import { create } from 'zustand';
import { SearchQuery, SearchResult, Analysis } from '../types';

interface SearchState {
  currentQuery: string;
  isLoading: boolean;
  searchResults: SearchResult[];
  recentSearches: SearchQuery[];
  currentAnalysis: Analysis | null;
  setQuery: (query: string) => void;
  performSearch: (query: string, filters?: any) => Promise<void>;
  getAnalysis: (searchId: string) => Promise<void>;
  clearResults: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  currentQuery: '',
  isLoading: false,
  searchResults: [],
  recentSearches: [],
  currentAnalysis: null,
  
  setQuery: (query: string) => {
    set({ currentQuery: query });
  },
  
  performSearch: async (query: string, filters?: any) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock search results
    const mockResults: SearchResult[] = [
      {
        id: '1',
        channel: {
          id: '1',
          youtube_id: 'UC123',
          name: 'Tech Startup Central',
          subscriber_count: 250000,
          category: 'Technology',
          engagement_rate: 8.5,
          thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Channel about startup growth and technology trends',
          last_updated: new Date().toISOString(),
        },
        video: {
          id: '1',
          channel_id: '1',
          youtube_id: 'video123',
          title: 'How to Build a Successful Food Delivery App in 2024',
          description: 'Complete guide to creating a food delivery application',
          view_count: 150000,
          comment_count: 2500,
          like_count: 12000,
          dislike_count: 300,
          thumbnail: 'https://images.pexels.com/photos/4393668/pexels-photo-4393668.jpeg?auto=compress&cs=tinysrgb&w=400',
          duration: '15:30',
          published_at: '2024-01-15T00:00:00Z',
        },
        relevance_score: 95,
        insights: [
          'High engagement pada topik delivery apps',
          'Banyak request untuk fitur healthy food options',
          'Kompetitor utama: Uber Eats, DoorDash',
        ],
        engagement_metrics: {
          avg_comments_per_video: 1800,
          response_rate: 12.5,
          sentiment_score: 0.7,
        },
      },
      {
        id: '2',
        channel: {
          id: '2',
          youtube_id: 'UC456',
          name: 'Healthy Living Hub',
          subscriber_count: 180000,
          category: 'Health & Wellness',
          engagement_rate: 9.2,
          thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Promoting healthy lifestyle and nutrition',
          last_updated: new Date().toISOString(),
        },
        video: {
          id: '2',
          channel_id: '2',
          youtube_id: 'video456',
          title: 'Why Healthy Food Delivery is the Future',
          description: 'Analysis of the growing healthy food delivery market',
          view_count: 89000,
          comment_count: 1200,
          like_count: 7500,
          dislike_count: 150,
          thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
          duration: '12:45',
          published_at: '2024-01-10T00:00:00Z',
        },
        relevance_score: 88,
        insights: [
          'Tingginya demand untuk healthy meal options',
          'Concern utama: harga yang terlalu mahal',
          'Opportunity: subscription model untuk regular customers',
        ],
        engagement_metrics: {
          avg_comments_per_video: 980,
          response_rate: 15.8,
          sentiment_score: 0.8,
        },
      },
      {
        id: '3',
        channel: {
          id: '3',
          youtube_id: 'UC789',
          name: 'Business Insights Today',
          subscriber_count: 320000,
          category: 'Business',
          engagement_rate: 7.8,
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Business analysis and market insights',
          last_updated: new Date().toISOString(),
        },
        video: {
          id: '3',
          channel_id: '3',
          youtube_id: 'video789',
          title: 'Food Tech Startups: Success Stories and Failures',
          description: 'Case studies of food technology companies',
          view_count: 200000,
          comment_count: 3200,
          like_count: 18000,
          dislike_count: 400,
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
          duration: '22:15',
          published_at: '2024-01-05T00:00:00Z',
        },
        relevance_score: 82,
        insights: [
          'Market size: $150B+ globally untuk food delivery',
          'Key success factors: logistics, user experience, pricing',
          'Failure points: poor unit economics, expansion too fast',
        ],
        engagement_metrics: {
          avg_comments_per_video: 2100,
          response_rate: 8.5,
          sentiment_score: 0.6,
        },
      },
    ];
    
    const searchQuery: SearchQuery = {
      id: Date.now().toString(),
      query,
      filters,
      created_at: new Date().toISOString(),
    };
    
    set({
      searchResults: mockResults,
      recentSearches: [searchQuery, ...get().recentSearches.slice(0, 4)],
      isLoading: false,
    });
  },
  
  getAnalysis: async (searchId: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockAnalysis: Analysis = {
      id: '1',
      search_id: searchId,
      sentiment_analysis: {
        positive: 65,
        negative: 20,
        neutral: 15,
      },
      pain_points: [
        {
          category: 'Pricing',
          frequency: 45,
          keywords: ['expensive', 'costly', 'overpriced', 'too much'],
        },
        {
          category: 'Delivery Time',
          frequency: 32,
          keywords: ['slow', 'late', 'delayed', 'waiting'],
        },
        {
          category: 'Food Quality',
          frequency: 28,
          keywords: ['cold', 'soggy', 'not fresh', 'quality'],
        },
      ],
      opportunities: {
        feature_requests: [
          'Subscription model untuk regular customers',
          'Healthy meal planning integration',
          'Local restaurant partnerships',
          'Real-time delivery tracking',
        ],
        unmet_needs: [
          'Affordable healthy food options',
          'Customizable meal plans',
          'Dietary restriction filters',
          'Bulk ordering for families',
        ],
        competitive_gaps: [
          'Kurangnya fokus pada healthy options',
          'Poor customer service response',
          'Limited payment options',
          'No loyalty program',
        ],
      },
      insights: [
        'Market menunjukkan demand tinggi untuk healthy food delivery',
        'Pricing strategy perlu dioptimalkan untuk kompetisi',
        'Customer service dan user experience menjadi differentiator utama',
        'Opportunity besar untuk subscription model',
      ],
      created_at: new Date().toISOString(),
    };
    
    set({ currentAnalysis: mockAnalysis, isLoading: false });
  },
  
  clearResults: () => {
    set({ searchResults: [], currentAnalysis: null, currentQuery: '' });
  },
}));