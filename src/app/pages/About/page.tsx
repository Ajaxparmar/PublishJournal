import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, Users, Globe, Award, Target, Eye } from 'lucide-react';

export default function AboutPage() {
  const milestones = [
    { year: '2006', event: 'Collection Founded' },
    { year: '2013', event: 'Serial Founded (Volume 8)' },
    { year: '2021', event: 'Moved to Organization Studies Research Network' },
    { year: '2024', event: 'Continued Growth and Excellence' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To build an epistemic community that makes linkages across disciplinary, geographic, and cultural boundaries in the study of organizations.',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To be the leading journal exploring new possibilities in knowledge, culture and change management within organizations.',
    },
    {
      icon: Globe,
      title: 'Our Reach',
      description: 'Connecting scholars worldwide to discuss important issues related to organizational dynamics and scientific activities.',
    },
    {
      icon: Award,
      title: 'Our Standards',
      description: 'Publishing only original, peer-reviewed articles that have international importance and scientific merit.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <div className="flex items-center mb-6">
            <BookOpen className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About IJOS</h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            International Journal of Interdisciplinary Organizational Studies
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3 inline-block">
                Overview
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  The <strong>International Journal of Interdisciplinary Organizational Studies</strong> explores 
                  the social dynamics of public, community, and privately owned organizations. We come together 
                  around a common concern for, and a shared interest to explore, new possibilities in knowledge, 
                  culture and change management, within the broader context of the nature and future of organizations 
                  and their impact on society.
                </p>
                
                <p>
                  The journal stemmed from the themed journal collection of Common Grounds Interdisciplinary 
                  Social Sciences Research Network. The Interdisciplinary Social Sciences Journal Collection was 
                  founded in 2006. In 2021, the International Journal of Interdisciplinary Organizational Studies 
                  was moved from the interdisciplinary network to become the premiere journal for the Organization 
                  Studies Research Network.
                </p>
                
                <p>
                  The Journal is meant to serve as a means of communication and discussion of important issues 
                  related to scientific activities. We seek to build an epistemic community to make linkages 
                  across disciplinary, geographic, and cultural boundaries.
                </p>

                <p>
                  The Journal publishes only original articles in different languages which have international 
                  importance. In addition to full-length research articles, the Journal also publishes review 
                  articles. Papers can be focused on fundamental research leading to new methods, or adaptation 
                  of existing methods for new applications.
                </p>

                <p>
                  Articles for the Journal are peer-reviewed by third-party reviewers who are selected from 
                  among specialists in the subject matter of peer-reviewed materials. The Journal is a kind of 
                  forum for discussing issues and problems facing science and scholars, as well as an effective 
                  means of interaction between the members of the academic community.
                </p>

                <p>
                  The Journal is read by a large number of scholars, and the circulation of the journal is 
                  constantly growing. Articles containing fundamental or applied scientific results in all areas 
                  of research are accepted for consideration.
                </p>
              </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3 inline-block">
                Our Mission & Vision
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value) => (
                  <div 
                    key={value.title}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                  >
                    <value.icon className="w-10 h-10 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-700">{value.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* History Timeline */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3 inline-block">
                Our History
              </h2>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div 
                    key={milestone.year}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 font-bold">
                      {milestone.year}
                    </div>
                    <div className="flex-1 pt-3">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-gray-900 font-semibold">{milestone.event}</p>
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-1 h-8 bg-blue-200 ml-7 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Editorial Board */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3 inline-block">
                Editorial Board
              </h2>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white mb-6">
                <div className="flex items-center mb-4">
                  <Users className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold">Leadership</h3>
                </div>
                <p className="text-blue-100 mb-2">
                  The Editorial Board composes of 25 distinguished members from around the world.
                </p>
                <p className="text-lg font-semibold">
                  Chaired by: <span className="text-blue-100">Academician Dr. Spencer S Stober</span>
                </p>
              </div>
              <p className="text-gray-700">
                Our editorial board consists of internationally recognized experts in organizational studies, 
                management, social sciences, and related fields. Board members are selected for their expertise, 
                research contributions, and commitment to advancing interdisciplinary scholarship.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Facts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-sm text-gray-500">Founded</p>
                  <p className="font-semibold text-gray-900">2006 (Collection)</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-sm text-gray-500">Serial Start</p>
                  <p className="font-semibold text-gray-900">2013 (Volume 8)</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-sm text-gray-500">Frequency</p>
                  <p className="font-semibold text-gray-900">Monthly</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-sm text-gray-500">ISSN Online</p>
                  <p className="font-semibold text-gray-900 font-mono">2324-7657</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-sm text-gray-500">Impact Factor</p>
                  <p className="font-semibold text-gray-900">7.89</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-sm text-gray-500">Board Members</p>
                  <p className="font-semibold text-gray-900">25</p>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-3 text-sm">
                <p className="font-semibold">Prof. Tracey L. Brown</p>
                <p className="text-blue-100">540 Upland Avenue</p>
                <p className="text-blue-100">Reading, PA 19611</p>
                <p className="text-blue-100">Phone: 610-796-8270</p>
                <a 
                  href="mailto:office@cg-scholar-organizationalstudies.org"
                  className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 mt-2"
                >
                  Email Us
                </a>
              </div>
            </div>

            {/* Related Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Links</h3>
              <div className="space-y-2">
                <a href="/editorial-team" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → Editorial Team
                </a>
                <a href="/editorial-policies" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → Editorial Policies
                </a>
                <a href="/focus-and-scope" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → Focus & Scope
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