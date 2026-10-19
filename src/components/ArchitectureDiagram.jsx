import React, { useState } from 'react';
import { Server, Database, Shield, Zap, Globe, Layers, Info } from 'lucide-react';

export default function ArchitectureDiagram({ project }) {
  const [selectedNode, setSelectedNode] = useState(project.nodes[0]);
  const [animateTraffic, setAnimateTraffic] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header controls for Diagram */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <Layers size={18} color="var(--cyan-primary)" />
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>AWS インフラ構成図 (インタラクティブ)</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>※タップで仕様表示</span>
        </div>

        <button 
          className="btn-secondary"
          onClick={() => setAnimateTraffic(!animateTraffic)}
          style={{ fontSize: '0.75rem', padding: '6px 12px' }}
        >
          <Zap size={14} color={animateTraffic ? 'var(--amber-warning)' : 'var(--text-dim)'} />
          トラフィック: {animateTraffic ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="diagram-layout-grid">
        {/* Visual Diagram Box */}
        <div className="diagram-box-padding" style={{
          background: '#ffffff',
          border: '1px solid var(--border-cyan)',
          borderRadius: '14px',
          padding: '24px',
          minHeight: '380px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          {/* Subnet Boundaries Visual Background */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            bottom: '12px',
            border: '1.5px dashed rgba(2, 132, 199, 0.25)',
            borderRadius: '10px',
            pointerEvents: 'none'
          }}>
            <span style={{ position: 'absolute', top: '6px', left: '10px', fontSize: '0.65rem', color: 'var(--cyan-primary)', fontWeight: 700 }}>
              REGION: ap-northeast-1 (MULTI-AZ)
            </span>
          </div>

          {/* Node Grid Layout */}
          <div className="diagram-nodes-grid">
            {project.nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{
                    background: isSelected ? 'rgba(2, 132, 199, 0.08)' : '#f8fafc',
                    border: `1.5px solid ${isSelected ? 'var(--cyan-primary)' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    padding: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 0 15px rgba(2, 132, 199, 0.2)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '7px',
                      background: isSelected ? 'var(--cyan-primary)' : '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isSelected ? '#fff' : 'var(--cyan-primary)',
                      flexShrink: 0
                    }}>
                      {node.type.includes('DB') || node.type.includes('Database') ? <Database size={16} /> :
                       node.type.includes('Edge') || node.type.includes('CDN') ? <Globe size={16} /> :
                       node.type.includes('Security') || node.type.includes('WAF') ? <Shield size={16} /> :
                       <Server size={16} />}
                    </div>

                    <span style={{ fontSize: '0.62rem', fontWeight: 600, color: 'var(--emerald-success)', background: 'rgba(5,150,105,0.1)', padding: '2px 5px', borderRadius: '4px' }}>
                      {node.status}
                    </span>
                  </div>

                  <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a', marginBottom: '2px', wordBreak: 'break-word' }}>
                    {node.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {node.type}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--cyan-primary)', marginTop: '4px', fontWeight: 600 }}>
                    📍 {node.az}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Traffic Animation SVG Line */}
          {animateTraffic && (
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
              <path 
                d="M 50 200 Q 250 120 500 200 T 950 200" 
                fill="none" 
                stroke="var(--cyan-primary)" 
                strokeWidth="2" 
                className="animated-flow" 
                opacity="0.5" 
              />
            </svg>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', fontSize: '0.72rem', color: 'var(--text-dim)', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
            <span>🔒 TLS 1.3 Strict Encrypted</span>
            <span>🛡️ Isolated Private Subnets</span>
          </div>
        </div>

        {/* Node Detail Inspector Drawer */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-cyan)',
          borderRadius: '14px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', pb: '10px' }}>
            <Info size={18} color="var(--cyan-primary)" />
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>コンポーネント詳細仕様</span>
          </div>

          {selectedNode ? (
            <div>
              <div className="cyber-badge" style={{ marginBottom: '8px' }}>
                {selectedNode.type}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                {selectedNode.name}
              </h3>

              <div style={{ fontSize: '0.8rem', color: 'var(--cyan-primary)', fontWeight: 600, marginBottom: '14px' }}>
                配置エリア: {selectedNode.az}
              </div>

              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '16px'
              }}>
                {selectedNode.detail}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)' }}>
                  <span>稼働状態:</span>
                  <span style={{ color: 'var(--emerald-success)', fontWeight: 600 }}>{selectedNode.status}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)' }}>
                  <span>ヘルスチェック:</span>
                  <span style={{ color: '#0f172a', fontWeight: 600 }}>HTTP 200 / Interval 15s</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)' }}>
                  <span>セキュリティグループ:</span>
                  <span style={{ color: 'var(--cyan-primary)', fontWeight: 600 }}>sg-0a8f9c1e (Strict)</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              ノードを選択して詳細情報を表示します。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
