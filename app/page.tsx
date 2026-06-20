"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Parking3DScene from "@/components/parking-3d-scene"


  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Welcome Banner */}
      {user && (
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-blue-500/30 px-4 py-4 animate-fade-in-up">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-white">
                Welcome back, <span className="font-bold text-blue-400">{user.name}</span>!
              </p>
              <p className="text-gray-400 text-sm">Find and reserve your parking spot below</p>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/reservations">Quick Reserve</Link>
            </Button>
          </div>
        </div>
      )}

      {/* 3D Scene */}
      <main className="w-full h-[calc(100vh-80px)]">
        {user ? (
          <Parking3DScene />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="text-center max-w-md animate-scale-in">
              <h1 className="text-4xl font-bold text-white mb-4">Welcome to ParkHub</h1>
              <p className="text-gray-400 mb-8">
                Sign in to explore our 3D parking visualization and find your perfect spot
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
