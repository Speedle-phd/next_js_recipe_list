import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
   const ono = await prisma.user.create({data : {
         email: 'ono@panda.de',
         username: 'Wafflemaster',
         password: "pandabear",
      }})
   
}
main()
   .then(async () => {
      await prisma.$disconnect()
   })
   .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
   })
