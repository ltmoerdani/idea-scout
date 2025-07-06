import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Search, TrendingUp, BarChart3, Shield, Zap, Users } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Search className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-slate-900">YouTube Ideas Validator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Validasi Ide Bisnis Anda
            <span className="block text-blue-600">dengan Data Real YouTube</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Temukan insight mendalam dari komentar dan engagement YouTube untuk memvalidasi 
            potensi ide bisnis Anda sebelum menghabiskan waktu dan biaya development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Mulai Validasi Gratis
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Lihat Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Fitur Powerful untuk Validasi Ide
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Tools lengkap untuk menganalisis potensi pasar dan kompetitor dari data YouTube
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card hover className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Smart Search</h3>
            <p className="text-slate-600">
              Algoritma cerdas untuk menemukan channel dan video YouTube yang paling relevan dengan ide bisnis Anda
            </p>
          </Card>

          <Card hover className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Sentiment Analysis</h3>
            <p className="text-slate-600">
              Analisis sentimen dari ribuan komentar untuk memahami respon pasar terhadap ide serupa
            </p>
          </Card>

          <Card hover className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Pain Points Detection</h3>
            <p className="text-slate-600">
              Identifikasi masalah dan keluhan utama dari target audience untuk menemukan opportunity
            </p>
          </Card>

          <Card hover className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Audience Insights</h3>
            <p className="text-slate-600">
              Pahami demografi, behavior, dan preferensi target audience dari engagement patterns
            </p>
          </Card>

          <Card hover className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Competitive Analysis</h3>
            <p className="text-slate-600">
              Analisis kompetitor dan gap di pasar untuk menemukan positioning yang tepat
            </p>
          </Card>

          <Card hover className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Detailed Reports</h3>
            <p className="text-slate-600">
              Laporan komprehensif dengan visualisasi data dan actionable insights untuk eksekusi
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Mulai Validasi Ide Bisnis Anda Hari Ini
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Bergabung dengan ribuan entrepreneur yang sudah menggunakan data YouTube 
            untuk membuat keputusan bisnis yang lebih baik.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50">
              Daftar Gratis Sekarang
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Search className="w-6 h-6 text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold">Ideas Validator</h3>
              </div>
              <p className="text-slate-400">
                Platform validasi ide bisnis menggunakan data YouTube untuk insight yang akurat.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};