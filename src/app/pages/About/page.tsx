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
      description: 'The Journal of Engineering Education serves to cultivate, disseminate, and archive scholarly research in engineering education.',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'The Journal of Engineering Education seeks to help define and shape a body of knowledge derived from scholarly research that leads to timely and significant improvements in engineering education worldwide.',
    },
    {
      icon: Globe,
      title: 'Role',
      description: 'The Journal of Engineering Education is more than a place to publish papers—it is a vital partner in the global community of stakeholders dedicated to advancing research in engineering education from pre-college to post-graduate professional education.',
    },
    {
      icon: Award,
      title: 'Research Areas',
      description: `The journal covers diverse engineering education research guided by five areas: engineering epistemologies, learning mechanisms, learning systems, diversity and inclusiveness, and assessment—examining engineering thinking, knowledge development, instructional practices, human diversity, and evaluation methods globally.`,
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About JEE</h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            International Journal of Engineering Education 
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

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6 text-justify">
                <p>
                  The <strong>Journal of Engineering Education (JEE)</strong> is a leading international, peer-reviewed scholarly journal dedicated to the advancement of engineering education research, theory, and practice. Published quarterly by Wiley on behalf of the American Society for Engineering Education (ASEE), the journal serves as a premier platform for disseminating high-impact, evidence-based research that informs how engineering is taught, learned, assessed, and governed across diverse educational and professional settings.
                </p>

                <p>
                  JEE is committed to publishing research that moves beyond descriptive accounts of educational practice to offer deep theoretical insight, methodological rigor, and clear implications for engineering education systems worldwide. The journal emphasizes scholarship that contributes to a cumulative and coherent body of knowledge, strengthening the intellectual foundations of engineering education as a distinct and mature field of inquiry.
                </p>

                <p>
                  The journal welcomes original research articles that investigate learning processes, instructional strategies, curriculum design, assessment and evaluation, institutional structures, and socio-cultural dimensions of engineering education. Contributions may draw upon learning sciences, educational psychology, cognitive science, sociology, organizational studies, policy analysis, and engineering practice, provided that the research is clearly grounded within an engineering education framework.
                </p>

                <p>
                  A defining feature of JEE is its strong emphasis on methodological quality and scholarly rigor. Published studies are expected to demonstrate robust research design, transparent analytical procedures, and verifiable and replicable evidence. Both empirical and theoretical contributions should articulate clear research questions, situate findings within existing literature, and advance understanding in ways that are meaningful for researchers, educators, and decision-makers.
                </p>

                <p>
                  JEE also plays a critical role in addressing contemporary challenges in engineering education, including equity, diversity, inclusion, ethics, sustainability, and the professional formation of engineers. The journal actively encourages research that examines how educational structures and pedagogical practices shape access, participation, identity, and success in engineering pathways.
                </p>

                <p>
                  By fostering dialogue between research, educational practice, and policy, the Journal of Engineering Education supports informed decision-making at institutional, national, and international levels. Its readership includes academic researchers, engineering educators, curriculum developers, accreditation and quality-assurance bodies, policymakers, and industry stakeholders concerned with the preparation of future engineers.
                </p>

                <p>
                  Through its commitment to scholarly excellence, intellectual integrity, and global relevance, JEE continues to shape the direction of engineering education research and to influence how engineering education evolves in response to societal, technological, and economic change.
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
                    <p className="text-gray-700 text-justify">{value.description}</p>
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
                  Chaired by: <span className="text-blue-100">David Knight</span>
                </p>
              </div>
              <p className="text-gray-700">
                The roles of the Editorial Board for the <strong>Journal of Engineering Education (JEE)</strong> are to provide expert input on manuscripts submitted to JEE and to help shape journal policy and scope. New Editorial Board members are appointed by the JEE Editor with input from other Editorial Board members. The position of Editor is typically a five-year term. Terms for Associate Editors, Senior Associate Editors, and Deputy Editors are three years in duration, and for Assistant Editors they are typically one year in duration. All these positions are renewable for one additional term, and individuals can advance from Assistant Editor to Associate Editor, and from Associate Editor to Senior Associate Editor and/or Deputy Editor. If you are interested in joining the JEE Editorial Board, please contact a current member of the Editorial Board listed below.
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
                  <p className="font-semibold text-gray-900">2000 (Collection)</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-sm text-gray-500">Serial Start</p>
                  <p className="font-semibold text-gray-900">2000 (Volume 89)</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-sm text-gray-500">Frequency</p>
                  <p className="font-semibold text-gray-900">Monthly</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-sm text-gray-500">ISSN Online</p>
                  <p className="font-semibold text-gray-900 font-mono">2168-9830</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-sm text-gray-500">Impact Factor</p>
                  <p className="font-semibold text-gray-900">3.4</p>
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
                <p className="font-semibold">David Knight</p>
                <p className="text-blue-100">101 Station Landing Suite 300</p>
                <p className="text-blue-100">Medford, MA 02155, USA</p>
                <p className="text-blue-100">Phone: +1 781 388 8508</p>
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
                <a href="/pages/Editorial" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → Editorial Team
                </a>
                <a href="/pages/Editorial" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → Editorial Policies
                </a>
                <a href="/pages/FocusAndScope" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → Focus & Scope
                </a>
                <a href="/pages/Editorial" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
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