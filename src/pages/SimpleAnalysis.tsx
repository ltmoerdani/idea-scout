import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchStore } from '../store/searchStore';
import { SimpleLayout } from '../components/layout/SimpleLayout';
import { SimpleCard } from '../components/ui/SimpleCard';
import { SimpleButton } from '../components/ui/SimpleButton';
import { 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Download, 
  Share2,
  CheckCircle,
  XCircle,
  ArrowLeft
} from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const SimpleAnalysis: React.FC = () => {
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      }
    }
  };

  if (isLoading) {
    return (
      <SimpleLayout>
        <div className="p-4 lg:p-8 pb-20 lg:pb-8">
          <SimpleCard className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Generating Analysis...
            </h3>
            <p className="text-slate-600">
              Analyzing sentiment and extracting insights
            </p>
          </SimpleCard>
        </div>
      </SimpleLayout>
    );
  }

  if (!currentAnalysis) {
    return (
      <SimpleLayout>
        <div className="p-4 lg:p-8 pb-20 lg:pb-8">
          <SimpleCard className="text-center py-12">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Analysis Not Found
            </h3>
            <p className="text-slate-600">
              The requested analysis could not be found
            </p>
          </SimpleCard>
        </div>
      </SimpleLayout>
    );
  }

  const overallSentiment = currentAnalysis.sentiment_analysis.positive > 50 ? 'positive' : 
                          currentAnalysis.sentiment_analysis.negative > 40 ? 'negative' : 'neutral';

  return (
    <SimpleLayout>
      <div className="p-4 lg:p-8 pb-20 lg:pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button className="flex items-center text-slate-600 hover:text-slate-900 mb-2">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Results
            </button>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
              Analysis Results
            </h1>
            <p className="text-slate-600">
              Comprehensive insights from YouTube data
            </p>
          </div>
          <div className="hidden lg:flex items-center space-x-3">
            <SimpleButton variant="secondary" icon={<Share2 className="w-4 h-4" />}>
              Share
            </SimpleButton>
            <SimpleButton icon={<Download className="w-4 h-4" />}>
              Export
            </SimpleButton>
          </div>
        </div>

        {/* Overall Assessment */}
        <SimpleCard className="mb-8">
          <div className="text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              overallSentiment === 'positive' ? 'bg-green-100' :
              overallSentiment === 'negative' ? 'bg-red-100' : 'bg-yellow-100'
            }`}>
              {overallSentiment === 'positive' ? (
                <CheckCircle className="w-10 h-10 text-green-600" />
              ) : overallSentiment === 'negative' ? (
                <XCircle className="w-10 h-10 text-red-600" />
              ) : (
                <AlertTriangle className="w-10 h-10 text-yellow-600" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {overallSentiment === 'positive' ? '🟢 HIGH POTENTIAL' :
               overallSentiment === 'negative' ? '🔴 LOW POTENTIAL' : '🟡 MEDIUM POTENTIAL'}
            </h2>
            <p className="text-slate-600 mb-6">
              Based on {currentAnalysis.sentiment_analysis.positive + currentAnalysis.sentiment_analysis.negative + currentAnalysis.sentiment_analysis.neutral}% of analyzed comments
            </p>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {currentAnalysis.sentiment_analysis.positive}%
                </p>
                <p className="text-sm text-slate-600">Positive</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {currentAnalysis.sentiment_analysis.negative}%
                </p>
                <p className="text-sm text-slate-600">Negative</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-600">
                  {currentAnalysis.sentiment_analysis.neutral}%
                </p>
                <p className="text-sm text-slate-600">Neutral</p>
              </div>
            </div>
          </div>
        </SimpleCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Breakdown */}
          <SimpleCard>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Sentiment Breakdown
            </h2>
            <div className="h-64">
              {sentimentData && <Doughnut data={sentimentData} options={chartOptions} />}
            </div>
          </SimpleCard>

          {/* Top Pain Points */}
          <SimpleCard>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              ⚠️ Main Challenges
            </h2>
            <div className="space-y-4">
              {currentAnalysis.pain_points.slice(0, 3).map((point, index) => (
                <div key={index} className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-red-900">{point.category}</h3>
                    <span className="text-sm text-red-700 font-medium">{point.frequency}%</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {point.keywords.slice(0, 3).map((keyword, keyIndex) => (
                      <span
                        key={keyIndex}
                        className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SimpleCard>

          {/* Opportunities */}
          <SimpleCard>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              💡 Opportunities
            </h2>
            <div className="space-y-3">
              {currentAnalysis.opportunities.feature_requests.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                  <Lightbulb className="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-green-900">{feature}</span>
                </div>
              ))}
            </div>
          </SimpleCard>

          {/* Key Insights */}
          <SimpleCard>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              🎯 Key Insights
            </h2>
            <div className="space-y-3">
              {currentAnalysis.insights.map((insight, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">{insight}</p>
                </div>
              ))}
            </div>
          </SimpleCard>
        </div>

        {/* Recommendations */}
        <SimpleCard className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            📋 Recommendations
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-medium text-green-900">Proceed</h3>
              </div>
              <p className="text-sm text-green-700">
                Strong market demand and clear opportunities identified
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="font-medium text-yellow-900">Focus on Pricing</h3>
              </div>
              <p className="text-sm text-yellow-700">
                Address cost concerns early in your strategy
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-medium text-blue-900">Differentiate</h3>
              </div>
              <p className="text-sm text-blue-700">
                Focus on customer experience as key differentiator
              </p>
            </div>
          </div>
        </SimpleCard>

        {/* Mobile Actions */}
        <div className="lg:hidden mt-6 flex space-x-3">
          <SimpleButton variant="secondary" className="flex-1" icon={<Share2 className="w-4 h-4" />}>
            Share
          </SimpleButton>
          <SimpleButton className="flex-1" icon={<Download className="w-4 h-4" />}>
            Export
          </SimpleButton>
        </div>
      </div>
    </SimpleLayout>
  );
};