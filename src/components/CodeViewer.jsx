import React, { useState } from 'react';
import { Terminal, Copy, Check, FileCode, Play, AlertCircle } from 'lucide-react';

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
        padding: '8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {/* File Tabs */}
        <div style={{ display: 'flex', gap: '4px', overflowX: 'auto' }}>
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
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <FileCode size={14} />
                {file.filename}
              </button>
            );
          })}
        </div>

        {/* Copy & Terraform Validate Simulation buttons */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            className="btn-secondary"
            onClick={handleSimulateValidate}
            disabled={validating}
            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
          >
            <Play size={12} color="var(--emerald-success)" />
            {validating ? '検証中...' : 'terraform validate 実行'}
          </button>

          <button 
            className="btn-secondary"
            onClick={handleCopy}
            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
          >
            {copied ? <Check size={12} color="var(--emerald-success)" /> : <Copy size={12} />}
            {copied ? 'コピー完了' : 'コードコピー'}
          </button>
        </div>
      </div>

      {/* Validation Banner Simulation */}
      {validationResult && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '8px 16px',
          fontSize: '0.8rem',
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
        padding: '20px',
        overflowX: 'auto',
        maxHeight: '450px',
        fontSize: '0.85rem',
        fontFamily: 'var(--font-mono)',
        lineHeight: 1.6,
        color: '#e2e8f0',
        background: '#0b1120'
      }}>
        <pre style={{ margin: 0 }}>
          {selectedFile?.code.split('\n').map((line, idx) => (
            <div key={idx} style={{ display: 'flex' }}>
              <span style={{
                width: '40px',
                color: '#475569',
                userSelect: 'none',
                textAlign: 'right',
                paddingRight: '16px'
              }}>
                {idx + 1}
              </span>
              <span style={{
                color: line.trim().startsWith('#') ? '#64748b' :
                       line.includes('resource') || line.includes('module') ? '#38bdf8' :
                       line.includes('tags') || line.includes('cidr_block') ? '#f472b6' :
                       '#f8fafc'
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
        padding: '8px 16px',
        fontSize: '0.75rem',
        color: 'var(--text-dim)',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <span>Language: HCL / Terraform Module</span>
        <span>Strict IAM Least Privilege & Tagging Best Practices Applied</span>
      </div>
    </div>
  );
}
