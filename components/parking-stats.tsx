"use client"

import { useState, useEffect } from "react"

interface StatsData {
  totalSpaces: number
  occupiedSpaces: number
  vacantSpaces: number
  occupancyRate: number
  averageStayTime: number
  peakHours: string
}

export default function ParkingStats() {
  const [stats, setStats] = useState<StatsData>({
    totalSpaces: 30,
    occupiedSpaces: 18,
    vacantSpaces: 12,
    occupancyRate: 60,
    averageStayTime: 2.5,
    peakHours: "12:00 PM - 3:00 PM",
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        const change = Math.floor(Math.random() * 3) - 1
        const newOccupied = Math.max(0, Math.min(30, prev.occupiedSpaces + change))
        return {
          ...prev,
          occupiedSpaces: newOccupied,
          vacantSpaces: 30 - newOccupied,
          occupancyRate: Math.round((newOccupied / 30) * 100),
        }
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const statCards = [
    {
      label: "Total Spaces",
      value: stats.totalSpaces,
      color: "from-blue-500/20 to-blue-600/20",
      textColor: "text-blue-400",
    },
    {
      label: "Occupied",
      value: stats.occupiedSpaces,
      color: "from-red-500/20 to-red-600/20",
      textColor: "text-red-400",
    },
    {
      label: "Available",
      value: stats.vacantSpaces,
      color: "from-green-500/20 to-green-600/20",
      textColor: "text-green-400",
    },
    {
      label: "Occupancy Rate",
      value: `${stats.occupancyRate}%`,
      color: "from-purple-500/20 to-purple-600/20",
      textColor: "text-purple-400",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 border border-slate-700 backdrop-blur-sm`}
          >
            <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Occupancy Chart */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Occupancy Rate</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Current</span>
            <span className="text-white font-semibold">{stats.occupancyRate}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-full transition-all duration-500"
              style={{ width: `${stats.occupancyRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h4 className="text-white font-semibold mb-2">Average Stay Time</h4>
          <p className="text-3xl font-bold text-blue-400">{stats.averageStayTime}h</p>
          <p className="text-gray-400 text-sm mt-2">Average parking duration</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h4 className="text-white font-semibold mb-2">Peak Hours</h4>
          <p className="text-xl font-bold text-purple-400">{stats.peakHours}</p>
          <p className="text-gray-400 text-sm mt-2">Most busy time period</p>
        </div>
      </div>
    </div>
  )
}

