import Image from 'next/image'
import Link from 'next/link'

import photo from '../../assets/no-picture.webp'

import { ArrowLeft, DotsThree } from 'phosphor-react'
import { NextPageWithLayout } from '../_app'
import { ReactElement } from 'react'
import { DefaultLayout } from '@/components/DefaultLayout'
import { api } from '@/lib/axios'
import { GetServerSideProps } from 'next'

import { SubHeader } from '@/components/Header/SubHeader'

import { ISinistro } from '@/schema/Sinistro'
import { ChevronRight, ChevronsRight } from 'lucide-react'

interface ServerSideProps {
  sinistros: ISinistro[]
}

const Sinistros: NextPageWithLayout = ({ sinistros }: ServerSideProps) => {
  return (
    <>
      <SubHeader>
        <div className="flex items-center flex-wrap-reverse  gap-8">
          <Link
            href="/"
            className="p-3 bg-zinc-700 hover:bg-zinc-800 rounded text-gray-100 font-medium"
          >
            <ArrowLeft />
          </Link>

          <strong className="text-2xl font-medium text-gray-200">
            Sinistros registrados
          </strong>
        </div>
      </SubHeader>
      <section className="mt-6">
        <div className="max-w-7xl px-2 mx-auto lg:px-8 sm:px-6 py-6">
          <div className="overflow-auto bg-gray-50 rounded">
            <table className="w-full">
              <thead className="bg-zinc-300 border-b-gray-300 border-b">
                <tr>
                  <th className="p-3 text-sm font-medium tracking-wide text-left">
                    Segurado
                  </th>
                  <th className="p-3 text-sm font-medium tracking-wide text-left">
                    Tomador
                  </th>
                  <th className="p-3 text-sm font-medium tracking-wide text-left">
                    Apolice
                  </th>
                  <th className="p-3 text-sm font-medium tracking-wide text-left">
                    Tipo de Apolice
                  </th>
                  <th className="p-3 text-sm font-medium tracking-wide text-left">
                    Data
                  </th>
                  <th className="w-24 p-3 text-sm font-medium tracking-wide text-left"></th>
                </tr>
              </thead>
              <tbody>
                {sinistros.map((sinistro) => {
                  return (
                    <tr key={sinistro.ID}>
                      <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                        <span className="flex items-center gap-2 flex-wrap">
                          <Image
                            src={photo}
                            width={50}
                            height={30}
                            alt=""
                            className="w-8 h-8 object-cover rounded-full"
                          />
                          <span>{sinistro.SEGURADO_NOME}</span>
                        </span>
                      </td>
                      <td className="whitespace-nowrap p-3 text-sm text-gray-900">
                        <span>{sinistro.TOMADOR_NOME}</span>
                      </td>
                      <td className="whitespace-nowrap p-3 text-sm text-gray-900">
                        <span>{sinistro.SEGURADO_APOLICE_NUMERO}</span>
                      </td>
                      <td className="whitespace-nowrap p-3 text-sm text-gray-900">
                        <span>{sinistro.SEGURADO_APOLICE_TIPO}</span>
                      </td>
                      <td className="whitespace-nowrap p-3 text-sm text-gray-900">
                        <span>{sinistro.DATA.toString()}</span>
                      </td>

                      <td className="whitespace-nowrap p-3 text-sm t  ext-gray-900">
                        <Link
                          href={`/sinistros/${sinistro.ID}`}
                          className="bg-zinc-100 hover:bg-zinc-200 w-8 h-8 inline-flex items-center justify-center text-zinc-600 rounded"
                        >
                          <ChevronsRight size={20} />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

Sinistros.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Make request in same time as the server side
    const response = await api.get('sinistros')

    const sinistros = response.data['']

    return {
      props: {
        sinistros,
      },
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

export default Sinistros
