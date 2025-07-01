import Link from 'next/link'
import { Article, Gauge, Question, Scroll, ShieldChevron } from 'phosphor-react'

export function NavbarResponsive() {
  return (
    <nav className="w-full h-96 shadow-2xl bg-zinc-900 block  bottom-0 transition duration-500 ease-in-out transform">
      <div className="flex flex-col items-start sm:items-center gap-8 px-2 py-4">
        <Link
          href="#"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
        >
          <Gauge size={20} />
          Dashboard
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
        >
          <Scroll size={20} />
          Apólices
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
        >
          <Article size={20} />
          Sinistros
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
        >
          <ShieldChevron size={20} />
          Coberturas
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
        >
          <Question size={20} />
          Suporte
        </Link>
      </div>
    </nav>
  )
}
