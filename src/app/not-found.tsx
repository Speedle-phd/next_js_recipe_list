import Link from "next/link";
import shopClosed from '/public/images/route-error.jpg'
import Image from 'next/image'

export default function NotFound() {
   return (
      <div className="min-h-[100dvh] flex justify-center items-center flex-col w-[clamp(20rem,60vw,60rem)] mx-auto gap-8">
         <header className="text-center text-3xl">
            <h2 className="font-extrabold">Dinner Not Found</h2>
            <p className="text-sm">Could not find requested resource.</p>
            <div className="custom-underline"></div>
         </header>
         <Image src={shopClosed} alt={"Shop's closed"} width={500} height={500} className="rounded-md" />
         <Link href='/dashboard'><button className="btn btn-primary">Return Home</button></Link>
      </div>
   )
}
