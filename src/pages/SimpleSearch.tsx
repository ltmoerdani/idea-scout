import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchStore } from '../store/searchStore';
import { SimpleLayout } from '../components/layout/SimpleLayout';
import { SimpleCard } from '../components/ui/SimpleCard';
import { SimpleButton } from '../components/ui/SimpleButton';
import { SimpleInput } from '../components/ui/SimpleInput';
import { Search, TrendingUp, Users, Eye, MessageCircle, ThumbsUp, ArrowRight } from 'lucide-react';

export const SimpleSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading, searchResults, performSearch } = useSearchStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    await performSearch(searchQuery);
  };

  const quickSuggestions = [
    'healthy food delivery',
    'AI learning platform',
    'sustainable fashion',
    'fintech for SMEs',
  ];

  return (
    <SimpleLayout>
      <div className="p-4 lg:p-8 pb-20 lg:pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
            Search & Validate Ideas
          </h1>
          <p className="text-slate-600">
            Find YouTube insights for your business idea
          </p>
        </div>

        {/* Search Form */}
        <SimpleCard className="mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <SimpleInput
              placeholder="Describe your business idea..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
              required
            />
            <SimpleButton
              type="submit"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              icon={<Search className="w-5 h-5" />}
            >
              {isLoading ? 'Analyzing...' : 'Search Ideas'}
            </SimpleButton>
          </form>

          {/* Quick Suggestions */}
          {!isLoading && searchResults.length === 0 && (
            <div className="mt-6">
              <p className="text-sm text-slate-600 mb-3">Try these popular ideas:</p>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </SimpleCard>

        {/* Loading State */}
        {isLoading && (
          <SimpleCard className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Analyzing YouTube Data...
            </h3>
            <p className="text-slate-600">
              Finding relevant channels and analyzing engagement
            </p>
          </SimpleCard>
        )}

        {/* Search Results */}
        {!isLoading && searchResults.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                🎯 {searchResults.length} relevant channels found
              </h2>
              <p className="text-slate-600">
                Sorted by relevance and engagement potential
              </p>
            </div>

            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <SimpleCard key={result.id} hover>
                  <div className="flex items-start space-x-4">
                    {/* Thumbnail */}
                    <img
                      src={result.video.thumbnail}
                      alt={result.video.title}
                      className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 text-sm lg:text-base line-clamp-2 mb-1">
                            {result.video.title}
                          </h3>
                          <div className="flex items-center text-xs lg:text-sm text-slate-600">
                            <img
                              src={result.channel.thumbnail}
                              alt={result.channel.name}
                              className="w-4 h-4 rounded-full mr-2"
                            />
                            <span>{result.channel.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium ml-2">
                          {result.relevance_score}%
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="flex items-center space-x-4 text-xs text-slate-500 mb-3">
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {(result.channel.subscriber_count / 1000).toFixed(0)}K
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {(result.video.view_count / 1000).toFixed(0)}K
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          {result.video.comment_count}
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {result.channel.engagement_rate}%
                        </div>
                      </div>

                      {/* Key Insight */}
                      <div className="mb-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-900">
                            💡 {result.insights[0]}
                          </p>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            result.engagement_metrics.sentiment_score > 0.6 ? 'bg-green-500' : 
                            result.engagement_metrics.sentiment_score > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-xs text-slate-600">
                            {result.engagement_metrics.sentiment_score > 0.6 ? 'Positive sentiment' : 
                             result.engagement_metrics.sentiment_score > 0.4 ? 'Mixed sentiment' : 'Negative sentiment'}
                          </span>
                        </div>
                        <Link to={`/analysis/${result.id}`}>
                          <SimpleButton size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                            Analyze
                          </SimpleButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SimpleCard>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && searchResults.length === 0 && searchQuery && (
          <SimpleCard className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No Results Found
            </h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search terms or try one of the suggestions above
            </p>
            <SimpleButton 
              variant="secondary" 
              onClick={() => setSearchQuery('')}
            >
              Try Again
            </SimpleButton>
          </SimpleCard>
        )}
      </div>
    </SimpleLayout>
  );
};