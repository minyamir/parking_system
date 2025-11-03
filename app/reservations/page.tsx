"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import ReservationForm from "@/components/reservation-form"
import AvailableSpaces from "@/components/available-spaces"

export default function ReservationsPage() {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Reserve a Parking Space</h1>
          <p className="text-gray-400">Select your preferred space and booking details</p>
        </div>

        {!showForm ? (
          <AvailableSpaces
            onSelectSpace={(spaceId) => {
              setSelectedSpace(spaceId)
              setShowForm(true)
            }}
          />
        ) : (
          <ReservationForm
            spaceId={selectedSpace}
            onCancel={() => {
              setShowForm(false)
              setSelectedSpace(null)
            }}
          />
        )}
      </main>
    </div>
  )
}
