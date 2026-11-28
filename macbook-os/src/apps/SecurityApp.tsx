import React from 'react';
import { CheckCircle2, ExternalLink, Shield, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { audits, focusAreas, platforms, profile } from '../data/portfolio';

const pipelineSteps = [
  { step: '01', title: 'Compiler Fact Extraction', desc: 'Parses Solidity/Cairo AST, storage slots, modifiers & external call graphs.' },
  { step: '02', title: 'Surface Risk Scoring', desc: 'Prioritizes capital-holding contracts, fixed-point math & privileged roles.' },
  { step: '03', title: 'Parallel Detection Lenses', desc: 'Runs specialized vulnerability agents concurrently across invariants & economics.' },
  { step: '04', title: 'Gated Verification', desc: 'Filters false positives with adversarial proof-of-concept validation.' },
  { step: '05', title: 'Code4rena Benchmarking', desc: 'Benchmarks recall & precision directly against official public audit reports.' },
];

export const SecurityApp: React.FC = () => {
  const paymate = audits[0];
  const totalFindings =
    paymate.severity.high + paymate.severity.medium + paymate.severity.low;

  return (
    <div className="sec-app">
      {/* Header Banner */}
      <div className="sec-banner">
        <div className="sec-banner-left">
          <div className="sec-pill">
            <ShieldCheck size={14} />
            <span>Smart Contract Security Research</span>
          </div>
          <h2>Adversarial Protocol Reviews &amp; ChainSec</h2>
          <p>
            Breaking lending pools, prefunding protocols, and RWA treasuries before mainnet deployment.
          </p>
        </div>
        <a
          href={`${profile.links.github}/ChainSec`}
          target="_blank"
          rel="noopener noreferrer"
          className="mac-btn-primary"
        >
          <span>ChainSec on GitHub</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* PayMate Audit Report Card */}
      <section className="sec-card">
        <div className="sec-card-head">
          <div>
            <span className="sec-kicker">{paymate.engagement} · {paymate.period}</span>
            <h3>
              {paymate.target} — {paymate.subtitle}
            </h3>
          </div>
          <div className="sec-total-badge">
            <strong>{totalFindings}</strong>
            <span>Unique Findings</span>
          </div>
        </div>

        <p className="sec-scope">{paymate.scope}</p>

        {/* Visual Severity Meter */}
        <div className="sec-sev-bars">
          <div className="sec-sev-row">
            <span className="sev-badge sev-high">High · {paymate.severity.high}</span>
            <div className="sec-bar-track">
              <div
                className="sec-bar-fill is-high"
                style={{ width: `${(paymate.severity.high / totalFindings) * 100}%` }}
              />
            </div>
          </div>
          <div className="sec-sev-row">
            <span className="sev-badge sev-med">Medium · {paymate.severity.medium}</span>
            <div className="sec-bar-track">
              <div
                className="sec-bar-fill is-med"
                style={{ width: `${(paymate.severity.medium / totalFindings) * 100}%` }}
              />
            </div>
          </div>
          <div className="sec-sev-row">
            <span className="sev-badge sev-low">Low · {paymate.severity.low}</span>
            <div className="sec-bar-track">
              <div
                className="sec-bar-fill is-low"
                style={{ width: `${(paymate.severity.low / totalFindings) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="sec-method-grid">
          {paymate.method.map((m) => (
            <div key={m} className="sec-method-item">
              <CheckCircle2 size={14} />
              <span>{m}</span>
            </div>
          ))}
        </div>

        <p className="sec-note">{paymate.note}</p>
      </section>

      {/* ChainSec Pipeline */}
      <section className="sec-card">
        <div className="sec-card-head">
          <div>
            <span className="sec-kicker">
              <Sparkles size={12} style={{ verticalAlign: '-1px', marginRight: 5 }} />
              Open-Source Tooling · Claude Code Plugin
            </span>
            <h3>ChainSec Multi-Chain Audit Pipeline</h3>
          </div>
          <div className="fi-tags">
            <span className="mac-chip is-accent">Solidity</span>
            <span className="mac-chip">Cairo (preview)</span>
            <span className="mac-chip">Soroban (planned)</span>
          </div>
        </div>

        <div className="sec-pipeline">
          {pipelineSteps.map((s) => (
            <div key={s.step} className="sec-pipe-step">
              <span className="sec-pipe-num mono">{s.step}</span>
              <div>
                <strong>{s.title}</strong>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Focus Areas + Platforms */}
      <div className="sec-bottom-grid">
        <section className="sec-card">
          <h3 className="sec-sub-h">
            <Shield size={15} /> Security Focus Areas
          </h3>
          <div className="sec-focus-list">
            {focusAreas.map((f) => (
              <div key={f.title} className="sec-focus-item">
                <strong>{f.title}</strong>
                <span>{f.detail}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="sec-card">
          <h3 className="sec-sub-h">
            <Terminal size={15} /> Target Audit Platforms
          </h3>
          <p className="sec-scope" style={{ marginBottom: 14 }}>
            Actively working toward competitive smart contract security reviews across leading Web3
            audit arenas:
          </p>
          <div className="fi-tags">
            {platforms.map((p) => (
              <span key={p} className="mac-chip is-accent">
                {p}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
