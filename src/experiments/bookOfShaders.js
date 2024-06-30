import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useCallback, useEffect } from "react";
import { Vector2, Color } from "three";

import vertexShader from "!!raw-loader!glslify-loader!@/experiments/shaders/bookOfShaders/bos.vert";
import fragmentShader from "!!raw-loader!glslify-loader!@/experiments/shaders/bookOfShaders/bos1.frag";



const PaintCanvas = () => {
  
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });
  const { size, viewport } = useThree();

  const updateMousePosition = useCallback((e) => {
    mousePosition.current = { x: e.pageX, y: e.pageY };
  }, []);

  //Uniforms to pass to the shaders
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_resolution: { value: new Vector2(size.width, size.height) },
      u_mouse: { value: new Vector2(0, 0) },
      u_bg: { value: new Color("#A1A3F7") },
      u_colorA: { value: new Color("#9FBAF9") },
      u_colorB: { value: new Color("#FEB3D9") },
    }),
    []
  );


  //Update mouse position
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);

  //Update resolution
  useEffect(() => {
    if (mesh.current) {
        mesh.current.material.uniforms.u_resolution.value.set(size.width, size.height);
    }
  }, [size]);

  //Update time & mouse
  useFrame((state) => {
    const { clock } = state;

    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    mesh.current.material.uniforms.u_mouse.value = new Vector2(
      mousePosition.current.x,
      mousePosition.current.y
    );
  });

  return (
    //viewport used in scale so that the canvas fills up the whole area available, and not just a square. 
    <mesh ref={mesh} position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};


export default function BookOfShaders() {
    return (

      //Canvas dimensions defined in page.js in div with w-[] and h-[], otherwise it fills the whole space available.
      <Canvas camera={{ position: [0.0, 0.0, 1.0] }} style={{ width: '100%', height: '100%' }}>
        <PaintCanvas />
      </Canvas>
    );
}