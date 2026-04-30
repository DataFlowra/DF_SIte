"use client";

import Image from "next/image";
import React from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: "full" | "icon";
}

/**
 * Standard Logo Component for Dataflowra.
 * Supports 'full' rectangular brand and 'icon' only (favicon) variants.
 */
export default function Logo({ 
  className = "", 
  width, 
  height, 
  variant = "full" 
}: LogoProps) {
  // Default dimensions based on variant
  const finalWidth = width || (variant === "full" ? 140 : 32);
  const finalHeight = height || (variant === "full" ? 40 : 32);

  const lightSrc = variant === "full" ? "/images/Light theme_logo.webp" : "/images/Favicon.png";
  const darkSrc = variant === "full" ? "/images/Dark theme_logo.webp" : "/images/Favicon.png";

  return (
    <div className={`relative ${className}`} style={{ width: finalWidth, height: finalHeight }}>
      {/* Light Theme Logo */}
      <div className="dark:hidden block w-full h-full">
        <Image
          src={lightSrc}
          alt="Dataflowra"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
      
      {/* Dark Theme Logo */}
      <div className="dark:block hidden w-full h-full">
        <Image
          src={darkSrc}
          alt="Dataflowra"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
    </div>
  );
}
