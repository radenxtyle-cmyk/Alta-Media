import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

const GlowingObject = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Make it follow the mouse and spin continuously
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;

      // Smooth interpolation for mouse follow + constant rotation
      meshRef.current.rotation.y += 0.05 * (targetX - meshRef.current.rotation.y) + delta * 0.2;
      meshRef.current.rotation.x += 0.05 * (-targetY - meshRef.current.rotation.x) + delta * 0.2;
      
      if (edgesRef.current) {
        edgesRef.current.rotation.copy(meshRef.current.rotation);
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={[0, 0.5, 0]} scale={0.8}>
        {/* Icosahedron Geometry for a techy look */}
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#1e1b4b" // Deep purple core
          emissive="#3b0764"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Glowing Wireframe Edges */}
      <lineSegments ref={edgesRef} position={[0, 0.5, 0]} scale={0.8}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1.2, 0)]} />
        <lineBasicMaterial color="#a855f7" toneMapped={false} />
      </lineSegments>
    </Float>
  );
};

export const GhostCard3D = ({ title, subtitle, icon }: { title: string, subtitle: string, icon: React.ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-1 rounded-2xl transition-all duration-200 ease-out group overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 hover:border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] cursor-pointer h-full"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 bg-[#0d0914] rounded-xl m-[1px] z-0"></div>
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
          <GlowingObject />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Dark gradient overlay at the bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0914] via-[#0d0914]/60 to-transparent z-0 pointer-events-none rounded-xl m-[1px]"></div>

      <div className="relative z-10 p-5 h-full flex flex-col justify-start" style={{ transform: 'translateZ(30px)' }}>
         <div className="mb-4 w-10 h-10 rounded-lg flex items-center justify-center bg-[#0d0914]/80 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-500/30 backdrop-blur-md group-hover:scale-110 transition-transform shrink-0">
            {icon}
         </div>
         <div>
           <h4 className="font-display text-sm font-black tracking-wider uppercase mb-1.5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] line-clamp-2 min-h-[40px] flex items-start">{title}</h4>
           <p className="text-[11px] leading-relaxed text-purple-100 drop-shadow-[0_1px_2px_rgba(0,0,0,1)] font-medium line-clamp-3">{subtitle}</p>
         </div>
      </div>
    </div>
  );
};
