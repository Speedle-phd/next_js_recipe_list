import Image from 'next/image'
import dish1 from '/public/images/food_1.jpg'
import dish2 from '/public/images/food_2.jpg'
import dish3 from '/public/images/food_3.jpg'
import Link from 'next/link'

export default async function Home() {




   return (
      <main className="w-[inherit] min-h-[100dvh] grid content-center py-2 ">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-w-fit max-w-[90vw] mx-auto gap-16">
            <Image className="object-cover object-center min-h-[450px] rounded-md" src={dish1} alt={"Picture of a dish"} width={300} height={450} priority={true} />
            <Image className="object-cover object-center min-h-[450px] rounded-md hidden md:block" src={dish2} alt={"Picture of a dish"} width={300} height={450} priority={true} />
            <Image className="object-cover object-center min-h-[450px] rounded-md hidden lg:block" src={dish3} alt={"Picture of a dish"} width={300} height={450} priority={true} />
         </div>
         <div className="custom-underline !mt-8"></div>
         <div className="text-center">
            <h2 className="text-2xl font-bold">Diner time</h2>
            <p className="text-sm mt-6">Gather all your favorite dishes in one place</p>
            <p className="text-sm">{"Add, remove, filter and favorize in order to never ask again: "}<br/><br/><span className="italic font-serif text-lg">{"\"What do I eat today?\""}</span></p>
            <Link href="/login"><button className="mt-4 btn btn-secondary">Get started now.</button></Link>
         </div>
      </main>
   )
}
