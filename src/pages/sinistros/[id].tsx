import Link from 'next/link'

import { DefaultLayout } from '@/components/DefaultLayout'
import { SubHeader } from '@/components/Header/SubHeader'
import { ArrowLeft } from 'lucide-react'
import { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import { api } from '@/lib/axios'
import { ISinistro } from '@/schema/Sinistro'
import dayjs from 'dayjs'

interface ServerSideProps {
  sinistro: ISinistro
}

const SinistroDetails = ({ sinistro }: ServerSideProps) => {
  console.log(sinistro)

  const date = dayjs(sinistro.DATA).format('DD MMMM [,] YYYY')

  return (
    <>
      <SubHeader>
        <div className="flex items-center flex-wrap-reverse  gap-8">
          <Link
            href="/sinistros"
            className="p-3 bg-zinc-700 hover:bg-zinc-800 rounded text-gray-100 font-medium"
          >
            <ArrowLeft />
          </Link>

          <strong className="text-2xl font-medium text-gray-200">
            Detalhes do sinistro
          </strong>
        </div>
      </SubHeader>
      <section className="mt-6">
        <div className="max-w-7xl px-2 mx-auto lg:px-8 sm:px-6 py-6">
          <div className="grid grid-cols-3 items-start gap-4">
            <div className="bg-gray-50 rounded col-span-2">
              <header className="border-b">
                <div className="p-4 flex justify-between items-center gap-4">
                  <h4 className="text-zinc-800 font-medium text-xl">
                    Apólice:{' '}
                    <span className="text-amber-600">
                      #{sinistro.SEGURADO_APOLICE_NUMERO}
                    </span>
                  </h4>

                  <div>
                    <strong>
                      Data: <span className="font-normal">{date}</span>
                    </strong>
                  </div>
                </div>

                <div className="flex justify-between items-end gap-4">
                  <div className="p-4 mt-2 flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-zinc-500">Segurado</span>
                      <strong className="text-zinc-500 font-medium">
                        {sinistro.SEGURADO_NOME}
                      </strong>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-zinc-500">
                        Tipo de seguro
                      </span>
                      <strong className="text-zinc-500 font-medium">
                        {sinistro.SEGURADO_APOLICE_TIPO}
                      </strong>
                    </div>
                  </div>

                  <div className="p-4 mt-2 flex flex-col gap-5">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-sm text-zinc-500">Veículo</span>
                      <strong className="text-zinc-500 font-medium">
                        {sinistro.SEGURADO_VEICULO_MARCA}-
                        {sinistro.SEGURADO_VEICULO_MODELO}
                      </strong>
                    </div>
                  </div>
                </div>
              </header>

              <div className="mt-4 pb-4 border-b">
                <div className="p-4 mt-2 flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-zinc-500">Tomador</span>
                    <strong className="text-zinc-500 font-medium">
                      {sinistro.TOMADOR_NOME}
                    </strong>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-zinc-500">
                      Veículo do tomador
                    </span>
                    <strong className="text-zinc-500 font-medium">
                      {sinistro.TOMADOR_VEICULO_MARCA}-
                      {sinistro.TOMADOR_VEICULO_MODELO}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="mt-4 pb-4 border-b">
                <div className="p-4 mt-2 flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-zinc-500"></span>
                    <strong className="text-zinc-500 font-medium">
                      {sinistro.TOMADOR_NOME}
                    </strong>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-zinc-500">
                      Veículo do tomador
                    </span>
                    <strong className="text-zinc-500 font-medium">
                      {sinistro.TOMADOR_VEICULO_MARCA}-
                      {sinistro.TOMADOR_VEICULO_MODELO}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

SinistroDetails.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx

  const sinistroId = params?.id

  try {
    const response = await api.get(`sinistros/${sinistroId}`)

    const sinistro = response.data[''][0]

    return {
      props: {
        sinistro,
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

export default SinistroDetails
