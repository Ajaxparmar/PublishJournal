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
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3 inline-block">
                Author Guidelines
              </h2>
              <div className="space-y-6">
             <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
  <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3  text-center">
    Submission Requirements
  </h2>

  <div className="prose prose-lg max-w-none text-gray-700 space-y-6 text-justify">
    <p>
      The <strong>Journal of Engineering Education (JEE)</strong> requires authors to follow these core guidelines when preparing and submitting manuscripts. These ensure scholarly rigor, methodological quality, and alignment with the journal's mission to advance engineering education research worldwide.
    </p>

    <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Manuscript Types Accepted</h3>
    <p>
      JEE publishes two main types of manuscripts: <strong>Research Articles</strong> and <strong>Review Articles</strong>. Manuscripts should report original research or theoretical developments contributing to the body of knowledge in engineering education.
    </p>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong>Research Articles</strong>: Empirical (quantitative, qualitative, or mixed-methods) or conceptual/theoretical papers with clear research questions, literature review, justified methods, detailed analysis, and implications for research and/or practice.</li>
      <li><strong>Review Articles</strong>: Critical syntheses (e.g., systematic, meta-analytic) that evaluate prior work, provide new perspectives or frameworks, and advance the field.</li>
    </ul>
    <p className="mt-4">
      Replication studies are welcome (see Benson & Borrego, 2015 guest editorial). Pure descriptions of curricular/pedagogical innovations are generally out of scope unless grounded in research. Guest editorials are solicited or submitted separately (≈1,500 words, quarterly deadlines).
    </p>

    <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Language, Style, and Formatting</h3>
    <p>
      All submissions must be in English, using the latest <strong>APA style</strong> (7th edition) for citations, references, headings, tables, and figures. Manuscripts should be double-spaced, 12-point font (preferably Times New Roman), one-column format. Use bias-free language per APA guidelines. Manuscripts should not exceed <strong>10,000 words</strong> (≈40 double-spaced pages), excluding abstract, keywords, figures, tables, and references.
    </p>

    <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Required Manuscript Sections</h3>
    <p>
      Include a structured abstract (≤250 words with subheadings: Background, Purpose/Hypothesis(es), Design/Method, Results, Conclusions for research; adapted for reviews). Provide 3–5 keywords. The main body should include:
    </p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Introduction with clear research questions/hypotheses</li>
      <li>Literature review / theoretical framework</li>
      <li>Positionality statement(s) (strongly encouraged)</li>
      <li>Methods (detailed design, data collection, analysis)</li>
      <li>Results/Findings (with tables/figures embedded)</li>
      <li>Discussion (implications, limitations, future directions)</li>
      <li>References (APA format)</li>
      <li>Statement on use of artificial intelligence (required disclosure)</li>
    </ul>

    <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Peer Review Process</h3>
    <p>
      All manuscripts undergo <strong>double-blind (anonymized) peer review</strong> by at least two independent experts. Initial editorial screening occurs within two weeks; full review typically completes in four months. Authors receive detailed feedback and may be asked to revise.
    </p>

    <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Ethical Standards</h3>
    <p>
      Submissions must be original, not under consideration elsewhere, and free of plagiarism (checked via iThenticate). Disclose conflicts of interest, funding, and any prior dissemination (e.g., conference papers, preprints). Follow ethical guidelines for human subjects research. Disclose AI tool use ethically.
    </p>

    <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Submission Process</h3>
    <p>
      Submit electronically via the <strong>Wiley Research Exchange</strong> platform linked on the journal homepage: onlinelibrarywileys.com. Include a cover letter, anonymized manuscript, title page (separate), and any supplementary files. Detailed checklists and templates are available in the portal.
    </p>

    <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Artwork, Figures, and Supporting Materials</h3>
    <p>
      Embed figures and tables in the manuscript text with clear captions. Follow Wiley guidelines for high-quality, accessible visuals (e.g., alt text, permissions for copyrighted material). Supplementary files are supported.
    </p>

    <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Publication Frequency and Indexing</h3>
    <p>
      JEE publishes quarterly (continuous online publication model). It is indexed in major databases including Scopus, Web of Science (SSCI/SCIE), Ei Compendex, INSPEC, Education Research Complete, and others for broad global visibility.
    </p>

    <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Why Publish in JEE?</h3>
    <p>
      As ASEE's flagship journal, JEE offers a recognized platform for high-impact engineering education research, rigorous peer review, editorial support, and an international readership of academics, educators, and policymakers.
    </p>
  </div>

  {/* Optional CTA */}
  <div className="mt-10 text-center">
    
  </div>
</section>
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