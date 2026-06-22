"use client"



export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "reservations">("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Parking Dashboard</h1>
          <p className="text-gray-400">Manage your parking reservations and view your profile</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "overview" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "profile" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("reservations")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "reservations"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Reservations
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === "overview" && <ParkingStats />}
          {activeTab === "profile" && <UserProfile />}
          {activeTab === "reservations" && <ReservationHistory />}
        </div>
      </main>
    </div>
  )
}
