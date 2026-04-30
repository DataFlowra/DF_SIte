"use client";

import Image from "next/image";
import React from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Standard Logo Component for Dataflowra.
 * The logos are rectangular and include the brand text.
 */
export default function Logo({ className = "", width = 140, height = 40 }: LogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Light Theme Logo (visible when system is in light mode) */}
      <div className="dark:hidden block w-full h-full">
        <Image
          src="/images/Light theme_logo.webp"
          alt="Dataflowra"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
      
      {/* Dark Theme Logo (visible when system is in dark mode) */}
      <div className="dark:block hidden w-full h-full">
        <Image
          src="/images/Dark theme_logo.webp"
          alt="Dataflowra"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
    </div>
  );
}
