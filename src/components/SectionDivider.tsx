import React from 'react';

interface SectionDividerProps {
  className?: string;
  maxWidth?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ 
  className = '',
  maxWidth = 'max-w-4xl'
}) => {
  return (
    <div className={`w-full flex items-center justify-center py-4 md:py-8 overflow-hidden bg-transparent ${className}`}>
      <div className="max-w-[1720px] w-full px-4 sm:px-6 flex items-center justify-center">
        <img
          src="/section-divider.png"
          alt="فاصل الأقسام سولينا للسيارات"
          className={`w-full ${maxWidth} h-auto max-h-16 md:max-h-20 object-contain select-none pointer-events-none drop-shadow-sm transition-all duration-300`}
          loading="lazy"
        />
      </div>
    </div>
  );
};
