import React from 'react';
import { ShieldCheck, Server, Terminal, User, Cpu } from 'lucide-react';

export default function Header({ activeSection, setActiveSection }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
      padding: '14px 28px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveSection('works')}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
          }}>
            <Cpu size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}>
              山﨑 雄大 <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--cyan-primary)', border: '1px solid var(--border-cyan)', padding: '2px 8px', borderRadius: '6px' }}>INFRA PORTFOLIO</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cloud & Infrastructure Architect</div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={`tab-btn ${activeSection === 'works' ? 'active' : ''}`}
            onClick={() => setActiveSection('works')}
          >
            <Server size={16} /> 制作実績 (3作品)
          </button>
          <button 
            className={`tab-btn ${activeSection === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveSection('skills')}
          >
            <User size={16} /> エンジニア情報・スキル
          </button>
        </nav>

        {/* Live System Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="cyber-badge green">
            <span className="pulse-dot"></span>
            ALL SYSTEMS OPERATIONAL
          </div>
        </div>
      </div>
    </header>
  );
}
