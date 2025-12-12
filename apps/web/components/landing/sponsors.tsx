"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function Sponsors() {
  return (
    <section className="py-20 px-4 md:px-8 bg-[#09090B] max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-center gap-20">
        <div className="flex items-center gap-4">
          <h4 className="text-[#9F9FA9] text-lg font-medium">Powered by:</h4>
          <div className="rounded-lg p-4 bg-card w-42 h-18 border border-border">
            <Image
              src="/images/eigencloud.png"
              alt="Eigen Cloud Logo"
              width={600}
              height={600}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <h4 className="text-[#9F9FA9] text-lg font-medium">Incubated by:</h4>
          <div className="rounded-lg p-4 bg-card w-42 h-18 border border-border">
            <Image
              src="/images/fracton.png"
              alt="Eigen Cloud Logo"
              width={600}
              height={600}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
