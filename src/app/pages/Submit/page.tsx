'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Send, UserPlus, X, Loader2 } from 'lucide-react';

interface Author {
  id: number;
  fullName: string;
  organization: string;
  country: string;
  email: string;
}

export default function SubmitFormPage() {
  const [paperName, setPaperName] = useState('');
  const [authors, setAuthors] = useState<Author[]>([
    { id: 1, fullName: '', organization: '', country: '', email: '' },
  ]);
  const [contactAuthor, setContactAuthor] = useState('1');
  const [alternateEmail, setAlternateEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [keywords, setKeywords] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const maxAuthors = 4;

  const addAuthor = () => {
    if (authors.length < maxAuthors) {
      const newId = authors.length + 1;
      setAuthors([
        ...authors,
        { id: newId, fullName: '', organization: '', country: '', email: '' },
      ]);
    }
  };

  const removeAuthor = (id: number) => {
    if (authors.length > 1) {
      setAuthors(authors.filter((author) => author.id !== id));
    }
  };

  const updateAuthor = (id: number, field: keyof Author, value: string) => {
    setAuthors(
      authors.map((author) =>
        author.id === id ? { ...author, [field]: value } : author
      )
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validExtensions = ['pdf', 'doc', 'docx'];
      const ext = file.name.split('.').pop()?.toLowerCase();

      if (ext && validExtensions.includes(ext)) {
        setUploadedFile(file);
        setMessage(null);
      } else {
        setMessage({
          type: 'error',
          text: 'Only PDF, DOC, or DOCX files are allowed',
        });
        e.target.value = '';
        setUploadedFile(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedFile) {
      setMessage({ type: 'error', text: 'Please upload your paper file' });
      return;
    }

    // Find contact author email
    const contactAuthorObj = authors.find(
      (a) => a.id.toString() === contactAuthor
    );
    if (!contactAuthorObj?.email) {
      setMessage({ type: 'error', text: 'Contact author email is required' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();

      // Basic fields
      formData.append('title', paperName.trim());
      formData.append('volumeId', 'YOUR_VOLUME_ID_HERE'); // ← replace with real volume ID or make dynamic
      formData.append('keywords', keywords.trim());
      formData.append('pdf', uploadedFile); // the file

      // Author information – send as JSON string (API will parse it)
      const authorsData = authors.map((a) => ({
        fullName: a.fullName.trim(),
        organization: a.organization.trim(),
        country: a.country.trim(),
        email: a.email.trim(),
      }));
      formData.append('authors', JSON.stringify(authorsData));

      // Contact author
      formData.append('contactAuthorId', contactAuthor);
      formData.append('contactEmail', contactAuthorObj.email.trim());
      formData.append('alternateEmail', alternateEmail.trim());
      formData.append('telephone', telephone.trim());

      const response = await fetch('/api/papers', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit paper');
      }

      // Success
      setMessage({
        type: 'success',
        text: 'Paper submitted successfully! Thank you.',
      });

      // Optional: reset form
      setPaperName('');
      setAuthors([
        { id: 1, fullName: '', organization: '', country: '', email: '' },
      ]);
      setContactAuthor('1');
      setAlternateEmail('');
      setTelephone('');
      setKeywords('');
      setUploadedFile(null);

    } catch (err: unknown) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Page Title */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Current Issue
              </h1>
              <p className="text-gray-600">Submit your paper for the upcoming issue</p>
            </div>

            {/* Submission Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {message && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    message.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* General Information */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                    General Information
                  </h2>

                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-gray-700 font-semibold">
                      Upcoming Volume: Volume 21, Issue 1, Jan-Jun, 2026
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="paperName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      * Paper Name
                    </label>
                    <input
                      type="text"
                      id="paperName"
                      value={paperName}
                      onChange={(e) => setPaperName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter the title of your paper"
                    />
                  </div>
                </section>

                {/* Author(s) Information */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                    Author(s) Information
                  </h2>

                  <div className="space-y-6">
                    {authors.map((author, index) => (
                      <div
                        key={author.id}
                        className="bg-gray-50 rounded-xl p-6 relative"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-gray-900">
                            Author #{author.id}
                          </h3>
                          {authors.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeAuthor(author.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                              title="Remove author"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={author.fullName}
                              onChange={(e) =>
                                updateAuthor(author.id, 'fullName', e.target.value)
                              }
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              placeholder="Enter full name"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Organization
                            </label>
                            <input
                              type="text"
                              value={author.organization}
                              onChange={(e) =>
                                updateAuthor(author.id, 'organization', e.target.value)
                              }
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              placeholder="Enter organization / university"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Country
                            </label>
                            <input
                              type="text"
                              value={author.country}
                              onChange={(e) =>
                                updateAuthor(author.id, 'country', e.target.value)
                              }
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              placeholder="USA, India, Germany..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              value={author.email}
                              onChange={(e) =>
                                updateAuthor(author.id, 'email', e.target.value)
                              }
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              placeholder="author@example.com"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {authors.length < maxAuthors && (
                      <button
                        type="button"
                        onClick={addAuthor}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                      >
                        <UserPlus className="w-5 h-5 mr-2" />
                        Add Author #{authors.length + 1}
                      </button>
                    )}
                  </div>
                </section>

                {/* Contact Author & Other Info */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                    Contact & Submission Details
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="contactAuthor"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        * Corresponding Author
                      </label>
                      <select
                        id="contactAuthor"
                        value={contactAuthor}
                        onChange={(e) => setContactAuthor(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      >
                        {authors.map((author) => (
                          <option key={author.id} value={author.id.toString()}>
                            Author {author.id} – {author.email || 'no email yet'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="alternateEmail"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Alternate Email (optional)
                      </label>
                      <input
                        type="email"
                        id="alternateEmail"
                        value={alternateEmail}
                        onChange={(e) => setAlternateEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="alternate@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="telephone"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        * Telephone / Mobile
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="keywords"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Keywords (comma separated)
                      </label>
                      <input
                        type="text"
                        id="keywords"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="machine learning, neural networks, deep learning"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="uploadPaper"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        * Upload Paper
                      </label>
                      <input
                        type="file"
                        id="uploadPaper"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Allowed: pdf, docx, doc (max 20MB recommended)
                      </p>
                      {uploadedFile && (
                        <p className="text-sm text-green-600 mt-2">
                          Selected: {uploadedFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center px-12 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all ${
                      loading
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl'
                    } text-white`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Paper
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}