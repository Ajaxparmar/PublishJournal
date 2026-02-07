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
  
  <div className="prose prose-lg max-w-none text-gray-700 space-y-6 text-justify">
    <p>
      The Journal of Engineering Education (JEE) is a leading international, peer-reviewed scholarly journal dedicated to the advancement of engineering education research, theory, and practice. Published quarterly by Wiley on behalf of the American Society for Engineering Education (ASEE), the journal serves as a premier platform for disseminating high-impact, evidence-based research that informs how engineering is taught, learned, assessed, and governed across diverse educational and professional settings.
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

  {/* Optional call-to-action block */}

</section>
  );
}