"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { newVerification } from "@/app/src/entities/auth/newVerification/model"

export default function NewVerification() {
  const [error, setError] = useState<string | undefined>("")

  const [success, setSuccess] = useState<string | undefined>("")

  const searchParams = useSearchParams()

  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {
    if (success || error) return

    if (!token) {
      setError("Missing token")
      return
    }

    newVerification(token)
      .then(data => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError("Som wrong")
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()

    return () => {}
  }, [onSubmit])

  return (
    <div className="flex justify-center self-center">
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  )
}
