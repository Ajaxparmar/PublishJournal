// app/pages/Archives/issue/[issueId]/page.tsx

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
  otherAuthors: string[];
  pdfUrl: string;
  createdAt: string;
  volumeId: string;
  issueId: string;
  imageUrl?: string;
  authors: Author[];
  volume?: { name: string };
  issue?: { issueNumber: number | string; imageUrl?: string };
}

async function getPapersByIssueId(issueId: string): Promise<Paper[]> {
  try {
    const url = `http://localhost:3000/api/papers?issueId=${encodeURIComponent(issueId)}`;
    console.log(`→ Fetching papers from: ${url}`);

    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => 'No response body');
      console.error(`Papers fetch failed: ${res.status} ${res.statusText}`, errorText);
      return [];
    }

    const json = await res.json();

    if (json.success && Array.isArray(json.data)) {
      return json.data as Paper[];
    }

    console.warn('API response was not successful or data is not array:', json);
    return [];
  } catch (err) {
    console.error('Exception while fetching papers:', err);
    return [];
  }
}

function deriveIssueDisplayInfo(papers: Paper[]) {
  if (papers.length === 0) return null;

  const latestDate = new Date(
    Math.max(...papers.map(p => new Date(p.createdAt).getTime()))
  );

  // Try to get real volume/issue from first paper (if relation is included)
  const firstPaper = papers[0];
  const volumeName = firstPaper.volume?.name || '21';
  const issueNumber = firstPaper.issue?.issueNumber || '1';

  // Clean volume name if it contains "Volume "
  const cleanVolume = volumeName.replace(/^Volume\s+/i, '');

  return {
    journalShort: 'JEE',
    volume: cleanVolume,
    issue: issueNumber,
    year: latestDate.getFullYear(),
    imageUrl: firstPaper.issue?.imageUrl || null,
    period: 'Jan-Jun', // ← ideally come from issue.period
    publishedDate: latestDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  };
}

export default async function IssuePage({
  params,
}: {
  params: Promise<{ issueId: string }>;
}) {
  // ── Required in Next.js 15+ ───────────────────────────────
  const { issueId } = await params;

  if (!issueId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-8">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-lg">
          <BookOpen className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Issue Not Accessible</h1>
          <p className="text-lg text-gray-600 mb-6">
            No valid issue ID was found in the URL.
          </p>
          <p className="text-gray-500">
            Expected format: <code>/pages/Archives/issue/[issue-id]</code><br />
            Example: /pages/Archives/issue/6980823f2eefd3885915731f
          </p>
        </div>
      </div>
    );
  }

  const papers = await getPapersByIssueId(issueId);
  const info = deriveIssueDisplayInfo(papers);

  if (!info || papers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <BookOpen className="w-20 h-20 text-blue-600 mx-auto mb-8 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Issue Not Found
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No articles were found for this issue ID.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />

      <main className="container mx-auto px-4 py-10 md:py-16">
        {/* Header Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-10">
          <div className="flex items-center gap-5">
            <BookOpen className="w-14 h-14 text-blue-600 flex-shrink-0" />
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                Issue
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mt-2">
                Volume {info.volume}, Issue {info.issue} • {info.period} {info.year}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 xl:gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Issue Info Cards */}
            <section className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <Calendar className="w-9 h-9 text-blue-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Issue Information
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-blue-50 rounded-xl p-5">
                  <p className="text-sm text-gray-600 mb-1">Volume & Issue</p>
                  <p className="text-xl font-bold text-gray-900">
                    Vol. {info.volume}, No. {info.issue}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-5">
                  <p className="text-sm text-gray-600 mb-1">Period</p>
                  <p className="text-xl font-bold text-gray-900">
                    {info.period} {info.year}
                  </p>
                </div>
                {/* <div className="bg-blue-50 rounded-xl p-5">
                  <p className="text-sm text-gray-600 mb-1">Published</p>
                  <p className="text-xl font-bold text-gray-900">{info.publishedDate}</p>
                </div> */}
                <div className="bg-blue-50 rounded-xl p-5">
                  <p className="text-sm text-gray-600 mb-1">Journal</p>
                  <p className="text-xl font-bold text-gray-900">{info.journalShort}</p>
                </div>
              </div>
            </section>

            {/* Articles List */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Articles in This Issue ({papers.length})
              </h2>

              <div className="space-y-6 md:space-y-8">
                {papers.map(paper => (
                  <article
                    key={paper.id}
                    className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight hover:text-blue-700 transition-colors">
                      {paper.title}
                    </h3>

                    <div className="flex items-start mb-5 text-gray-700">
                      <User className="w-5 h-5 text-gray-500 mr-2.5 mt-1 flex-shrink-0" />

                      <div className="font-semibold">
                        {[
                          ...paper.authors.map(a => a.fullName),
                          ...(paper.otherAuthors ?? [])
                        ].map((name, idx, arr) => (
                          <span key={idx}>
                            {name}
                            {idx < arr.length - 1 ? ', ' : '.'}
                          </span>
                        ))}
                      </div>
                    </div>


          

                    {paper.Abstract && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2.5">Abstract</h4>
                        <p className="text-gray-700 leading-relaxed line-clamp-4">
                          {paper.Abstract}
                        </p>
                      </div>
                    )}

                    {paper.keywords?.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2.5">Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {paper.keywords.map((kw, i) => (
                            <span
                              key={i}
                              className="text-gray-700 rounded-full text-sm"
                            >
                              {kw}
                              {i === paper.keywords.length - 1 ? '.' : ','}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-4">
                      <a
                        href={paper.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Read Article
                      </a>
                      <a
                        href={paper.pdfUrl}
                        download
                        className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
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

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-5 text-center">
                Issue Overview
              </h3>

              <img src={info.imageUrl || '/default-issue-cover.jpg'} alt={`Cover for Volume ${info.volume}, Issue ${info.issue}`} className="w-full h-auto rounded-lg mb-5" />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}