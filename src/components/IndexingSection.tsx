import { Database, TrendingUp, Award } from 'lucide-react';

export default function IndexingSection() {
const databases = [
  'Academic Search Alumni Edition (EBSCO Publishing)',
  'Academic Search Complete (EBSCO Publishing)',
  'ArticleFirst (OCLC)',
  'Arts & Humanities Citation Index (Clarivate Analytics)',
  'Book Review Digest Plus (EBSCO Publishing)',
  'COMPENDEX (Elsevier)',
  'Education Collection (ProQuest)',
  'Education Database (ProQuest)',
  'Education Full Text (HW Wilson)',
  'Education Research Complete (EBSCO Publishing)',
  'INSPEC (IET)',
  'Materials Science & Engineering Database (ProQuest)',
  'OmniFile Full Text Mega Edition (HW Wilson)',
  'ProQuest Central (ProQuest)',
  'ProQuest Central K-318',
  'ProQuest Professional Education (ProQuest)',
  'Research Library (ProQuest)',
  'Science Citation Index Expanded',
  'SciTech Premium Collection',
  'SCOPUS',
  'Social Science Premium Collection (ProQuest)',
  'Social Sciences Citation Index',
  'STEM Database (ProQuest)',
  'Technology Collection (ProQuest)',
  'Web of Science',
  "Ulrich's Periodicals Directory",  // From your array – confirmed
   ,                          // From your array (duplicate removed, kept for emphasis)
];

  const metrics = [
    { label: 'H-Index', value: '112', icon: Award },
    { label: 'Journal Citation Indicator', value: '1.44', icon: TrendingUp },
    { label: 'CiteScore', value: '10.1', icon: TrendingUp },
    { label: 'Impact Factor', value: '3.4', icon: Award },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3 inline-block">
        Indexing
      </h2>

      {/* Databases List */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Database className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Indexed In:</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {databases.map((db) => (
            <div 
              key={db}
              className="flex items-start space-x-3 bg-gray-50 rounded-lg p-4 hover:bg-blue-50 transition-colors duration-200"
            >
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{db}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Metrics */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Impact Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div 
              key={metric.label}
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <metric.icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className="text-sm text-blue-100">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* License Information */}
      <div className="mt-8 bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
        <p className="text-gray-700">
          <strong>License:</strong> Journal articles are licensed under the{' '}
          <span className="text-green-700 font-semibold">CC BY 4.0 Creative Commons Attribution 4.0 License</span>.
        </p>
        <p className="text-gray-600 text-sm mt-2">
          All articles are open access and freely available online, immediately upon publication.
        </p>
      </div>
    </section>
  );
}