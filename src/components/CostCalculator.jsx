import React, { useState } from 'react';
import { DollarSign, Activity, PieChart, Cpu, HardDrive, Network, Shield } from 'lucide-react';

export default function CostCalculator({ project }) {
  const [scaleFactor, setScaleFactor] = useState(1);

  // Simulated metrics
  const cpuUsage = Math.floor(32 * scaleFactor);
  const memoryUsage = Math.floor(48 * scaleFactor);
  const rps = Math.floor(1250 * scaleFactor);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Live Monitoring Gauge Bar */}
      <div style={{
        background: '#090e1a',
        border: '1px solid var(--border-cyan)',
        borderRadius: '14px',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity color="var(--cyan-primary)" size={20} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Prometheus / CloudWatch メトリクスライブシミュレータ</h3>
          </div>

          {/* Load Scale Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>アクセス負荷シミュレーション:</span>
            <input 
              type="range" 
              min="0.5" 
              max="2.5" 
              step="0.1" 
              value={scaleFactor}
              onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
              style={{ accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
            />
            <span style={{ color: 'var(--cyan-primary)', fontWeight: 700, minWidth: '45px' }}>{scaleFactor}x</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {/* Gauge 1: CPU */}
          <div style={{ background: '#0b1120', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Cpu size={14} /> Cluster CPU Load</span>
              <span style={{ color: cpuUsage > 70 ? 'var(--amber-warning)' : 'var(--cyan-primary)', fontWeight: 700 }}>{cpuUsage}%</span>
            </div>
            <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(cpuUsage, 100)}%`,
                background: cpuUsage > 70 ? 'var(--amber-warning)' : 'linear-gradient(90deg, #06b6d4, #3b82f6)',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Gauge 2: Memory */}
          <div style={{ background: '#0b1120', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><HardDrive size={14} /> RAM Utilization</span>
              <span style={{ color: 'var(--emerald-success)', fontWeight: 700 }}>{memoryUsage}%</span>
            </div>
            <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(memoryUsage, 100)}%`,
                background: 'linear-gradient(90deg, #10b981, #06b6d4)',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Gauge 3: Request Rate */}
          <div style={{ background: '#0b1120', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Network size={14} /> Request Rate</span>
              <span style={{ color: 'var(--purple-accent)', fontWeight: 700 }}>{rps.toLocaleString()} req/s</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '6px' }}>
              ALB P99 Latency: <strong style={{ color: '#fff' }}>14.2 ms</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Estimate Box */}
      <div style={{
        background: '#090e1a',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={18} color="var(--emerald-success)" />
            AWS 月額想定コスト内訳 (USD)
          </h3>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--emerald-success)' }}>
            {project.estimatedCost}
          </span>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          ※東京リージョン (ap-northeast-1) オンデマンド標準価格およびリザーブドインスタンス/Savings Plans割引を適用した想定見積もりです。Auto Scaling スケーリング動作時のピーク帯域幅コストを含みます。
        </p>
      </div>
    </div>
  );
}
