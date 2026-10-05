import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export const ThreeBackground = () => {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070d, 0.01);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const container = containerRef.current;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(new THREE.Color(theme.primary), 4, 150);
    mainLight.position.set(12, 12, 12);
    scene.add(mainLight);

    const accentLight = new THREE.PointLight(new THREE.Color(theme.secondary), 3, 120);
    accentLight.position.set(-12, -12, -8);
    scene.add(accentLight);

    // Dynamic Materials
    const primaryMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(theme.primary),
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true
    });

    const secondaryMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(theme.secondary),
      roughness: 0.1,
      metalness: 0.9,
      emissive: new THREE.Color(theme.primary),
      emissiveIntensity: 0.5
    });

    // 3. Particle System (1,800 Particles across sections)
    const particleCount = window.innerWidth < 768 ? 700 : 1800;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const baseColor = new THREE.Color(theme.primary);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 60;
      posArray[i + 1] = (Math.random() - 0.5) * 140;
      posArray[i + 2] = (Math.random() - 0.5) * 60;

      colorArray[i] = baseColor.r + (Math.random() - 0.5) * 0.25;
      colorArray[i + 1] = baseColor.g + (Math.random() - 0.5) * 0.25;
      colorArray[i + 2] = baseColor.b + (Math.random() - 0.5) * 0.25;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    pGrad.addColorStop(0, 'rgba(255,255,255,1)');
    pGrad.addColorStop(1, 'rgba(255,255,255,0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 16, 16);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particlesMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particlesMesh);

    // ==========================================
    // SECTION 0 (HERO, Y = 0): 3D Dual-Ring Core
    // ==========================================
    const heroGroup = new THREE.Group();
    heroGroup.position.set(0, 0, 0);

    const heroMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(4.2, 1), primaryMat);
    heroGroup.add(heroMesh);

    const heroInnerCore = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), secondaryMat);
    heroGroup.add(heroInnerCore);

    const heroRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(5.8, 0.06, 16, 100),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(theme.primary), transparent: true, opacity: 0.65 })
    );
    heroRing1.rotation.x = Math.PI / 3;
    heroGroup.add(heroRing1);

    const heroRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(7.0, 0.04, 16, 100),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(theme.secondary), transparent: true, opacity: 0.45 })
    );
    heroRing2.rotation.y = Math.PI / 4;
    heroGroup.add(heroRing2);
    scene.add(heroGroup);

    // ==========================================
    // SECTION 1 (ABOUT, Y = -14): Orbiting Tech Constellation
    // ==========================================
    const aboutGroup = new THREE.Group();
    aboutGroup.position.set(0, -14, -2);

    const techSphereGroup = new THREE.Group();
    for (let i = 0; i < 11; i++) {
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 16, 16),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(theme.primary),
          emissive: new THREE.Color(theme.secondary),
          emissiveIntensity: 0.5,
          roughness: 0.1
        })
      );
      const angle = (i / 11) * Math.PI * 2;
      orb.position.set(Math.cos(angle) * 7.5, Math.sin(angle) * 3.5, Math.sin(angle * 2) * 2.5);
      techSphereGroup.add(orb);
    }
    aboutGroup.add(techSphereGroup);
    scene.add(aboutGroup);

    // ==========================================
    // SECTION 2 (SKILLS, Y = -28): Cyber Polyhedron Matrix
    // ==========================================
    const skillsGroup = new THREE.Group();
    skillsGroup.position.set(0, -28, -2);

    const polyMesh = new THREE.Mesh(
      new THREE.DodecahedronGeometry(4.8, 0),
      primaryMat
    );
    skillsGroup.add(polyMesh);

    const skillCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(2.4, 0),
      secondaryMat
    );
    skillsGroup.add(skillCore);
    scene.add(skillsGroup);

    // ==========================================
    // SECTION 3 (PROJECTS, Y = -42): Device Frame & Particle Vortex
    // ==========================================
    const projectsGroup = new THREE.Group();
    projectsGroup.position.set(0, -42, -3);

    const devFrame = new THREE.Mesh(
      new THREE.BoxGeometry(9.5, 6, 0.3),
      primaryMat
    );
    projectsGroup.add(devFrame);

    const devRing = new THREE.Mesh(
      new THREE.TorusGeometry(6.5, 0.06, 16, 100),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(theme.secondary), transparent: true, opacity: 0.6 })
    );
    devRing.rotation.x = Math.PI / 2.5;
    projectsGroup.add(devRing);
    scene.add(projectsGroup);

    // ==========================================
    // SECTION 4 (SERVICES, Y = -56): Service Octahedron Crystals
    // ==========================================
    const servicesGroup = new THREE.Group();
    servicesGroup.position.set(0, -56, -2);

    const crystalGroup = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const c = new THREE.Mesh(
        new THREE.OctahedronGeometry(1.5, 0),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(theme.primary), metalness: 0.9, roughness: 0.1 })
      );
      const angle = (i / 6) * Math.PI * 2;
      c.position.set(Math.cos(angle) * 6.5, (Math.random() - 0.5) * 3, Math.sin(angle) * 3.5);
      crystalGroup.add(c);
    }
    servicesGroup.add(crystalGroup);
    scene.add(servicesGroup);

    // ==========================================
    // SECTION 5 (TIMELINE, Y = -70): DNA Helical Nodes
    // ==========================================
    const timelineGroup = new THREE.Group();
    timelineGroup.position.set(0, -70, -2);

    const dnaGroup = new THREE.Group();
    for (let i = -10; i <= 10; i++) {
      const t = i * 0.4;
      const b1 = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), secondaryMat);
      b1.position.set(Math.sin(t) * 3.2, t * 1.3, Math.cos(t) * 3.2);
      dnaGroup.add(b1);

      const b2 = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), primaryMat);
      b2.position.set(Math.sin(t + Math.PI) * 3.2, t * 1.3, Math.cos(t + Math.PI) * 3.2);
      dnaGroup.add(b2);
    }
    timelineGroup.add(dnaGroup);
    scene.add(timelineGroup);

    // ==========================================
    // SECTION 6 (CONTACT, Y = -84): Quantum Network Globe
    // ==========================================
    const contactGroup = new THREE.Group();
    contactGroup.position.set(0, -84, -2);

    const globeWire = new THREE.Mesh(
      new THREE.SphereGeometry(5.5, 24, 24),
      primaryMat
    );
    contactGroup.add(globeWire);

    const globeCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.6, 1),
      secondaryMat
    );
    contactGroup.add(globeCore);
    scene.add(contactGroup);

    // 4. Mouse Parallax & Scroll Interpolation
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // 5. Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const currentTheme = themeRef.current;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Color lerps
      const targetPrimary = new THREE.Color(currentTheme.primary);
      const targetSecondary = new THREE.Color(currentTheme.secondary);

      mainLight.color.lerp(targetPrimary, 0.05);
      accentLight.color.lerp(targetSecondary, 0.05);
      primaryMat.color.lerp(targetPrimary, 0.05);
      secondaryMat.emissive.lerp(targetPrimary, 0.05);

      // Section 3D Animations
      heroGroup.rotation.y = elapsedTime * 0.2 + mouseX * 0.4;
      heroGroup.rotation.x = elapsedTime * 0.15 + mouseY * 0.4;
      heroRing1.rotation.z = elapsedTime * 0.4;
      heroRing2.rotation.z = -elapsedTime * 0.3;

      aboutGroup.rotation.y = -elapsedTime * 0.25;
      techSphereGroup.rotation.z = elapsedTime * 0.3;

      skillsGroup.rotation.y = elapsedTime * 0.35;
      polyMesh.rotation.x = elapsedTime * 0.15;
      skillCore.rotation.z = -elapsedTime * 0.4;

      projectsGroup.rotation.y = Math.sin(elapsedTime * 0.5) * 0.3 + mouseX * 0.3;
      devRing.rotation.z = elapsedTime * 0.5;

      servicesGroup.rotation.y = elapsedTime * 0.2;
      crystalGroup.rotation.x = elapsedTime * 0.3;

      timelineGroup.rotation.y = elapsedTime * 0.3;
      dnaGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.2;

      contactGroup.rotation.y = elapsedTime * 0.25;
      globeWire.rotation.x = elapsedTime * 0.15;

      particlesMesh.rotation.y = elapsedTime * 0.02;

      // Scroll-linked Camera Zoom-In / Zoom-Out & Y Translation
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight || 1;
      const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // Target Y camera maps from 0 down to -84 across sections
      const targetCamY = -scrollProgress * 84;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;

      // Dynamic Camera Z Zoom-In & Zoom-Out Wave
      const zoomWave = Math.sin(scrollProgress * Math.PI * 6); // 3 Zoom cycles
      camera.position.z = 16 - zoomWave * 4;

      camera.rotation.y = mouseX * 0.08 + Math.sin(scrollProgress * Math.PI * 2) * 0.15;
      camera.rotation.x = -mouseY * 0.08;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};
