// app/current/page.tsx  (or your current issue route)

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, Calendar, User, Download, FileText } from 'lucide-react';

interface Author {
  id: string;
  fullName: string;
  organization: string;
  country: string;
  email: string;
}

interface Paper {
  id: string;
  title: string;
  keywords: string[];
  Abstract?: string;
  pdfUrl: string;
  createdAt: string;
  volumeId: string;
  issueId: string;
  authors: Author[];
}

async function getCurrentIssuePapers() {
  // Replace with your actual logic to fetch the **current/latest** issue
  // For now using the specific issueId from your example data
  try {
    const res = await fetch('http://localhost:3000/api/papers?issueId=6980823f2eefd3885915731f', {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to load current issue');

    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data as Paper[];
    }
    return [];
  } catch (err) {
    console.error('Fetch error:', err);
    return [];
  }
}

// Derive display values from real DB data
function getIssueDisplayInfo(papers: Paper[]) {
  if (papers.length === 0) return null;

  // Use the most recent paper's creation date as reference
  const dates = papers.map(p => new Date(p.createdAt));
  const latestDate = new Date(Math.max(...dates.map(d => d.getTime())));

  return {
    journalShort: 'IJOS',
    volume: 21,          // ← Replace with real volume.number when available in data
    issue: 1,            // ← Replace with real issue.issueNumber when available
    year: latestDate.getFullYear(),
    period: 'Jan-Jun',   // ← You should store this in Issue model later
    publishedDate: latestDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  };
}

export default async function CurrentIssuePage() {
  const papers = await getCurrentIssuePapers();
  const info = getIssueDisplayInfo(papers);

  if (!info) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Current Issue</h1>
          <p className="text-xl text-gray-600">No articles available yet.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <div className="flex items-center mb-6">
            <BookOpen className="w-12 h-12 text-blue-600 mr-4" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Current Issue</h1>
              <p className="text-xl text-gray-600 mt-2">
                Volume {info.volume}, Issue {info.issue} • {info.period} {info.year}
              </p>
            </div>
          </div>
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
                  <p className="text-xl font-bold text-gray-900">
                    Volume {info.volume}, Issue {info.issue}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Publication Period</p>
                  <p className="text-xl font-bold text-gray-900">
                    {info.period} {info.year}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Published</p>
                  <p className="text-xl font-bold text-gray-900">{info.publishedDate}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Journal</p>
                  <p className="text-xl font-bold text-gray-900">{info.journalShort}</p>
                </div>
              </div>
            </section>

            {/* Articles list – same as before, using real data */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Articles in This Issue ({papers.length})
              </h2>
              <div className="space-y-6">
                {papers.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>

                    <div className="flex items-start mb-4">
                      <User className="w-5 h-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                      <div className="flex flex-wrap gap-2">
                        {article.authors.map((a, idx) => (
                          <span key={a.id} className="text-gray-700">
                            {a.fullName}
                            {idx < article.authors.length - 1 && ', '}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                        Published: {new Date(article.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {article.Abstract && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Abstract</h4>
                        <p className="text-gray-700 leading-relaxed">{article.Abstract}</p>
                      </div>
                    )}

                    {article.keywords?.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {article.keywords.map((kw, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <a
                        href={article.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Read Full Text
                      </a>
                      <a
                        href={article.pdfUrl}
                        download
                        className="inline-flex items-center bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar – dynamic cover */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Current Issue</h3>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl aspect-[3/4] flex items-center justify-center mb-4 shadow-inner">
                <div className="text-center p-6">
                  <p className="text-5xl font-bold text-blue-900 mb-2">{info.journalShort}</p>
                  <p className="text-2xl font-semibold text-blue-800 mb-1">
                    Vol. {info.volume}
                  </p>
                  <p className="text-xl text-blue-700">Issue {info.issue}</p>
                  <p className="text-lg text-blue-600 mt-4">{info.year}</p>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600">
                {info.period} {info.year}
              </p>
            </div>

            {/* Other sidebar sections... */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}