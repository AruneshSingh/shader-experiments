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
    <main className="flex h-screen flex-col items-center justify-between bg-white">
      <div className="w-[800px] h-[800px] m-24 rounded-lg overflow-hidden">
        {/* <FiberDemo/> */}
        {/* <Basics/> */}
        {/* <ShaderPaint /> */}
        <BookOfShaders />
      </div>
    </main>
  );
}
