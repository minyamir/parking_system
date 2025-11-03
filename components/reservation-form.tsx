"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ReservationFormProps {
  spaceId: string | null
  onCancel: () => void
}

interface ReservationData {
  spaceId: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  duration: number
  totalCost: number
  hourlyRate: number
}

export default function ReservationForm({ spaceId, onCancel }: ReservationFormProps) {
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endDate: new Date().toISOString().split("T")[0],
    endTime: "17:00",
  })

  const [submitted, setSubmitted] = useState(false)

  const calculateDuration = () => {
    const start = new Date(`${formData.startDate}T${formData.startTime}`)
    const end = new Date(`${formData.endDate}T${formData.endTime}`)
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    return Math.max(0.5, Math.ceil(hours * 2) / 2) // Round to nearest 0.5
  }

  const hourlyRate = 3.5
  const duration = calculateDuration()
  const totalCost = (duration * hourlyRate).toFixed(2)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      onCancel()
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
            <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Reservation Confirmed!</h2>
          <p className="text-gray-400 mb-4">Your parking space has been successfully reserved.</p>
          <div className="bg-slate-700/50 rounded p-4 mb-4 text-left">
            <p className="text-gray-300">
              <span className="text-gray-400">Space:</span> <span className="text-white font-semibold">{spaceId}</span>
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Duration:</span>{" "}
              <span className="text-white font-semibold">{duration}h</span>
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Total Cost:</span>{" "}
              <span className="text-white font-semibold">${totalCost}</span>
            </p>
          </div>
          <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6">Reservation Details</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Space Selection */}
          <div className="bg-slate-700/50 rounded p-4 border border-slate-600">
            <p className="text-gray-400 text-sm mb-1">Selected Parking Space</p>
            <p className="text-2xl font-bold text-white">{spaceId}</p>
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Start Time</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">End Time</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Duration</p>
                <p className="text-2xl font-bold text-blue-400">{duration}h</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Hourly Rate</p>
                <p className="text-2xl font-bold text-blue-400">${hourlyRate}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-500/20 flex justify-between items-center">
              <span className="text-gray-300 font-medium">Total Cost</span>
              <span className="text-3xl font-bold text-white">${totalCost}</span>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              defaultChecked
              className="mt-1 w-4 h-4 rounded border-gray-600 bg-slate-700 cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-gray-400">
              I agree to the parking terms and conditions. Payment will be processed upon completion.
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-slate-700">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              Confirm & Pay ${totalCost}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
