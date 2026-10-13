"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeBusBackgroundProps {
  imageSrc?: string;
  isHeadlightsOn?: boolean;
}

export default function ThreeBusBackground({
  imageSrc = "/images/main_photo.jpeg",
  isHeadlightsOn = true,
}: ThreeBusBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const busMeshRef = useRef<THREE.Mesh | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);
  const spotLight1Ref = useRef<THREE.SpotLight | null>(null);
  const spotLight2Ref = useRef<THREE.SpotLight | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    // Position camera closer for LARGE view of the vehicle
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Clear previous elements
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 2. Load Bus Texture into 3D Mesh
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageSrc, (tex) => {
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
    });
    textureRef.current = texture;

    // Large 3D Plane Geometry covering the visual stage
    const geometry = new THREE.PlaneGeometry(8.6, 5.2, 32, 32);

    // Subtle 3D curvature
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const zCurve = -Math.pow(x / 5, 2) * 0.25;
      pos.setZ(i, zCurve);
    }
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.1,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });

    const busMesh = new THREE.Mesh(geometry, material);
    busMesh.position.set(0, 0, 0);
    busMeshRef.current = busMesh;
    scene.add(busMesh);

    // 3. Ultra Bright & Crisp Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainLight.position.set(2, 4, 5);
    scene.add(mainLight);

    const goldPointLight = new THREE.PointLight(0xd4af37, 3.5, 25);
    goldPointLight.position.set(4, 2, 4);
    scene.add(goldPointLight);

    // LED Headlight Spotlights
    const spotLight1 = new THREE.SpotLight(0xfff0a5, 6, 25, Math.PI / 4, 0.3, 1);
    spotLight1.position.set(-2.5, -1, 2);
    spotLight1.target = busMesh;
    spotLight1Ref.current = spotLight1;
    scene.add(spotLight1);

    const spotLight2 = new THREE.SpotLight(0x7dd3fc, 6, 25, Math.PI / 4, 0.3, 1);
    spotLight2.position.set(2.5, -1, 2);
    spotLight2.target = busMesh;
    spotLight2Ref.current = spotLight2;
    scene.add(spotLight2);

    // 4. Ambient Particle Field
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 12;
      particlePositions[p + 1] = (Math.random() - 0.5) * 7;
      particlePositions[p + 2] = (Math.random() - 0.5) * 5;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.06,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Interactive Mouse Motion
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 6. Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (busMesh) {
        // Smooth floating motion
        busMesh.position.y = Math.sin(elapsedTime * 1.2) * 0.06;
        
        // Interactive tilt
        busMesh.rotation.y = THREE.MathUtils.lerp(
          busMesh.rotation.y,
          mouseX * 0.15,
          0.05
        );
        busMesh.rotation.x = THREE.MathUtils.lerp(
          busMesh.rotation.x,
          mouseY * -0.08,
          0.05
        );
      }

      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [imageSrc]);

  // Update LED Headlights intensity
  useEffect(() => {
    if (spotLight1Ref.current && spotLight2Ref.current) {
      spotLight1Ref.current.intensity = isHeadlightsOn ? 6 : 0;
      spotLight2Ref.current.intensity = isHeadlightsOn ? 6 : 0;
    }
  }, [isHeadlightsOn]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden relative"
      style={{ minHeight: 0 }}
    />
  );
}
