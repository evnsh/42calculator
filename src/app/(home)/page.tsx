import { auth, signIn } from '@/auth'
import FortyTwo from '@/components/icons/FortyTwo'
import { Button } from '@/components/ui/button'

function SignIn() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('42-school')
      }}
    >
      <Button>
        <FortyTwo className="mr-4 h-6" />
        Sign in with 42
      </Button>
    </form>
  )
}

export default async function Home() {
  const session = await auth()

  if (session == null) {
    return (
      <main className="flex h-full items-center justify-center p-24">
        <SignIn />
      </main>
    )
  }

  console.log(`session.user: ${JSON.stringify(session?.user)}`)

  return null
}
