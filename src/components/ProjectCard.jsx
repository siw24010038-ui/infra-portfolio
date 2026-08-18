import React from 'react';
import { ArrowRight, ShieldCheck, FileCode, Layers, DollarSign } from 'lucide-react';

export default function ProjectCard({ project, onOpenModal }) {
  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '32px',
      height: '100%'
    }}>
      <div>
        {/* Top Category & Badge Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <span className="cyber-badge">
            {project.category}
          </span>
          <span className="cyber-badge green">
            <ShieldCheck size={12} /> {project.badge}
          </span>
        </div>

        {/* Project Title */}
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '6px', lineHeight: 1.3 }}>
          {project.title}
        </h3>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '16px', fontFamily: 'var(--font-mono)' }}>
          {project.englishTitle}
        </div>

        {/* Project Summary */}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
          {project.summary}
        </p>

        {/* Highlights Row */}
        <div style={{
          background: 'rgba(11, 17, 32, 0.7)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '10px',
          padding: '12px 16px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '20px',
          fontSize: '0.8rem'
        }}>
          <div>
            <div style={{ color: 'var(--text-dim)' }}>目標 SLA:</div>
            <div style={{ fontWeight: 700, color: 'var(--cyan-primary)' }}>{project.targetSla}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-dim)' }}>月額想定コスト:</div>
            <div style={{ fontWeight: 700, color: 'var(--emerald-success)' }}>{project.estimatedCost}</div>
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              background: 'rgba(30, 41, 59, 0.6)',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button className="btn-primary" onClick={() => onOpenModal(project)} style={{ width: '100%', justifyContent: 'center' }}>
        <Layers size={16} /> AWS構成図 & Terraformコードを検証 <ArrowRight size={16} />
      </button>
    </div>
  );
}
