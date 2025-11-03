"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface UserData {
  name: string
  email: string
  phone: string
  vehicleRegNum: string
  vehicleModel: string
  memberSince: string
  totalReservations: number
  totalHours: number
}

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    vehicleRegNum: "ABC-1234",
    vehicleModel: "Tesla Model 3",
    memberSince: "January 2024",
    totalReservations: 24,
    totalHours: 168,
  })

  const [formData, setFormData] = useState(userData)

  const handleSave = () => {
    setUserData(formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-6 border border-slate-700">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">JD</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
              <p className="text-gray-400">Member since {userData.memberSince}</p>
            </div>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
              Edit Profile
            </Button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-700/50 rounded p-3">
            <p className="text-gray-400 text-sm mb-1">Total Reservations</p>
            <p className="text-white text-2xl font-bold">{userData.totalReservations}</p>
          </div>
          <div className="bg-slate-700/50 rounded p-3">
            <p className="text-gray-400 text-sm mb-1">Total Parking Hours</p>
            <p className="text-white text-2xl font-bold">{userData.totalHours}h</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Vehicle Registration</label>
                <input
                  type="text"
                  value={formData.vehicleRegNum}
                  onChange={(e) => setFormData({ ...formData, vehicleRegNum: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Vehicle Model</label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 flex-1">
                Save Changes
              </Button>
              <Button
                onClick={() => {
                  setFormData(userData)
                  setIsEditing(false)
                }}
                variant="outline"
                className="border-slate-600 text-slate-300 flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white">{userData.email}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Phone</p>
              <p className="text-white">{userData.phone}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Vehicle Registration</p>
                <p className="text-white">{userData.vehicleRegNum}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Vehicle Model</p>
                <p className="text-white">{userData.vehicleModel}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
