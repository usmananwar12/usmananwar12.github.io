import React, { useState } from 'react';
import { FileCode, Trash2 } from 'lucide-react';
import { trashItems } from '../data/portfolio';

export const TrashApp: React.FC = () => {
  const [items, setItems] = useState(trashItems);
  const [emptied, setEmptied] = useState(false);

  return (
    <div className="trash-app">
      <div className="trash-bar">
        <span>{items.length} items in Trash</span>
        <button
          type="button"
          className="mac-btn-secondary"
          disabled={items.length === 0}
          onClick={() => {
            setItems([]);
            setEmptied(true);
          }}
        >
          <Trash2 size={13} />
          <span>Empty Trash</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="trash-empty">
          <Trash2 size={32} />
          <p>{emptied ? 'Trash emptied. Clean workspace, zero vulnerabilities.' : 'Trash is empty.'}</p>
        </div>
      ) : (
        <div className="trash-list">
          {items.map((item) => (
            <div key={item.name} className="trash-row">
              <FileCode size={18} className="trash-ic" />
              <div className="trash-info">
                <strong>{item.name}</strong>
                <span>{item.note}</span>
              </div>
              <div className="trash-meta mono">
                <span>{item.size}</span>
                <span>{item.deleted}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
