import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useSearchStore } from '../store/searchStore';
import { SimpleLayout } from '../components/layout/SimpleLayout';
import { SimpleCard } from '../components/ui/SimpleCard';
import { SimpleButton } from '../components/ui/SimpleButton';
import { SimpleInput } from '../components/ui/SimpleInput';
import { Search, TrendingUp, Lightbulb, Clock } from 'lucide-react';
import { format } from 'date-fns';

export const SimpleDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { recentSearches } = useSearchStore();

  const trendingIdeas = [
    'AI learning platform',
    'Healthy food delivery',
    'Remote work tools',
    'Sustainable fashion',
    'Fintech for SMEs',
  ];

  return (
    <SimpleLayout>
      <div className="p-4 lg:p-8 pb-20 lg:pb-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
            Hi {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-600">
            Ready to validate your next big idea?
          </p>
        </div>

        {/* Quick Search */}
        <SimpleCard className="mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Validate Your Idea
            </h2>
            <p className="text-slate-600 mb-6">
              Describe your business idea and get instant insights
            </p>
            
            <div className="space-y-4">
              <SimpleInput
                placeholder="e.g., healthy meal delivery for busy professionals"
                icon={<Search className="w-5 h-5" />}
              />
              <Link to="/search" className="block">
                <SimpleButton size="lg" className="w-full">
                  <Search className="w-5 h-5" />
                  Start Validation
                </SimpleButton>
              </Link>
            </div>
          </div>
        </SimpleCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SimpleCard className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">12</p>
            <p className="text-sm text-slate-600">Searches</p>
          </SimpleCard>
          
          <SimpleCard className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">8</p>
            <p className="text-sm text-slate-600">Validated</p>
          </SimpleCard>
          
          <SimpleCard className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">95%</p>
            <p className="text-sm text-slate-600">Success Rate</p>
          </SimpleCard>
          
          <SimpleCard className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">45h</p>
            <p className="text-sm text-slate-600">Time Saved</p>
          </SimpleCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Searches */}
          <SimpleCard>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Recent Searches
            </h2>
            <div className="space-y-3">
              {recentSearches.length > 0 ? (
                recentSearches.slice(0, 3).map((search) => (
                  <div key={search.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 text-sm">{search.query}</p>
                      <p className="text-xs text-slate-500">
                        {format(new Date(search.created_at), 'MMM d')}
                      </p>
                    </div>
                    <SimpleButton variant="ghost" size="sm">
                      View
                    </SimpleButton>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-500">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No searches yet</p>
                </div>
              )}
            </div>
            {recentSearches.length > 0 && (
              <Link to="/reports" className="block mt-4">
                <SimpleButton variant="secondary" className="w-full">
                  View All
                </SimpleButton>
              </Link>
            )}
          </SimpleCard>

          {/* Trending Ideas */}
          <SimpleCard>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Trending Ideas
            </h2>
            <div className="space-y-3">
              {trendingIdeas.map((idea, index) => (
                <div key={index} className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                  </div>
                  <span className="text-slate-900 text-sm">{idea}</span>
                </div>
              ))}
            </div>
            <Link to="/search" className="block mt-4">
              <SimpleButton variant="secondary" className="w-full">
                Explore More
              </SimpleButton>
            </Link>
          </SimpleCard>
        </div>
      </div>
    </SimpleLayout>
  );
};