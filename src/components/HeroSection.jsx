import React from 'react';
import { Cloud, Activity, GitBranch } from 'lucide-react';
import { engineerProfile } from '../data/projectsData';

export default function HeroSection({ scrollToWorks }) {
  return (
    <section className="section-padding" style={{
      padding: '50px 24px 30px',
      maxWidth: '1280px',
      margin: '0 auto'
    }}>
      <div className="glass-card hero-card-padding" style={{ padding: '48px 40px', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow accent */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="hero-grid">
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span className="cyber-badge">IT INFRASTRUCTURE</span>
              <span className="cyber-badge purple">TERRAFORM IaC</span>
              <span className="cyber-badge green">HIGH AVAILABILITY</span>
            </div>

            <h1 className="hero-title-responsive" style={{
              fontSize: '2.3rem',
              fontWeight: 800,
              lineHeight: 1.3,
              marginBottom: '16px',
              color: '#0f172a'
            }}>
              可用性と自動化を追求する<br />
              <span style={{ color: 'var(--cyan-primary)' }}>クラウドインフラ ポートフォリオ</span>
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '24px', maxWidth: '680px' }}>
              {engineerProfile.tagline}
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn-primary btn-responsive-block" onClick={scrollToWorks}>
                <Cloud size={18} /> 制作作品 (3作品) を見る
              </button>
              <a 
                href="https://github.com/siw24010038-ui/infra-portfolio" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary btn-responsive-block" 
                style={{ textDecoration: 'none', color: 'var(--text-main)', borderColor: 'var(--border-cyan)' }}
              >
                <GitBranch size={18} color="var(--cyan-primary)" /> 🔗 GitHub リポジトリへ接続
              </a>
            </div>
          </div>

          {/* Quick Metrics Card */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-cyan)',
            borderRadius: '16px',
            padding: '20px 24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--cyan-primary)', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} /> PORTFOLIO HIGHLIGHTS
            </div>

            <div style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '10px' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>3 作品</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>AWS構成図・Terraformコード・可用性分析完備</div>
            </div>

            <div style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '10px' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--emerald-success)' }}>99.99%</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Multi-AZ 目標稼働率 (SLA) 設計</div>
            </div>

            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--cyan-primary)' }}>100% IaC</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Terraform によるインフラ全完全コード化</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
