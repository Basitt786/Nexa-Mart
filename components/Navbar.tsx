"use client"

import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs"
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
        
        {/* Main Grid Wrapper */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          
          {/* TOP ROW: Logo & Right-Side Controls for Mobile */}
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Logo */}
            <Image
              src="/image.png"
              alt="Logo"
              width={150}
              height={50}
              priority
              className="object-contain w-24 sm:w-32 md:w-auto h-auto"
            />

            {/* Mobile Action Controls (Clean & Spaced) */}
            <div className="flex items-center gap-2 shrink-0 md:hidden">
              <Button size="icon" variant="outline" className="bg-red-600 h-9 w-9">
                <ShoppingCart className="h-4 w-4" />
              </Button>
              
              <ModeToggle />

              <Show when="signed-in">
                <UserButton />
              </Show>
              
              <Show when="signed-out">
                {/* Mobile par sirf aik simple button taake layout kharab na ho */}
                <SignInButton>
                  <button className="bg-[#ff5347] text-white rounded-full font-medium text-xs h-9 px-3.5 cursor-pointer whitespace-nowrap">
                    Login
                  </button>
                </SignInButton>
              </Show>
            </div>
          </div>

          {/* BOTTOM ROW (Mobile) / CENTER ROW (Desktop): Input Bar */}
          <div className="relative w-full md:max-w-xl order-last md:order-none">
            <Input
              placeholder="Search in NexaMart"
              className="h-11 pr-12 bg-white font-medium text-black"
              value={query}
              onChange={(e) => dispatch(setQuery(e.target.value))}
            />
            <Button
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-red-600 h-9 w-9"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* DESKTOP CONTROLS: Hidden on mobile entirely */}
          <div className="hidden md:flex items-center gap-4">
            <Button size="icon" variant="outline" className="bg-red-600">
              <ShoppingCart />
            </Button>

            <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#ff5347] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            
            <Show when="signed-in">
              <UserButton />
            </Show>

            <ModeToggle />
          </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar