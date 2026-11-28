import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  ChevronRight,
  ExternalLink,
  Folder,
  FolderOpen,
  Grid2x2,
  Layers,
  List,
  Shield,
  Terminal as TerminalIcon,
} from 'lucide-react';
import { audits, experience, profile, projects, stack } from '../data/portfolio';
import { AppId } from '../types/os';

type SidebarSection = 'projects' | 'experience' | 'audits' | 'stack' | 'overview';

interface FinderAppProps {
  payload?: string;
  onOpenApp: (id: AppId, payload?: string) => void;
}

export const FinderApp: React.FC<FinderAppProps> = ({ payload, onOpenApp }) => {
  const [section, setSection] = useState<SidebarSection>('projects');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(projects[0].id);

  useEffect(() => {
    if (!payload) return;
    if (payload.startsWith('project:')) {
      const pid = payload.replace('project:', '');
      setSection('projects');
      setSelectedProjectId(pid);
    } else if (
      payload === 'projects' ||
      payload === 'experience' ||
      payload === 'audits' ||
      payload === 'stack' ||
      payload === 'overview'
    ) {
      setSection(payload);
    }
  }, [payload]);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) ?? projects[0];

  return (
    <div className="finder-app">
      {/* macOS Sidebar */}
      <aside className="finder-sidebar">
        <div className="finder-group-label">Favorites</div>
        <button
          type="button"
          className={`finder-nav-item ${section === 'overview' ? 'is-active' : ''}`}
          onClick={() => setSection('overview')}
        >
          <FolderOpen size={15} />
          <span>Usman&apos;s Home</span>
        </button>
        <button
          type="button"
          className={`finder-nav-item ${section === 'projects' ? 'is-active' : ''}`}
          onClick={() => setSection('projects')}
        >
          <Folder size={15} />
          <span>Projects</span>
          <span className="finder-count">{projects.length}</span>
        </button>
        <button
          type="button"
          className={`finder-nav-item ${section === 'experience' ? 'is-active' : ''}`}
          onClick={() => setSection('experience')}
        >
          <Briefcase size={15} />
          <span>Experience</span>
        </button>
        <button
          type="button"
          className={`finder-nav-item ${section === 'audits' ? 'is-active' : ''}`}
          onClick={() => setSection('audits')}
        >
          <Shield size={15} />
          <span>Security Audits</span>
        </button>
        <button
          type="button"
          className={`finder-nav-item ${section === 'stack' ? 'is-active' : ''}`}
          onClick={() => setSection('stack')}
        >
          <Layers size={15} />
          <span>Tech Stack</span>
        </button>

        <div className="finder-group-label" style={{ marginTop: 18 }}>
          Quick Launch
        </div>
        <button type="button" className="finder-nav-item" onClick={() => onOpenApp('terminal')}>
          <TerminalIcon size={15} />
          <span>Open Terminal</span>
        </button>
        <button type="button" className="finder-nav-item" onClick={() => onOpenApp('resume')}>
          <Folder size={15} />
          <span>Resume.pdf</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="finder-main">
        <div className="finder-toolbar">
          <div className="finder-breadcrumb">
            <span>usman</span>
            <ChevronRight size={13} />
            <strong>{section.charAt(0).toUpperCase() + section.slice(1)}</strong>
          </div>

          {section === 'projects' && (
            <div className="finder-view-switch">
              <button
                type="button"
                className={viewMode === 'grid' ? 'is-active' : ''}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <Grid2x2 size={14} />
              </button>
              <button
                type="button"
                className={viewMode === 'list' ? 'is-active' : ''}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <List size={14} />
              </button>
            </div>
          )}
        </div>

        <div className="finder-content">
          {section === 'projects' && (
            <div className="finder-projects-layout">
              <div className={viewMode === 'grid' ? 'finder-grid' : 'finder-list'}>
                {projects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`finder-project-item ${selectedProject.id === p.id ? 'is-selected' : ''}`}
                    onClick={() => setSelectedProjectId(p.id)}
                  >
                    <div className="fp-folder-glyph">
                      <Folder size={viewMode === 'grid' ? 30 : 18} />
                    </div>
                    <div className="fp-info">
                      <strong>{p.name}</strong>
                      <span>{p.tagline}</span>
                    </div>
                    {viewMode === 'list' && <span className="fp-ctx">{p.context}</span>}
                  </button>
                ))}
              </div>

              {/* Inspector Pane */}
              <div className="finder-inspector">
                <div className="fi-head">
                  <span className="fi-context">{selectedProject.context}</span>
                  <h3>{selectedProject.name}</h3>
                  <p className="fi-tagline">{selectedProject.tagline}</p>
                </div>

                <div className="fi-status">{selectedProject.status}</div>
                <p className="fi-desc">{selectedProject.description}</p>

                <div className="fi-section">
                  <h4>Key Highlights</h4>
                  <ul>
                    {selectedProject.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>

                <div className="fi-tags">
                  {selectedProject.chains.map((c) => (
                    <span key={c} className="mac-chip is-accent">
                      {c}
                    </span>
                  ))}
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="mac-chip">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="fi-actions">
                  {selectedProject.href && (
                    <a
                      href={selectedProject.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mac-btn-primary"
                    >
                      <span>Open on GitHub</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {selectedProject.id === 'paymate' && (
                    <button
                      type="button"
                      className="mac-btn-secondary"
                      onClick={() => onOpenApp('security')}
                    >
                      View PayMate Audit →
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {section === 'overview' && (
            <div className="finder-cards-stack">
              <div className="finder-hero-card">
                <span className="mac-chip is-accent">{profile.handle}</span>
                <h2>{profile.name}</h2>
                <p>{profile.headline}</p>
                <div className="finder-quick-grid">
                  <button type="button" className="fq-btn" onClick={() => setSection('projects')}>
                    <strong>{projects.length} Projects</strong>
                    <span>PayMate, CredMate, ChainSec, DeKYC...</span>
                  </button>
                  <button type="button" className="fq-btn" onClick={() => onOpenApp('security')}>
                    <strong>16 Audit Findings</strong>
                    <span>PayMate pre-production review</span>
                  </button>
                  <button type="button" className="fq-btn" onClick={() => onOpenApp('vscode')}>
                    <strong>5 Ecosystems</strong>
                    <span>EVM, Starknet, Stellar, XRPL, Solana</span>
                  </button>
                  <button type="button" className="fq-btn" onClick={() => onOpenApp('mail')}>
                    <strong>Contact &amp; Links</strong>
                    <span>Email, GitHub, LinkedIn, X, Telegram</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {section === 'experience' && (
            <div className="finder-cards-stack">
              {experience.map((role) => (
                <div key={role.company} className="finder-detail-card">
                  <div className="fdc-top">
                    <div>
                      <h3>{role.role}</h3>
                      <p className="fdc-sub">{role.company}</p>
                    </div>
                    <span className="mac-chip is-accent">{role.period}</span>
                  </div>
                  <p className="fdc-body">{role.summary}</p>
                  <ul className="fdc-list">
                    {role.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="fdc-programs">
                    <h4>Ecosystem Programs &amp; Accelerators</h4>
                    <div className="fi-tags">
                      {role.programs.map((prog) => (
                        <span key={prog.name} className="mac-chip">
                          {prog.name} · {prog.ecosystem}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {section === 'audits' && (
            <div className="finder-cards-stack">
              {audits.map((audit) => (
                <div key={audit.target} className="finder-detail-card">
                  <div className="fdc-top">
                    <div>
                      <h3>{audit.target} — {audit.subtitle}</h3>
                      <p className="fdc-sub">{audit.engagement}</p>
                    </div>
                    <span className="mac-chip">{audit.period}</span>
                  </div>
                  <p className="fdc-body">{audit.scope}</p>
                  <div className="fi-tags" style={{ marginTop: 12 }}>
                    <span className="sev-badge sev-high">{audit.severity.high} High</span>
                    <span className="sev-badge sev-med">{audit.severity.medium} Medium</span>
                    <span className="sev-badge sev-low">{audit.severity.low} Low</span>
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <button
                      type="button"
                      className="mac-btn-primary"
                      onClick={() => onOpenApp('security')}
                    >
                      Open Full Report in ChainSec Lab →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {section === 'stack' && (
            <div className="finder-stack-grid">
              {stack.map((group) => (
                <div key={group.label} className="finder-detail-card">
                  <h3>{group.label}</h3>
                  <p className="fdc-sub" style={{ marginBottom: 12 }}>{group.note}</p>
                  <div className="fi-tags">
                    {group.items.map((item) => (
                      <span
                        key={item.name}
                        className={`mac-chip ${item.tier === 'core' ? 'is-accent' : ''}`}
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
