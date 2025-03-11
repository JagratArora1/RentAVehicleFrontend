import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function HackerRoom(props) {
  const { nodes, materials } = useGLTF('/models/car.glb')
  const group = useRef()

  // Rotate the model continuously
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01 // Adjust the speed as needed
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.defaultMaterial.geometry}
          material={materials.BASE}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/car.glb')