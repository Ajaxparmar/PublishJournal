import { BookOpen, Users, Globe, Award } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    {
      icon: BookOpen,
      title: 'Peer-Reviewed',
      description: 'Rigorous third-party review process',
    },
    {
      icon: Users,
      title: '25 Board Members',
      description: 'Led by Dr. Spencer S Stober',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'International academic community',
    },
    {
      icon: Award,
      title: 'Open Access',
      description: 'Freely available research',
    },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3 inline-block">
        About the Journal
      </h2>
      
      <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-8">
        <p>
          The Organization Studies Journal Collection comes together around a common concern for, 
          and a shared interest to explore, new possibilities in knowledge, culture and change 
          management, within the broader context of the nature and future of organizations and 
          their impact on society.
        </p>
        
        <p>
          <strong>International Journal of Interdisciplinary Organizational Studies</strong> explores 
          the social dynamics of public, community, and privately owned organizations.
        </p>
        
        <p>
          The Journal publishes only original articles in different languages which have international 
          importance. In addition to full-length research articles, the Journal also publishes review 
          articles. Papers can be focused on fundamental research leading to new methods, or adaptation 
          of existing methods for new applications.
        </p>
        
        <p>
          Articles for the Journal are peer-reviewed by third-party reviewers who are selected from 
          among specialists in the subject matter of peer-reviewed materials.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {highlights.map((item) => (
          <div 
            key={item.title}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center hover:shadow-md transition-shadow duration-300"
          >
            <item.icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Publication Details */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-semibold text-gray-900">Collection Founded:</span>
            <span className="ml-2 text-gray-700">2006</span>
          </div>
          <div>
            <span className="font-semibold text-gray-900">Serial Founded:</span>
            <span className="ml-2 text-gray-700">2013 (Volume 8)</span>
          </div>
          <div>
            <span className="font-semibold text-gray-900">ISSN Print:</span>
            <span className="ml-2 text-gray-700 font-mono">2324-7649</span>
          </div>
          <div>
            <span className="font-semibold text-gray-900">ISSN Online:</span>
            <span className="ml-2 text-gray-700 font-mono">2324-7657</span>
          </div>
          <div>
            <span className="font-semibold text-gray-900">Publication Frequency:</span>
            <span className="ml-2 text-gray-700">Monthly</span>
          </div>
          <div>
            <span className="font-semibold text-gray-900">DOI:</span>
            <span className="ml-2 text-blue-600 text-sm break-all">
              http://doi.org/10.18848/2324-7649/CGP
            </span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-4 text-lg">For Further Information:</h3>
        <div className="space-y-2 text-gray-700">
          <p className="font-semibold">Prof. Tracey L. Brown</p>
          <p>540 Upland Avenue</p>
          <p>Reading, PA 19611</p>
          <p>Phone: 610-796-8270</p>
          <p>
            E-mail:{' '}
            <a 
              href="mailto:office@cg-scholar-organizationalstudies.org"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              office@cg-scholar-organizationalstudies.org
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}