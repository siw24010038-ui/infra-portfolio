import React, { useState } from 'react';
import { X, Layers, FileCode, ShieldCheck, DollarSign } from 'lucide-react';
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
        <div className="modal-header-padding" style={{
          padding: '20px 28px 16px',
          borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '14px'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="cyber-badge">{project.category}</span>
              <span className="cyber-badge green">{project.badge}</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="モーダルを閉じる"
            style={{
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              color: 'var(--text-main)',
              borderRadius: '10px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Navigation Tabs (Horizontally scrollable on mobile) */}
        <div className="modal-tabs">
          <button
            className={`tab-btn ${activeTab === 'diagram' ? 'active' : ''}`}
            onClick={() => setActiveTab('diagram')}
          >
            <Layers size={16} /> 🗺️ 構成図 (双方向)
          </button>

          <button
            className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <FileCode size={16} /> 📜 Terraformコード
          </button>

          <button
            className={`tab-btn ${activeTab === 'availability' ? 'active' : ''}`}
            onClick={() => setActiveTab('availability')}
          >
            <ShieldCheck size={16} /> 🛡️ 可用性・冗長化
          </button>

          <button
            className={`tab-btn ${activeTab === 'cost' ? 'active' : ''}`}
            onClick={() => setActiveTab('cost')}
          >
            <DollarSign size={16} /> 💰 コスト・監視
          </button>
        </div>

        {/* Modal Body Tab Content */}
        <div className="modal-body-padding" style={{ padding: '28px' }}>
          {activeTab === 'diagram' && <ArchitectureDiagram project={project} />}
          {activeTab === 'code' && <CodeViewer project={project} />}
          {activeTab === 'availability' && <AvailabilitySection project={project} />}
          {activeTab === 'cost' && <CostCalculator project={project} />}
        </div>
      </div>
    </div>
  );
}
