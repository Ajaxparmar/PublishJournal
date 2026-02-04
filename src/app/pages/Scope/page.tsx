import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Target, BookOpen, Users, Lightbulb, TrendingUp, Globe } from 'lucide-react';

export default function ScopePage() {
  const researchAreas = [
    {
      category: 'Organizational Behavior',
      topics: [
        'Leadership and management',
        'Employee motivation and engagement',
        'Organizational culture and climate',
        'Team dynamics and collaboration',
        'Organizational change and development',
      ],
    },
    {
      category: 'Strategic Management',
      topics: [
        'Strategic planning and implementation',
        'Competitive advantage',
        'Innovation management',
        'Corporate governance',
        'Organizational performance',
      ],
    },
    {
      category: 'Human Resource Management',
      topics: [
        'Talent management and recruitment',
        'Training and development',
        'Performance management',
        'Employee relations',
        'Diversity and inclusion',
      ],
    },
    {
      category: 'Organizational Theory',
      topics: [
        'Organizational structure and design',
        'Institutional theory',
        'Organizational learning',
        'Knowledge management',
        'Systems theory',
      ],
    },
    {
      category: 'Social Sciences',
      topics: [
        'Organizational sociology',
        'Psychology of organizations',
        'Political science perspectives',
        'Economic approaches',
        'Anthropological studies',
      ],
    },
    {
      category: 'Technology & Innovation',
      topics: [
        'Digital transformation',
        'Information systems',
        'Technology adoption',
        'Innovation processes',
        'Organizational technology',
      ],
    },
  ];

  const approaches = [
    {
      icon: BookOpen,
      title: 'Theoretical',
      description: 'Developing new theories and frameworks for understanding organizations',
    },
    {
      icon: Lightbulb,
      title: 'Empirical',
      description: 'Evidence-based research using quantitative and qualitative methods',
    },
    {
      icon: Users,
      title: 'Applied',
      description: 'Practical solutions to real-world organizational challenges',
    },
    {
      icon: Globe,
      title: 'Interdisciplinary',
      description: 'Integrating perspectives from multiple disciplines',
    },
  ];

  const articleTypes = [
    'Original Research Articles',
    'Review Articles',
    'Theoretical Papers',
    'Case Studies',
    'Methodological Papers',
    'Research Notes',
    'Book Reviews',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <div className="flex items-center mb-6">
            <Target className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Focus & Scope</h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our journal covers interdisciplinary research in organizational studies, exploring the social dynamics 
            of public, community, and privately owned organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Main Focus */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3 inline-block">
                Journal Focus
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  The <strong>International Journal of Interdisciplinary Organizational Studies</strong> provides 
                  a forum for research that explores new possibilities in knowledge, culture, and change management 
                  within the broader context of the nature and future of organizations and their impact on society.
                </p>
                
                <p>
                  We seek to build an epistemic community that makes linkages across disciplinary, geographic, and 
                  cultural boundaries. The journal is defined by our commitment to interdisciplinary dialogue and 
                  motivated to build strategies for action framed by shared themes and tensions in organizational 
                  studies.
                </p>

                <p>
                  Our scope encompasses theoretical, empirical, and applied research that contributes to understanding 
                  organizations from multiple perspectives. We welcome both qualitative and quantitative approaches, 
                  as well as mixed-methods research.
                </p>
              </div>
            </section>

            {/* Research Approaches */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3 inline-block">
                Research Approaches
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {approaches.map((approach) => (
                  <div 
                    key={approach.title}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                  >
                    <approach.icon className="w-10 h-10 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{approach.title}</h3>
                    <p className="text-gray-700">{approach.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Research Areas */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3 inline-block">
                Research Areas
              </h2>
              <div className="space-y-6">
                {researchAreas.map((area) => (
                  <div key={area.category} className="border-l-4 border-blue-600 pl-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{area.category}</h3>
                    <ul className="space-y-2">
                      {area.topics.map((topic) => (
                        <li key={topic} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Disciplinary Scope */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3 inline-block">
                Interdisciplinary Scope
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  We accept submissions from a wide range of disciplines that contribute to understanding organizations:
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
                {[
                  'Computer Science',
                  'Physics',
                  'Chemistry',
                  'Earth Sciences',
                  'Engineering',
                  'Mathematics',
                  'Education',
                  'Literature',
                  'Social Science',
                  'Political Science',
                  'Medical Science',
                  'Law',
                  'Philosophy',
                  'Economics',
                  'Psychology',
                  'Sociology',
                ].map((discipline) => (
                  <div 
                    key={discipline}
                    className="bg-blue-50 rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-blue-100 transition-colors text-center"
                  >
                    {discipline}
                  </div>
                ))}
              </div>
            </section>

            {/* Article Types */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3 inline-block">
                Types of Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articleTypes.map((type) => (
                  <div 
                    key={type}
                    className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-colors"
                  >
                    <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-900 font-medium">{type}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Key Themes */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Key Themes</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-200 mr-2">▸</span>
                  <span>Knowledge Management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-200 mr-2">▸</span>
                  <span>Organizational Culture</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-200 mr-2">▸</span>
                  <span>Change Management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-200 mr-2">▸</span>
                  <span>Leadership</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-200 mr-2">▸</span>
                  <span>Innovation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-200 mr-2">▸</span>
                  <span>Social Impact</span>
                </li>
              </ul>
            </div>

            {/* Submission Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">For Authors</h3>
              <p className="text-gray-700 text-sm mb-4">
                Interested in submitting to our journal?
              </p>
              <div className="space-y-2">
                <a 
                  href="/submit"
                  className="block bg-blue-600 text-white text-center px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Submit Paper
                </a>
                <a 
                  href="/author-guidelines"
                  className="block bg-gray-200 text-gray-700 text-center px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Author Guidelines
                </a>
              </div>
            </div>

            {/* Publication Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Publication Details</h3>
              <div className="space-y-3 text-sm">
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-gray-500">Frequency</p>
                  <p className="font-semibold text-gray-900">Monthly</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-gray-500">Review Process</p>
                  <p className="font-semibold text-gray-900">Peer-Reviewed</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-gray-500">Access</p>
                  <p className="font-semibold text-gray-900">Open Access</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-gray-500">Languages</p>
                  <p className="font-semibold text-gray-900">Multiple (English primary)</p>
                </div>
              </div>
            </div>

            {/* Related Pages */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Pages</h3>
              <div className="space-y-2">
                <a href="/about" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → About IJOS
                </a>
                <a href="/editorial-policies" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → Editorial Policies
                </a>
                <a href="/publication-ethics" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → Publication Ethics
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}