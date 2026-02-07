// app/archives/SearchSection.tsx
"use client";

import { useState, useMemo } from 'react';
import { Calendar, Download, Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';

interface Issue {
  id: string;
  issueNumber: string;
  year: number;
  period: string;
  description: string;
  _count: { papers: number };
}

interface Volume {
  id: string;
  name: string;
  description: string;
  years: string;
  issues: Issue[];
}

interface SearchSectionProps {
  initialVolumes: Volume[];
}

export default function SearchSection({ initialVolumes }: SearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVolumes = useMemo(() => {
    if (!searchTerm.trim()) return initialVolumes;

    const lowerTerm = searchTerm.toLowerCase().trim();

    return initialVolumes
      .map((volume) => {
        const volumeMatch =
          volume.name.toLowerCase().includes(lowerTerm) ||
          volume.years.toLowerCase().includes(lowerTerm) ||
          volume.description?.toLowerCase().includes(lowerTerm);

        const filteredIssues = volume.issues.filter((issue) =>
          issue.issueNumber.toLowerCase().includes(lowerTerm) ||
          issue.period.toLowerCase().includes(lowerTerm) ||
          issue.description?.toLowerCase().includes(lowerTerm)
        );

        if (volumeMatch || filteredIssues.length > 0) {
          return {
            ...volume,
            issues: filteredIssues.length > 0 ? filteredIssues : volume.issues,
          };
        }
        return null;
      })
      .filter((v): v is Volume => v !== null);
  }, [searchTerm, initialVolumes]);

  return (
    <>
      <section className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <SearchIcon className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Search Archives</h2>
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by volume name, year, issue number, period, keyword..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {searchTerm ? 'Search Results' : 'Volumes'}
        </h2>

        {filteredVolumes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-500">
            {searchTerm
              ? `No results found for "${searchTerm}"`
              : 'No volumes with published articles available at the moment.'}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredVolumes.map((volume) => (
              <div key={volume.id} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      {volume.years} – {volume.name}
                    </h3>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {volume.issues.length} Issue{volume.issues.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {volume.issues.map((issue) => (
                    <div
                      key={issue.id}
                      className="border-2 border-gray-200 bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all"
                    >
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        Issue {issue.issueNumber}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">{issue.period}</p>
                      {/* <p className="text-xs text-gray-500 mb-3">
                        {issue.description || 'No description available'}
                      </p> */}
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
            ))}
          </div>
        )}
      </section>
    </>
  );
}