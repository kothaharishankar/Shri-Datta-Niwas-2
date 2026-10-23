import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { site } from '@/content/site';

export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={site.name}
        className={`${className} inline-flex overflow-hidden rounded-full border border-line-strong`}
      >
        <img
          src="/logo-icon.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={site.name}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-4 text-ink backdrop:bg-black/75 open:flex open:items-center open:justify-center"
      >
        <div className="relative max-h-full w-full max-w-3xl rounded-3xl border border-line bg-surface p-3 shadow-lift sm:p-5">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={t('common.close')}
            className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/95 text-ink shadow-soft"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <img
            src="/logo.jpg"
            alt={site.name}
            className="max-h-[82dvh] w-full rounded-2xl object-contain"
          />
        </div>
      </dialog>
    </>
  );
}
