import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Globe, Lock, RotateCw, Star } from 'lucide-react';
import { chainEcosystems, profile, projects } from '../data/portfolio';

type SafariTabId = 'start' | 'chainsec' | 'github' | 'ecosystems';

const tabs: { id: SafariTabId; title: string; url: string }[] = [
  { id: 'start', title: 'Usman Start Page', url: 'usmananwar.me' },
  { id: 'chainsec', title: 'ChainSec — GitHub', url: 'github.com/usmananwar11/ChainSec' },
  { id: 'github', title: 'GitHub Profiles', url: 'github.com/usmananwar11' },
  { id: 'ecosystems', title: 'Multi-Chain Stack', url: 'defa.ecosystems/chains' },
];

export const SafariApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SafariTabId>('start');
  const current = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  return (
    <div className="safari-app">
      {/* Safari Toolbar */}
      <div className="safari-toolbar">
        <div className="safari-nav-btns">
          <button
            type="button"
            onClick={() => {
              const idx = tabs.findIndex((t) => t.id === activeTab);
              setActiveTab(tabs[(idx - 1 + tabs.length) % tabs.length].id);
            }}
            aria-label="Back"
          >
            <ArrowLeft size={14} />
          </button>
          <button
            type="button"
            onClick={() => {
              const idx = tabs.findIndex((t) => t.id === activeTab);
              setActiveTab(tabs[(idx + 1) % tabs.length].id);
            }}
            aria-label="Forward"
          >
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="safari-address-bar">
          <Lock size={11} />
          <span>{current.url}</span>
          <RotateCw size={11} className="safari-reload" />
        </div>

        <a
          href={
            activeTab === 'chainsec'
              ? `${profile.links.github}/ChainSec`
              : activeTab === 'github'
                ? profile.links.github
                : profile.links.linkedin
          }
          target="_blank"
          rel="noopener noreferrer"
          className="safari-ext-btn"
          title="Open in new browser tab"
        >
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Tab Strip */}
      <div className="safari-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`safari-tab ${activeTab === tab.id ? 'is-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Globe size={12} />
            <span>{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Viewport */}
      <div className="safari-body">
        {activeTab === 'start' && (
          <div className="safari-start">
            <div className="safari-start-hero">
              <h2>Usman&apos;s Bookmarks &amp; Live Links</h2>
              <p>Quick links to profiles, open-source repositories, and shipped protocols.</p>
            </div>

            <div className="safari-favorites">
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="saf-fav">
                <strong>GitHub (Main)</strong>
                <span>@usmananwar11 ↗</span>
              </a>
              <a href={profile.links.githubAlt} target="_blank" rel="noopener noreferrer" className="saf-fav">
                <strong>GitHub (Secondary)</strong>
                <span>@usmananwar12 ↗</span>
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="saf-fav">
                <strong>LinkedIn</strong>
                <span>musman-anwar ↗</span>
              </a>
              <a href={profile.links.x} target="_blank" rel="noopener noreferrer" className="saf-fav">
                <strong>X / Twitter</strong>
                <span>@Usman_Anwar9957 ↗</span>
              </a>
              <a href={profile.links.telegram} target="_blank" rel="noopener noreferrer" className="saf-fav">
                <strong>Telegram</strong>
                <span>@usmananwar9957 ↗</span>
              </a>
              <button type="button" className="saf-fav" onClick={() => setActiveTab('chainsec')}>
                <strong>ChainSec Repo</strong>
                <span>AI Audit Pipeline →</span>
              </button>
            </div>

            <h3 className="saf-section-h">Featured Protocols</h3>
            <div className="saf-proj-grid">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="saf-proj-card">
                  <span className="saf-ctx">{p.context}</span>
                  <strong>{p.name}</strong>
                  <p>{p.tagline}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'chainsec' && (
          <div className="safari-repo">
            <div className="saf-repo-head">
              <div>
                <div className="saf-repo-path mono">usmananwar11 / <strong>ChainSec</strong></div>
                <p>Smart contract audit pipeline for AI coding agents (Claude Code).</p>
              </div>
              <a
                href={`${profile.links.github}/ChainSec`}
                target="_blank"
                rel="noopener noreferrer"
                className="mac-btn-primary"
              >
                <Star size={13} />
                <span>View on GitHub</span>
              </a>
            </div>

            <div className="saf-repo-readme">
              <h3>README.md</h3>
              <p>
                ChainSec is an open-source, multi-chain smart contract audit pipeline packaged for AI
                coding agents. It combines compiler-based fact extraction, automated risk scoring,
                parallel vulnerability detection lenses, and gated verification of every candidate
                finding.
              </p>
              <ul>
                <li><strong>Solidity / EVM</strong>: Production ready — used on the PayMate pre-production review.</li>
                <li><strong>Starknet / Cairo</strong>: In active preview.</li>
                <li><strong>Stellar / Soroban</strong>: Planned roadmap support.</li>
                <li><strong>Benchmarks</strong>: Built-in evaluation harness against official Code4rena audit reports.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'github' && (
          <div className="safari-repo">
            <div className="saf-repo-head">
              <div>
                <div className="saf-repo-path mono">github.com / usmananwar11</div>
                <p>Primary &amp; secondary GitHub accounts for Usman Anwar.</p>
              </div>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mac-btn-primary"
              >
                <span>Open GitHub</span>
                <ExternalLink size={13} />
              </a>
            </div>
            <div className="saf-proj-grid" style={{ marginTop: 18 }}>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="saf-proj-card is-link">
                <span className="saf-ctx">Primary Account</span>
                <strong>github.com/usmananwar11</strong>
                <p>Open-source Web3 tooling, ChainSec audit pipeline, smart contract repositories.</p>
              </a>
              <a href={profile.links.githubAlt} target="_blank" rel="noopener noreferrer" className="saf-proj-card is-link">
                <span className="saf-ctx">Secondary Account</span>
                <strong>github.com/usmananwar12</strong>
                <p>Portfolio infrastructure, experiments, and web deployments.</p>
              </a>
            </div>
          </div>
        )}

        {activeTab === 'ecosystems' && (
          <div className="safari-start">
            <div className="safari-start-hero">
              <h2>Multi-Chain Ecosystems</h2>
              <p>Chains and execution environments Usman builds production applications across.</p>
            </div>
            <div className="saf-eco-grid">
              {chainEcosystems.map((eco) => (
                <div key={eco.id} className="saf-eco-card">
                  <span className="saf-eco-dot" style={{ background: eco.color }} />
                  <div>
                    <strong>{eco.name}</strong>
                    <p>{eco.vm}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
