import Image from 'next/image'
import IllustrationImage from '../assets/illustration.svg'
import logo from '../assets/logo.svg'
import { Password, User } from 'phosphor-react'
import Link from 'next/link'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'

const signInSchema = z.object({
  email: z
    .string()
    .nonempty('E-mail obrigatório')
    .email('Formato de e-mail inválido')
    .toLowerCase(),
  password: z
    .string()
    .nonempty('Password obrigatório')
    .min(6, 'Deve ter no mínimo caracteres'),
})

type SignInData = z.infer<typeof signInSchema>

export default function SignIn() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  async function handleSignIn(data: SignInData) {
    const { email, password } = data

    if (email !== 'admin@gmail.com' || password !== '123456') {
      toast.error('E-mail ou palavra-passe incorrectos')
      return true
    } else {
      setCookie(undefined, '@giant.token', email, {
        maxAge: 60 * 60 * 24 * 30, // 30 Days
        path: '/',
      })
      router.push('/')
    }
  }

  return (
    <div className="bg-gray-100 w-screen h-screen grid grid-cols-1 lg:grid-cols-4">
      <aside className="col-span-2 bg-no-repeat bg-cover bg-center bg-[url('../assets/signin-background.svg')] hidden lg:flex flex-col items-center justify-center gap-10">
        <Image src={logo} quality={100} alt="" />

        <Image
          src={IllustrationImage}
          quality={100}
          width={500}
          height={540}
          alt=""
        />

        <span className="text-zinc-400 max-w-lg text-center">
          ©2022 All Rights Reserved
        </span>
      </aside>
      <div className="flex flex-col px-4 items-center justify-center col-span-2">
        <header className="flex flex-col items-center gap-2">
          <strong className="text-2xl md:text-4xl text-zinc-800 font-medium text-center">
            Olá, Bem-vindo
          </strong>
          <span className="text-sm text-gray-600 text-center">
            Insira as suas credências para acessar o sistema
          </span>
        </header>

        <form
          action=""
          className="mt-8 flex flex-col gap-8 py-4 border-b border-gray-300"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-zinc-800">
              Endereço de e-mail
            </label>
            <div className="flex items-center gap-2 px-3 py-4 border border-gray-400  rounded">
              <User size={20} />
              <input
                type="email"
                placeholder="john@gmail.com"
                className="bg-transparent outline-none"
                {...register('email')}
              />
            </div>

            {errors.email && (
              <span className="text-sm text-red-600 ">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Palavra-passe</label>
            <div className="flex items-center gap-2 px-3 py-4 border border-gray-400  rounded">
              <Password size={20} />
              <input
                id="password"
                type="password"
                placeholder="Palavra-passe"
                className="bg-transparent outline-none"
                {...register('password')}
              />
            </div>

            {errors.password && (
              <span className="text-sm text-red-600 ">
                {errors.password.message}
              </span>
            )}
          </div>

          <button className="bg-orange-600 hover:bg-orange-700 py-3 rounded text-gray-100 flex justify-center">
            Login
          </button>
        </form>

        <p className="mt-8 text-center">
          Não possui uma conta ?{' '}
          <Link href="#" className="text-orange-600 underline">
            Crie agora
          </Link>
        </p>
      </div>
    </div>
  )
}
