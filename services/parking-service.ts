import { apiClient } from "@/lib/api"

export interface ParkingSpace {
  id: string
  level: number
  number: string
  status: "available" | "occupied" | "reserved" | "maintenance"
  type: "standard" | "handicap" | "compact" | "premium"
  hourlyRate: number
  location: { x: number; y: number; z: number }
}

export interface Reservation {
  id: string
  userId: string
  spaceId: string
  startTime: string
  endTime: string
  totalCost: number
  status: "active" | "completed" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed"
}

export const parkingService = {
  // Get all parking spaces
  async getAllSpaces() {
    return apiClient.get<ParkingSpace[]>("/parking-spaces")
  },

  // Get spaces by level
  async getSpacesByLevel(level: number) {
    return apiClient.get<ParkingSpace[]>(`/parking-spaces/level/${level}`)
  },

  // Get available spaces
  async getAvailableSpaces() {
    return apiClient.get<ParkingSpace[]>("/parking-spaces?status=available")
  },

  // Get space by ID
  async getSpace(id: string) {
    return apiClient.get<ParkingSpace>(`/parking-spaces/${id}`)
  },

  // Get occupancy stats
  async getOccupancyStats() {
    return apiClient.get<{
      total: number
      available: number
      occupied: number
      reserved: number
      occupancyRate: number
    }>("/parking-spaces/stats")
  },
}

export const reservationService = {
  // Get user reservations
  async getUserReservations(userId: string) {
    return apiClient.get<Reservation[]>(`/reservations/user/${userId}`)
  },

  // Get reservation by ID
  async getReservation(id: string) {
    return apiClient.get<Reservation>(`/reservations/${id}`)
  },

  // Create reservation
  async createReservation(data: {
    spaceId: string
    startTime: string
    endTime: string
  }) {
    return apiClient.post<Reservation>("/reservations", data)
  },

  // Cancel reservation
  async cancelReservation(id: string) {
    return apiClient.put(`/reservations/${id}`, { status: "cancelled" })
  },

  // Update reservation
  async updateReservation(id: string, data: { startTime?: string; endTime?: string }) {
    return apiClient.put<Reservation>(`/reservations/${id}`, data)
  },
}
