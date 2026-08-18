import React, { useState } from 'react';
import { Server, Database, Shield, Zap, Globe, Layers, CheckCircle, Info } from 'lucide-react';

export default function ArchitectureDiagram({ project }) {
  const [selectedNode, setSelectedNode] = useState(project.nodes[0]);
  const [animateTraffic, setAnimateTraffic] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header controls for Diagram */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} color="var(--cyan-primary)" />
          <span style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>AWS インフラ構成図 (インタラクティブ)</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>※ノードをクリックすると詳細仕様が表示されます</span>
        </div>

        <button 
          className="btn-secondary"
          onClick={() => setAnimateTraffic(!animateTraffic)}
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}
        >
          <Zap size={14} color={animateTraffic ? 'var(--amber-warning)' : 'var(--text-dim)'} />
          トラフィックフローアニメーション: {animateTraffic ? 'ON' : 'OFF'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
        {/* Visual Diagram Box */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-cyan)',
          borderRadius: '14px',
          padding: '28px',
          minHeight: '400px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          {/* Subnet Boundaries Visual Background */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            right: '16px',
            bottom: '16px',
            border: '1.5px dashed rgba(2, 132, 199, 0.25)',
            borderRadius: '10px',
            pointerEvents: 'none'
          }}>
            <span style={{ position: 'absolute', top: '8px', left: '12px', fontSize: '0.7rem', color: 'var(--cyan-primary)', fontWeight: 700 }}>
              AWS REGION: ap-northeast-1 (TOKYO) - MULTI-AZ ISOLATION
            </span>
          </div>

          {/* Node Grid Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            position: 'relative',
            zIndex: 2,
            margin: '30px 0'
          }}>
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
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 0 15px rgba(2, 132, 199, 0.2)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: isSelected ? 'var(--cyan-primary)' : '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isSelected ? '#fff' : 'var(--cyan-primary)'
                    }}>
                      {node.type.includes('DB') || node.type.includes('Database') ? <Database size={18} /> :
                       node.type.includes('Edge') || node.type.includes('CDN') ? <Globe size={18} /> :
                       node.type.includes('Security') || node.type.includes('WAF') ? <Shield size={18} /> :
                       <Server size={18} />}
                    </div>

                    <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--emerald-success)', background: 'rgba(5,150,105,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                      {node.status}
                    </span>
                  </div>

                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '4px' }}>
                    {node.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {node.type}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--cyan-primary)', marginTop: '6px', fontWeight: 600 }}>
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

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
            <span>🔒 TLS 1.3 Strict Encrypted Traffic</span>
            <span>🛡️ Isolated Private Subnets & Security Groups</span>
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
