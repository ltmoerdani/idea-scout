import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useSearchStore } from '../store/searchStore';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Search, TrendingUp, FileText, Clock } from 'lucide-react';
import { format } from 'date-fns';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { recentSearches } = useSearchStore();

  const stats = [
    { name: 'Total Searches', value: '12', icon: Search, color: 'bg-blue-500' },
    { name: 'Ideas Validated', value: '8', icon: TrendingUp, color: 'bg-green-500' },
    { name: 'Reports Generated', value: '15', icon: FileText, color: 'bg-purple-500' },
    { name: 'Hours Saved', value: '45', icon: Clock, color: 'bg-orange-500' },
  ];

  const popularIdeas = [
    'Food delivery app with healthy options',
    'Online learning platform for kids',
    'Subscription box for pet supplies',
    'Virtual fitness coaching service',
    'Eco-friendly product marketplace',
  ];

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-slate-600 mt-2">
            Ready to validate your next big idea? Let's dive into the data.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.name} className="relative overflow-hidden">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Search */}
          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Quick Search
              </h2>
              <p className="text-slate-600">
                Start validating a new business idea right away
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Describe your business idea..."
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Link to="/search">
                  <Button size="lg">
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-slate-500">
                Example: "healthy meal delivery service for busy professionals"
              </p>
            </div>
          </Card>

          {/* Recent Searches */}
          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Recent Searches
              </h2>
              <p className="text-slate-600">
                Continue working on your previous validations
              </p>
            </div>
            <div className="space-y-4">
              {recentSearches.length > 0 ? (
                recentSearches.map((search) => (
                  <div key={search.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{search.query}</p>
                      <p className="text-sm text-slate-500">
                        {format(new Date(search.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent searches yet</p>
                  <p className="text-sm">Start by searching for your first idea</p>
                </div>
              )}
            </div>
          </Card>

          {/* Popular Ideas */}
          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Trending Ideas
              </h2>
              <p className="text-slate-600">
                Popular business ideas being validated this week
              </p>
            </div>
            <div className="space-y-3">
              {popularIdeas.map((idea, index) => (
                <div key={index} className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                  <TrendingUp className="w-5 h-5 text-blue-500 mr-3" />
                  <span className="text-slate-900">{idea}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Quick Actions
              </h2>
              <p className="text-slate-600">
                Common tasks to help validate your ideas
              </p>
            </div>
            <div className="space-y-4">
              <Link to="/search">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="w-5 h-5 mr-3" />
                  Search New Idea
                </Button>
              </Link>
              <Link to="/reports">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-5 h-5 mr-3" />
                  View All Reports
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-5 h-5 mr-3" />
                Market Trends
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};