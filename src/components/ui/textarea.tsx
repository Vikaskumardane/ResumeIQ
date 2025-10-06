import { TextareaHTMLAttributes } from 'react'
import clsx from 'clsx'

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={clsx(
        'flex min-h-[120px] w-full rounded-md border px-3 py-2 text-sm outline-none placeholder:text-foreground/50 focus:ring-2 ring-offset-0 ring-foreground/20',
        className,
      )}
      {...props}
    />
  )
}


