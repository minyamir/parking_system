"use client"

import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, OrbitControls, Environment } from "@react-three/drei"
import { useState, useEffect } from "react"
import ParkingLot from "./parking-lot"
import ParkingSpaceInfo from "./parking-space-info"

interface OccupancyStats {
  totalSpaces: number
  occupiedSpaces: number
  vacantSpaces: number
  occupancyRate: number
}

export default function Parking3DScene() {
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null)
  const [stats, setStats] = useState<OccupancyStats>({
    totalSpaces: 30,
    occupiedSpaces: 12,
    vacantSpaces: 18,
    occupancyRate: 40,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        // Simulate occupancy changes
        const change = Math.floor(Math.random() * 5) - 2
        const newOccupied = Math.max(0, Math.min(30, prev.occupiedSpaces + change))
        return {
          totalSpaces: 30,
          occupiedSpaces: newOccupied,
          vacantSpaces: 30 - newOccupied,
          occupancyRate: Math.round((newOccupied / 30) * 100),
        }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-screen flex">
      {/* 3D Canvas */}
      <div className="flex-1 relative bg-slate-900">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 25, 35]} fov={45} />
          <OrbitControls autoRotate autoRotateSpeed={2} enableZoom enablePan minDistance={20} maxDistance={80} />
          <Environment preset="city" />
          <ambientLight intensity={0.6} />
          <directionalLight position={[20, 30, 20]} intensity={1} />
          <ParkingLot onSpaceClick={setSelectedSpaceId} selectedSpaceId={selectedSpaceId} />
        </Canvas>

        {/* Info Overlay */}
        <div className="absolute top-6 left-6 bg-black/70 text-white p-4 rounded-lg backdrop-blur-sm max-w-xs border border-slate-700/50">
          <h2 className="text-xl font-bold mb-2">Parking Lot Visualization</h2>
          <p className="text-sm text-gray-300 mb-4">
            Click on any space to view details. Use mouse to rotate and zoom.
          </p>

          <div className="space-y-2 pt-4 border-t border-slate-700">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Total Spaces</span>
              <span className="font-semibold text-white">{stats.totalSpaces}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Occupied</span>
              <span className="font-semibold text-red-400">{stats.occupiedSpaces}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Available</span>
              <span className="font-semibold text-green-400">{stats.vacantSpaces}</span>
            </div>

            {/* Occupancy rate bar */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">Occupancy</span>
                <span className="text-xs font-semibold text-white">{stats.occupancyRate}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-red-500 h-full transition-all duration-500"
                  style={{ width: `${stats.occupancyRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className="w-80 bg-gradient-to-b from-slate-800 to-slate-900 border-l border-slate-700 overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Parking Spaces</h3>
          {selectedSpaceId ? (
            <ParkingSpaceInfo spaceId={selectedSpaceId} onClose={() => setSelectedSpaceId(null)} />
          ) : (
            <div className="text-gray-400 text-sm">Select a parking space from the 3D view to see details.</div>
          )}
        </div>
      </div>
    </div>
  )
}
