import { cn } from '../utils/cn';
import type { WithChildren } from '../types/common.types';

interface CardProps extends WithChildren {
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={cn('panel', className)}>{children}</div>;
}
