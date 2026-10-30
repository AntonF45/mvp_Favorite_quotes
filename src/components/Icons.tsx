// Custom editorial line icons — stroke 1.5, no fill, unified style
type IconProps = { size?: number; className?: string };

const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const IconSearch = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const IconPlus = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconArrowLeft = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const IconArrowRight = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const IconStar = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 2l2.9 6.3 6.8.7-5.1 4.6 1.5 6.7L12 17l-6.1 3.3 1.5-6.7L2.3 9l6.8-.7L12 2z" />
  </svg>
);

export const IconStarFilled = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className} fill="currentColor" stroke="none">
    <path d="M12 2l2.9 6.3 6.8.7-5.1 4.6 1.5 6.7L12 17l-6.1 3.3 1.5-6.7L2.3 9l6.8-.7L12 2z" />
  </svg>
);

export const IconCopy = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="9" y="9" width="12" height="12" rx="1" />
    <path d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1" />
  </svg>
);

export const IconShare = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 12v8a1 1 0 001 1h14a1 1 0 001-1v-8M16 6l-4-4-4 4M12 2v14" />
  </svg>
);

export const IconEdit = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M11 4H4a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1v-7" />
    <path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export const IconTrash = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2M19 6l-1 14a1 1 0 01-1 1H7a1 1 0 01-1-1L5 6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

export const IconClose = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const IconSettings = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

export const IconHome = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 12l9-9 9 9" />
    <path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
  </svg>
);

export const IconBook = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
);

export const IconBell = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

export const IconDownload = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

export const IconCheck = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const IconMap = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M1 6v16l7-3 8 3 7-3V3l-7 3-8-3-7 3zM8 3v16M16 6v16" />
  </svg>
);

export const IconSun = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

export const IconMoon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

export const IconFilter = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
  </svg>
);

export const IconQuote = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.034V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.034V20c0 1 0 1 1 1z" />
  </svg>
);

export const IconRefresh = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M23 4v6h-6M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
);

export const IconShield = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
