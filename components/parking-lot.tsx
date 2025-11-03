"use client"

import { useRef, useState, useEffect } from "react"
import type { Group } from "three"
import ParkingSpace from "./parking-space"

interface ParkingLotProps {
  onSpaceClick: (spaceId: string) => void
  selectedSpaceId: string | null
}

interface ParkingSpaceData {
  id: string
  occupied: boolean
  x: number
  z: number
  lastUpdated: number
}

export default function ParkingLot({ onSpaceClick, selectedSpaceId }: ParkingLotProps) {
  const groupRef = useRef<Group>(null)
  const [spaces, setSpaces] = useState<ParkingSpaceData[]>([])
  const [occupancyRate, setOccupancyRate] = useState(0)
  const [vacantSpaces, setVacantSpaces] = useState(0)

  useEffect(() => {
    // Generate parking spaces in a grid layout
    const generatedSpaces: ParkingSpaceData[] = []
    const rows = 5
    const cols = 6
    const spacing = 4

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const id = `space-${i}-${j}`
        const x = (j - cols / 2) * spacing + spacing / 2
        const z = (i - rows / 2) * spacing + spacing / 2
        const occupied = Math.random() > 0.6 // 40% occupied
        generatedSpaces.push({ id, occupied, x, z, lastUpdated: Date.now() })
      }
    }
    setSpaces(generatedSpaces)
    updateOccupancyStats(generatedSpaces)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSpaces((prevSpaces) => {
        const updated = prevSpaces.map((space) => {
          // 5% chance of occupancy change every 3 seconds
          if (Math.random() > 0.95) {
            return {
              ...space,
              occupied: !space.occupied,
              lastUpdated: Date.now(),
            }
          }
          return space
        })
        updateOccupancyStats(updated)
        return updated
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const updateOccupancyStats = (updatedSpaces: ParkingSpaceData[]) => {
    const occupied = updatedSpaces.filter((s) => s.occupied).length
    const vacant = updatedSpaces.length - occupied
    setOccupancyRate(Math.round((occupied / updatedSpaces.length) * 100))
    setVacantSpaces(vacant)
  }

  return (
    <group ref={groupRef}>
      {/* Ground */}
      <mesh position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[35, 30]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Parking Spaces */}
      {spaces.map((space) => (
        <ParkingSpace
          key={space.id}
          id={space.id}
          position={[space.x, 0.1, space.z]}
          occupied={space.occupied}
          selected={selectedSpaceId === space.id}
          onClick={() => onSpaceClick(space.id)}
        />
      ))}

      {/* Stats indicator (positioned in 3D space) */}
      <group position={[0, 2, -12]}>
        <mesh>
          <boxGeometry args={[12, 3, 0.1]} />
          <meshStandardMaterial color="#1f2937" transparent opacity={0.9} />
        </mesh>
      </group>
    </group>
  )
}

export type { ParkingSpaceData, ParkingLotProps }
