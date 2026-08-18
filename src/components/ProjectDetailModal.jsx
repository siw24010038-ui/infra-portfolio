import React, { useState } from 'react';
import { X, Layers, FileCode, ShieldCheck, DollarSign, ExternalLink } from 'lucide-react';
import ArchitectureDiagram from './ArchitectureDiagram';
import CodeViewer from './CodeViewer';
import AvailabilitySection from './AvailabilitySection';
import CostCalculator from './CostCalculator';

export default function ProjectDetailModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('diagram');

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{
          padding: '24px 32px 18px',
          borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span className="cyber-badge">{project.category}</span>
              <span className="cyber-badge green">{project.badge}</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid var(--border-cyan)',
              color: 'var(--text-muted)',
              borderRadius: '10px',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div style={{
          padding: '0 32px',
          background: '#090e1a',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          gap: '12px'
        }}>
          <button
            className={`tab-btn ${activeTab === 'diagram' ? 'active' : ''}`}
            onClick={() => setActiveTab('diagram')}
          >
            <Layers size={16} /> 🗺️ AWS 構成図 (双方向ビューア)
          </button>

          <button
            className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <FileCode size={16} /> 📜 Terraform (IaC) コード
          </button>

          <button
            className={`tab-btn ${activeTab === 'availability' ? 'active' : ''}`}
            onClick={() => setActiveTab('availability')}
          >
            <ShieldCheck size={16} /> 🛡️ 可用性・冗長化の配慮
          </button>

          <button
            className={`tab-btn ${activeTab === 'cost' ? 'active' : ''}`}
            onClick={() => setActiveTab('cost')}
          >
            <DollarSign size={16} /> 💰 コスト＆監視メトリクス
          </button>
        </div>

        {/* Modal Body Tab Content */}
        <div style={{ padding: '32px' }}>
          {activeTab === 'diagram' && <ArchitectureDiagram project={project} />}
          {activeTab === 'code' && <CodeViewer project={project} />}
          {activeTab === 'availability' && <AvailabilitySection project={project} />}
          {activeTab === 'cost' && <CostCalculator project={project} />}
        </div>
      </div>
    </div>
  );
}
