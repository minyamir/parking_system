"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface AnimatedCarProps {
  position: [number, number, number]
  targetPosition: [number, number, number]
  isParking: boolean
  speed?: number
}

export function AnimatedCar({ position, targetPosition, isParking, speed = 0.05 }: AnimatedCarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const currentPos = useRef(position)
  const wheelsRef = useRef<THREE.Group[]>([])

  // Create a simple box-based car since we don't have a GLB file
  useEffect(() => {
    if (!groupRef.current) return

    // Main body
    const bodyGeometry = new THREE.BoxGeometry(1, 0.6, 2)
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff6b35 })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 0.5
    body.castShadow = true
    body.receiveShadow = true
    groupRef.current.add(body)

    // Windows
    const windowGeometry = new THREE.BoxGeometry(0.6, 0.3, 0.6)
    const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.6 })

    const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial)
    frontWindow.position.set(0, 0.8, 0.4)
    groupRef.current.add(frontWindow)

    const backWindow = new THREE.Mesh(windowGeometry, windowMaterial)
    backWindow.position.set(0, 0.8, -0.4)
    groupRef.current.add(backWindow)

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16)
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 })

    const wheelPositions = [
      [-0.4, 0.3, 0.6],
      [0.4, 0.3, 0.6],
      [-0.4, 0.3, -0.6],
      [0.4, 0.3, -0.6],
    ] as const

    wheelPositions.forEach((pos) => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
      wheel.rotation.z = Math.PI / 2
      wheel.position.set(...pos)
      wheel.castShadow = true
      groupRef.current?.add(wheel)
      wheelsRef.current.push(wheel)
    })

    // Headlights
    const headlightGeometry = new THREE.SphereGeometry(0.15, 8, 8)
    const headlightMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffff00 })

    const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial)
    leftHeadlight.position.set(-0.3, 0.6, 1)
    groupRef.current.add(leftHeadlight)

    const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial)
    rightHeadlight.position.set(0.3, 0.6, 1)
    groupRef.current.add(rightHeadlight)
  }, [])

  useFrame(() => {
    if (!groupRef.current) return

    // Smooth movement towards target
    const dx = targetPosition[0] - currentPos.current[0]
    const dy = targetPosition[1] - currentPos.current[1]
    const dz = targetPosition[2] - currentPos.current[2]
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

    if (distance > 0.1) {
      currentPos.current[0] += (dx / distance) * speed
      currentPos.current[1] += (dy / distance) * speed
      currentPos.current[2] += (dz / distance) * speed
    }

    groupRef.current.position.set(...currentPos.current)

    // Rotate car to face direction
    if (distance > 0.1) {
      groupRef.current.lookAt(targetPosition[0], currentPos.current[1], targetPosition[2])
    }

    // Animate wheels rotation
    wheelsRef.current.forEach((wheel) => {
      wheel.rotation.x += speed * 0.5
    })

    // Parking animation - slight bounce when arriving
    if (isParking && distance < 0.2) {
      groupRef.current.position.y = currentPos.current[1] + Math.sin(Date.now() * 0.003) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Car structure created in useEffect */}
    </group>
  )
}



