import React from 'react';
import { User, Terminal, Shield, Cpu, Mail, GitBranch, Globe, CheckCircle2 } from 'lucide-react';
import { engineerProfile } from '../data/projectsData';

export default function SkillsSection() {
  return (
    <section id="skills" style={{
      padding: '40px 24px 80px',
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <div className="cyber-badge" style={{ marginBottom: '12px' }}>ABOUT ENGINEER</div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
          エンジニアプロフィール & スキル
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
          実務におけるクラウド基盤の設計・構築・運用コードを成果物として証明します。
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '32px' }}>
        {/* Left Column: Engineer Bio Card */}
        <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#fff',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
            }}>
              山
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
                {engineerProfile.name}
              </h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--cyan-primary)', fontWeight: 600 }}>
                {engineerProfile.nameEnglish}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {engineerProfile.role}
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            {engineerProfile.bio}
          </p>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
              <Mail size={16} color="var(--cyan-primary)" /> {engineerProfile.socials.email}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
              <Globe size={16} color="var(--cyan-primary)" /> {engineerProfile.location}
            </div>
          </div>
        </div>

        {/* Right Column: Skill Matrix & Design Principles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Skill Matrix */}
          <div className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={20} color="var(--cyan-primary)" />
              技術スタック & ドメイン知識
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {engineerProfile.skills.map((group) => (
                <div key={group.category} style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '16px'
                }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--cyan-primary)', marginBottom: '10px' }}>
                    {group.category}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {group.items.map((skill) => (
                      <span key={skill} style={{
                        background: '#e0f2fe',
                        color: '#0369a1',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        padding: '5px 12px',
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
          <div className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={20} color="var(--emerald-success)" />
              インフラ設計の基本方針 (Core Principles)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: 'var(--cyan-primary)', fontSize: '0.9rem', marginBottom: '6px' }}>
                  1. SPOF排除とMulti-AZ冗長化
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  単一障害点を一切作らず、すべての層（ALB, EC2, DB, NAT GW）を複数AZに分散配置。
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: 'var(--emerald-success)', fontSize: '0.9rem', marginBottom: '6px' }}>
                  2. 100% Terraform (IaC) コード化
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  手動変更（マネジメントコンソール操作）を禁止し、コードによる完全な再現性と変更履歴を担保。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
