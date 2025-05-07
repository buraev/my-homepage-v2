"use client"
import { useState, useTransition } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import type * as z from "zod"

import { ResetSchema } from "@/app/schemas/shemas"
import { resetPassword } from "@/app/src/entities/auth/resetPassword/model"
import { Button } from "@/app/src/shared/ui"

export default function Reset() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [successMessage, setSuccesMessage] = useState<string | undefined>()

  const [isPending, startTransition] = useTransition()

  const methods = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  })

  const { handleSubmit, register } = methods

  const onSubmit = handleSubmit((values: z.infer<typeof ResetSchema>) => {
    setErrorMessage(undefined)
    setSuccesMessage(undefined)
    startTransition(() => {
      resetPassword(values).then(data => {
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
            <label className="block text-sm font-bold text-white">Email</label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-white shadow focus:outline-none"
              disabled={isPending}
              id="username"
              placeholder="email"
              type="text"
              {...register("email")}
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
              className="hover:bg-orange/95 w-full md:w-fit"
              disabled={isPending}
              size="sm"
              type="submit"
            >
              <span className="text-[0.85em] tracking-[0.075em] text-[white] transition-[0.1s] duration-[ease-in-out]">
                Send reset email
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
