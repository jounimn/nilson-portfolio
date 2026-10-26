const stage = document.querySelector(".lineage-stage");
const canvas = document.querySelector("#wireframe");
const fallback = document.querySelector("#wire-fallback");

if (stage && canvas && fallback) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const exportMode = new URLSearchParams(location.search).has("export") || window.__DF_EXPORT__ === true;
  let renderer;
  let scene;
  let camera;
  let objects = [];
  let animationFrame = 0;
  let inView = false;
  let failed = false;

  const showFallback = () => {
    failed = true;
    cancelAnimationFrame(animationFrame);
    canvas.hidden = true;
    fallback.hidden = false;
    renderer?.dispose();
  };

  try {
    if (typeof WebGLRenderingContext === "undefined") throw new Error("WebGL unavailable");
    const rendererModule = import("../assets/vendor/three.module.min.js");
    rendererModule.then((THREE) => {
      if (failed) return;
      try {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
        camera.position.set(0, 0, 6.6);
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0x000000, 0);

        const cyan = new THREE.LineBasicMaterial({ color: 0x91dcff, transparent: true, opacity: 0.82 });
        const blue = new THREE.LineBasicMaterial({ color: 0x58a6ff, transparent: true, opacity: 0.48 });
        const ico = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.65, 1)), cyan);
        const cube = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(2.35, 2.35, 2.35)), blue);
        ico.rotation.set(0.24, 0.15, 0.08);
        cube.rotation.set(0.28, 0.32, 0.1);
        scene.add(ico, cube);
        objects = [ico, cube];

        const resize = () => {
          const rect = stage.getBoundingClientRect();
          if (!rect.width || !rect.height || !renderer) return;
          renderer.setSize(rect.width, rect.height, false);
          camera.aspect = rect.width / rect.height;
          camera.updateProjectionMatrix();
          draw(0);
        };
        const draw = (time) => {
          if (!renderer || failed) return;
          if (!reducedMotion.matches && !exportMode) {
            objects[0].rotation.y = time * 0.00014 + 0.15;
            objects[0].rotation.x = Math.sin(time * 0.00012) * 0.12 + 0.24;
            objects[1].rotation.y = -time * 0.00009 + 0.32;
          }
          renderer.render(scene, camera);
        };
        const animate = (time) => {
          if (failed || !inView || document.hidden || reducedMotion.matches || exportMode) return;
          draw(time);
          animationFrame = requestAnimationFrame(animate);
        };
        const updateMotion = () => {
          cancelAnimationFrame(animationFrame);
          if (!failed && inView && !document.hidden && !reducedMotion.matches && !exportMode) {
            animationFrame = requestAnimationFrame(animate);
          } else {
            draw(0);
          }
        };

        canvas.addEventListener("webglcontextlost", (event) => { event.preventDefault(); showFallback(); }, { once: true });
        new ResizeObserver(resize).observe(stage);
        new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; updateMotion(); }, { threshold: 0.05 }).observe(stage);
        document.addEventListener("visibilitychange", updateMotion);
        reducedMotion.addEventListener("change", updateMotion);
        canvas.hidden = false;
        fallback.hidden = true;
        resize();
        updateMotion();
      } catch (error) {
        showFallback();
      }
    }).catch(showFallback);
  } catch (error) {
    showFallback();
  }
}
