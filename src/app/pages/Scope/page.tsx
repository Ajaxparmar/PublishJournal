import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Target, BookOpen, Users, Lightbulb, TrendingUp, Globe } from 'lucide-react';

export default function ScopePage() {
  const researchAreas = [
    {
      category: '',
      topics: [
        // Engineering Fields
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

        // Computer Science & IT
        'Computer Science',
        'Information Technology',
        'Software Engineering',
        'Data Structures and Algorithms',
        'Computer Networks',
        'Cybersecurity',
        'Human-Computer Interaction',

        // AI, Data Science & Emerging Tech
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

        // Mathematics & Applied Sciences
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

        // Biological & Life Sciences
        'Biology',
        'Biological Sciences',
        'Biotechnology',
        'Bioinformatics',
        'Life Sciences',

        // Educational & Learning Sciences
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

        // Management & Organizational Aspects
        'Engineering Management',
        'Project Management',
        'Organizational Studies in Engineering',
        'Innovation Management',
        'Engineering Leadership',

        // Social Sciences, Policy & Ethics
        'Social Sciences in Engineering',
        'Engineering Policy',
        'Science and Technology Studies',
    

        // Psychology & Cognitive Sciences
        'Psychology',
        'Cognitive Sciences',
        'Educational Psychology',
        'Cognitive Processes in Learning Engineering',

        // Sustainability, Ethics & Professional Development
        'Sustainability',
        'Sustainable Engineering',
        'Environmental Ethics',
        'Engineering Ethics',
        'Professional Responsibility',
        'Diversity, Equity, and Inclusion in Engineering',
        'Professional Formation of Engineers',
      ]
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
              <div className="prose prose-lg max-w-none text-gray-700 space-y-6 text-justify">
                <p>
                  The <strong>Journal of Engineering Education</strong> provides a forum for scholarly research that advances engineering education theory, practice, and policy across diverse educational levels—from pre-college through post-graduate and professional development. We cultivate, disseminate, and archive rigorous, evidence-based investigations that contribute to a coherent and cumulative body of knowledge, ultimately driving meaningful improvements in how engineering is taught, learned, assessed, and experienced worldwide.
                </p>

                <p>
                  We seek to build a global epistemic community that bridges disciplinary, institutional, geographic, and cultural boundaries. The journal is defined by our commitment to methodological rigor, intellectual integrity, and high-impact scholarship, and is motivated to foster interdisciplinary dialogue and strategies for action framed by shared themes and tensions in engineering education research.
                </p>

                <p>
                  Our scope encompasses theoretical, empirical, and applied research that contributes to understanding engineering education from multiple perspectives. We welcome qualitative, quantitative, and mixed-methods approaches, as well as replication studies, meta-analyses, and critical reviews that synthesize prior work to offer new conceptual frameworks, empirical insights, or directions for future inquiry.
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
                Scope
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