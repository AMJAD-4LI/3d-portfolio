import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export const HeroModel3D = () => {
  const mountRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 300;
    const height = 260;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 7);

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

    // 3D Laptop Group
    const laptopGroup = new THREE.Group();

    // Base
    const baseGeo = new THREE.BoxGeometry(3.6, 0.2, 2.4);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      metalness: 0.8,
      roughness: 0.2
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    laptopGroup.add(baseMesh);

    // Screen Lid
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.1, -1.2);

    const screenGeo = new THREE.BoxGeometry(3.6, 2.2, 0.1);
    const screenMesh = new THREE.Mesh(screenGeo, baseMat);
    screenMesh.position.set(0, 1.1, 0);
    lidGroup.add(screenMesh);

    // Glowing Display Area
    const displayGeo = new THREE.PlaneGeometry(3.4, 2.0);
    const displayMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(theme.primary)
    });
    const displayMesh = new THREE.Mesh(displayGeo, displayMat);
    displayMesh.position.set(0, 1.1, 0.06);
    lidGroup.add(displayMesh);

    lidGroup.rotation.x = -Math.PI / 8;
    laptopGroup.add(lidGroup);

    // Floating Orbit Ring around laptop
    const ringGeo = new THREE.TorusGeometry(3.2, 0.04, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(theme.secondary),
      transparent: true,
      opacity: 0.7
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    laptopGroup.add(ringMesh);

    scene.add(laptopGroup);

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

      displayMat.color.set(new THREE.Color(theme.primary));
      ringMat.color.set(new THREE.Color(theme.secondary));
      pointLight.color.set(new THREE.Color(theme.primary));

      laptopGroup.rotation.y = elapsed * 0.4 + mouseX * 0.5;
      laptopGroup.rotation.x = Math.sin(elapsed * 0.5) * 0.1 + mouseY * 0.3;
      ringMesh.rotation.z = elapsed * 0.8;

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

  return <div ref={mountRef} style={{ width: '100%', height: '260px' }} />;
};
