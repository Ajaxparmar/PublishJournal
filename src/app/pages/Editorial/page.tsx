import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Target, BookOpen, Users, Lightbulb, TrendingUp, Globe } from 'lucide-react';

export default function ScopePage() {
  const researchAreas = [
    {
      category: 'Journal of Engineering Education',
      topics: [
        '',
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


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* Research Areas */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3 text-center">
                Editorial Board

              </h2>



              <div className="space-y-10 text-gray-800">
                {/* Co-Editors */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">
                    Co-Editors
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex flex-col">
                      <span className="font-bold">David Knight</span>
                      <span className="text-gray-900">Virginia Tech</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-bold">Joyce Main</span>
                      <span className="text-gray-900">Purdue University</span>
                    </li>
                  </ul>
                </div>

                {/* Deputy Editors */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">
                    Deputy Editors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <span className="font-medium">Tua Björklund</span><br />
                      <span className="text-gray-600">Aalto University</span>
                    </div>
                    <div>
                      <span className="font-medium">Adam Carberry</span><br />
                      <span className="text-gray-600">Arizona State University</span>
                    </div>
                    <div>
                      <span className="font-medium">James Huff</span><br />
                      <span className="text-gray-600">University of Georgia</span>
                    </div>
                    <div>
                      <span className="font-medium">Alejandra Magana</span><br />
                      <span className="text-gray-600">Purdue University</span>
                    </div>
                    <div>
                      <span className="font-medium">Kristen Wendell</span><br />
                      <span className="text-gray-600">Tufts University</span>
                    </div>
                  </div>
                </div>

                {/* Senior Associate Editors */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">
                    Senior Associate Editors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <span className="font-medium">Olusola O. Adesope</span><br />
                      <span className="text-gray-600">Washington State University</span>
                    </div>
                    <div>
                      <span className="font-medium">Catherine Berdanier</span><br />
                      <span className="text-gray-600">Penn State University</span>
                    </div>
                    <div>
                      <span className="font-medium">Milo Koretsky</span><br />
                      <span className="text-gray-600">Tufts University</span>
                    </div>
                    <div>
                      <span className="font-medium">Angela Minichiello</span><br />
                      <span className="text-gray-600">Utah State University</span>
                    </div>
                  </div>
                </div>

                {/* Associate Editors */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">
                    Associate Editors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <span className="font-medium">Benjamin Ahn</span><br />
                      <span className="text-gray-600">Ohio State University</span>
                    </div>
                    <div>
                      <span className="font-medium">Saira Anwar</span><br />
                      <span className="text-gray-600">Texas A&M University</span>
                    </div>
                    <div>
                      <span className="font-medium">Samantha Brunhaver</span><br />
                      <span className="text-gray-600">Arizona State University</span>
                    </div>
                    <div>
                      <span className="font-medium">Cecilia KY Chan</span><br />
                      <span className="text-gray-600">The University of Hong Kong</span>
                    </div>
                    <div>
                      <span className="font-medium">Inês Direito</span><br />
                      <span className="text-gray-600">University College London</span>
                    </div>
                    <div>
                      <span className="font-medium">Allison Godwin</span><br />
                      <span className="text-gray-600">Cornell University</span>
                    </div>
                    <div>
                      <span className="font-medium">Teresa Hattingh</span><br />
                      <span className="text-gray-600">Engineering Council of South Africa</span>
                    </div>
                    <div>
                      <span className="font-medium">Hsien-Yuan Hsu</span><br />
                      <span className="text-gray-600">University of Massachusetts Lowell</span>
                    </div>
                    <div>
                      <span className="font-medium">Assad Iqbal</span><br />
                      <span className="text-gray-600">Purdue University</span>
                    </div>
                    <div>
                      <span className="font-medium">Walter Lee</span><br />
                      <span className="text-gray-600">Virginia Tech</span>
                    </div>
                    <div>
                      <span className="font-medium">Cassandra McCall</span><br />
                      <span className="text-gray-600">Utah State University</span>
                    </div>
                    <div>
                      <span className="font-medium">Joel Alejandro Mejia</span><br />
                      <span className="text-gray-600">University of Texas at San Antonio</span>
                    </div>
                    <div>
                      <span className="font-medium">James Pembridge</span><br />
                      <span className="text-gray-600">Embry-Riddle Aeronautical University</span>
                    </div>
                    <div>
                      <span className="font-medium">Jacqueline Rohde</span><br />
                      <span className="text-gray-600">Georgia Tech</span>
                    </div>
                    <div>
                      <span className="font-medium">Stephen Secules</span><br />
                      <span className="text-gray-600">Florida International University</span>
                    </div>
                    <div>
                      <span className="font-medium">Roland Tormey</span><br />
                      <span className="text-gray-600">EPFL</span>
                    </div>
                    <div>
                      <span className="font-medium">Natalie Wint</span><br />
                      <span className="text-gray-600">University College London</span>
                    </div>
                    <div>
                      <span className="font-medium">Christopher Wright</span><br />
                      <span className="text-gray-600">Drexel University</span>
                    </div>
                    <div>
                      <span className="font-medium">Jiabin Zhu</span><br />
                      <span className="text-gray-600">Shanghai Jiao Tong University</span>
                    </div>
                  </div>
                </div>

                {/* Assistant Editors */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">
                    Assistant Editors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <span className="font-medium">Giselle Guanes Melgarejo</span><br />
                      <span className="text-gray-600">Ohio State University</span>
                    </div>
                    <div>
                      <span className="font-medium">Meseret Hailu</span><br />
                      <span className="text-gray-600">Arizona State University</span>
                    </div>
                    <div>
                      <span className="font-medium">Trevion Henderson</span><br />
                      <span className="text-gray-600">Tufts University</span>
                    </div>
                    <div>
                      <span className="font-medium">Madeline Polmear</span><br />
                      <span className="text-gray-600">King’s College London</span>
                    </div>
                    <div>
                      <span className="font-medium">David Reeping</span><br />
                      <span className="text-gray-600">University of Cincinnati</span>
                    </div>
                    <div>
                      <span className="font-medium">Cijy Sunny</span><br />
                      <span className="text-gray-600">Florida Gulf Coast University</span>
                    </div>
                    <div>
                      <span className="font-medium">Denver Tang</span><br />
                      <span className="text-gray-600">Tsinghua University</span>
                    </div>
                  </div>
                </div>

                {/* Immediate Past Editor */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">
                    Immediate Past Editor
                  </h3>
                  <div className="flex flex-col">
                    <span className="font-medium">Lisa Benson</span>
                    <span className="text-gray-600">Clemson University</span>
                  </div>
                </div>
              </div>

              {/* Publication Policies */}
              <div className='mt-10 bg-blue-100 rounded-2xl shadow-lg p-8'id="Plolicies">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2 text-center">
                  Publication Ethics
                </h3>

                <p className="text-gray-700 mb-4">
                  Authors publishing in JEE are encouraged to familiarize themselves with the
                  journal’s publication policies, which provide clear guidance on author
                  rights, permitted re-use, and compliance with funder mandates. These
                  policies cover key areas including manuscript sharing, licensing, and
                  copyright arrangements.
                </p>

                <p className="text-gray-700 mb-4">
                  For detailed information, please refer to the sections below or use the
                  navigation menu provided on the journal website:
                </p>

                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li>
                    <span className="font-medium">Self-Archiving Policy</span><br />
                    Information on permitted versions of manuscripts that may be deposited in
                    institutional or subject repositories, including applicable embargo
                    periods.
                  </li>

                  <li>
                    <span className="font-medium">Accepted Manuscript (AM) Terms of Use</span><br />
                    Guidelines governing the use, distribution, and citation of accepted
                    (post-peer review) manuscript versions.
                  </li>

                  <li>
                    <span className="font-medium">Funder Compliance</span><br />
                    Details on how JEE supports compliance with funder open access mandates,
                    including requirements related to licensing and repository deposit.
                  </li>

                  <li>
                    <span className="font-medium">Copyright and Licensing</span><br />
                    Explanation of copyright transfer or license-to-publish arrangements, as
                    well as available open access licenses for published articles.
                  </li>
                </ul>
              </div>



              {/* Optional CTA */}
              <div className="mt-10 text-center">

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
                  href="/pages/Submit"
                  className="block bg-blue-600 text-white text-center px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Submit Paper
                </a>
                <a
                  href="/pages/Scope/author-guidelines"
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
                  → About JEE
                </a>
                <a href="#Plolicies" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → Editorial Policies
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