import { Megaphone, CheckCircle, DollarSign, FileText, Users } from 'lucide-react';
import Link from 'next/link';

export default function AnnouncementsSection() {
  const scopes = [
    'Computer and Information Science',
    'Physics',
    'Chemistry',
    'Earth Sciences',
    'Electrical and Electronic Engineering',
    'Engineering',
    'Environmental Sciences',
    'Materials Science',
    'Mathematics',
    'Education',
    'Literature',
    'Social Science',
    'Material Science',
    'Political Science',
    'Medical Science',
    'Law',
    'Philosophy',
  ];

  const requirements = [
    {
      icon: FileText,
      title: 'Article Template',
      description: 'Articles must be prepared according to the provided template',
    },
    {
      icon: Users,
      title: 'Maximum Authors',
      description: 'Each article should have no more than 6 authors',
    },
    {
      icon: CheckCircle,
      title: 'Recent References',
      description: 'Study based on references from 2017-2023',
    },
    {
      icon: DollarSign,
      title: 'Article Processing Charge',
      description: 'USD 400.00 / EUR 350 (after acceptance)',
    },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
      <div className="flex items-center mb-6">
        <Megaphone className="w-8 h-8 text-blue-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-blue-600 pb-3 inline-block">
          Announcements
        </h2>
      </div>

      {/* Main Announcement */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white mb-8 shadow-lg">
        <h3 className="text-2xl font-bold mb-3">
          Submission open for Volume 19 No. 1, 2024
        </h3>
        <p className="text-blue-100 mb-4">
          We invite you to submit your paper to our journal. Please submit your manuscript through 
          our Online Submission System or directly to the chief editors e-mail.
        </p>
        <Link 
          href="/submit"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
        >
          Submit Your Paper
        </Link>
      </div>

      {/* Requirements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {requirements.map((req) => (
          <div 
            key={req.title}
            className="flex items-start space-x-4 bg-gray-50 rounded-xl p-5 hover:bg-blue-50 transition-colors duration-200"
          >
            <div className="bg-blue-600 rounded-lg p-3 flex-shrink-0">
              <req.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">{req.title}</h4>
              <p className="text-sm text-gray-600">{req.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-6 mb-8">
        <h4 className="font-bold text-gray-900 mb-3">Important Requirements:</h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">•</span>
            <span>The English language of the paper needs academic editing and proofreading</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">•</span>
            <span>Articles that are not edited by native English speakers are not allowed for publication</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">•</span>
            <span>The editorial team provides academic proofreading services at additional cost</span>
          </li>
          <li className="flex items-start">
            <span className="text-yellow-600 mr-2">•</span>
            <span>All articles published are open access and freely available online</span>
          </li>
        </ul>
      </div>

      {/* Accepted Scopes */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          The scopes of accepted papers include:
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {scopes.map((scope) => (
            <div 
              key={scope}
              className="bg-blue-50 rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-blue-100 transition-colors duration-200 text-center"
            >
              {scope}
            </div>
          ))}
        </div>
      </div>

      {/* Template Download */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h4 className="font-bold text-gray-900 mb-3">Download Article Template:</h4>
        <div className="flex flex-wrap gap-4">
          <a 
            href="/docs/template.doc"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            <FileText className="w-5 h-5 mr-2" />
            Download Template (.doc)
          </a>
          <a 
            href="mailto:office@cg-scholar-organizationalstudies.org"
            className="inline-flex items-center bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
          >
            Submit via Email
          </a>
        </div>
      </div>
    </section>
  );
}