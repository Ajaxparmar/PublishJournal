import { FileText, Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RecentArticles() {
  const articles = [
    {
      id: 337,
      title: 'The Impact of Emotional Intelligence on Employee Engagement: A Study of IT Professionals in the Delhi NCR Region',
      authors: ['Dr. Chikati Srinu', 'Dr. Gurpreet kaur', 'Dr. Deepshikha Tonk', 'Dr. Alphones Arokiasamy'],
      volume: 'Volume 21, Issue 1',
      period: 'Jan-Jun, 2026',
      pages: '1-36',
    },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3 inline-block">
        Recent Research Articles
      </h2>

      <div className="space-y-6">
        {articles.map((article) => (
          <div 
            key={article.id}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
          >
            {/* Volume and Issue Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                <Calendar className="w-3 h-3 mr-1" />
                {article.volume}
              </span>
              <span className="inline-flex items-center bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {article.period}
              </span>
              <span className="text-sm text-gray-500">Pages: {article.pages}</span>
            </div>

            {/* Article Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight hover:text-blue-600 transition-colors">
              <Link href={`/article/${article.id}`}>
                {article.title}
              </Link>
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

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link 
                href={`/article/${article.id}`}
                className="inline-flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                <FileText className="w-4 h-4 mr-2" />
                Read Article
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <button className="inline-flex items-center bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200">
                Download PDF
              </button>
              <button className="inline-flex items-center bg-green-100 text-green-700 px-5 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors duration-200">
                Cite Article
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-8 text-center">
        <Link 
          href="/archives"
          className="inline-flex items-center bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-200"
        >
          View All Articles
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </section>
  );
}