import type { WithChildren } from '../types/common.types';

interface ModalProps extends WithChildren {
  open: boolean;
  title?: string;
}

export function Modal({ open, title, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div role="dialog" aria-modal="true">
      {title ? <h2>{title}</h2> : null}
      {children}
    </div>
  );
}
