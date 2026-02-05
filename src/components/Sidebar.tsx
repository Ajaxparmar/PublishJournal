'use client';

import { useState } from 'react';
import { Bell, FileText, Lock, Database } from 'lucide-react';
import Link from 'next/link';
import { signIn, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Sidebar() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const notifications = [
    { id: 14, text: 'Submission open for Volume 115, Issue 1, 2026' },
    { id: 13, text: 'Submission open for Volume 114, Issue 2, 2025' },
    { id: 11, text: 'Submission open for Volume 113, Issue 1, 2025' },
    { id: 10, text: 'Submission open for Special Issue-Apr 2023' },
    { id: 9, text: 'Submission open for Special Issue-Feb 2023' },
    { id: 12, text: 'Submission open for Volume 115 No. 1, 2026' },
  ];

  const indexingServices = [
    { name: 'Scopus', logo: '/images/scopus.png' },
    { name: 'EBSCO', logo: '/images/ebsco.png' },
    { name: 'Cabell\'s', logo: '/images/cabells.png' },
    { name: 'Ulrich\'s', logo: '/images/ulrichs.png' },
    { name: 'Index Copernicus', logo: '/images/ic.png' },
    { name: 'ERIC', logo: '/images/eric.png' },
    { name: 'ZDB', logo: '/images/zdb.png' },
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid username or password');
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        toast.success('Login successful!');
        
        // Wait a moment for session to update
        setTimeout(async () => {
          // Fetch the session to get user role
          const response = await fetch('/api/auth/session');
          const sessionData = await response.json();
          console.log('Session data after login:', sessionData);
          
          if (sessionData?.user?.role === 'ADMIN') {
            router.push('/admin');
          } else {
            router.push('/pages/my-papers');
          }
          
          setUsername('');
          setPassword('');
          setIsLoading(false);
        }, 500);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <aside className="space-y-6">
      {/* User Login/Profile Widget */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <Lock className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-bold text-gray-900">
            {session ? 'User Profile' : 'User Login'}
          </h3>
        </div>

        {status === 'loading' ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : session ? (
          // Logged in state
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Logged in as:</p>
              <p className="font-semibold text-gray-900">{session.user?.email || session.user?.name}</p>
              <p className="text-xs text-blue-600 mt-1">
                Role: {session.user?.role}
              </p>
            </div>
            
            <div className="space-y-2">
              {session.user?.role === 'ADMIN' ? (
                <Link
                  href="/admin"
                  className="block w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-center"
                >
                  Go to Admin Panel
                </Link>
              ) : (
                <Link
                  href="/pages/my-papers"
                  className="block w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-center"
                >
                  My Papers
                </Link>
              )}
              
              <button
                onClick={handleLogout}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          // Login form
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
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        )}
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