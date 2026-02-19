import React from "react";

function SlantedHeader() {
  return (
    <div className="relative bg-primary text-primary-foreground">
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
        }}
      />
      
      <div className="relative container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold">Slanted Header</h1>
        <p className="mt-4 text-lg opacity-80">
          Clean angled header using clip-path.
        </p>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div>
    <SlantedHeader />
    </div>
  )
}
