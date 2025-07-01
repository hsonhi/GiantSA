import Image from 'next/image'
import Link from 'next/link'

import photo from '../assets/no-picture.webp'

import { ArrowLeft, DotsThree } from 'phosphor-react'
import { NextPageWithLayout } from './_app'
import { ReactElement } from 'react'
import { DefaultLayout } from '@/components/DefaultLayout'
import { api } from '@/lib/axios'
import { GetServerSideProps } from 'next'

import { SubHeader } from '@/components/Header/SubHeader'

import { IApolice } from '@/schema/Apolice'

interface ServerSideProps {
  apolices: IApolice[]
}

const Apolices: NextPageWithLayout = ({ apolices }: ServerSideProps) => {
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
            Apólices registrados
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
                    Cliente
                  </th>
                  <th className="p-3 text-sm font-medium tracking-wide text-left">
                    Tipo
                  </th>
                  <th className="p-3 text-sm font-medium tracking-wide text-left">
                    Veículo
                  </th>
                  <th className="p-3 text-sm font-medium tracking-wide text-left">
                    Data de inicio
                  </th>
                  <th className="p-3 text-sm font-medium tracking-wide text-left">
                    Data de expiração
                  </th>
                  <th className="p-3 text-sm font-medium tracking-wide text-left">
                    Tipologia
                  </th>
                  <th className="w-36 p-3 text-sm font-medium tracking-wide text-left">
                    Estado
                  </th>
                  <th className="w-24 p-3 text-sm font-medium tracking-wide text-left"></th>
                </tr>
              </thead>
              <tbody>
                {apolices.map((apolice) => {
                  return (
                    <tr key={apolice.ID}>
                      <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                        <span className="flex items-center gap-2 flex-wrap">
                          <Image
                            src={photo}
                            width={50}
                            height={30}
                            alt=""
                            className="w-8 h-8 object-cover rounded-full"
                          />
                          <span>{apolice.CLIENTE}</span>
                        </span>
                      </td>
                      <td className="whitespace-nowrap p-3 text-sm text-gray-900">
                        <span>{apolice.TIPO}</span>
                      </td>
                      <td className="whitespace-nowrap p-3 text-sm text-gray-900">
                        <span>{apolice.VEICULO_MATRICULA}</span>
                      </td>
                      <td className="whitespace-nowrap p-3 text-sm text-gray-900">
                        <span>{apolice.DATA_INICIO.toString()}</span>
                      </td>
                      <td className="whitespace-nowrap p-3 text-sm text-gray-900">
                        <span>{apolice.DATA_FIM.toString()}</span>
                      </td>
                      <td className="whitespace-nowrap p-3 text-sm text-gray-900">
                        <span>{apolice.TIPOLOGIA}</span>
                      </td>
                      <td className="whitespace-nowrap p-3 text-sm text-gray-900">
                        <span>{apolice.ESTADO}</span>
                      </td>

                      <td className="whitespace-nowrap p-3 text-sm text-gray-900">
                        <span>
                          <DotsThree size={24} />
                        </span>
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

Apolices.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Make request in same time as the server side
    const response = await api.get('apolices')

    const apolices = response.data['']

    return {
      props: {
        apolices,
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

export default Apolices
