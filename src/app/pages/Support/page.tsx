'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HelpCircle, Mail, Phone, MapPin, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', category: '', message: '' });
    }, 3000);
  };

  const faqCategories = [
    {
      category: 'For Authors',
      questions: [
        {
          q: 'How do I submit my manuscript?',
          a: 'You can submit your manuscript through our online submission form or directly via email to editor@onlinelibrarywileys.com. Please ensure your manuscript follows our template guidelines.',
        },
        {
          q: 'What is the review process timeline?',
          a: 'The initial review typically takes 2-3 weeks. If revisions are required, authors are usually given 4-6 weeks to address reviewer comments. The entire process from submission to decision typically takes 6-12 weeks.',
        },
        {
          q: 'What are the publication charges?',
          a: 'The Article Processing Charge (APC) is USD 3710 or EUR 3090, payable only after your manuscript has been peer-reviewed and accepted for publication.',
        },
        {
          q: 'Can I track my submission status?',
          a: 'Yes, you will receive email updates at each stage of the review process. You can also contact our editorial office for status updates.',
        },
      ],
    },
    {
      category: 'For Readers',
      questions: [
        {
          q: 'Are all articles open access?',
          a: 'Yes, all articles published in JEE are immediately available as open access under the CC BY 4.0 Creative Commons license. No subscription or registration is required to read or download articles.',
        },
        {
          q: 'How can I cite articles from your journal?',
          a: 'Each article includes citation information and DOI. You can also use the "Cite" button on article pages to get formatted citations in various styles (APA, MLA, Chicago, etc.).',
        },
        {
          q: 'Can I set up alerts for new issues?',
          a: 'Yes, you can subscribe to our RSS feed or email notifications to receive alerts when new issues are published.',
        },
      ],
    },
    {
      category: 'Technical Issues',
      questions: [
        {
          q: 'I cannot access a PDF. What should I do?',
          a: 'Please ensure you have a PDF reader installed. If the problem persists, try clearing your browser cache or using a different browser. Contact our technical support if issues continue.',
        },
        {
          q: 'The website is not loading properly.',
          a: 'Try refreshing the page or clearing your browser cache. Our website works best with modern browsers like Chrome, Firefox, Safari, or Edge. If problems persist, contact our technical team.',
        },
      ],
    },
    {
      category: 'Editorial Policies',
      questions: [
        {
          q: 'What is your policy on plagiarism?',
          a: 'We have a zero-tolerance policy on plagiarism. All submissions are checked using plagiarism detection software. Any detected plagiarism will result in immediate rejection and may lead to author sanctions.',
        },
        {
          q: 'Can I submit my manuscript to multiple journals?',
          a: 'No, simultaneous submission to multiple journals is not permitted. Your manuscript must not be under consideration elsewhere when submitted to JEE.',
        },
        {
          q: 'What are your data sharing policies?',
          a: 'We encourage authors to make their research data available. Please refer to our Editorial Policies page for detailed information on data sharing requirements.',
        },
      ],
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      detail: 'editor@onlinelibrarywileys.com',
      description: 'Best for general inquiries and submissions',
      action: 'mailto:editor@onlinelibrarywileys.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      detail: '+1 781 388 8508',
      description: 'Monday - Friday, 9 AM - 5 PM UTC',
      
    },
    {
      icon: MapPin,
      title: 'Mail',
      detail: '101 Station Landing,Suite 300. Medford, MA 02155, USA',
      description: 'For postal correspondence',
      action: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <div className="flex items-center mb-6">
            <HelpCircle className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Support & Help</h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Get help with submissions, access, technical issues, and general inquiries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Methods */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-3 inline-block">
                Contact Us
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {contactMethods.map((method) => (
                  <div 
                    key={method.title}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
                  >
                    <method.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">{method.title}</h3>
                    {method.action ? (
                      <a 
                        href={method.action}
                        className="text-blue-600 hover:text-blue-800 font-medium break-all"
                      >
                        {method.detail}
                      </a>
                    ) : (
                      <p className="text-gray-900 font-medium">{method.detail}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-2">{method.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-gray-700">
               <strong>Editor-in-Chief</strong><br/>   <strong>David Knight</strong> 
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  For editorial matters, submission inquiries, and journal-related questions
                </p>
              </div>
            </section>

            {/* Contact Form */}
            <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="flex items-center mb-6">
                <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Send Us a Message</h2>
              </div>

              {submitted ? (
                <div className="bg-green-50 border-l-4 border-green-600 rounded-r-xl p-6 text-center">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-700">
                    Thank you for contacting us. Well respond within 1-2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      <option value="submission">Submission Inquiry</option>
                      <option value="technical">Technical Issue</option>
                      <option value="editorial">Editorial Question</option>
                      <option value="access">Access Problem</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
              )}
            </section>

            {/* FAQ Section */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              {faqCategories.map((category) => (
                <div key={category.category} className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-3">
                    {category.category}
                  </h3>
                  <div className="space-y-6">
                    {category.questions.map((item, index) => (
                      <div key={index} className="border-l-4 border-blue-600 pl-6">
                        <h4 className="font-bold text-gray-900 mb-2">{item.q}</h4>
                        <p className="text-gray-700 leading-relaxed">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="/pages/Scope/author-guidelines" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → Author Guidelines
                </a>
                <a href="/pages/Submit" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → Submit Paper
                </a>
                <a href="/pages/Editorial" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  → Editorial Policies
                </a>
                <a href="/pages/Editorial" className="block text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
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