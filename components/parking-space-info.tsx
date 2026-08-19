"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ParkingSpaceInfoProps {
  spaceId: string
  onClose: () => void
}

export default function ParkingSpaceInfo({ spaceId, onClose }: ParkingSpaceInfoProps) {
  const [spaceData, setSpaceData] = useState<{
    id: string
    status: string
    occupied: boolean
    floor: number
    level: string
    hourlyRate: number
    reservable: boolean
  } | null>(null)

  useEffect(() => {
    // Mock data - in a real app, fetch from API
    const mockData = {
      id: spaceId,
      status: Math.random() > 0.6 ? "Occupied" : "Available",
      occupied: Math.random() > 0.6,
      floor: Math.floor(Math.random() * 3) + 1,
      level: "Ground",
      hourlyRate: 3.5,
      reservable: true,
    }
    setSpaceData(mockData)
  }, [spaceId])

  if (!spaceData) return null

  return (
    <div className="space-y-4">
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <p className="text-xs text-gray-400 mb-1">Space ID</p>
        <p className="text-white font-mono">{spaceData.id}</p>
      </div>

      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <p className="text-xs text-gray-400 mb-1">Status</p>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${spaceData.occupied ? "bg-red-500" : "bg-green-500"}`} />
          <span className="text-white font-medium">{spaceData.occupied ? "Occupied" : "Available"}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
          <p className="text-xs text-gray-400 mb-1">Floor</p>
          <p className="text-white font-semibold">{spaceData.floor}</p>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
          <p className="text-xs text-gray-400 mb-1">Rate/Hour</p>
          <p className="text-white font-semibold">${spaceData.hourlyRate}</p>
        </div>
      </div>

      {!spaceData.occupied && (
        <Button
          onClick={() => {
            console.log("Reserve space:", spaceData.id)
            onClose()
          }}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Reserve Space
        </Button>
      )}

      <Button
        onClick={onClose}
        variant="outline"
        className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
      >
        Close
      </Button>
    </div>
  )
}

