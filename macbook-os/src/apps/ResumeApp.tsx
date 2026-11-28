import React, { useState } from 'react';
import { Printer, ZoomIn, ZoomOut } from 'lucide-react';
import { audits, experience, profile, projects, stack } from '../data/portfolio';

export const ResumeApp: React.FC = () => {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="resume-app">
      <div className="resume-toolbar">
        <span className="resume-filename">Usman_Anwar_Resume.pdf — Page 1 of 1</span>
        <div className="resume-controls">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(75, z - 10))}
            aria-label="Zoom out"
          >
            <ZoomOut size={14} />
          </button>
          <span className="mono">{zoom}%</span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(130, z + 10))}
            aria-label="Zoom in"
          >
            <ZoomIn size={14} />
          </button>
          <button
            type="button"
            className="mac-btn-primary"
            onClick={() => window.print()}
          >
            <Printer size={13} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      <div className="resume-canvas">
        <div
          className="resume-sheet"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        >
          <header className="rs-header">
            <div>
              <h1>{profile.name}</h1>
              <p className="rs-role">
                {profile.role} · Smart Contract Security Researcher
              </p>
            </div>
            <div className="rs-contact">
              <span>{profile.links.email}</span>
              <span>usmananwar.me</span>
              <span>github.com/usmananwar11</span>
              <span>{profile.location}</span>
            </div>
          </header>

          <section className="rs-section">
            <h2>Summary</h2>
            <p>
              {profile.bioLead} {profile.bioParagraphs[0]} {profile.bioParagraphs[1]}
            </p>
          </section>

          <section className="rs-section">
            <h2>Experience</h2>
            {experience.map((role) => (
              <div key={role.company} className="rs-item">
                <div className="rs-item-head">
                  <strong>
                    {role.role} — {role.company}
                  </strong>
                  <span>{role.period}</span>
                </div>
                <ul>
                  {role.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <p className="rs-meta">
                  <strong>Programs:</strong> {role.programs.map((p) => `${p.name} (${p.ecosystem})`).join(' · ')}
                </p>
              </div>
            ))}
          </section>

          <section className="rs-section">
            <h2>Security Audits &amp; Selected Projects</h2>
            {audits.map((a) => (
              <div key={a.target} className="rs-item">
                <div className="rs-item-head">
                  <strong>
                    {a.target} Security Audit ({a.engagement})
                  </strong>
                  <span>{a.period}</span>
                </div>
                <p>
                  Consolidated {a.severity.high} High, {a.severity.medium} Medium, and {a.severity.low} Low unique
                  findings covering {a.scope.toLowerCase()}
                </p>
              </div>
            ))}
            <div className="rs-proj-list">
              {projects.map((p) => (
                <div key={p.id} className="rs-proj-line">
                  <strong>{p.name}</strong> ({p.context}): {p.description}
                </div>
              ))}
            </div>
          </section>

          <section className="rs-section">
            <h2>Technical Stack &amp; Education</h2>
            <div className="rs-skills">
              {stack.map((group) => (
                <div key={group.label}>
                  <strong>{group.label}:</strong> {group.items.map((i) => i.name).join(', ')}
                </div>
              ))}
              <div>
                <strong>Education:</strong> {profile.education}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
