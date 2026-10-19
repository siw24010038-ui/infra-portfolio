import React from 'react';
import { Terminal, Shield, Mail, Globe } from 'lucide-react';
import { engineerProfile } from '../data/projectsData';

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding" style={{
      padding: '40px 24px 80px',
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '28px'
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <div className="cyber-badge" style={{ marginBottom: '12px' }}>ABOUT ENGINEER</div>
        <h2 className="section-title-responsive" style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
          エンジニアプロフィール & スキル
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
          実務におけるクラウド基盤の設計・構築・運用コードを成果物として証明します。
        </p>
      </div>

      <div className="skills-layout-grid">
        {/* Left Column: Engineer Bio Card */}
        <div className="glass-card card-padding" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              fontWeight: 800,
              color: '#fff',
              boxShadow: '0 4px 15px rgba(2, 132, 199, 0.3)',
              flexShrink: 0
            }}>
              山
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                {engineerProfile.name}
              </h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--cyan-primary)', fontWeight: 600 }}>
                {engineerProfile.nameEnglish}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {engineerProfile.role}
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            {engineerProfile.bio}
          </p>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
              <Mail size={15} color="var(--cyan-primary)" /> {engineerProfile.socials.email}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
              <Globe size={15} color="var(--cyan-primary)" /> {engineerProfile.location}
            </div>
          </div>
        </div>

        {/* Right Column: Skill Matrix & Design Principles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Skill Matrix */}
          <div className="glass-card card-padding" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={18} color="var(--cyan-primary)" />
              技術スタック & ドメイン知識
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {engineerProfile.skills.map((group) => (
                <div key={group.category} style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '14px'
                }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--cyan-primary)', marginBottom: '8px' }}>
                    {group.category}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {group.items.map((skill) => (
                      <span key={skill} style={{
                        background: '#e0f2fe',
                        color: '#0369a1',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid #7dd3fc'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Design Principles */}
          <div className="glass-card card-padding" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={18} color="var(--emerald-success)" />
              インフラ設計の基本方針 (Core Principles)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: 'var(--cyan-primary)', fontSize: '0.88rem', marginBottom: '4px' }}>
                  1. SPOF排除とMulti-AZ冗長化
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  単一障害点を排除し、すべての層（ALB, EC2, DB, NAT GW）を複数AZに分散配置。
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: 'var(--emerald-success)', fontSize: '0.88rem', marginBottom: '4px' }}>
                  2. 100% Terraform (IaC) コード化
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  手動変更を禁止し、コードによる完全な再現性と変更履歴を担保。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
