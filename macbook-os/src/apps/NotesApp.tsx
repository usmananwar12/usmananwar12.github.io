import React, { useEffect, useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import { experience, profile } from '../data/portfolio';

interface NoteItem {
  id: string;
  title: string;
  updated: string;
  folder: string;
  editable?: boolean;
  customBody?: string;
}

const initialNotes: NoteItem[] = [
  { id: 'about', title: 'About Me — README', updated: 'Today, 2:15 PM', folder: 'Profile' },
  { id: 'principles', title: 'Engineering Principles', updated: 'Nov 2026', folder: 'Profile' },
  { id: 'experience', title: 'DeFa by InvoiceMate', updated: 'Dec 2025 — Present', folder: 'Career' },
  { id: 'scratchpad', title: 'Visitor Scratchpad', updated: 'Editable note', folder: 'Scratchpad', editable: true, customBody: 'Feel free to jot down notes while exploring Usman\'s Mac!\n\nTry opening:\n• Terminal (type `help` or `neofetch`)\n• ChainSec Audit Lab (PayMate 16 findings)\n• VS Code (Solidity & Cairo stack)\n• Spotlight Search (⌘K)' },
];

interface NotesAppProps {
  payload?: string;
}

export const NotesApp: React.FC<NotesAppProps> = ({ payload }) => {
  const [notes, setNotes] = useState<NoteItem[]>(initialNotes);
  const [activeId, setActiveId] = useState<string>('about');

  useEffect(() => {
    if (payload && notes.some((n) => n.id === payload)) {
      setActiveId(payload);
    }
  }, [payload, notes]);

  const activeNote = notes.find((n) => n.id === activeId) ?? notes[0];

  const handleCreateNote = () => {
    const id = `note-${Date.now()}`;
    const newNote: NoteItem = {
      id,
      title: `Quick Note ${notes.length - 2}`,
      updated: 'Just now',
      folder: 'Scratchpad',
      editable: true,
      customBody: '',
    };
    setNotes((prev) => [newNote, ...prev]);
    setActiveId(id);
  };

  const updateCustomNote = (value: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === activeNote.id ? { ...n, customBody: value, updated: 'Edited just now' } : n)),
    );
  };

  return (
    <div className="notes-app">
      <aside className="notes-sidebar">
        <div className="notes-side-head">
          <span>All Notes ({notes.length})</span>
          <button
            type="button"
            className="notes-new-btn"
            onClick={handleCreateNote}
            title="New Note"
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="notes-list">
          {notes.map((n) => (
            <button
              key={n.id}
              type="button"
              className={`note-row ${activeId === n.id ? 'is-active' : ''}`}
              onClick={() => setActiveId(n.id)}
            >
              <div className="note-row-title">
                <FileText size={13} />
                <span>{n.title}</span>
              </div>
              <div className="note-row-meta">
                <span>{n.updated}</span>
                <span>· {n.folder}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <div className="notes-editor">
        <div className="notes-date-stamp">{activeNote.updated} · {profile.location}</div>

        {activeNote.id === 'about' && (
          <article className="notes-article">
            <h1>Hi, I&apos;m {profile.name}</h1>
            <p className="notes-lead">{profile.bioLead}</p>
            {profile.bioParagraphs.map((para) => (
              <p key={para}>{para}</p>
            ))}

            <div className="notes-callout">
              <strong>Current Focus</strong>
              <p>
                {profile.role} at <strong>{profile.company}</strong> — shipping PayFi, DeFi &amp; RWA
                liquidity infrastructure across EVM, Starknet, Stellar, XRPL &amp; Solana, while
                building open-source smart contract security tooling (<strong>ChainSec</strong>).
              </p>
            </div>

            <h3>Areas of Interest</h3>
            <div className="fi-tags">
              {profile.interests.map((interest) => (
                <span key={interest} className="mac-chip is-accent">
                  {interest}
                </span>
              ))}
            </div>
          </article>
        )}

        {activeNote.id === 'principles' && (
          <article className="notes-article">
            <h1>Engineering Principles</h1>
            <p className="notes-lead">
              An engineer who works where code meets capital. Three rules I build and audit by:
            </p>
            <div className="principles-stack">
              {profile.principles.map((p, idx) => (
                <div key={p.tag} className="principle-box">
                  <div className="principle-head mono">
                    <span>{p.tag}</span>
                    <span>0{idx + 1}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </article>
        )}

        {activeNote.id === 'experience' && (
          <article className="notes-article">
            {experience.map((role) => (
              <div key={role.company}>
                <span className="mac-chip is-accent">{role.period}</span>
                <h1 style={{ marginTop: 10 }}>{role.role}</h1>
                <p className="notes-lead">{role.company}</p>
                <p>{role.summary}</p>
                <h3>What I Build &amp; Own</h3>
                <ul className="notes-bullets">
                  {role.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h3>Ecosystems &amp; Programs</h3>
                <div className="fi-tags">
                  {role.programs.map((prog) => (
                    <span key={prog.name} className="mac-chip">
                      {prog.name} ({prog.ecosystem})
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </article>
        )}

        {activeNote.editable && (
          <div className="notes-scratch-wrap">
            <h1>{activeNote.title}</h1>
            <textarea
              className="notes-textarea"
              value={activeNote.customBody ?? ''}
              onChange={(e) => updateCustomNote(e.target.value)}
              placeholder="Start typing a note..."
            />
          </div>
        )}
      </div>
    </div>
  );
};
