import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';

export const Settings: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Settings
          </h1>
          <p className="text-slate-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Settings */}
            <Card>
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                Profile Information
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    value={user?.name || ''}
                    placeholder="Enter your full name"
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={user?.email || ''}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card>
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900">Email Notifications</h3>
                    <p className="text-sm text-slate-600">Receive updates about your searches and analyses</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900">Weekly Reports</h3>
                    <p className="text-sm text-slate-600">Get weekly summaries of trending ideas</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </Card>

            {/* API Settings */}
            <Card>
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                API Configuration
              </h2>
              <div className="space-y-6">
                <div>
                  <Input
                    label="YouTube API Key"
                    placeholder="Enter your YouTube API key"
                    helperText="Optional: Use your own YouTube API key for higher rate limits"
                  />
                </div>
                <div className="flex justify-end">
                  <Button variant="outline">Test Connection</Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Account Plan */}
            <Card>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Current Plan
              </h2>
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">F</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Free Plan</h3>
                <p className="text-sm text-slate-600 mb-4">
                  10 searches per month
                </p>
                <Button className="w-full">
                  Upgrade to Pro
                </Button>
              </div>
            </Card>

            {/* Usage Stats */}
            <Card>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Usage This Month
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Searches</span>
                    <span className="font-medium text-slate-900">3 / 10</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Analysis Reports</span>
                    <span className="font-medium text-slate-900">5 / 20</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Support */}
            <Card>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Need Help?
              </h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  📚 Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  💬 Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🐛 Report Bug
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};