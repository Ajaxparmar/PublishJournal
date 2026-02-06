// src/app/pages/Current/page.tsx   (or app/pages/Current/page.tsx)
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, Calendar, Search, Download } from 'lucide-react';
import Link from 'next/link';

interface Issue {
  id: string;
  issueNumber: string;
  year: number;
  period: string;
  description: string;
  _count: { papers: number };
  imageUrl?: string;
}

interface Volume {
  id: string;
  name: string;
  description: string;
  years: string;
  issues: Issue[];
  _count: { papers: number };
  Archive: boolean;
}

async function getCurrentVolume(): Promise<Volume | null> {
  try {
    const res = await fetch('http://localhost:3000/api/latest-volume', {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Latest volume fetch failed:', res.statusText);
      return null;
    }

    const json = await res.json();

    if (json.success && json.data) {
      return json.data as Volume;
    }

    return null;
  } catch (error) {
    console.error('Error fetching current volume:', error);
    return null;
  }
}

export default async function CurrentPage() {
  const currentVolume = await getCurrentVolume();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero / Page Title */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-4 mb-8">
          <div className="flex items-center mb-2">
            <BookOpen className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-2xl md:text-2xl font-bold text-gray-900">Current Issue</h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Latest published volume of the International Journal of Interdisciplinary Organizational Studies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search (optional – same as archives) */}
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Search className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Search Current Issue</h2>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search by title, author, keyword..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </div>
            </section>

            {/* Current Volume Display */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Latest Volume</h2>

              {currentVolume ? (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <Calendar className="w-8 h-8 text-blue-600 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-900">
                          {currentVolume.years} – {currentVolume.name}
                        </h3>
                      </div>
                      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                        {currentVolume.issues.length} Issue{currentVolume.issues.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentVolume.issues.map((issue) => (
                        <div
                          key={issue.id}
                          className="border-2 border-gray-200 bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all"
                        >
                          <h4 className="text-lg font-bold text-gray-900 mb-2">
                            Issue {issue.issueNumber}
                          </h4>
                          <p className="text-sm text-gray-600 mb-1">{issue.period}</p>
                          <p className="text-xs text-gray-500 mb-3">
                            {issue.description || 'No description available'}
                          </p>
                          <p className="text-sm text-gray-700 mb-4">
                            <strong>{issue._count?.papers ?? 0}</strong> articles
                          </p>

                          <div className="flex gap-2">
                            <Link href={`/pages/Archives/issue/${issue.id}`} className="flex-1">
                              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                View Issue
                              </button>
                            </Link>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center text-gray-600">
                  <BookOpen className="w-16 h-16 mx-auto mb-6 text-blue-500 opacity-70" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No Current Volume Available
                  </h3>
                  <p className="text-lg mb-6">
                    The latest volume has not been published yet or is still under preparation.
                  </p>
                  <Link
                    href="/pages/Archives"
                    className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Browse Archives Instead
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar – same style as Archives */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick info about current status */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Current Status</h3>
              <div className="space-y-3 text-gray-700">
                <p>Latest published volume is shown here.</p>
                <p>Once a new volume is released, it will appear automatically.</p>
                <p className="text-sm text-gray-500 italic">
                  Older volumes are moved to the Archives section.
                </p>
              </div>
            </div>

            {/* Call to action */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Submit Your Work</h3>
              <p className="text-blue-100 mb-4 text-sm">
                We welcome high-quality submissions for upcoming volumes.
              </p>
              <Link
                href="/pages/Submit"
                className="inline-block bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Submit Manuscript
              </Link>
            </div>

            {/* Link to archives */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Browse Past Issues</h3>
              <Link
                href="/pages/Archives"
                className="text-blue-600 hover:text-blue-800 hover:underline block"
              >
                → View All Archived Volumes
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}