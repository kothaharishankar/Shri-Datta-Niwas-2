interface WhatsAppIconProps {
  className?: string;
}

export function WhatsAppIcon({ className }: WhatsAppIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 2a10 10 0 0 0-8.66 15L2 22l5.18-1.32A10 10 0 1 0 12 2Z"
        fill="#25D366"
      />
      <path
        d="M8.1 6.6c-.3-.2-.6-.2-.9-.2-.2 0-.5.1-.7.4-.3.3-1 1-1 2.3s1 2.7 1.1 2.9c.1.2 2 3.2 4.9 4.3 2.4 1 2.9.8 3.4.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.1-1.3-.1-.2-.3-.2-.7-.4l-2-.9c-.3-.1-.5-.2-.7.2l-.9 1.1c-.2.2-.3.3-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.7-.5Z"
        fill="#fff"
      />
    </svg>
  );
}
