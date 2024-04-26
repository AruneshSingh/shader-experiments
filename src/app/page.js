"use client"

import Image from "next/image";
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'



// Experiment Files
import FiberDemo from "@/experiments/fiber-demo";
import Basics from "@/experiments/maxime-basics";
import ShaderPaint from "@/experiments/shader-paint";
import BookOfShaders from "@/experiments/bookOfShaders";


 
export default function Home() {
  return (
    <main className="flex h-[1000px] flex-col items-center justify-between p-24 bg-white">
      {/* <FiberDemo/> */}
      {/* <Basics/> */}
      {/* <ShaderPaint /> */}
      <BookOfShaders />
    </main>
  );
}
