import React from 'react';
import { ArrowRight, ShieldCheck, Layers } from 'lucide-react';

export default function ProjectCard({ project, onOpenModal }) {
  return (
    <div className="glass-card card-padding" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '30px',
      height: '100%'
    }}>
      <div>
        {/* Top Category & Badge Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <span className="cyber-badge">
            {project.category}
          </span>
          <span className="cyber-badge green">
            <ShieldCheck size={12} /> {project.badge}
          </span>
        </div>

        {/* Project Title */}
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px', lineHeight: 1.35 }}>
          {project.title}
        </h3>
        <div style={{ fontSize: '0.78rem', color: 'var(--cyan-primary)', marginBottom: '14px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
          {project.englishTitle}
        </div>

        {/* Project Summary */}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '18px' }}>
          {project.summary}
        </p>

        {/* Highlights Row */}
        <div style={{
          background: '#f1f5f9',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '12px 14px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginBottom: '18px',
          fontSize: '0.78rem'
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

        {/* Tech Stack Tags (High Contrast) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '22px' }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              background: '#e0f2fe',
              color: '#0369a1',
              fontWeight: 700,
              fontSize: '0.75rem',
              padding: '4px 8px',
              borderRadius: '6px',
              border: '1px solid #7dd3fc'
            }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button className="btn-primary" onClick={() => onOpenModal(project)} style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '12px 16px' }}>
        <Layers size={16} /> 構成図 & コードを検証 <ArrowRight size={16} />
      </button>
    </div>
  );
}
