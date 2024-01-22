"use client"

import Image from "next/image";
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'



// Experiment Files
import FiberDemo from "@/experiments/fiber-demo";
import Basics from "@/experiments/maxime-basics";


 
export default function Home() {
  return (
    <main className="flex h-[1000px] flex-col items-center justify-between p-24">
      {/* <FiberDemo/> */}
      <Basics/>
    </main>
  );
}
