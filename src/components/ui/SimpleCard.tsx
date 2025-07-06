import React from 'react';
import { clsx } from 'clsx';

interface SimpleCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const SimpleCard: React.FC<SimpleCardProps> = ({
  children,
  className,
  onClick,
  hover = false,
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl border border-slate-200 p-6',
        {
          'hover:shadow-lg hover:border-slate-300 transition-all duration-200 cursor-pointer': hover || onClick,
          'shadow-sm': !hover && !onClick,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};