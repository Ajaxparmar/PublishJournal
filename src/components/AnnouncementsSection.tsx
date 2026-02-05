import { Megaphone, CheckCircle, DollarSign, FileText, Users } from 'lucide-react';
import Link from 'next/link';

export default function AnnouncementsSection() {
  const scopes = [
    // All Engineering Fields (core and specialized branches)
  'All Engineering Fields',
  'Civil Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Electronics Engineering',
  'Computer Engineering',
  'Chemical Engineering',
  'Biomedical Engineering',
  'Aerospace Engineering',
  'Environmental Engineering',
  'Industrial Engineering',
  'Materials Engineering',
  'Mining Engineering',
  'Agricultural Engineering',
  'Structural Engineering',
  'Transportation Engineering',
  'Manufacturing Engineering',
  'Petroleum Engineering',
  'Nuclear Engineering',
  'Systems Engineering',
  'Mechatronics Engineering',
  'Robotics Engineering',

  // Computer Science and Information Technology
  'Computer Science',
  'Information Technology',
  'Software Engineering',
  'Data Structures and Algorithms',
  'Computer Networks',
  'Cybersecurity',
  'Human-Computer Interaction',

  // Artificial Intelligence, Data Science, and Emerging Technologies
  'Artificial Intelligence',
  'Machine Learning',
  'Deep Learning',
  'Data Science',
  'Big Data Analytics',
  'Natural Language Processing',
  'Computer Vision',
  'Emerging Technologies',
  'Internet of Things (IoT)',
  'Blockchain',
  'Quantum Computing',

  // Mathematics and Applied Sciences
  'Mathematics',
  'Applied Mathematics',
  'Statistics',
  'Operations Research',
  'Computational Mathematics',
  'Numerical Analysis',

  // Physical Sciences
  'Physics',
  'Applied Physics',
  'Chemistry',
  'Physical Chemistry',
  'Materials Science',

  // Biological and Life Sciences
  'Biology',
  'Biological Sciences',
  'Biotechnology',
  'Bioinformatics',
  'Life Sciences',

  // Educational Sciences and Learning Sciences (core to engineering education)
  'Educational Sciences',
  'Learning Sciences',
  'Engineering Education',
  'STEM Education',
  'Science Education',
  'Technology Education',
  'Engineering Epistemologies',
  'Learning Mechanisms',
  'Assessment in Engineering',
  'Curriculum Development in Engineering',

  // Management, Business Studies, and Organizational Studies (in engineering contexts)
  'Engineering Management',
  'Project Management',
  'Organizational Studies in Engineering',
  'Innovation Management',
  'Engineering Leadership',

  // Humanities, Social Sciences, and Policy Studies (applied to engineering contexts)
  'Social Sciences in Engineering',
  'Engineering Policy',
  'Science and Technology Studies',
  'Engineering Ethics',

  // Psychology and Cognitive Sciences
  'Psychology',
  'Cognitive Sciences',
  'Educational Psychology',
  'Cognitive Processes in Learning Engineering',

  // Sustainability, Ethics, and Professional Responsibility
  'Sustainability',
  'Sustainable Engineering',
  'Environmental Ethics',
  'Engineering Ethics',
  'Professional Responsibility',
  'Diversity, Equity, and Inclusion in Engineering',
  'Professional Formation of Engineers',
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
      description: 'Study based on references from 1990-2025',
    },
    {
      icon: DollarSign,
      title: 'Article Processing Charge',
      description: 'USD $3170.00',
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
          Submission open for Volume 115 No. 1, 2026
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