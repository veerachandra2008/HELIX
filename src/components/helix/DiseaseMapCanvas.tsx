'use client'

import { useEffect, useMemo } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import { Button } from '@/components/ui/button'
import { Navigation, ZoomIn, ZoomOut } from 'lucide-react'

type ActiveTab = 'diseases' | 'water' | 'camps' | 'facilities'

interface DiseaseReport {
  id: string
  diseaseType: string
  location: string
  cases: number
  severity: 'low' | 'medium' | 'high'
  lat: number
  lng: number
  date: string
}

interface WaterReport {
  id: string
  location: string
  quality: 'safe' | 'contaminated' | 'untreated'
  lat: number
  lng: number
  source: string
}

interface HealthCamp {
  id: string
  name: string
  location: string
  services: string[]
  lat: number
  lng: number
  status: 'upcoming' | 'ongoing' | 'completed'
  date: string
}

interface HealthFacility {
  id: string
  name: string
  type: string
  lat: number
  lng: number
  emergency: boolean
}

interface DiseaseMapCanvasProps {
  activeTab: ActiveTab
  featuredMarker: [number, number]
  filteredDiseases: DiseaseReport[]
  waterReports: WaterReport[]
  healthCamps: HealthCamp[]
  healthFacilities: HealthFacility[]
  getSeverityColor: (severity: string) => string
  getWaterColor: (quality: string) => string
}

const defaultMarkerIcon = L.divIcon({
  className: 'helix-map-marker',
  html: `
    <div style="position: relative; width: 26px; height: 38px;">
      <div style="position: absolute; inset: 0; background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%); border: 2px solid #ffffff; border-radius: 13px 13px 13px 2px; transform: rotate(-45deg); box-shadow: 0 10px 24px rgba(37, 99, 235, 0.35);"></div>
      <div style="position: absolute; top: 7px; left: 7px; width: 10px; height: 10px; background: #ffffff; border-radius: 999px;"></div>
    </div>
  `,
  iconSize: [26, 38],
  iconAnchor: [13, 38],
  popupAnchor: [0, -34],
})

function MapResizeController({ activeTab }: { activeTab: ActiveTab }) {
  const map = useMap()

  useEffect(() => {
    const refreshMapSize = () => {
      window.requestAnimationFrame(() => {
        map.invalidateSize()
      })
    }

    refreshMapSize()
    window.addEventListener('resize', refreshMapSize)

    return () => {
      window.removeEventListener('resize', refreshMapSize)
    }
  }, [map, activeTab])

  return null
}

function MapViewportController({
  activeTab,
  featuredMarker,
  filteredDiseases,
  waterReports,
  healthCamps,
  healthFacilities,
}: Omit<DiseaseMapCanvasProps, 'getSeverityColor' | 'getWaterColor'>) {
  const map = useMap()

  const activePoints = useMemo(() => {
    switch (activeTab) {
      case 'diseases':
        return filteredDiseases.map((item) => [item.lat, item.lng] as [number, number])
      case 'water':
        return waterReports.map((item) => [item.lat, item.lng] as [number, number])
      case 'camps':
        return healthCamps.map((item) => [item.lat, item.lng] as [number, number])
      case 'facilities':
        return healthFacilities.map((item) => [item.lat, item.lng] as [number, number])
      default:
        return [featuredMarker]
    }
  }, [activeTab, featuredMarker, filteredDiseases, waterReports, healthCamps, healthFacilities])

  useEffect(() => {
    if (!activePoints.length) {
      map.setView(featuredMarker, 13)
      return
    }

    if (activePoints.length === 1) {
      map.setView(activePoints[0], 13)
      return
    }

    map.fitBounds(activePoints, { padding: [40, 40] })
  }, [map, activePoints, featuredMarker])

  return null
}

function LeafletControls({ featuredMarker }: { featuredMarker: [number, number] }) {
  const map = useMap()

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <Button variant="secondary" size="icon" className="h-9 w-9 shadow-md" onClick={() => map.zoomIn()}>
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button variant="secondary" size="icon" className="h-9 w-9 shadow-md" onClick={() => map.zoomOut()}>
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="h-9 w-9 shadow-md"
        onClick={() => map.flyTo(featuredMarker, 13, { duration: 1.2 })}
      >
        <Navigation className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default function DiseaseMapCanvas(props: DiseaseMapCanvasProps) {
  const {
    activeTab,
    featuredMarker,
    filteredDiseases,
    waterReports,
    healthCamps,
    healthFacilities,
    getSeverityColor,
    getWaterColor,
  } = props

  return (
    <MapContainer
      center={featuredMarker}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={featuredMarker} icon={defaultMarkerIcon}>
        <Popup>
          <div className="p-2">
            <h3 className="font-bold">Leaflet Demo Marker</h3>
            <p className="text-sm">A pretty CSS popup.</p>
            <p className="text-sm">Easily customizable.</p>
          </div>
        </Popup>
      </Marker>

      {activeTab === 'diseases' && filteredDiseases.map((report) => (
        <Circle
          key={report.id}
          center={[report.lat, report.lng]}
          radius={report.cases * 55}
          pathOptions={{
            color: getSeverityColor(report.severity),
            fillColor: getSeverityColor(report.severity),
            fillOpacity: 0.3,
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{report.diseaseType}</h3>
              <p className="text-sm">{report.location}</p>
              <p className="text-sm">Cases: {report.cases}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Reported on {new Date(report.date).toLocaleDateString()}
              </p>
            </div>
          </Popup>
        </Circle>
      ))}

      {activeTab === 'water' && waterReports.map((report) => (
        <Marker key={report.id} position={[report.lat, report.lng]} icon={defaultMarkerIcon}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">Water Quality</h3>
              <p className="text-sm">{report.location}</p>
              <p className="text-sm">Source: {report.source}</p>
              <p className="text-sm mt-1" style={{ color: getWaterColor(report.quality) }}>
                {report.quality}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {activeTab === 'camps' && healthCamps.map((camp) => (
        <Marker key={camp.id} position={[camp.lat, camp.lng]} icon={defaultMarkerIcon}>
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold">{camp.name}</h3>
              <p className="text-sm">{camp.location}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(camp.date).toLocaleDateString()}
              </p>
              <div className="mt-2 space-y-1">
                {camp.services.map((service) => (
                  <p key={service} className="text-xs">• {service}</p>
                ))}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {activeTab === 'facilities' && healthFacilities.map((facility) => (
        <Marker key={facility.id} position={[facility.lat, facility.lng]} icon={defaultMarkerIcon}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{facility.name}</h3>
              <p className="text-sm capitalize">{facility.type}</p>
              {facility.emergency ? <p className="text-xs text-red-500 mt-1">24/7 Emergency</p> : null}
            </div>
          </Popup>
        </Marker>
      ))}

      <MapViewportController
        activeTab={activeTab}
        featuredMarker={featuredMarker}
        filteredDiseases={filteredDiseases}
        waterReports={waterReports}
        healthCamps={healthCamps}
        healthFacilities={healthFacilities}
      />
      <MapResizeController activeTab={activeTab} />
      <LeafletControls featuredMarker={featuredMarker} />
    </MapContainer>
  )
}
