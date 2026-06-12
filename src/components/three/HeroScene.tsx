"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

const NODE_COUNT = 12;

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xa78bfa, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x6c63ff, 0.5, 100);
    pointLight2.position.set(-10, -10, -5);
    scene.add(pointLight2);

    // Group for rotation
    const group = new THREE.Group();
    scene.add(group);

    // Geometries
    const geometries = [
      new THREE.BoxGeometry(0.3, 0.3, 0.3),
      new THREE.SphereGeometry(0.2, 16, 16),
      new THREE.OctahedronGeometry(0.25),
    ];

    const material = new THREE.MeshStandardMaterial({
      color: 0x6c63ff,
      emissive: 0x6c63ff,
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9,
    });

    // Create nodes
    const nodes: {
      mesh: THREE.Mesh;
      originalPos: THREE.Vector3;
      offset: number;
    }[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const geometry = geometries[i % 3];
      const mesh = new THREE.Mesh(geometry, material.clone());
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3
      );
      mesh.position.copy(pos);
      group.add(mesh);
      nodes.push({ mesh, originalPos: pos.clone(), offset: Math.random() * 10 });
    }

    // Create connections
    const lines: { line: THREE.Line; material: THREE.LineBasicMaterial }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].originalPos.distanceTo(nodes[j].originalPos);
        if (dist < 2.5) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            nodes[i].originalPos,
            nodes[j].originalPos,
          ]);
          const mat = new THREE.LineBasicMaterial({
            color: 0x6c63ff,
            transparent: true,
            opacity: 0.15,
          });
          const line = new THREE.Line(geo, mat);
          group.add(line);
          lines.push({ line, material: mat });
        }
      }
    }

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      // Animate nodes
      for (const node of nodes) {
        node.mesh.position.x =
          node.originalPos.x + Math.sin(time * 0.3 + node.offset) * 0.5;
        node.mesh.position.y =
          node.originalPos.y + Math.cos(time * 0.2 + node.offset) * 0.3;
        node.mesh.rotation.x = time * 0.1;
        node.mesh.rotation.y = time * 0.15;
      }

      // Animate connections
      for (const { material: mat } of lines) {
        mat.opacity = 0.15 + Math.sin(time * 0.5) * 0.05;
      }

      // Group rotation with mouse parallax
      group.rotation.y += 0.001;
      group.rotation.x = mouse.y * 0.05;
      group.rotation.z = mouse.x * 0.03;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}
