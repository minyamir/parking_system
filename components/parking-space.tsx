"use client"

import { useRef } from "react"
import type { Mesh } from "three"

interface ParkingSpaceProps {
  id: string
  position: [number, number, number]
  occupied: boolean
  selected: boolean
  onClick: () => void
}

export default function ParkingSpace({ id, position, occupied, selected, onClick }: ParkingSpaceProps) {
  const meshRef = useRef<Mesh>(null)

  const getColor = () => {
    if (selected) return "#3b82f6" // Blue when selected
    if (occupied) return "#ef4444" // Red when occupied
    return "#10b981" // Green when available
  }

  const handleClick = () => {
    onClick()
  }

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onPointerOver={() => {
        if (meshRef.current) meshRef.current.scale.set(1.05, 1, 1.05)
      }}
      onPointerOut={() => {
        if (meshRef.current) meshRef.current.scale.set(1, 1, 1)
      }}
    >
      <boxGeometry args={[3.2, 0.2, 5]} />
      <meshStandardMaterial color={getColor()} emissive={selected ? "#1e40af" : "#000000"} />
    </mesh>
  )
}
