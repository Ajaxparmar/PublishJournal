import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, Calendar, User, Download, FileText, Quote, ExternalLink } from 'lucide-react';

export default function CurrentPage() {
  const currentIssue = {
    volume: 21,
    issue: 1,
    year: 2026,
    period: 'Jan-Jun',
    coverImage: '/images/current-cover.jpg',
    published: 'January 15, 2026',
    doi: '10.18848/2324-7649/CGP/v21i01',
  };

  const articles = [
    {
      id: 1,
      title: 'The Impact of Emotional Intelligence on Employee Engagement: A Study of IT Professionals in the Delhi NCR Region',
      authors: ['Dr. Chikati Srinu', 'Dr. Gurpreet kaur', 'Dr. Deepshikha Tonk', 'Dr. Alphones Arokiasamy'],
      pages: '1-36',
      doi: '10.18848/2324-7649/CGP/v21i01/1-36',
      abstract: 'This study examines the relationship between emotional intelligence and employee engagement among IT professionals in the Delhi NCR region. Using a quantitative approach with 450 participants, the research reveals significant positive correlations between emotional intelligence dimensions and engagement levels.',
      keywords: ['Emotional Intelligence', 'Employee Engagement', 'IT Professionals', 'Delhi NCR', 'Organizational Behavior'],
    },
    {
      id: 2,
      title: 'Digital Transformation and Organizational Resilience: A Comparative Study of SMEs',
      authors: ['Dr. Sarah Mitchell', 'Prof. James Anderson', 'Dr. Maria Garcia'],
      pages: '37-68',
      doi: '10.18848/2324-7649/CGP/v21i01/37-68',
      abstract: 'This research investigates how digital transformation initiatives contribute to organizational resilience in small and medium enterprises. Through case studies of 25 SMEs across different industries, the study identifies key factors that enable successful digital transformation.',
      keywords: ['Digital Transformation', 'Organizational Resilience', 'SMEs', 'Innovation', 'Change Management'],
    },
    {
      id: 3,
      title: 'Leadership Styles and Innovation Climate in Technology Startups',
      authors: ['Dr. Michael Chen', 'Dr. Lisa Wang'],
      pages: '69-95',
      doi: '10.18848/2324-7649/CGP/v21i01/69-95',
      abstract: 'This paper explores the relationship between various leadership styles and innovation climate in technology startups. Data collected from 180 startups reveals that transformational and servant leadership styles significantly enhance innovation climate.',
      keywords: ['Leadership Styles', 'Innovation Climate', 'Startups', 'Transformational Leadership', 'Organizational Culture'],
    },
    {
      id: 4,
      title: 'Remote Work and Team Performance: Post-Pandemic Perspectives',
      authors: ['Dr. Emma Thompson', 'Prof. David Brown', 'Dr. Ahmed Hassan', 'Dr. Yuki Tanaka'],
      pages: '96-124',
      doi: '10.18848/2324-7649/CGP/v21i01/96-124',
      abstract: 'This study examines the long-term effects of remote work on team performance in a post-pandemic context. Using mixed methods research with 350 teams across 50 organizations, the findings highlight both challenges and opportunities of sustained remote work arrangements.',
      keywords: ['Remote Work', 'Team Performance', 'Post-Pandemic', 'Virtual Teams', 'Work-from-Home'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <div className="flex items-center mb-6">
            <BookOpen className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Current Issue</h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Volume {currentIssue.volume}, Issue {currentIssue.issue} • {currentIssue.period} {currentIssue.year}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Issue Information */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="flex items-center mb-6">
                <Calendar className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Issue Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Volume & Issue</p>
                  <p className="text-xl font-bold text-gray-900">Volume {currentIssue.volume}, Issue {currentIssue.issue}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Publication Period</p>
                  <p className="text-xl font-bold text-gray-900">{currentIssue.period} {currentIssue.year}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Published</p>
                  <p className="text-xl font-bold text-gray-900">{currentIssue.published}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">DOI</p>
                  <p className="text-sm font-mono text-gray-900">{currentIssue.doi}</p>
                </div>
              </div>
            </section>

            {/* Articles */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Articles in This Issue</h2>
              <div className="space-y-6">
                {articles.map((article) => (
                  <article 
                    key={article.id}
                    className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Article Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>

                    {/* Authors */}
                    <div className="flex items-start mb-4">
                      <User className="w-5 h-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                      <div className="flex flex-wrap gap-2">
                        {article.authors.map((author, index) => (
                          <span key={index} className="text-gray-700">
                            {author}
                            {index < article.authors.length - 1 && ','}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pages and DOI */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                        Pages: {article.pages}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-mono text-xs">
                        DOI: {article.doi}
                      </span>
                    </div>

                    {/* Abstract */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Abstract</h4>
                      <p className="text-gray-700 leading-relaxed">{article.abstract}</p>
                    </div>

                    {/* Keywords */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {article.keywords.map((keyword, index) => (
                          <span 
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button className="inline-flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        <FileText className="w-4 h-4 mr-2" />
                        Read Full Text
                      </button>
                      <button className="inline-flex items-center bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </button>
                      <button className="inline-flex items-center bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                        <Quote className="w-4 h-4 mr-2" />
                        Cite
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Download Full Issue */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Download Complete Issue</h2>
              <p className="text-blue-100 mb-6">
                Download all articles from Volume {currentIssue.volume}, Issue {currentIssue.issue} as a single PDF file.
              </p>
              <button className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Download className="w-5 h-5 mr-2" />
                Download Full Issue (PDF)
              </button>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Issue Cover */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Issue Cover</h3>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl aspect-[3/4] flex items-center justify-center mb-4">
                <div className="text-center p-6">
                  <p className="text-4xl font-bold text-blue-900 mb-2">IJOS</p>
                  <p className="text-xl font-semibold text-blue-800 mb-1">Vol. {currentIssue.volume}</p>
                  <p className="text-lg text-blue-700">Issue {currentIssue.issue}</p>
                  <p className="text-sm text-blue-600 mt-4">{currentIssue.year}</p>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View Table of Contents
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Issue Statistics</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-sm text-gray-500">Total Articles</p>
                  <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-sm text-gray-500">Total Pages</p>
                  <p className="text-2xl font-bold text-gray-900">124</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-sm text-gray-500">Authors</p>
                  <p className="text-2xl font-bold text-gray-900">13</p>
                </div>
              </div>
            </div>

            {/* Access Info */}
            <div className="bg-green-50 border-l-4 border-green-600 rounded-r-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Open Access</h3>
              <p className="text-gray-700 text-sm mb-3">
                All articles in this issue are freely available under CC BY 4.0 license.
              </p>
              <div className="flex items-center text-green-700 text-sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                <span>Read online or download PDF</span>
              </div>
            </div>

            {/* Share Issue */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Share This Issue</h3>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Share on Twitter
                </button>
                <button className="w-full bg-blue-800 text-white py-2 rounded-lg font-medium hover:bg-blue-900 transition-colors">
                  Share on Facebook
                </button>
                <button className="w-full bg-blue-700 text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                  Share on LinkedIn
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Browse Issues</h3>
              <div className="space-y-2">
                <a href="/archives" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → All Issues
                </a>
                <a href="/archives?vol=20" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → Previous Issue
                </a>
                <a href="/submit" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → Submit Article
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}