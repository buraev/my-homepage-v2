import { auth, signOut } from "@/app/auth"

export default async function Settings() {
  const aaa = await auth()
  return (
    <div>
      {JSON.stringify(aaa)}
      <form
        action={async () => {
          "use server"

          await signOut()
        }}
      >
        <button type="submit">signout </button>
      </form>
    </div>
  )
}
