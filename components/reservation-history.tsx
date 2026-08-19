"use client"

import { Button } from "@/components/ui/button"

interface Reservation {
  id: string
  spaceId: string
  startTime: string
  endTime: string
  duration: string
  cost: number
  status: "completed" | "active" | "upcoming"
}

export default function ReservationHistory() {
  const reservations: Reservation[] = [
    {
      id: "RES-001",
      spaceId: "A-15",
      startTime: "Today, 10:00 AM",
      endTime: "Today, 2:00 PM",
      duration: "4h",
      cost: 14.0,
      status: "active",
    },
    {
      id: "RES-002",
      spaceId: "C-22",
      startTime: "Tomorrow, 9:00 AM",
      endTime: "Tomorrow, 5:00 PM",
      duration: "8h",
      cost: 28.0,
      status: "upcoming",
    },
    {
      id: "RES-003",
      spaceId: "B-10",
      startTime: "Nov 1, 11:00 AM",
      endTime: "Nov 1, 3:00 PM",
      duration: "4h",
      cost: 14.0,
      status: "completed",
    },
    {
      id: "RES-004",
      spaceId: "D-05",
      startTime: "Oct 31, 2:00 PM",
      endTime: "Oct 31, 6:00 PM",
      duration: "4h",
      cost: 14.0,
      status: "completed",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "upcoming":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "completed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
      default:
        return ""
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Reservation History</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">New Reservation</Button>
      </div>

      <div className="space-y-3">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-white font-semibold">{reservation.id}</span>
                  <span className={`text-xs px-2 py-1 rounded border ${getStatusBadge(reservation.status)}`}>
                    {getStatusLabel(reservation.status)}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  Space <span className="font-semibold text-white">{reservation.spaceId}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-lg">${reservation.cost.toFixed(2)}</p>
                <p className="text-gray-400 text-sm">{reservation.duration}</p>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded px-3 py-2 text-sm text-gray-300">
              {reservation.startTime} - {reservation.endTime}
            </div>

            {reservation.status === "active" && (
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 border-slate-600 text-slate-300 bg-transparent"
              >
                End Reservation
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

