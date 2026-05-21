interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  return message ? <div role="status">{message}</div> : null;
}
