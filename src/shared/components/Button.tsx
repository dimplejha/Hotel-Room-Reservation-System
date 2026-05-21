import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost';
  children?: ReactNode;
}

export function Button({ variant = 'default', className, ...props }: ButtonProps) {
  return <button className={cn(variant === 'primary' && 'primary', variant === 'ghost' && 'ghost', className)} {...props} />;
}
