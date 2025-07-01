import Image from 'next/image'
import Link from 'next/link'

import logoSvg from '../../assets/logo.svg'
import profileImg from '../../assets/profile.avif'

import {
  Article,
  CirclesThreePlus,
  Gauge,
  Gear,
  List,
  ProjectorScreen,
  Question,
  Scroll,
  ShieldChevron,
} from 'phosphor-react'
import { useState } from 'react'
import { NavbarResponsive } from './NavbarResponsive'

export function Header() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)

  function handleToggleNavbarStatus() {
    setIsNavbarOpen(!isNavbarOpen)
  }

  return (
    <>
      <header className="bg-zinc-900 border-b border-zinc-700">
        <div className="max-w-7xl px-2 mx-auto lg:px-8 sm:px-6 py-4 lg:py-9 flex items-center justify-between">
          <nav className="hidden lg:flex items-center gap-8">
            <Image src={logoSvg} width={40} height={40} alt="" />
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="flex items-center gap-2 text-zinc-500 hover:text-amber-600"
              >
                <Gauge size={20} />
                Dashboard
              </Link>
              <Link
                href="/apolices"
                className="flex items-center gap-2 text-zinc-500 hover:text-amber-600"
              >
                <Scroll size={20} />
                Apólices
              </Link>
              <Link
                href="/sinistros"
                className="flex items-center gap-2 text-zinc-500 hover:text-amber-600"
              >
                <Article size={20} />
                Sinistros
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-zinc-500 hover:text-amber-600"
              >
                <ShieldChevron size={20} />
                Coberturas
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-zinc-500 hover:text-amber-600"
              >
                <Question size={20} />
                Suporte
              </Link>
            </div>
          </nav>

          <button
            onClick={handleToggleNavbarStatus}
            className="text-gray-500 hover:text-gray-700 lg:hidden flex"
          >
            <List className="text-2xl" />
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-zinc-500 text-2xl hover:text-amber-600"
              >
                <CirclesThreePlus weight="duotone" />
              </Link>
              <Link
                href="#"
                className="text-zinc-500 text-2xl hover:text-amber-600"
              >
                <ProjectorScreen weight="duotone" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 text-2xl hover:text-amber-600"
              >
                <Gear weight="duotone" />
              </Link>
            </div>
            <Image
              src={profileImg}
              width={50}
              height={30}
              alt=""
              className="w-11 h-11 object-cover border-[2.5px] border-amber-500 rounded-full"
            />
          </div>
        </div>
      </header>
      {isNavbarOpen && <NavbarResponsive />}
    </>
  )
}
