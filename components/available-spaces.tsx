"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SpaceData {
  id: string
  location: string
  floor: number
  type: "standard" | "compact" | "accessible"
  hourlyRate: number
  available: boolean
  features: string[]
}

interface AvailableSpacesProps {
  onSelectSpace: (spaceId: string) => void
}

export default function AvailableSpaces({ onSelectSpace }: AvailableSpacesProps) {
  const spaces: SpaceData[] = [
    {
      id: "A-15",
      location: "Level 1, North Wing",
      floor: 1,
      type: "standard",
      hourlyRate: 3.5,
      available: true,
      features: ["Covered", "Well-lit"],
    },
    {
      id: "A-22",
      location: "Level 1, North Wing",
      floor: 1,
      type: "standard",
      hourlyRate: 3.5,
      available: true,
      features: ["Covered", "Near Elevator"],
    },
    {
      id: "B-08",
      location: "Level 2, South Wing",
      floor: 2,
      type: "compact",
      hourlyRate: 2.5,
      available: true,
      features: ["Open", "Budget Friendly"],
    },
    {
      id: "C-05",
      location: "Level 1, Center",
      floor: 1,
      type: "accessible",
      hourlyRate: 2.0,
      available: true,
      features: ["Accessible", "Wheelchair ramp"],
    },
    {
      id: "D-10",
      location: "Level 3, East Wing",
      floor: 3,
      type: "standard",
      hourlyRate: 3.5,
      available: true,
      features: ["Covered", "EV Charging nearby"],
    },
    {
      id: "D-25",
      location: "Level 2, West Wing",
      floor: 2,
      type: "compact",
      hourlyRate: 2.5,
      available: true,
      features: ["Open", "Spacious"],
    },
  ]

  const [filterType, setFilterType] = useState<"all" | "standard" | "compact" | "accessible">("all")

  const filteredSpaces = filterType === "all" ? spaces : spaces.filter((s) => s.type === filterType)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "standard":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "compact":
        return "bg-purple-500/20 text-purple-400 border-purple-500/50"
      case "accessible":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        {["all", "standard", "compact", "accessible"].map((filter) => (
          <button
            key={filter}
            onClick={() => setFilterType(filter as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === filter
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSpaces.map((space) => (
          <div
            key={space.id}
            className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{space.id}</h3>
                <p className="text-gray-400 text-sm">{space.location}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded border ${getTypeColor(space.type)}`}>
                {space.type.charAt(0).toUpperCase() + space.type.slice(1)}
              </span>
            </div>

            {/* Features */}
            <div className="mb-4 space-y-2">
              {space.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>

            {/* Price and Button */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700">
              <div>
                <p className="text-gray-400 text-sm mb-1">Hourly Rate</p>
                <p className="text-2xl font-bold text-white">${space.hourlyRate}</p>
              </div>
              <Button
                onClick={() => onSelectSpace(space.id)}
                className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
              >
                Reserve Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}







