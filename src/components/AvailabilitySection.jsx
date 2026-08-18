import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw, Clock, Activity, Zap } from 'lucide-react';

export default function AvailabilitySection({ project }) {
  const { availabilityDetails, targetSla, rto, rpo } = project;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* SLA & RTO/RPO Metrics Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid var(--border-cyan)', borderRadius: '12px', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={14} color="var(--cyan-primary)" /> 目標システムSLA (稼働率)
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--cyan-primary)' }}>
            {targetSla}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            年間停止許容時間: 52.6分以内
          </div>
        </div>

        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} color="var(--emerald-success)" /> 目標復旧時間 (RTO)
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-success)' }}>
            {rto}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            自動スケーリング / フェイルオーバー
          </div>
        </div>

        <div style={{ background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '12px', padding: '16px 20px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={14} color="var(--purple-accent)" /> 目標復旧時点 (RPO)
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--purple-accent)' }}>
            {rpo}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            データ損失ゼロ (同期複製)
          </div>
        </div>
      </div>

      {/* SPOF Checklist */}
      <div style={{
        background: '#090e1a',
        border: '1px solid var(--border-cyan)',
        borderRadius: '14px',
        padding: '24px'
      }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck color="var(--emerald-success)" size={20} />
          単一障害点 (SPOF) 排除チェックリスト
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {availabilityDetails.spofChecklist.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff', marginBottom: '4px' }}>
                  {item.item}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {item.detail}
                </div>
              </div>

              <span style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--emerald-success)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                flexShrink: 0
              }}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AZ Failover Scenario Walkthrough */}
      <div style={{
        background: '#090e1a',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
        padding: '24px'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RefreshCw size={18} color="var(--cyan-primary)" />
          アベイラビリティゾーン (AZ) 障害発生時のフェイルオーバーシーケンス
        </h3>

        <div style={{
          background: '#0b1120',
          border: '1px dashed var(--border-cyan)',
          borderRadius: '10px',
          padding: '16px',
          fontSize: '0.88rem',
          color: 'var(--text-muted)',
          lineHeight: 1.7
        }}>
          {availabilityDetails.failoverScenario}
        </div>
      </div>
    </div>
  );
}
