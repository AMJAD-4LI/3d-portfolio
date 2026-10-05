import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export const ContactGlobe3D = () => {
  const mountRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 320;
    const height = 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(new THREE.Color(theme.primary), 3, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Globe Group
    const globeGroup = new THREE.Group();

    // Outer Wireframe Sphere
    const globeGeo = new THREE.SphereGeometry(2.5, 24, 24);
    const globeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(theme.primary),
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // Inner Glowing Core
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(theme.secondary),
      emissive: new THREE.Color(theme.primary),
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // 4 Orbiting Satellites
    const satGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const sat = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.3, 0),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(theme.accent), metalness: 0.9 })
      );
      const angle = (i / 4) * Math.PI * 2;
      sat.position.set(Math.cos(angle) * 3.8, Math.sin(angle) * 1.5, Math.sin(angle) * 3.8);
      satGroup.add(sat);
    }
    globeGroup.add(satGroup);

    scene.add(globeGroup);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove);

    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      globeMat.color.set(new THREE.Color(theme.primary));
      coreMat.emissive.set(new THREE.Color(theme.primary));
      pointLight.color.set(new THREE.Color(theme.primary));

      globeGroup.rotation.y = elapsed * 0.3 + mouseX * 0.4;
      globeGroup.rotation.x = Math.sin(elapsed * 0.4) * 0.1 + mouseY * 0.3;
      satGroup.rotation.z = elapsed * 0.6;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme]);

  return <div ref={mountRef} style={{ width: '100%', height: '280px' }} />;
};
