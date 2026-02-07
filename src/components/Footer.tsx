import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    journal: [
      { label: 'About', href: '/about' },
      { label: 'Editorial Team', href: '/editorial-team' },
      { label: 'Focus & Scope', href: '/focus-and-scope' },
      { label: 'Publication Ethics', href: '/publication-ethics' },
    ],
    authors: [
      { label: 'Author Guidelines', href: '/author-guidelines' },
      { label: 'Submit Paper', href: '/submit' },
      { label: 'Template', href: '/template' },
      { label: 'Call for Papers', href: '/call-for-papers' },
    ],
    resources: [
      { label: 'Current Issue', href: '/current' },
      { label: 'Archives', href: '/archives' },
      { label: 'Special Issues', href: '/special-issues' },
      { label: 'Indexing', href: '/abstracting-and-indexing' },
    ],
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 border-b-2 border-blue-600 pb-2 inline-block">
              About JEE
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              International Journal of Engineering Education explores 
              the social dynamics of public, community, and privately owned organizations.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="bg-blue-400 p-2 rounded-lg hover:bg-blue-500 transition-colors">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="bg-blue-700 p-2 rounded-lg hover:bg-blue-800 transition-colors">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Journal Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 border-b-2 border-blue-600 pb-2 inline-block">
              Journal
            </h3>
            <ul className="space-y-2">
              {footerLinks.journal.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Authors Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 border-b-2 border-blue-600 pb-2 inline-block">
              For Authors
            </h3>
            <ul className="space-y-2">
              {footerLinks.authors.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 border-b-2 border-blue-600 pb-2 inline-block">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p>101 Station Landing Suite 300</p>
                  <p>Medford, MA 02155, USA</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
                <a href="tel:610-796-8270" className="hover:text-blue-400 transition-colors">
                  +1 781 388 8508
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
                <a 
                  href="mailto:office@cg-scholar-organizationalstudies.org"
                  className="hover:text-blue-400 transition-colors break-all"
                >
                  editor@onlinelibrarywileys.com
                </a>
              </div>
            </div>
          </div>
        </div>

   

        {/* Journal Details */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Online ISSN :</span>
              <span className="text-white ml-2 font-mono">2168-9830</span>
            </div>
            <div>
              <span className="text-gray-400">Print ISSN :</span>
              <span className="text-white ml-2 font-mono">2324-7657</span>
            </div>
           
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            Copyright American Society for Engineering Education.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Licensed under CC BY 4.0 Creative Commons Attribution 4.0 License
          </p>
        </div>
      </div>
    </footer>
  );
}