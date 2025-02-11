"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Session } from "next-auth";


const Header = ({session}: {session: Session}) => {
  // For active link to change colour
  const pathname = usePathname()
  return (
   <header className=" my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link href='/' className={cn("text-base cursor-pointer capitalize", pathname==='/library' ? 'text-light-200' : 'text-lime-100')}>       Library 
          </Link>
        </li>
        <li>
          <Link href={"/my-profile"}>
          <Avatar>
            <AvatarFallback className="text-white">{session?.user?.name}</AvatarFallback>
          </Avatar>
          </Link>
        </li>
      </ul>
   </header>
  )
}

export default Header;