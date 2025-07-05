"use client"

import {
  Home,
  Video,
  MessageSquare,
  Bell,
  Info,
  ImageUp,
} from "lucide-react"
import Image from "next/image"


export function Sidebar() {
  return (
    <aside className="w-72 min-h-screen border-r bg-white p-4 space-y-4">
      {/* Profile photo */}
      <Image
  src="/reinier.jpg" // must start with `/` to reference the public folder
  alt="Profile"
  width={300}         // set fixed width
  height={300}        // and height, or use layout="responsive" for flexibility
  className="w-full h-auto rounded-lg shadow-lg border object-cover"
/>


      {/* Sidebar links with icons */}
      <ul className="text-sm text-blue-700 space-y-2 pt-4">
        <li className="flex items-center gap-2 cursor-pointer hover:underline">
          <Home size={18} /> Home
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:underline">
          <ImageUp size={18} /> View Photos
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:underline">
          <Video size={18} /> View Videos
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:underline">
          <MessageSquare size={18} /> Send Message
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:underline">
          <Bell size={18} /> Poke
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:underline">
          <Info size={18} /> Info
        </li>
      </ul>

      {/* Info section */}
      <div className="text-xs text-gray-600 pt-6 space-y-1">
        <p><strong>Networks:</strong> Facebook</p>
        <p><strong>Birthday:</strong> December 13, 1999</p>
        <p><strong>City:</strong> Metro Manila, PHL</p>
      </div>
    </aside>
  )
}
