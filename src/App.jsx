import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProjectCard from './components/ProjectCard';
import ProjectDetailModal from './components/ProjectDetailModal';
import SkillsSection from './components/SkillsSection';
import { projectsData } from './data/projectsData';
import { Server, Layers, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('works');
  const [selectedProject, setSelectedProject] = useState(null);

  const scrollToWorks = () => {
    setActiveSection('works');
    const el = document.getElementById('works-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Top Header */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <HeroSection scrollToWorks={scrollToWorks} />

        {/* Works Grid Section */}
        <section id="works-grid" style={{
          padding: '40px 24px 80px',
          maxWidth: '1280px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
            <div className="cyber-badge" style={{ marginBottom: '12px' }}>PROVEN ARCHITECTURES</div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
              クラウドインフラ制作実績 (全3作品)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
              AWS構成図、Terraform (IaC) コード、可用性・冗長化の設計思想を完備した3つの主要インフラ作品です。カードをクリックして詳細検証いただけます。
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '32px'
          }}>
            {projectsData.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onOpenModal={(p) => setSelectedProject(p)} 
              />
            ))}
          </div>
        </section>

        {/* Engineer Skills & Profile Section */}
        <SkillsSection />
      </main>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Footer */}
      <footer style={{
        background: '#050914',
        borderTop: '1px solid rgba(6, 182, 212, 0.15)',
        padding: '32px 24px',
        fontSize: '0.85rem',
        color: 'var(--text-dim)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <strong style={{ color: '#fff' }}>山﨑 雄大 (Yudai Yamazaki)</strong> - Cloud & Infrastructure Engineer Portfolio
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>AWS Multi-AZ & Terraform HCL Modules</span>
            <button 
              onClick={scrollToTop}
              style={{
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid var(--border-cyan)',
                color: 'var(--text-muted)',
                borderRadius: '8px',
                padding: '6px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem'
              }}
            >
              <ArrowUp size={14} /> ページトップへ
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
