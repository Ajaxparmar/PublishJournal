// // import Header from '@/components/Header';
// // import Footer from '@/components/Footer';
// // import { Archive, Calendar, Search, Download, BookOpen } from 'lucide-react';

// // export default function ArchivesPage() {
// //   const volumes = [
// //     {
// //       year: 2026,
// //       volume: 21,
// //       issues: [
// //         { issue: 1, period: 'Jan-Jun', articles: 4, published: 'January 15, 2026', current: true },
// //       ],
// //     },
// //     {
// //       year: 2025,
// //       volume: 20,
// //       issues: [
// //         { issue: 2, period: 'Jul-Dec', articles: 6, published: 'July 10, 2025' },
// //         { issue: 1, period: 'Jan-Jun', articles: 5, published: 'January 20, 2025' },
// //       ],
// //     },
// //     {
// //       year: 2024,
// //       volume: 19,
// //       issues: [
// //         { issue: 2, period: 'Jul-Dec', articles: 7, published: 'July 15, 2024' },
// //         { issue: 1, period: 'Jan-Jun', articles: 6, published: 'January 18, 2024' },
// //       ],
// //     },
// //     {
// //       year: 2023,
// //       volume: 18,
// //       issues: [
// //         { issue: 2, period: 'Jul-Dec', articles: 8, published: 'July 12, 2023' },
// //         { issue: 1, period: 'Jan-Jun', articles: 7, published: 'January 22, 2023' },
// //       ],
// //     },
// //     {
// //       year: 2022,
// //       volume: 17,
// //       issues: [
// //         { issue: 4, period: 'Oct-Dec', articles: 5, published: 'October 10, 2022' },
// //         { issue: 3, period: 'Jul-Sep', articles: 6, published: 'July 15, 2022' },
// //         { issue: 2, period: 'Apr-Jun', articles: 5, published: 'April 20, 2022' },
// //         { issue: 1, period: 'Jan-Mar', articles: 6, published: 'January 25, 2022' },
// //       ],
// //     },
// //     {
// //       year: 2021,
// //       volume: 16,
// //       issues: [
// //         { issue: 4, period: 'Oct-Dec', articles: 7, published: 'October 12, 2021' },
// //         { issue: 3, period: 'Jul-Sep', articles: 6, published: 'July 18, 2021' },
// //         { issue: 2, period: 'Apr-Jun', articles: 5, published: 'April 15, 2021' },
// //         { issue: 1, period: 'Jan-Mar', articles: 6, published: 'January 20, 2021' },
// //       ],
// //     },
// //   ];

// //   const specialIssues = [
// //     {
// //       title: 'Digital Transformation in Organizations',
// //       volume: 20,
// //       issue: 'Special Issue',
// //       year: 2024,
// //       guest_editors: ['Dr. John Smith', 'Dr. Sarah Lee'],
// //       published: 'April 2024',
// //     },
// //     {
// //       title: 'Organizational Resilience in Crisis',
// //       volume: 19,
// //       issue: 'Special Issue',
// //       year: 2024,
// //       guest_editors: ['Prof. Michael Brown', 'Dr. Lisa Wang'],
// //       published: 'February 2024',
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
// //       <Header />
      
// //       <main className="container mx-auto px-4 py-12">
// //         {/* Page Header */}
// //         <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
// //           <div className="flex items-center mb-6">
// //             <Archive className="w-12 h-12 text-blue-600 mr-4" />
// //             <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Archives</h1>
// //           </div>
// //           <p className="text-xl text-gray-600 leading-relaxed">
// //             Browse all published issues of the International Journal of Interdisciplinary Organizational Studies
// //           </p>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           <div className="lg:col-span-2 space-y-8">
// //             {/* Search Section */}
// //             <section className="bg-white rounded-2xl shadow-lg p-8">
// //               <div className="flex items-center mb-6">
// //                 <Search className="w-6 h-6 text-blue-600 mr-3" />
// //                 <h2 className="text-2xl font-bold text-gray-900">Search Archives</h2>
// //               </div>
// //               <div className="flex gap-4">
// //                 <input
// //                   type="text"
// //                   placeholder="Search by title, author, keyword..."
// //                   className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
// //                 />
// //                 <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
// //                   Search
// //                 </button>
// //               </div>
// //             </section>
// //             {/* Regular Issues by Year */}
// //             <section>
// //               <h2 className="text-3xl font-bold text-gray-900 mb-6">Browse by Year</h2>
// //               <div className="space-y-6">
// //                 {volumes.map((volumeData) => (
// //                   <div 
// //                     key={volumeData.year}
// //                     className="bg-white rounded-2xl shadow-lg p-8"
// //                   >
// //                     <div className="flex items-center justify-between mb-6">
// //                       <div className="flex items-center">
// //                         <Calendar className="w-8 h-8 text-blue-600 mr-3" />
// //                         <h3 className="text-2xl font-bold text-gray-900">
// //                           {volumeData.year} - Volume {volumeData.volume}
// //                         </h3>
// //                       </div>
// //                       <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
// //                         {volumeData.issues.length} Issue{volumeData.issues.length > 1 ? 's' : ''}
// //                       </span>
// //                     </div>

// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                       {volumeData.issues.map((issue) => (
// //                         <div 
// //                           key={issue.issue}
// //                           className={`border-2 rounded-xl p-6 hover:shadow-md transition-all ${
// //                             issue.current 
// //                               ? 'border-green-500 bg-green-50' 
// //                               : 'border-gray-200 bg-gray-50'
// //                           }`}
// //                         >
// //                           {'current' in issue && issue.current && (
// //                             <span className="inline-block bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold mb-3">
// //                               CURRENT ISSUE
// //                             </span>
// //                           )}
// //                           <h4 className="text-lg font-bold text-gray-900 mb-2">
// //                             Issue {issue.issue}
// //                           </h4>
// //                           <p className="text-sm text-gray-600 mb-1">{issue.period}</p>
// //                           <p className="text-xs text-gray-500 mb-3">Published: {issue.published}</p>
// //                           <p className="text-sm text-gray-700 mb-4">
// //                             <strong>{issue.articles}</strong> articles
// //                           </p>
// //                           <div className="flex gap-2">
// //                             <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
// //                               View Issue
// //                             </button>
// //                             <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
// //                               <Download className="w-4 h-4" />
// //                             </button>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </section>

// //             {/* Historical Note */}
// //             <section className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl shadow-lg p-8 text-white">
// //               <h3 className="text-2xl font-bold mb-4">Archive History</h3>
// //               <div className="space-y-3 text-gray-200">
// //                 <p>
// //                   <strong className="text-white">Collection Founded:</strong> 2006
// //                 </p>
// //                 <p>
// //                   <strong className="text-white">Serial Founded:</strong> 2013 (Volume 8)
// //                 </p>
// //                 <p>
// //                   <strong className="text-white">Total Volumes:</strong> 21 (2013-2026)
// //                 </p>
// //                 <p>
// //                   <strong className="text-white">Publication Frequency:</strong> Quarterly (2013-2017), Monthly (2018-Present)
// //                 </p>
// //                 <p className="text-sm pt-4 border-t border-gray-600">
// //                   Earlier volumes (2006-2012) were published under the Interdisciplinary Social Sciences 
// //                   Journal Collection before the journal was established as a separate serial.
// //                 </p>
// //               </div>
// //             </section>
// //           </div>

// //           {/* Sidebar */}
// //           <div className="lg:col-span-1 space-y-6">
// //             {/* Quick Stats */}
// //             <div className="bg-white rounded-2xl shadow-lg p-6">
// //               <h3 className="text-xl font-bold text-gray-900 mb-4">Archive Statistics</h3>
// //               <div className="space-y-4">
// //                 <div className="border-l-4 border-blue-600 pl-4">
// //                   <p className="text-sm text-gray-500">Total Volumes</p>
// //                   <p className="text-3xl font-bold text-gray-900">21</p>
// //                 </div>
// //                 <div className="border-l-4 border-blue-600 pl-4">
// //                   <p className="text-sm text-gray-500">Total Issues</p>
// //                   <p className="text-3xl font-bold text-gray-900">50+</p>
// //                 </div>
// //                 <div className="border-l-4 border-blue-600 pl-4">
// //                   <p className="text-sm text-gray-500">Total Articles</p>
// //                   <p className="text-3xl font-bold text-gray-900">300+</p>
// //                 </div>
// //                 <div className="border-l-4 border-blue-600 pl-4">
// //                   <p className="text-sm text-gray-500">Years Published</p>
// //                   <p className="text-3xl font-bold text-gray-900">20</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Browse Options */}
// //             <div className="bg-white rounded-2xl shadow-lg p-6">
// //               <h3 className="text-xl font-bold text-gray-900 mb-4">Browse By</h3>
// //               <div className="space-y-2">
// //                 <button className="w-full text-left bg-blue-50 text-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors">
// //                   → By Year
// //                 </button>
// //                 <button className="w-full text-left bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
// //                   → By Volume
// //                 </button>
// //                 <button className="w-full text-left bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
// //                   → By Author
// //                 </button>
// //                 <button className="w-full text-left bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
// //                   → By Subject
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Access Info */}
// //             <div className="bg-green-50 border-l-4 border-green-600 rounded-r-2xl shadow-lg p-6">
// //               <h3 className="text-xl font-bold text-gray-900 mb-3">Open Access</h3>
// //               <p className="text-gray-700 text-sm mb-3">
// //                 All archived issues are freely available as open access under the CC BY 4.0 license.
// //               </p>
// //               <ul className="space-y-2 text-sm text-gray-700">
// //                 <li className="flex items-start">
// //                   <span className="text-green-600 mr-2">✓</span>
// //                   <span>Read articles online</span>
// //                 </li>
// //                 <li className="flex items-start">
// //                   <span className="text-green-600 mr-2">✓</span>
// //                   <span>Download PDFs</span>
// //                 </li>
// //                 <li className="flex items-start">
// //                   <span className="text-green-600 mr-2">✓</span>
// //                   <span>Share freely</span>
// //                 </li>
// //                 <li className="flex items-start">
// //                   <span className="text-green-600 mr-2">✓</span>
// //                   <span>No registration required</span>
// //                 </li>
// //               </ul>
// //             </div>

// //             {/* RSS Feed */}
// //             <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
// //               <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
// //               <p className="text-orange-100 text-sm mb-4">
// //                 Subscribe to our RSS feed to get notified of new issues.
// //               </p>
// //               <button className="w-full bg-white text-orange-600 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
// //                 Subscribe to RSS
// //               </button>
// //             </div>

// //             {/* Help */}
// //             <div className="bg-white rounded-2xl shadow-lg p-6">
// //               <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
// //               <div className="space-y-2">
// //                 <a href="/support" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
// //                   → Contact Support
// //                 </a>
// //                 <a href="/for-readers" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
// //                   → For Readers
// //                 </a>
// //                 <a href="/abstracting-and-indexing" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
// //                   → Indexing Info
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
      
// //       <Footer />
// //     </div>
// //   );
// // }


// // app/archives/page.tsx
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { Archive, Calendar, Search, Download } from 'lucide-react';
// import Link from 'next/link';

// interface Issue {
//   id: string;
//   issueNumber: string;
//   year: number;
//   period: string;
//   description: string;
//   _count: { papers: number };
// }

// interface Volume {
//   id: string;
//   name: string;
//   description: string;
//   years: string;
//   issues: Issue[];
//   _count: { papers: number };
// }

// async function getVolumes() {
//   try {
//     const res = await fetch('http://localhost:3000/api/volumes', {
//       cache: 'no-store',
//     });

//     if (!res.ok) throw new Error('Failed to fetch volumes');

//     const json = await res.json();
//     let volumesData: Volume[] = [];

//     if (json.success && typeof json.message === 'string') {
//       volumesData = JSON.parse(json.message);
//     } else if (Array.isArray(json)) {
//       volumesData = json;
//     } else if (json.data && Array.isArray(json.data)) {
//       volumesData = json.data;
//     }

//     return volumesData;
//   } catch (error) {
//     console.error('Error fetching volumes:', error);
//     return [];
//   }
// }

// export default async function ArchivesPage() {
//   const volumes = await getVolumes();

//   // Sort newest → oldest + filter out volumes with no issues that have papers
//   const sortedVolumes = [...volumes]
//     .map((volume) => ({
//       ...volume,
//       issues: volume.issues.filter((issue) => (issue._count?.papers ?? 0) > 0),
//     }))
//     .filter((volume) => volume.issues.length > 0)
//     .sort((a, b) => parseInt(b.years || '0') - parseInt(a.years || '0'));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
//       <Header />

//       <main className="container mx-auto px-4 py-12">
//         <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
//           <div className="flex items-center mb-6">
//             <Archive className="w-12 h-12 text-blue-600 mr-4" />
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Archives</h1>
//           </div>
//           <p className="text-xl text-gray-600 leading-relaxed">
//             Browse all published issues of the International Journal of Interdisciplinary Organizational Studies
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-8">
//             <section className="bg-white rounded-2xl shadow-lg p-8">
//               <div className="flex items-center mb-6">
//                 <Search className="w-6 h-6 text-blue-600 mr-3" />
//                 <h2 className="text-2xl font-bold text-gray-900">Search Archives</h2>
//               </div>
//               <div className="flex gap-4">
//                 <input
//                   type="text"
//                   placeholder="Search by title, author, keyword..."
//                   className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                 />
//                 <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
//                   Search
//                 </button>
//               </div>
//             </section>

//             <section>
//               <h2 className="text-3xl font-bold text-gray-900 mb-6">Volumes</h2>

//               {sortedVolumes.length === 0 ? (
//                 <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-500">
//                   No volumes with published articles available at the moment.
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   {sortedVolumes.map((volume) => (
//                     <div key={volume.id} className="bg-white rounded-2xl shadow-lg p-8">
//                       <div className="flex items-center justify-between mb-6">
//                         <div className="flex items-center">
//                           <Calendar className="w-8 h-8 text-blue-600 mr-3" />
//                           <h3 className="text-2xl font-bold text-gray-900">
//                             {volume.years} – {volume.name}
//                           </h3>
//                         </div>
//                         <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
//                           {volume.issues.length} Issue{volume.issues.length !== 1 ? 's' : ''}
//                         </span>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {volume.issues.map((issue) => (
//                           <div
//                             key={issue.id}
//                             className="border-2 border-gray-200 bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all"
//                           >
//                             <h4 className="text-lg font-bold text-gray-900 mb-2">
//                               Issue {issue.issueNumber}
//                             </h4>
//                             <p className="text-sm text-gray-600 mb-1">{issue.period}</p>
//                             <p className="text-xs text-gray-500 mb-3">
//                               {issue.description || 'No description available'}
//                             </p>
//                             <p className="text-sm text-gray-700 mb-4">
//                               <strong>{issue._count?.papers ?? 0}</strong> articles
//                             </p>

//                             <div className="flex gap-2">
//                               <Link href={`/pages/Archives/issue/${issue.id}`} className="flex-1">
//                                 <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
//                                   View Issue
//                                 </button>
//                               </Link>
//                               <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
//                                 <Download className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </section>
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* ... your existing sidebar content goes here ... */}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// app/archives/page.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Archive, Calendar, Search as SearchIcon, Download } from 'lucide-react';
import Link from 'next/link';
import SearchSection from '@/components/SearchSection'; // ← new client component (create below)

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
  _count: { papers: number };
}

async function getVolumes(): Promise<Volume[]> {
  try {
    const res = await fetch('http://localhost:3001/api/volumes', {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch volumes');

    const json = await res.json();
    let volumesData: Volume[] = [];

    if (json.success && typeof json.message === 'string') {
      volumesData = JSON.parse(json.message);
    } else if (Array.isArray(json)) {
      volumesData = json;
    } else if (json.data && Array.isArray(json.data)) {
      volumesData = json.data;
    }

    return volumesData;
  } catch (error) {
    console.error('Error fetching volumes:', error);
    return [];
  }
}

export default async function ArchivesPage() {
  const volumes = await getVolumes();

  // Pre-filter volumes with at least one issue that has papers + sort newest first
  const sortedVolumes = [...volumes]
    .map((volume) => ({
      ...volume,
      issues: volume.issues.filter((issue) => (issue._count?.papers ?? 0) > 0),
    }))
    .filter((volume) => volume.issues.length > 0)
    .sort((a, b) => parseInt(b.years || '0') - parseInt(a.years || '0'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <div className="flex items-center mb-6">
            <Archive className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Archives</h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Browse all published issues of the International Journal of Engineering Education
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Pass data to client component for interactive search */}
            <SearchSection initialVolumes={sortedVolumes} />

            {/* Optional: show total count or something */}
            <section>
          

              {sortedVolumes.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-500">
                  No volumes with published articles available at the moment.
                </div>
              ) : null}
            </section>
          </div>

          {/* Sidebar – add your content or keep the previous one */}
          <div className="lg:col-span-1 space-y-6">
            {/* ... your sidebar blocks ... */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}