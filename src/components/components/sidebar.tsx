"use client"

import {
  Home,
  Image,
  Video,
  MessageSquare,
  Bell,
  Info,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Sidebar() {
  return (
    <aside className="w-72 min-h-screen border-r bg-white p-4 space-y-4">
      {/* Bigger profile photo placeholder */}
      <img
        src="reinier.jpg" // Replace this with your real photo later
        alt="Profile"
        className="w-full h-auto rounded-lg shadow-lg border"
      />

      <ul className="text-sm text-blue-700 space-y-1 pt-2">
        <li className="cursor-pointer hover:underline">View Photos</li>
        <li className="cursor-pointer hover:underline">View Videos</li>
        <li className="cursor-pointer hover:underline">Send Message</li>
        <li className="cursor-pointer hover:underline">Poke</li>
      </ul>

      <div className="text-xs text-gray-600 pt-4 space-y-1">
        <p><strong>Networks:</strong> Facebook</p>
        <p><strong>Birthday:</strong> December 13, 1999</p>
        <p><strong>City:</strong> Metro Manila, PHL</p>
      </div>
    </aside>
  )
}
