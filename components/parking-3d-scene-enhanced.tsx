"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sky, PerspectiveCamera } from "@react-three/drei"
import { AnimatedCar } from "./animated-car-3d"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ParkingSpace {
  id: string
  position: [number, number, number]
  status: "available" | "occupied" | "reserved"
  level: number
  price: number
}

export default function Parking3DSceneEnhanced() {
  const [selectedSpace, setSelectedSpace] = useState<ParkingSpace | null>(null)
  const [parkingSpaces, setParkingSpaces] = useState<ParkingSpace[]>([
    { id: "A1", position: [-5, 0, -5], status: "available", level: 1, price: 25 },
    { id: "A2", position: [-3, 0, -5], status: "occupied", level: 1, price: 25 },
    { id: "A3", position: [-1, 0, -5], status: "available", level: 1, price: 25 },
    { id: "B1", position: [1, 0, -5], status: "reserved", level: 1, price: 25 },
    { id: "B2", position: [3, 0, -5], status: "available", level: 1, price: 25 },
  ])
  const [animatingCar, setAnimatingCar] = useState(false)
  const [carTarget, setCarTarget] = useState<[number, number, number]>([0, 0, 0])

  const handleReserveSpace = async (space: ParkingSpace) => {
    if (space.status !== "available") return

    setAnimatingCar(true)
    setCarTarget(space.position)

    // Call backend API
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceId: space.id,
          userId: localStorage.getItem("userId"),
          duration: 2,
          level: space.level,
        }),
      })

      if (response.ok) {
        setParkingSpaces((prev) => prev.map((s) => (s.id === space.id ? { ...s, status: "reserved" } : s)))
        setTimeout(() => setAnimatingCar(false), 3000)
      }
    } catch (error) {
      console.error("Reservation error:", error)
      setAnimatingCar(false)
    }
  }

  return (
    <div className="w-full h-full flex gap-4 bg-slate-950 p-4">
      {/* 3D Scene */}
      <div className="flex-1">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 15, 20]} />
          <OrbitControls autoRotate autoRotateSpeed={2} />
          <Sky sunPosition={[100, 20, 100]} turbidity={8} rayleigh={6} />

          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 15, 10]} intensity={1} castShadow shadow-mapSize={2048} />

          {/* Ground */}
          <mesh receiveShadow position={[0, -0.1, 0]}>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>

          {/* Parking Spaces */}
          {parkingSpaces.map((space) => (
            <group key={space.id}>
              {/* Space marker */}
              <mesh position={[space.position[0], 0, space.position[2]]} onClick={() => setSelectedSpace(space)}>
                <planeGeometry args={[1.2, 2.4]} />
                <meshStandardMaterial
                  color={space.status === "available" ? "#10b981" : space.status === "occupied" ? "#ef4444" : "#3b82f6"}
                  emissive={
                    space.status === "available" ? "#059669" : space.status === "occupied" ? "#dc2626" : "#1d4ed8"
                  }
                />
              </mesh>

              {/* Space label */}
              <mesh position={[space.position[0], 0.5, space.position[2]]}>
                <textGeometry args={[space.id, { size: 0.3, height: 0.1 }]} />
                <meshStandardMaterial color="#ffffff" />
              </mesh>
            </group>
          ))}

          {/* Animated Car */}
          {animatingCar && <AnimatedCar position={[0, 0.3, 10]} targetPosition={carTarget} isParking={true} />}
        </Canvas>
      </div>

      {/* Info Panel */}
      <div className="w-80 space-y-4">
        <Card className="bg-slate-900 border-blue-500/30">
          <CardHeader>
            <CardTitle>Parking Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-300">
                Available: {parkingSpaces.filter((s) => s.status === "available").length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-gray-300">
                Occupied: {parkingSpaces.filter((s) => s.status === "occupied").length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-300">
                Reserved: {parkingSpaces.filter((s) => s.status === "reserved").length}
              </span>
            </div>
          </CardContent>
        </Card>

        {selectedSpace && (
          <Card className="bg-slate-900 border-blue-500/30">
            <CardHeader>
              <CardTitle>Space Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Space ID</p>
                <p className="text-lg font-semibold text-white">{selectedSpace.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className="text-lg font-semibold text-blue-400 capitalize">{selectedSpace.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Level</p>
                <p className="text-lg font-semibold text-white">{selectedSpace.level}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Hourly Rate</p>
                <p className="text-lg font-semibold text-white">${selectedSpace.price}</p>
              </div>
              <Button
                onClick={() => handleReserveSpace(selectedSpace)}
                disabled={selectedSpace.status !== "available" || animatingCar}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
              >
                {animatingCar ? "Reserving..." : "Reserve Space"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}



