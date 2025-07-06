import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchStore } from '../store/searchStore';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Filter, TrendingUp, Users, Eye, MessageCircle, ThumbsUp } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const { isLoading, searchResults, performSearch } = useSearchStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    await performSearch(searchQuery, { category });
  };

  const categories = [
    'All Categories',
    'Technology',
    'Health & Wellness',
    'Business',
    'Education',
    'Entertainment',
    'Finance',
    'Food & Cooking',
  ];

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Search & Validate Ideas
          </h1>
          <p className="text-slate-600">
            Find YouTube channels and videos related to your business idea
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <Input
                  label="Business Idea"
                  placeholder="e.g., healthy meal delivery service for busy professionals"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat === 'All Categories' ? '' : cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  isLoading={isLoading}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </form>
        </Card>

        {/* Search Results */}
        {isLoading && (
          <Card className="text-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Analyzing YouTube Data...
            </h3>
            <p className="text-slate-600">
              Searching for relevant channels and videos, analyzing engagement patterns
            </p>
          </Card>
        )}

        {!isLoading && searchResults.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Search Results ({searchResults.length})
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {searchResults.map((result) => (
                <Card key={result.id} hover className="group">
                  <div className="flex space-x-4">
                    <img
                      src={result.video.thumbnail}
                      alt={result.video.title}
                      className="w-32 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-900 line-clamp-2">
                          {result.video.title}
                        </h3>
                        <div className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {result.relevance_score}% match
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                        <img
                          src={result.channel.thumbnail}
                          alt={result.channel.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{result.channel.name}</span>
                        <span>•</span>
                        <span>{(result.channel.subscriber_count / 1000).toFixed(0)}K subscribers</span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {(result.video.view_count / 1000).toFixed(0)}K views
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {result.video.comment_count}
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {(result.video.like_count / 1000).toFixed(0)}K
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {result.channel.engagement_rate}%
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-slate-900 mb-1">Key Insights:</h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                          {result.insights.slice(0, 2).map((insight, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-slate-600">
                            {result.engagement_metrics.sentiment_score > 0.5 ? 'Positive sentiment' : 'Mixed sentiment'}
                          </span>
                        </div>
                        <Link to={`/analysis/${result.id}`}>
                          <Button size="sm">
                            Deep Analysis
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!isLoading && searchResults.length === 0 && searchQuery && (
          <Card className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No Results Found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search terms or selecting a different category
            </p>
          </Card>
        )}
      </div>
    </Layout>
  );
};