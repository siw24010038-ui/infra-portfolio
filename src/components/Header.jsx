import React from 'react';
import { Cpu } from 'lucide-react';

export default function Header({ setActiveSection }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px'
      }}>
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexWrap: 'wrap' }} onClick={() => setActiveSection('works')}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '9px',
            background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(6, 182, 212, 0.35)',
            flexShrink: 0
          }}>
            <Cpu size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              山﨑 雄大 <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--cyan-primary)', border: '1px solid var(--border-cyan)', padding: '1px 6px', borderRadius: '5px' }}>INFRA PORTFOLIO</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Cloud & Infrastructure Architect</div>
          </div>
        </div>

      </div>
    </header>
  );
}
