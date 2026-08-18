import React from 'react';
import { ShieldCheck, Cloud, Terminal, CheckCircle2, ArrowDownRight, Activity } from 'lucide-react';
import { engineerProfile } from '../data/projectsData';

export default function HeroSection({ scrollToWorks }) {
  return (
    <section style={{
      padding: '60px 24px 40px',
      maxWidth: '1280px',
      margin: '0 auto'
    }}>
      <div className="glass-card" style={{ padding: '48px 40px', position: 'relative', overflow: 'hidden' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span className="cyber-badge">IT INFRASTRUCTURE</span>
              <span className="cyber-badge purple">TERRAFORM IaC</span>
              <span className="cyber-badge green">HIGH AVAILABILITY</span>
            </div>

            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              lineHeight: 1.25,
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              可用性と自動化を追求する<br />
              クラウドインフラ ポートフォリオ
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '28px', maxWidth: '680px' }}>
              {engineerProfile.tagline}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={scrollToWorks}>
                <Cloud size={18} /> 制作作品 (3作品) を見る
              </button>
              <a href="#skills" className="btn-secondary" style={{ textDecoration: 'none' }}>
                <Terminal size={18} /> 技術スタック・設計思想
              </a>
            </div>
          </div>

          {/* Quick Metrics Card */}
          <div style={{
            background: 'rgba(11, 17, 32, 0.8)',
            border: '1px solid var(--border-cyan)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--cyan-primary)', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} /> PORTFOLIO HIGHLIGHTS
            </div>

            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>3 作品</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AWS構成図・Terraformコード・可用性分析完備</div>
            </div>

            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--emerald-success)' }}>99.99%</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Multi-AZ 目標稼働率 (SLA) 設計</div>
            </div>

            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--cyan-primary)' }}>100% IaC</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Terraform によるインフラ全完全コード化</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
