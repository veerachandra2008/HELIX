'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    THREE?: unknown
    VANTA?: {
      CLOUDS2?: (options: Record<string, unknown>) => { destroy?: () => void }
    }
  }
}

export default function VantaCloudsBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const effectRef = useRef<{ destroy?: () => void } | null>(null)
  const [scriptsReady, setScriptsReady] = useState(false)

  useEffect(() => {
    if (!scriptsReady || !containerRef.current || !window.VANTA?.CLOUDS2) {
      return
    }

    effectRef.current?.destroy?.()
    effectRef.current = window.VANTA.CLOUDS2({
      el: containerRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      backgroundAlpha: 0,
      skyColor: 0xe0f2fe,
      cloudColor: 0xa5b4fc,
      cloudShadowColor: 0x1e1b4b,
      sunColor: 0xf8fafc,
      sunGlareColor: 0xffffff,
      sunlightColor: 0x60a5fa,
      speed: 0.9,
    })

    return () => {
      effectRef.current?.destroy?.()
      effectRef.current = null
    }
  }, [scriptsReady])

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds2.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsReady(true)}
      />
      <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />
    </>
  )
}
