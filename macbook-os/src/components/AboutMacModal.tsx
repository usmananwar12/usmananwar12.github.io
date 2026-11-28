import React from 'react';
import { X } from 'lucide-react';
import { profile } from '../data/portfolio';

interface AboutMacModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const AboutMacModal: React.FC<AboutMacModalProps> = ({ isOpen, onClose, onOpenResume }) => {
  if (!isOpen) return null;

  return (
    <div className="about-mac-backdrop" onMouseDown={onClose}>
      <div className="about-mac-card" onMouseDown={(e) => e.stopPropagation()}>
        <button type="button" className="about-mac-close" onClick={onClose} aria-label="Close">
          <X size={13} />
        </button>

        <div className="about-mac-emblem">
          <div className="about-mac-ring" />
          <span>UA</span>
        </div>

        <h2>{profile.name}</h2>
        <p className="about-mac-sub">{profile.macSpecs.model}</p>

        <dl className="about-mac-specs">
          <div>
            <dt>Chip</dt>
            <dd>{profile.macSpecs.chip}</dd>
          </div>
          <div>
            <dt>Current Role</dt>
            <dd>
              {profile.role} · {profile.company}
            </dd>
          </div>
          <div>
            <dt>Education</dt>
            <dd>{profile.macSpecs.education}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>macOS</dt>
            <dd>{profile.macSpecs.os}</dd>
          </div>
          <div>
            <dt>Serial</dt>
            <dd className="mono">{profile.macSpecs.serial}</dd>
          </div>
        </dl>

        <div className="about-mac-actions">
          <button
            type="button"
            className="mac-btn-primary"
            onClick={() => {
              onClose();
              onOpenResume();
            }}
          >
            View Resume.pdf
          </button>
          <button type="button" className="mac-btn-secondary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
