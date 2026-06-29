"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { ModeToggle } from "./ModeToggle"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/app/store/store"
import { setQuery } from "@/app/store/slices/searchSlice"
import { RootState } from "@/app/store/store";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const query = useSelector((state: RootState) => state.search.query)
  return (
    <header className="border-b-4 border-b-red-600 bg-gradient-to-r from-transparent via-black to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-3">
        
     
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
        
          <div className="flex items-center justify-between">
            <Image
              src="/image.png"
              alt="Logo"
              width={150}
              height={50}
              priority
              className="object-contain"
              style={{ width: 'auto', height: 'auto' }}
            />

            
            <div className="flex items-center gap-2 md:hidden">
              <Button size="icon" variant="outline" className="bg-red-600">
                <ShoppingCart />
              </Button>
              <ModeToggle />
            </div>
          </div>

        
          <div className="relative w-full md:max-w-xl">
            <Input
              placeholder="Search in NexaMart"
              className="h-11 pr-12 bg-white font-medium"
              value={query}
              onChange={(e) => dispatch(setQuery(e.target.value))}
            />
            <Button
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-red-600"
            >
              <Search />
            </Button>
          </div>

         
          <div className="hidden md:flex items-center gap-4">
            <Button size="icon" variant="outline" className="bg-red-600">
              <ShoppingCart />
            </Button>

            <Button variant="outline" className="bg-red-600 font-bold">
              Sign up
            </Button>

            <Button variant="outline" className="bg-red-600 font-bold">
              Login
            </Button>

            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

