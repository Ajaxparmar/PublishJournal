'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/pages/About' },
    { label: 'Scope', href: '/pages/Scope' },
    { label: 'Submit', href: '/pages/Submit' },
    { label: 'Current', href: '/pages/Current' },
    { label: 'Archives', href: '/pages/Archives' },
    { label: 'Support', href: '/pages/Support' },
    { label: 'Editorial Board', href: '/call-for-papers' },
    { label: 'Special Issues', href: '/special-issues' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b-4 border-blue-600">
      <div className="container mx-auto px-4">
        {/* Top Bar with Logo and ISSN */}
        <div className="py-4 flex items-center justify-between border-b border-gray-200">
          <Link href="/" className="flex items-center space-x-4">
            <div className=" rounded-lg flex items-center justify-center">
             
              <img src="/logo.jpeg" alt="Journal Logo" width={148} height={148} className="ml-2" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                International Journal of<br />
               Engineering Education
              </h1>
            </div>
          </Link>
          <div className='mb-2 flex flex-col space-y-2'>
             <div className="hidden md:flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-sm font-bold text-gray-700">Online ISSN:</span>
            <span className="text-sm text-blue-600 font-mono">2168-9830</span>
          </div>  
           <div className="hidden md:flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-sm font-bold text-gray-700">Print ISSN:</span>
            <span className="text-sm text-blue-600 font-mono">2324-7657</span>
          </div>

          </div>
       
        </div>

        {/* Navigation */}
        <nav className="py-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center justify-center space-x-1 flex-wrap">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <ul className="lg:hidden mt-4 space-y-2 bg-gray-50 rounded-lg p-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-white rounded-md transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}