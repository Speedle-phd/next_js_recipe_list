import prisma from "@/lib/db"

export default async function Home() {
   const users = await prisma.user.findMany()
   console.log(users)
  return (
    <main>
      {JSON.stringify(users)}
    </main>
  )
}
