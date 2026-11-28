import React, { useEffect, useState } from 'react';
import { Braces, Code2, Cpu, FileCode2, FolderTree, ShieldAlert } from 'lucide-react';
import { stack } from '../data/portfolio';

type EditorTab = 'stack' | 'paymate' | 'cairo' | 'chainsec';

const codeFiles: Record<
  Exclude<EditorTab, 'stack'>,
  { filename: string; lang: string; lines: string[] }
> = {
  paymate: {
    filename: 'PayMatePool.sol',
    lang: 'Solidity 0.8.28',
    lines: [
      '// SPDX-License-Identifier: MIT',
      'pragma solidity ^0.8.28;',
      '',
      '/// @title PayMate Liquidity Prefunding Pool (Conceptual Architecture)',
      '/// @author Usman Anwar — DeFa by InvoiceMate',
      '/// @notice Connects decentralized LP capital with PayFi settlement flows.',
      'contract PayMatePool {',
      '    uint256 public constant WAD = 1e18;',
      '    uint256 public totalPrincipalDeployed;',
      '    uint256 public treasuryReserve;',
      '',
      '    error ExceedsPoolLiquidity(uint256 requested, uint256 available);',
      '    error InvariantViolation(string reason);',
      '',
      '    /// @dev Invariant: liquidBalance + activePrincipal >= totalLPSharesValue',
      '    function _assertSolvencyInvariant(',
      '        uint256 liquidAssets,',
      '        uint256 outstandingPrincipal,',
      '        uint256 liabilities',
      '    ) internal pure {',
      '        if (liquidAssets + outstandingPrincipal < liabilities) {',
      '            revert InvariantViolation("SOLVENCY_BREACH");',
      '        }',
      '    }',
      '',
      '    /// @notice Pre-production audit: 16 unique findings (2 High, 10 Med, 4 Low)',
      '    ///         discovered via manual review + ChainSec multi-agent pipeline.',
      '}',
    ],
  },
  cairo: {
    filename: 'cred_mate.cairo',
    lang: 'Cairo 2.x · Starknet',
    lines: [
      '/// CredMate — On-chain Credit & Verification on Starknet',
      '/// Built with Scarb + Starknet Foundry (Starknet Cohort)',
      '#[starknet::interface]',
      'pub trait ICredMateRegistry<TContractState> {',
      '    fn anchor_credit_commitment(',
      '        ref self: TContractState,',
      '        borrower: starknet::ContractAddress,',
      '        commitment_hash: felt252,',
      '        tier_score: u16,',
      '    );',
      '    fn verify_standing(',
      '        self: @TContractState,',
      '        borrower: starknet::ContractAddress,',
      '    ) -> bool;',
      '}',
      '',
      '#[starknet::contract]',
      'mod CredMateRegistry {',
      '    use starknet::ContractAddress;',
      '    use starknet::storage::{Map, StoragePointerReadAccess};',
      '',
      '    #[storage]',
      '    struct Storage {',
      '        commitments: Map<ContractAddress, felt252>,',
      '        standing_score: Map<ContractAddress, u16>,',
      '        verifier_authority: ContractAddress,',
      '    }',
      '}',
    ],
  },
  chainsec: {
    filename: 'chainsec.config.json',
    lang: 'JSON · ChainSec Pipeline',
    lines: [
      '{',
      '  "name": "ChainSec",',
      '  "author": "Usman Anwar (@usmananwar11)",',
      '  "repo": "https://github.com/usmananwar11/ChainSec",',
      '  "runtime": "Claude Code Plugin · Multi-Agent Audit Pipeline",',
      '  "chains": {',
      '    "solidity_evm": "production",',
      '    "starknet_cairo": "preview",',
      '    "stellar_soroban": "planned"',
      '  },',
      '  "pipelineStages": [',
      '    "1. Compiler-based AST & storage fact extraction",',
      '    "2. Automated contract surface risk scoring",',
      '    "3. Parallel vulnerability detection lenses",',
      '    "4. Gated adversarial verification & PoC check",',
      '    "5. Benchmark against official Code4rena reports"',
      '  ]',
      '}',
    ],
  },
};

interface VSCodeAppProps {
  payload?: string;
}

export const VSCodeApp: React.FC<VSCodeAppProps> = ({ payload }) => {
  const [activeTab, setActiveTab] = useState<EditorTab>('stack');

  useEffect(() => {
    if (payload === 'stack' || payload === 'paymate' || payload === 'cairo' || payload === 'chainsec') {
      setActiveTab(payload);
    }
  }, [payload]);

  const activeFile = activeTab !== 'stack' ? codeFiles[activeTab] : null;

  return (
    <div className="vscode-app">
      {/* Activity Bar */}
      <div className="vsc-activity">
        <button
          type="button"
          className={activeTab === 'stack' ? 'is-active' : ''}
          onClick={() => setActiveTab('stack')}
          title="Stack Overview"
        >
          <Cpu size={17} />
        </button>
        <button
          type="button"
          className={activeTab !== 'stack' ? 'is-active' : ''}
          onClick={() => setActiveTab('paymate')}
          title="Explorer"
        >
          <FolderTree size={17} />
        </button>
      </div>

      {/* File Explorer */}
      <aside className="vsc-sidebar">
        <div className="vsc-side-title">EXPLORER · USMAN-WORKSPACE</div>
        <button
          type="button"
          className={`vsc-file ${activeTab === 'stack' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('stack')}
        >
          <Code2 size={14} className="vsc-ic-ts" />
          <span>stack.overview.tsx</span>
        </button>
        <button
          type="button"
          className={`vsc-file ${activeTab === 'paymate' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('paymate')}
        >
          <FileCode2 size={14} className="vsc-ic-sol" />
          <span>PayMatePool.sol</span>
        </button>
        <button
          type="button"
          className={`vsc-file ${activeTab === 'cairo' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('cairo')}
        >
          <FileCode2 size={14} className="vsc-ic-cairo" />
          <span>cred_mate.cairo</span>
        </button>
        <button
          type="button"
          className={`vsc-file ${activeTab === 'chainsec' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('chainsec')}
        >
          <Braces size={14} className="vsc-ic-json" />
          <span>chainsec.config.json</span>
        </button>
      </aside>

      {/* Main Editor */}
      <div className="vsc-main">
        <div className="vsc-tabs">
          <button
            type="button"
            className={`vsc-tab ${activeTab === 'stack' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('stack')}
          >
            stack.overview.tsx
          </button>
          <button
            type="button"
            className={`vsc-tab ${activeTab === 'paymate' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('paymate')}
          >
            PayMatePool.sol
          </button>
          <button
            type="button"
            className={`vsc-tab ${activeTab === 'cairo' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('cairo')}
          >
            cred_mate.cairo
          </button>
          <button
            type="button"
            className={`vsc-tab ${activeTab === 'chainsec' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('chainsec')}
          >
            chainsec.config.json
          </button>
        </div>

        <div className="vsc-editor-body">
          {activeTab === 'stack' ? (
            <div className="vsc-stack-view">
              <div className="vsc-stack-head">
                <h2>Full-Stack Web3 &amp; Security Stack</h2>
                <p>Tools, languages, and chains I ship production systems with daily.</p>
                <div className="vsc-legend">
                  <span className="tier-pill tier-core">Core · Daily Production</span>
                  <span className="tier-pill tier-working">Working · Ship Regularly</span>
                </div>
              </div>

              <div className="vsc-stack-grid">
                {stack.map((group) => (
                  <div key={group.label} className="vsc-stack-card">
                    <div className="vsc-sc-head">
                      <strong>{group.label}</strong>
                      <span>{group.note}</span>
                    </div>
                    <div className="vsc-sc-items">
                      {group.items.map((item) => (
                        <div key={item.name} className="vsc-skill-row">
                          <span>{item.name}</span>
                          <span className={`tier-pill tier-${item.tier}`}>{item.tier}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            activeFile && (
              <div className="vsc-code-wrap mono">
                {activeFile.lines.map((line, i) => {
                  const trimmed = line.trim();
                  const isComment = trimmed.startsWith('//');
                  return (
                    <div key={i} className="vsc-code-line">
                      <span className="vsc-ln">{i + 1}</span>
                      <span className={`vsc-code-text ${isComment ? 'is-comment' : ''}`}>
                        {line || ' '}
                      </span>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>

        <footer className="vsc-statusbar mono">
          <div className="vsc-sb-left">
            <span>git:(main)</span>
            <span>
              <ShieldAlert size={12} style={{ verticalAlign: '-2px', marginRight: 4 }} />0 Errors
            </span>
          </div>
          <div className="vsc-sb-right">
            <span>{activeFile ? activeFile.lang : 'TypeScript React'}</span>
            <span>Foundry · Scarb</span>
            <span>UTF-8</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
