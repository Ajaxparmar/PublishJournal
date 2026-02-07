import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import IndexingSection from '@/components/IndexingSection';
import AnnouncementsSection from '@/components/AnnouncementsSection';
import RecentArticles from '@/components/RecentArticles';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <Hero />
            <AboutSection />
            <IndexingSection />
            <AnnouncementsSection />
          
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