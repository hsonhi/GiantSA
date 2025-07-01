import { ReactNode } from 'react'

interface SubHeaderProps {
  children: ReactNode
}

export function SubHeader({ children }: SubHeaderProps) {
  return (
    <div className="bg-zinc-900">
      <div className="max-w-7xl px-2 mx-auto lg:px-8 sm:px-6 py-9 flex items-center justify-between flex-wrap gap-2">
        {children}
      </div>
    </div>
  )
}
