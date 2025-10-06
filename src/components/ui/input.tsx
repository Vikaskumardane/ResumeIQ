import { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        'flex h-10 w-full rounded-md border px-3 py-2 text-sm outline-none placeholder:text-foreground/50 focus:ring-2 ring-offset-0 ring-foreground/20',
        className,
      )}
      {...props}
    />
  )
}


