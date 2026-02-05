'use client';

import { useState } from 'react';
import { Bell, FileText, Lock, Database } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const notifications = [
    { id: 14, text: 'Submission open for Volume 21, Issue 1, 2026' },
    { id: 13, text: 'Submission open for Volume 20, Issue 2, 2025' },
    { id: 11, text: 'Submission open for Volume 20, Issue 1, 2025' },
    { id: 10, text: 'Submission open for Special Issue-Apr 2024' },
    { id: 9, text: 'Submission open for Special Issue-Feb 2024' },
    { id: 12, text: 'Submission open for Volume 19 No. 2, 2024' },
  ];

const indexingServices = [
  { name: 'Scopus', logo: '/images/scopus.png' },                    // Elsevier's Scopus
  { name: 'WoS', logo: '/images/wos.png' },                          // Web of Science (Clarivate)
  { name: 'SCI-E', logo: '/images/scie.png' },                       // Science Citation Index Expanded
  { name: 'SSCI', logo: '/images/ssci.png' },                        // Social Sciences Citation Index
  { name: 'AHCI', logo: '/images/ahci.png' },                        // Arts & Humanities Citation Index
  { name: 'COMPENDEX', logo: '/images/compendex.png' },              // Elsevier's engineering database
  { name: 'INSPEC', logo: '/images/inspec.png' },                    // IET's physics/engineering index
  { name: 'EBSCO', logo: '/images/ebsco.png' },                      // Covers multiple EBSCO services (Academic Search, Education Index, etc.)
  { name: 'ProQuest', logo: '/images/proquest.png' },                // Covers Education Collection, Central, SciTech, STEM, etc.
  { name: 'HW Wilson', logo: '/images/hwwilson.png' },              // OmniFile, Education Full Text, Science Full Text Select
];

  const quickLinks = [
    { label: 'Editorial Team', href: '/editorial-team' },
    { label: 'Editorial Policies', href: '/editorial-policies' },
    { label: 'Focus & Scope', href: '/focus-and-scope' },
    { label: 'Author Guidelines', href: '/author-guidelines' },
    { label: 'Abstracting and Indexing', href: '/abstracting-and-indexing' },
    { label: 'Publication Ethics', href: '/publication-ethics' },
    { label: 'Paper Submission', href: '/call-for-papers' },
  ];

  const resources = [
    { label: 'For Readers', href: '/for-readers' },
    { label: 'For Authors', href: '/for-authors' },
    { label: 'For Librarians', href: '/for-librarians' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login attempt:', { username, password });
  };

  return (
    <aside className="space-y-6">
      {/* User Login Widget */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <Lock className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">User Login</h3>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Login
          </button>
        </form>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <Bell className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <Link
              key={notification.id}
              href={`/news/${notification.id}`}
              className="block p-3 bg-blue-50 rounded-lg text-sm text-gray-700 hover:bg-blue-100 transition-colors duration-200 border-l-4 border-blue-600"
            >
              {notification.text}
            </Link>
          ))}
        </div>
      </div>

      {/* Indexing */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <Database className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">Indexing</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {indexingServices.map((service) => (
            <div
              key={service.name}
              className="bg-gray-50 rounded-lg p-3 text-center hover:bg-blue-50 transition-colors duration-200"
            >
              <div className="text-sm font-medium text-gray-700">{service.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Download */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center mb-4">
          <FileText className="w-5 h-5 mr-2" />
          <h3 className="text-lg font-bold">Template</h3>
        </div>
        <div className="space-y-3">
          <a
            href="/docs/template.doc"
            className="block bg-white text-blue-600 px-4 py-3 rounded-lg text-center font-semibold hover:bg-blue-50 transition-colors duration-200"
          >
            Download DOC
          </a>
          <a
            href="/docs/template.pdf"
            className="block bg-white text-blue-600 px-4 py-3 rounded-lg text-center font-semibold hover:bg-blue-50 transition-colors duration-200"
          >
            Download PDF
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
        <div className="space-y-2">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              • {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Information</h3>
        <div className="space-y-2">
          {resources.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              • {resource.label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}