import React, { useState } from 'react';
import { Copy, Check, FileCode, Play, GitBranch } from 'lucide-react';

export default function CodeViewer({ project }) {
  const [selectedFile, setSelectedFile] = useState(project.codeFiles[0]);
  const [copied, setCopied] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  const handleCopy = () => {
    if (!selectedFile) return;
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateValidate = () => {
    setValidating(true);
    setValidationResult(null);
    setTimeout(() => {
      setValidating(false);
      setValidationResult("Success! The configuration is valid. 0 errors, 0 warnings.");
    }, 800);
  };

  return (
    <div style={{
      background: '#090e1a',
      border: '1px solid var(--border-cyan)',
      borderRadius: '14px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Code Studio Header / File Tabs */}
      <div style={{
        background: '#0f172a',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '8px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {/* Top Row: File Tabs */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          paddingBottom: '2px',
          WebkitOverflowScrolling: 'touch'
        }}>
          {project.codeFiles.map((file) => {
            const isSelected = selectedFile?.filename === file.filename;
            return (
              <button
                key={file.filename}
                onClick={() => {
                  setSelectedFile(file);
                  setValidationResult(null);
                }}
                style={{
                  background: isSelected ? '#0b1120' : 'transparent',
                  color: isSelected ? 'var(--cyan-primary)' : 'var(--text-muted)',
                  border: isSelected ? '1px solid var(--border-cyan)' : '1px solid transparent',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
              >
                <FileCode size={13} />
                {file.filename}
              </button>
            );
          })}
        </div>

        {/* Action Buttons Row */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button 
            className="btn-secondary"
            onClick={handleCopy}
            style={{ fontSize: '0.72rem', padding: '5px 10px' }}
          >
            {copied ? <Check size={12} color="var(--emerald-success)" /> : <Copy size={12} />}
            {copied ? 'コピー完了' : 'コードコピー'}
          </button>

          <button 
            className="btn-secondary"
            onClick={handleSimulateValidate}
            disabled={validating}
            style={{ fontSize: '0.72rem', padding: '5px 10px' }}
          >
            <Play size={12} color="var(--emerald-success)" />
            {validating ? '検証中...' : 'validate 実行'}
          </button>

          <a 
            href="https://github.com/siw24010038-ui/infra-portfolio" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-secondary" 
            style={{ fontSize: '0.72rem', padding: '5px 10px', textDecoration: 'none', color: '#0f172a' }}
          >
            <GitBranch size={12} color="var(--cyan-primary)" /> GitHub
          </a>
        </div>
      </div>

      {/* Validation Banner Simulation */}
      {validationResult && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '8px 12px',
          fontSize: '0.75rem',
          color: 'var(--emerald-success)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-mono)'
        }}>
          <Check size={14} />
          {validationResult}
        </div>
      )}

      {/* Code Display Area */}
      <div style={{
        padding: '14px 10px',
        overflowX: 'auto',
        maxHeight: '400px',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-mono)',
        lineHeight: 1.55,
        color: '#e2e8f0',
        background: '#0b1120',
        WebkitOverflowScrolling: 'touch'
      }}>
        <pre style={{ margin: 0 }}>
          {selectedFile?.code.split('\n').map((line, idx) => (
            <div key={idx} style={{ display: 'flex', minWidth: 'fit-content' }}>
              <span style={{
                width: '32px',
                color: '#475569',
                userSelect: 'none',
                textAlign: 'right',
                paddingRight: '10px',
                flexShrink: 0
              }}>
                {idx + 1}
              </span>
              <span style={{
                color: line.trim().startsWith('#') ? '#64748b' :
                       line.includes('resource') || line.includes('module') ? '#38bdf8' :
                       line.includes('tags') || line.includes('cidr_block') ? '#f472b6' :
                       '#f8fafc',
                whiteSpace: 'pre'
              }}>
                {line}
              </span>
            </div>
          ))}
        </pre>
      </div>

      {/* Footer Info */}
      <div style={{
        background: '#0f172a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '8px 12px',
        fontSize: '0.7rem',
        color: 'var(--text-dim)',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '4px'
      }}>
        <span>HCL / Terraform Module</span>
        <span>IAM Least Privilege Applied</span>
      </div>
    </div>
  );
}
