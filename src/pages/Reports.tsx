import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, Download, Share2, Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export const Reports: React.FC = () => {
  const mockReports = [
    {
      id: '1',
      title: 'Healthy Food Delivery App Analysis',
      description: 'Comprehensive analysis of food delivery market with health focus',
      created_at: '2024-01-15T10:30:00Z',
      status: 'completed',
      views: 12,
      insights_count: 25,
    },
    {
      id: '2',
      title: 'AI Learning Platform Validation',
      description: 'Market validation for AI-powered educational platform',
      created_at: '2024-01-10T14:20:00Z',
      status: 'completed',
      views: 8,
      insights_count: 18,
    },
    {
      id: '3',
      title: 'Sustainable Fashion Marketplace',
      description: 'Analysis of eco-friendly fashion e-commerce opportunities',
      created_at: '2024-01-05T09:15:00Z',
      status: 'completed',
      views: 15,
      insights_count: 32,
    },
  ];

  return (
    <Layout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              My Reports
            </h1>
            <p className="text-slate-600">
              All your idea validation reports in one place
            </p>
          </div>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockReports.map((report) => (
            <Card key={report.id} hover className="group">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {report.title}
                  </h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {report.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {report.description}
                </p>
              </div>

              <div className="flex items-center text-sm text-slate-500 mb-4 space-x-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(report.created_at), 'MMM d, yyyy')}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {report.views} views
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Insights Generated</span>
                  <span className="font-medium text-slate-900">{report.insights_count}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${Math.min(report.insights_count * 3, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {mockReports.length === 0 && (
          <Card className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No Reports Yet
            </h3>
            <p className="text-slate-600 mb-4">
              Start validating your ideas to generate comprehensive reports
            </p>
            <Button>
              Create First Report
            </Button>
          </Card>
        )}
      </div>
    </Layout>
  );
};