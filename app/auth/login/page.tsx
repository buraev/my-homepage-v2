"use client"
import { Button } from "@/app/src/shared/ui"
import { FormProvider, useForm } from "react-hook-form"

import * as z from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { loginUser } from "@/entities/auth/login/model"
import { useState, useTransition } from "react"
import { DEFAUL_LOGIN_REDIRECT } from "@/app/routes"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { LoginSchema } from "@/app/schemas/shemas"
import Link from "next/link"

export default function Auth() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [successMessage, setSuccesMessage] = useState<string | undefined>()
  const [showTwoFactor, setShowTwoFactor] = useState(false)

  const [isPending, startTransition] = useTransition()

  const searchParams = useSearchParams()

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use"
      : ""

  const methods = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { handleSubmit, register, reset } = methods

  const onSubmit = handleSubmit(values => {
    setErrorMessage(undefined)
    setSuccesMessage(undefined)
    startTransition(() => {
      loginUser(values)
        .then(data => {
          if (data?.error) {
            reset()

            setErrorMessage(data.error)
          }

          if (data?.success) {
            reset()
            setSuccesMessage(data.success)
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true)
          }
        })
        .catch(() => setErrorMessage("Som went wrong"))
    })
  })

  const onClick = (provider: "gooole" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAUL_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="mt-20 flex flex-1 flex-col justify-center self-center">
      <FormProvider {...methods}>
        <form
          className="bg-primaryMain mb-4 flex flex-col justify-center gap-4 self-center rounded px-8 pt-6 pb-8 shadow-lg"
          onSubmit={onSubmit}
        >
          {showTwoFactor && (
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-white">
                Two factor token
              </label>
              <input
                disabled={isPending}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-white shadow focus:outline-none"
                id="twofactor"
                placeholder="*****"
                {...register("code")}
              />
            </div>
          )}
          {!showTwoFactor && (
            <>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-bold text-white">
                  Email
                </label>
                <input
                  disabled={isPending}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-white shadow focus:outline-none"
                  id="username"
                  type="text"
                  placeholder="Username"
                  {...register("email")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-bold text-white">
                  Password
                </label>
                <input
                  disabled={isPending}
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-white shadow focus:outline-none"
                  id="password"
                  type="password"
                  placeholder="******************"
                  {...register("password")}
                />
              </div>
              {(errorMessage || successMessage) && (
                <div className="p-3">
                  {errorMessage && (
                    <p className="text-error text-xs">{errorMessage}</p>
                  )}
                  {successMessage && (
                    <p className="text-xs">{successMessage}</p>
                  )}
                  {urlError && <p>{urlError}</p>}
                </div>
              )}
            </>
          )}

          <div className="flex flex-col items-center justify-between gap-5">
            <Button
              disabled={isPending}
              className="hover:bg-orange/95 w-full md:w-fit"
              size="sm"
              type="submit"
            >
              <span className="text-[0.85em] tracking-[0.075em] text-[white] transition-[0.1s] duration-[ease-in-out]">
                {showTwoFactor ? "Confirm" : "Login"}
              </span>
            </Button>
            <Link
              className="text-primaryLight hover:text-secondaryMain inline-block align-baseline text-sm font-bold"
              href="/auth/reset"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex justify-between gap-3">
            <button onClick={() => onClick("github")}>git</button>

            <button onClick={() => onClick("gooole")}>gooole</button>
          </div>
        </form>
      </FormProvider>
      <p className="text-center text-xs text-gray-500">
        &copy;2025 Buraev Corp. All rights reserved.
      </p>
    </div>
  )
}
