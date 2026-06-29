"use client"

import Image from "next/image"

const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-r from-transparent via-black to-transparent border-t-4 border-red-600">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <h1 className="text-red-600 font-mono font-extrabold text-3xl">
            Nexa Mart
          </h1>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-10 w-[3px] bg-red-600" />

        {/* Countries */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src="/pak.png" alt="Pakistan" width={35} height={35} />
            <p className="text-white font-semibold">Pakistan</p>
          </div>

          <div className="flex items-center gap-2">
            <Image src="/bang.png" alt="Bangladesh" width={35} height={35} />
            <p className="text-white font-semibold">Bangladesh</p>
          </div>

          <div className="flex items-center gap-2">
            <Image src="/lanka.png" alt="Sri Lanka" width={35} height={35} />
            <p className="text-white font-semibold">Sri Lanka</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-10 w-[3px] bg-red-600" />

        {/* Follow Us */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-white font-extrabold text-2xl">Follow Us</h1>
          <div className="flex gap-4">
            <Image src="/fb.png" alt="Facebook" width={35} height={35} style={{ height: 'auto' }} />
            <Image src="/tw.png" alt="Twitter" width={35} height={35} style={{ height: 'auto' }} />
            <Image src="/yt.png" alt="YouTube" width={35} height={35} style={{ height: 'auto' }} />
            <Image src="/insta.png" alt="Instagram" width={35} height={35} style={{ height: 'auto' }} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Footer
