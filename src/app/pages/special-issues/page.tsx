import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, Calendar, Search, Download, Star } from 'lucide-react';
import Link from 'next/link';

interface Issue {
  id: string;
  issueNumber: string;
  year?: number;
  period?: string;
  description?: string;
  imageUrl?: string;
  SpecialIssue: boolean;
  _count: { papers: number };
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
    const res = await fetch('http://localhost:3001/api/special-issues', {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && json.data ? json.data : null;
  } catch {
    return null;
  }
}

export default async function CurrentPage() {
  const volume = await getCurrentVolume();

  const specialIssues = volume?.issues.filter(i => i.SpecialIssue) ?? [];
  const regularIssues = volume?.issues.filter(i => !i.SpecialIssue) ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="bg-white rounded-2xl shadow-lg p-2 md:p-8 mb-10">
          <div className="flex items-center mb-3">
            <BookOpen className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-3xl font-bold text-gray-900">Special Issue</h1>
          </div>
      
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Search */}
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Search className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Search Articles</h2>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Title, author, keyword..."
                  className="flex-1 px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600"
                />
                <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700">
                  Search
                </button>
              </div>
            </section>

            {/* Special Issues – only if they exist */}
            {specialIssues.length > 0 && (
              <section>
                <div className=" border border-blue-200 rounded-2xl p-8 shadow-md">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Star className="w-8 h-8 text-blue-600" fill="currentColor" />
                      <h2 className="text-3xl font-bold text-blue-900">Special Issues</h2>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium">
                      {specialIssues.length} issue{specialIssues.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {specialIssues.map(issue => (
                      <IssueCard key={issue.id} issue={issue} isSpecial />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Regular / Main Volume Issues */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Latest Volume {volume ? `(${volume.years} – ${volume.name})` : ''}
              </h2>

              {volume ? (
                regularIssues.length > 0 ? (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {regularIssues.map(issue => (
                        <IssueCard key={issue.id} issue={issue} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 italic">No regular issues published yet in this volume.</p>
                )
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <BookOpen className="w-16 h-16 mx-auto mb-6 text-blue-500 opacity-70" />
                  <h3 className="text-2xl font-bold mb-4">No Current Volume Available</h3>
                  <Link
                    href="/pages/Archives"
                    className="inline-flex bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
                  >
                    Browse Archives
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar – keep as you had */}
          <div className="lg:col-span-1 space-y-6">
            {/* ... your sidebar cards ... */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function IssueCard({ issue, isSpecial = false }: { issue: Issue; isSpecial?: boolean }) {
  return (
    <div className={`rounded-xl p-6 border-2 transition-all ${
      isSpecial
        ? 'border-blue-300 bg-blue-50/70 hover:border-blue-400 hover:shadow-blue-200/40'
        : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:shadow-md'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-lg font-bold text-gray-900">
          Issue {issue.issueNumber}
          {isSpecial && (
            <span className="ml-2 px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              Special
            </span>
          )}
        </h4>
        {issue.imageUrl && (
          <img src={issue.imageUrl} alt="" className="w-16 h-16 object-cover rounded" />
        )}
      </div>

      <p className="text-sm text-gray-600 mb-1">{issue.period || '—'}</p>
      <p className="text-xs text-gray-500 mb-4 line-clamp-2">
        {issue.description || 'No description'}
      </p>

      <p className="text-sm mb-5">
        <strong>{issue._count.papers}</strong> article{issue._count.papers !== 1 ? 's' : ''}
      </p>

      <div className="flex gap-3">
        <Link href={`/pages/Archives/issue/${issue.id}`} className="flex-1">
          <button className={`w-full py-2 px-4 rounded-lg text-sm font-medium ${
            isSpecial ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}>
            View Issue
          </button>
        </Link>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
          <Download size={16} />
        </button>
      </div>
    </div>
  );
}