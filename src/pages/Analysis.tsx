import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchStore } from '../store/searchStore';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Lightbulb, 
  Download, 
  Share2,
  Eye,
  MessageCircle,
  ThumbsUp,
  BarChart3
} from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const Analysis: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentAnalysis, isLoading, getAnalysis } = useSearchStore();

  useEffect(() => {
    if (id) {
      getAnalysis(id);
    }
  }, [id, getAnalysis]);

  const sentimentData = currentAnalysis ? {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [{
      data: [
        currentAnalysis.sentiment_analysis.positive,
        currentAnalysis.sentiment_analysis.negative,
        currentAnalysis.sentiment_analysis.neutral
      ],
      backgroundColor: ['#10b981', '#ef4444', '#64748b'],
      borderWidth: 0,
    }]
  } : null;

  const painPointsData = currentAnalysis ? {
    labels: currentAnalysis.pain_points.map(p => p.category),
    datasets: [{
      label: 'Frequency',
      data: currentAnalysis.pain_points.map(p => p.frequency),
      backgroundColor: '#f59e0b',
      borderRadius: 8,
    }]
  } : null;

  if (isLoading) {
    return (
      <Layout>
        <div className="p-8">
          <Card className="text-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Generating Deep Analysis...
            </h3>
            <p className="text-slate-600">
              Analyzing comments, sentiment, and extracting insights
            </p>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!currentAnalysis) {
    return (
      <Layout>
        <div className="p-8">
          <Card className="text-center py-12">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Analysis Not Found
            </h3>
            <p className="text-slate-600">
              The requested analysis could not be found
            </p>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Deep Analysis Results
            </h1>
            <p className="text-slate-600">
              Comprehensive insights from YouTube data analysis
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sentiment Analysis */}
            <Card>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Sentiment Analysis
                </h2>
                <p className="text-slate-600">
                  Overall sentiment from comments and engagement
                </p>
              </div>
              <div className="flex items-center space-x-8">
                <div className="w-64 h-64">
                  {sentimentData && <Doughnut data={sentimentData} />}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-slate-700">
                      {currentAnalysis.sentiment_analysis.positive}% Positive
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-slate-700">
                      {currentAnalysis.sentiment_analysis.negative}% Negative
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-slate-500 rounded-full mr-3"></div>
                    <span className="text-slate-700">
                      {currentAnalysis.sentiment_analysis.neutral}% Neutral
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pain Points */}
            <Card>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Top Pain Points
                </h2>
                <p className="text-slate-600">
                  Most common issues and complaints identified
                </p>
              </div>
              <div className="h-64">
                {painPointsData && <Bar data={painPointsData} />}
              </div>
              <div className="mt-6 space-y-4">
                {currentAnalysis.pain_points.map((point, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-slate-900">{point.category}</h3>
                      <span className="text-sm text-slate-600">{point.frequency}% of comments</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {point.keywords.map((keyword, keyIndex) => (
                        <span
                          key={keyIndex}
                          className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Opportunities */}
            <Card>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Market Opportunities
                </h2>
                <p className="text-slate-600">
                  Identified opportunities and feature requests
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium text-slate-900 mb-3">Feature Requests</h3>
                  <ul className="space-y-2">
                    {currentAnalysis.opportunities.feature_requests.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Lightbulb className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-3">Unmet Needs</h3>
                  <ul className="space-y-2">
                    {currentAnalysis.opportunities.unmet_needs.map((need, index) => (
                      <li key={index} className="flex items-start">
                        <Users className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{need}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-3">Competitive Gaps</h3>
                  <ul className="space-y-2">
                    {currentAnalysis.opportunities.competitive_gaps.map((gap, index) => (
                      <li key={index} className="flex items-start">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-8">
            {/* Key Metrics */}
            <Card>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Key Metrics
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Market Interest</span>
                  <span className="font-semibold text-green-600">High</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Competition Level</span>
                  <span className="font-semibold text-yellow-600">Medium</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Implementation Difficulty</span>
                  <span className="font-semibold text-red-600">High</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Revenue Potential</span>
                  <span className="font-semibold text-green-600">High</span>
                </div>
              </div>
            </Card>

            {/* Executive Summary */}
            <Card>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Executive Summary
              </h2>
              <div className="space-y-4">
                {currentAnalysis.insights.map((insight, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-slate-700">{insight}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Recommendations
              </h2>
              <div className="space-y-3">
                <div className="flex items-start p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h3 className="font-medium text-green-900">Proceed with Development</h3>
                    <p className="text-sm text-green-700">Strong market demand and clear opportunities</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h3 className="font-medium text-yellow-900">Focus on Pricing Strategy</h3>
                    <p className="text-sm text-yellow-700">Address cost concerns early in development</p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h3 className="font-medium text-blue-900">Differentiate Through Service</h3>
                    <p className="text-sm text-blue-700">Focus on customer experience as key differentiator</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};