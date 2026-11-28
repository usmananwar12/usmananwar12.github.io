import React from 'react';
import { AppId } from '../types/os';

interface AppIconProps {
  id: AppId | 'github' | 'linkedin';
  size?: number;
}

/**
 * Handcrafted macOS Sonoma/Sequoia-style squircle app icons.
 * Crisp at every Retina scale with zero external image dependencies.
 */
export const AppIcon: React.FC<AppIconProps> = ({ id, size = 48 }) => {
  switch (id) {
    case 'finder':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="finderBg" x1="0" y1="0" x2="0" y2="64">
              <stop offset="0%" stopColor="#48b8ff" />
              <stop offset="100%" stopColor="#0f6bff" />
            </linearGradient>
            <linearGradient id="finderLight" x1="0" y1="0" x2="0" y2="64">
              <stop offset="0%" stopColor="#f8fcff" />
              <stop offset="100%" stopColor="#cde5ff" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="15" fill="url(#finderBg)" />
          <path
            d="M34 0H49C57.2843 0 64 6.71573 64 15V49C64 57.2843 57.2843 64 49 64H30C33.5 52 35 42 35 34H29C30 22 32 10 34 0Z"
            fill="url(#finderLight)"
          />
          <rect x="19" y="19" width="3.8" height="9" rx="1.9" fill="#0b2447" />
          <rect x="42" y="19" width="3.8" height="9" rx="1.9" fill="#0b2447" />
          <path
            d="M17.5 40.5C22.5 46.5 41.5 46.5 46.5 40.5"
            stroke="#0b2447"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="14.25" stroke="white" strokeOpacity="0.24" strokeWidth="1.5" />
        </svg>
      );

    case 'notes':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="notesTop" x1="0" y1="0" x2="0" y2="20">
              <stop offset="0%" stopColor="#ffd54f" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="15" fill="#fffdf7" />
          <path d="M0 15C0 6.71573 6.71573 0 15 0H49C57.2843 0 64 6.71573 64 15V19H0V15Z" fill="url(#notesTop)" />
          <line x1="0" y1="19.5" x2="64" y2="19.5" stroke="#d97706" strokeOpacity="0.35" strokeDasharray="3 2" />
          <line x1="11" y1="31" x2="53" y2="31" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="11" y1="41" x2="53" y2="41" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="11" y1="51" x2="40" y2="51" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="11" y="25" width="22" height="3" rx="1.5" fill="#475569" />
          <rect x="11" y="35" width="34" height="2.6" rx="1.3" fill="#94a3b8" />
          <rect x="11" y="45" width="28" height="2.6" rx="1.3" fill="#94a3b8" />
          <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="14.25" stroke="black" strokeOpacity="0.08" strokeWidth="1.5" />
        </svg>
      );

    case 'vscode':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="vscBg" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="vscBlue" x1="14" y1="12" x2="52" y2="52">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="15" fill="url(#vscBg)" />
          <path d="M44.5 13L52 16.6V47.4L44.5 51L22 32L44.5 13Z" fill="url(#vscBlue)" />
          <path d="M44.5 13L22 32L14.5 26.2L12 28.4L18.5 32L12 35.6L14.5 37.8L22 32L44.5 51V13Z" fill="#0ea5e9" />
          <path d="M44.5 13L25.5 32L44.5 51L52 47.4V16.6L44.5 13Z" fill="#38bdf8" fillOpacity="0.88" />
          <path d="M14.5 24.5L26 32L14.5 39.5L11.5 36.7L18 32L11.5 27.3L14.5 24.5Z" fill="#7dd3fc" />
          <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="14.25" stroke="white" strokeOpacity="0.16" strokeWidth="1.5" />
        </svg>
      );

    case 'terminal':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="termBg" x1="0" y1="0" x2="0" y2="64">
              <stop offset="0%" stopColor="#2c2f36" />
              <stop offset="100%" stopColor="#121418" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="15" fill="url(#termBg)" />
          <rect x="5" y="5" width="54" height="54" rx="11" fill="#0b0d11" stroke="#3f4450" strokeWidth="1" />
          <path d="M17 22L27 29.5L17 37" stroke="#34d399" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="30" y="34.5" width="14" height="3.5" rx="1.75" fill="#e2e8f0" />
          <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="14.25" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" />
        </svg>
      );

    case 'security':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="secBg" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="55%" stopColor="#065f46" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
            <linearGradient id="secShield" x1="32" y1="12" x2="32" y2="52">
              <stop offset="0%" stopColor="#5eead4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="15" fill="url(#secBg)" />
          <path
            d="M32 12L49 18.5V31.5C49 42.2 41.7 49.8 32 53C22.3 49.8 15 42.2 15 31.5V18.5L32 12Z"
            fill="url(#secShield)"
            fillOpacity="0.22"
            stroke="url(#secShield)"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path d="M25.5 32.5L30 37L39.5 27" stroke="#ecfdf5" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="14.25" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" />
        </svg>
      );

    case 'safari':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="safBg" x1="0" y1="0" x2="0" y2="64">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#dbeafe" />
            </linearGradient>
            <linearGradient id="safDial" x1="12" y1="12" x2="52" y2="52">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="15" fill="url(#safBg)" />
          <circle cx="32" cy="32" r="23" fill="url(#safDial)" />
          <circle cx="32" cy="32" r="19.5" stroke="white" strokeOpacity="0.45" strokeDasharray="1.5 4.2" strokeWidth="2" />
          <polygon points="44,20 35,35 29,29" fill="#ef4444" />
          <polygon points="20,44 29,29 35,35" fill="#ffffff" />
          <circle cx="32" cy="32" r="2.2" fill="#cbd5e1" />
          <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="14.25" stroke="black" strokeOpacity="0.08" strokeWidth="1.5" />
        </svg>
      );

    case 'resume':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="prevBg" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="15" fill="url(#prevBg)" />
          <rect x="14" y="10" width="36" height="44" rx="5" fill="#ffffff" />
          <rect x="20" y="18" width="14" height="3.5" rx="1.75" fill="#1e40af" />
          <rect x="20" y="26" width="24" height="2.4" rx="1.2" fill="#94a3b8" />
          <rect x="20" y="32" width="24" height="2.4" rx="1.2" fill="#94a3b8" />
          <rect x="20" y="38" width="18" height="2.4" rx="1.2" fill="#94a3b8" />
          <circle cx="43" cy="44" r="9" fill="#0ea5e9" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M40 44H46M43 41V47" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="14.25" stroke="white" strokeOpacity="0.22" strokeWidth="1.5" />
        </svg>
      );

    case 'mail':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="mailBg" x1="0" y1="0" x2="0" y2="64">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="15" fill="url(#mailBg)" />
          <rect x="11" y="18" width="42" height="28" rx="4.5" fill="#ffffff" />
          <path d="M13 20.5L32 35L51 20.5" stroke="#2563eb" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="14.25" stroke="white" strokeOpacity="0.24" strokeWidth="1.5" />
        </svg>
      );

    case 'settings':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="setBg" x1="0" y1="0" x2="0" y2="64">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="15" fill="url(#setBg)" />
          <circle cx="32" cy="32" r="17" stroke="#e2e8f0" strokeWidth="6" strokeDasharray="5.5 3.4" />
          <circle cx="32" cy="32" r="10.5" fill="#1e293b" stroke="#f8fafc" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="4" fill="#94a3b8" />
          <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="14.25" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      );

    case 'trash':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="trBg" x1="0" y1="0" x2="0" y2="64">
              <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.65" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="15" fill="url(#trBg)" />
          <path d="M18 20H46L43 51C42.8 53 41.2 54.5 39.2 54.5H24.8C22.8 54.5 21.2 53 21 51L18 20Z" fill="#e2e8f0" fillOpacity="0.88" stroke="#94a3b8" strokeWidth="1.6" />
          <rect x="15" y="15" width="34" height="4.5" rx="2.2" fill="#f8fafc" />
          <rect x="25" y="11" width="14" height="4" rx="2" fill="#cbd5e1" />
          <line x1="26" y1="26" x2="27" y2="48" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <line x1="32" y1="26" x2="32" y2="48" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <line x1="38" y1="26" x2="37" y2="48" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="14.25" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      );

    case 'github':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="15" fill="#161b22" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32 13C21.5 13 13 21.5 13 32C13 40.4 18.4 47.5 26 50C27 50.2 27.3 49.6 27.3 49.1C27.3 48.6 27.3 47.1 27.3 45.4C22 46.5 20.9 43.1 20.9 43.1C20 40.9 18.8 40.3 18.8 40.3C17.1 39.1 18.9 39.1 18.9 39.1C20.8 39.2 21.8 41.1 21.8 41.1C23.5 44 26.2 43.2 27.4 42.7C27.6 41.4 28.1 40.6 28.6 40.1C24.4 39.6 19.9 38 19.9 30.7C19.9 28.6 20.6 26.9 21.9 25.6C21.7 25.1 21 23.1 22.1 20.5C22.1 20.5 23.7 20 27.3 22.4C28.8 22 30.4 21.8 32 21.8C33.6 21.8 35.2 22 36.7 22.4C40.3 20 41.9 20.5 41.9 20.5C43 23.1 42.3 25.1 42.1 25.6C43.4 26.9 44.1 28.6 44.1 30.7C44.1 38 39.6 39.6 35.4 40.1C36.1 40.7 36.7 41.9 36.7 43.7C36.7 46.2 36.7 48.3 36.7 49.1C36.7 49.6 37 50.2 38 50C45.6 47.5 51 40.4 51 32C51 21.5 42.5 13 32 13Z"
            fill="#f8fafc"
          />
          <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="14.25" stroke="white" strokeOpacity="0.16" strokeWidth="1.5" />
        </svg>
      );

    case 'linkedin':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <defs>
            <linearGradient id="liBg" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0%" stopColor="#0a66c2" />
              <stop offset="100%" stopColor="#004182" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="15" fill="url(#liBg)" />
          <rect x="17" y="26" width="6.5" height="21" rx="1.2" fill="#ffffff" />
          <circle cx="20.25" cy="19.5" r="3.6" fill="#ffffff" />
          <path
            d="M28.5 26H34.7V29C35.8 27 38.2 25.4 41.5 25.4C47 25.4 48.5 29 48.5 34.4V47H42V35.8C42 32.8 41.2 30.9 38.7 30.9C35.8 30.9 35 33 35 35.8V47H28.5V26Z"
            fill="#ffffff"
          />
          <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="14.25" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" />
        </svg>
      );
  }
};
