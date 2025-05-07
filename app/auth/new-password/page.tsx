"use client"
import { Button } from "@/app/src/shared/ui"
import { FormProvider, useForm } from "react-hook-form"

import * as z from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"

import { NewPasswordSchema } from "@/app/schemas/shemas"
import Link from "next/link"
import { newPassword } from "@/app/src/entities/auth/newPassword/model"
import { useSearchParams } from "next/navigation"

export default function NewPasswordPage() {
  const searchParams = useSearchParams()

  const token = searchParams.get("token")

  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [successMessage, setSuccesMessage] = useState<string | undefined>()

  const [isPending, startTransition] = useTransition()

  const methods = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
    },
  })

  const { handleSubmit, register } = methods

  const onSubmit = handleSubmit((values: z.infer<typeof NewPasswordSchema>) => {
    setErrorMessage(undefined)
    setSuccesMessage(undefined)
    startTransition(() => {
      newPassword(values, token).then(data => {
        setErrorMessage(data.error)
        setSuccesMessage(data.success)
      })
    })
  })

  return (
    <div className="mt-20 flex flex-1 flex-col justify-center self-center">
      <FormProvider {...methods}>
        <form
          className="bg-primaryMain mb-4 flex flex-col justify-center gap-4 self-center rounded px-8 pt-6 pb-8 shadow-lg"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-bold text-white">
              New password
            </label>
            <input
              disabled={isPending}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-white shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="*****"
              {...register("password")}
            />
          </div>

          {(errorMessage || successMessage) && (
            <div className="p-3">
              {errorMessage && (
                <p className="text-error text-xs">{errorMessage}</p>
              )}
              {successMessage && <p className="text-xs">{successMessage}</p>}
            </div>
          )}

          <div className="flex flex-col items-center justify-between gap-5">
            <Button
              disabled={isPending}
              className="hover:bg-orange/95 w-full md:w-fit"
              size="sm"
              type="submit"
            >
              <span className="text-[0.85em] tracking-[0.075em] text-[white] transition-[0.1s] duration-[ease-in-out]">
                Reset password
              </span>
            </Button>
            <Link
              className="text-primaryLight hover:text-secondaryMain inline-block align-baseline text-sm font-bold"
              href="/auth/login"
            >
              Back to login
            </Link>
          </div>
        </form>
      </FormProvider>
      <p className="text-center text-xs text-gray-500">
        &copy;2025 Buraev Corp. All rights reserved.
      </p>
    </div>
  )
}
