// app/my-papers/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Paper {
  id: string;
  title: string;
  status: string;
  pdfUrl: string;
  createdAt: string;
  volume?: { name: string };
  issue?: { issueNumber: string };
}

// Status configuration
const statusConfig = {
  SUBMITTED:    { percent: 0,    label: 'Submitted',    color: 'bg-gray-500',    textColor: 'text-gray-700' },
  UNDER_REVIEW: { percent: 25,   label: 'Under Review', color: 'bg-blue-500',     textColor: 'text-blue-700' },
  IN_PROCESS:   { percent: 50,   label: 'In Process',   color: 'bg-yellow-500',   textColor: 'text-yellow-700' },
  ACCEPTED:     { percent: 75,   label: 'Accepted',     color: 'bg-green-500',    textColor: 'text-green-700' },
  PUBLISHED:    { percent: 100,  label: 'Published',    color: 'bg-emerald-600',  textColor: 'text-emerald-700' },
  REJECTED:     { percent: 0,    label: 'Rejected',     color: 'bg-red-600',      textColor: 'text-red-700' },
};

const STATUS_STEPS = ['SUBMITTED', 'UNDER_REVIEW', 'IN_PROCESS', 'ACCEPTED', 'PUBLISHED'];

export default function MyPapersPage() {
  const router = useRouter();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPapers = async () => {
      try {
        const res = await fetch('/api/my-papers', {
          credentials: 'include',
        });

        const json = await res.json();

        if (json.success) {
          setPapers(json.data);
        } else if (json.error === 'Not authenticated') {
          toast.error('Please login to view your papers');
          router.push('/login');
        } else {
          toast.error(json.error || 'Failed to load papers');
        }
      } catch (err) {
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchMyPapers();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          My Submitted Papers
        </h1>

        {loading ? (
          <div className="text-center py-20 text-lg text-gray-600">
            Loading your submissions...
          </div>
        ) : papers.length === 0 ? (
          <div className="text-center py-20 bg-white/70 rounded-2xl shadow-sm max-w-2xl mx-auto">
            <p className="text-xl text-gray-700 mb-4">
              You have not submitted any papers yet.
            </p>
            <p className="text-gray-500">
              Once you submit, you will see your progress here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {papers.map((paper) => {
              const config = statusConfig[paper.status as keyof typeof statusConfig] || {
                percent: 0,
                label: paper.status.replace('_', ' '),
                color: 'bg-gray-500',
                textColor: 'text-gray-700',
              };

              const isRejected = paper.status === 'REJECTED';
              const currentStepIndex = STATUS_STEPS.indexOf(paper.status);

              return (
                <div
                  key={paper.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {/* Progress Bar - Hidden when Rejected */}
                  {!isRejected && (
                    <div className="relative h-2 bg-gray-200">
                      <div
                        className={`absolute h-full ${config.color} transition-all duration-700 ease-out`}
                        style={{ width: `${config.percent}%` }}
                      />
                    </div>
                  )}

                  <div className="p-6 space-y-5">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                      {paper.title}
                    </h3>

                    {/* Status + Volume/Issue */}
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-4 py-1.5 text-sm font-medium",
                          config.textColor
                        )}
                      >
                        {config.label}
                      </Badge>

                      {paper.volume && (
                        <Badge variant="secondary">Vol. {paper.volume.name}</Badge>
                      )}
                      {paper.issue && (
                        <Badge variant="secondary">Issue {paper.issue.issueNumber}</Badge>
                      )}
                    </div>

                    {/* Rejected message (no progress steps, no buttons) */}
                    {isRejected ? (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center space-y-3">
                        <p className="text-xl font-semibold text-red-800">
                          Paper Rejected
                        </p>
                        <p className="text-red-700">
                          Your submission did not meet the criteria for publication.
                        </p>
                        <p className="text-red-600 text-sm pt-2">
                          Please contact the journal for feedback or clarification.
                        </p>
                      </div>
                    ) : (
                      /* Normal progress steps + buttons */
                      <>
                        {/* Progress Steps with Connecting Line */}
                        <div className="relative pt-2 pb-6">
                          {/* Connecting line */}
                          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />
                          <div
                            className="absolute top-4 left-0 h-0.5 bg-green-500 transition-all duration-700"
                            style={{ width: `${config.percent}%` }}
                          />

                          <div className="flex justify-between relative z-10 bottom-2">
                            {STATUS_STEPS.map((step, idx) => {
                              const isActive = paper.status === step;
                              const isCompleted = idx <= currentStepIndex;

                              return (
                                <div key={step} className="flex flex-col items-center">
                                  <div
                                    className={cn(
                                      "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold shadow-sm",
                                      isActive || isCompleted
                                        ? "bg-green-600 border-green-600 text-white"
                                        : "bg-gray-100 border-gray-300 text-gray-500"
                                    )}
                                  >
                                    {idx + 1}
                                  </div>
                                  <span className="text-[11px] mt-2 text-muted-foreground whitespace-nowrap">
                                    {step === 'UNDER_REVIEW' ? 'Review' : step.charAt(0) + step.slice(1).toLowerCase()}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                          <a
                            href={paper.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            View PDF
                          </a>
                          <a
                            href={paper.pdfUrl}
                            download
                            className="flex-1 inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}