import { ReactNode } from 'react'
import clsx from 'clsx'

export function Alert({ variant = 'default', children, className }: { variant?: 'default' | 'destructive'; children: ReactNode; className?: string }) {
  return (
    <div
      role="alert"
      className={clsx(
        'rounded-md border p-4 text-sm',
        variant === 'destructive'
          ? 'border-red-600/30 text-red-700 dark:text-red-400 bg-red-600/10'
          : 'border-foreground/20 text-foreground/80',
        className,
      )}
    >
      {children}
    </div>
  )
}


