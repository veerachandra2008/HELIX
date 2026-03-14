'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  MapPin,
  AlertTriangle,
  Droplets,
  Hospital,
  Activity,
  Filter,
  Layers,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const DiseaseMapCanvas = dynamic(
  () => import('@/components/helix/DiseaseMapCanvas'),
  { ssr: false }
)

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

export default function DiseaseMap({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'diseases' | 'water' | 'camps' | 'facilities'>('diseases')
  const [selectedDisease, setSelectedDisease] = useState<string>('all')
  const featuredMarker: [number, number] = [51.5, -0.09]

  // Sample data - in production, this would come from API
  const diseaseReports: DiseaseReport[] = [
    { id: '1', diseaseType: 'Dengue', location: 'Secunderabad', cases: 15, severity: 'high', lat: 17.4399, lng: 78.4982, date: '2024-07-15' },
    { id: '2', diseaseType: 'Malaria', location: 'Kukatpally', cases: 8, severity: 'medium', lat: 17.4916, lng: 78.3965, date: '2024-07-14' },
    { id: '3', diseaseType: 'Dengue', location: 'Madhapur', cases: 5, severity: 'low', lat: 17.4487, lng: 78.3899, date: '2024-07-13' },
    { id: '4', diseaseType: 'Typhoid', location: 'Gachibowli', cases: 3, severity: 'low', lat: 17.4326, lng: 78.4071, date: '2024-07-12' },
    { id: '5', diseaseType: 'Dengue', location: 'Lingampally', cases: 12, severity: 'high', lat: 17.5063, lng: 78.3229, date: '2024-07-16' },
  ]

  const waterReports: WaterReport[] = [
    { id: '1', location: 'Secunderabad', quality: 'contaminated', lat: 17.4399, lng: 78.4982, source: 'Municipal Tap' },
    { id: '2', location: 'Kukatpally', quality: 'safe', lat: 17.4916, lng: 78.3965, source: 'Filtered Water' },
    { id: '3', location: 'Madhapur', quality: 'safe', lat: 17.4487, lng: 78.3899, source: 'RO Purified' },
    { id: '4', location: 'Gachibowli', quality: 'untreated', lat: 17.4326, lng: 78.4071, source: 'Well Water' },
    { id: '5', location: 'Banjara Hills', quality: 'safe', lat: 17.4265, lng: 78.4475, source: 'Municipal Tap' },
  ]

  const healthCamps: HealthCamp[] = [
    { id: '1', name: 'Free Health Camp', location: 'Community Hall, Secunderabad', services: ['General Checkup', 'Blood Tests', 'Vaccination'], lat: 17.4399, lng: 78.4982, status: 'ongoing', date: '2024-07-15' },
    { id: '2', name: 'Maternal Health Camp', location: 'PHC, Kukatpally', services: ['Antenatal Care', 'Postnatal Care', 'Nutrition Guidance'], lat: 17.4916, lng: 78.3965, status: 'upcoming', date: '2024-07-20' },
    { id: '3', name: 'Dengue Prevention Camp', location: 'Govt School, Madhapur', services: ['Dengue Testing', 'Prevention Advice', 'Free Medicines'], lat: 17.4487, lng: 78.3899, status: 'completed', date: '2024-07-10' },
  ]

  const healthFacilities = [
    { id: '1', name: 'City General Hospital', type: 'hospital', lat: 17.4326, lng: 78.4475, emergency: true },
    { id: '2', name: 'Apollo Clinics', type: 'clinic', lat: 17.4487, lng: 78.3899, emergency: false },
    { id: '3', name: 'Care Hospital', type: 'hospital', lat: 17.4399, lng: 78.4982, emergency: true },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      default: return '#22c55e'
    }
  }

  const getWaterColor = (quality: string) => {
    switch (quality) {
      case 'contaminated': return '#ef4444'
      case 'untreated': return '#f59e0b'
      default: return '#22c55e'
    }
  }

  const filteredDiseases = selectedDisease === 'all'
    ? diseaseReports
    : diseaseReports.filter(d => d.diseaseType === selectedDisease)

  const uniqueDiseases = Array.from(new Set(diseaseReports.map(d => d.diseaseType)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-gradient-helix">Community Disease Intelligence</h2>
            <p className="text-muted-foreground">Geospatial health monitoring and insights</p>
          </div>
        </motion.div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Layers className="h-4 w-4" />
            Layers
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <Card className="neumorphic-card overflow-hidden">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="w-full">
                <div className="border-b px-4 pt-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="diseases">Diseases</TabsTrigger>
                    <TabsTrigger value="water">Water Safety</TabsTrigger>
                    <TabsTrigger value="camps">Health Camps</TabsTrigger>
                    <TabsTrigger value="facilities">Facilities</TabsTrigger>
                  </TabsList>
                </div>

                <div className="relative h-[500px] bg-slate-100 dark:bg-slate-800">
                  <DiseaseMapCanvas
                    activeTab={activeTab}
                    featuredMarker={featuredMarker}
                    filteredDiseases={filteredDiseases}
                    waterReports={waterReports}
                    healthCamps={healthCamps}
                    healthFacilities={healthFacilities}
                    getSeverityColor={getSeverityColor}
                    getWaterColor={getWaterColor}
                  />
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Stats Cards */}
          <Card className="neumorphic-card">
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Active Cases</span>
                </div>
                <span className="font-bold text-red-600 dark:text-red-400">
                  {diseaseReports.reduce((sum, d) => sum + d.cases, 0)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Safe Water Zones</span>
                </div>
                <span className="font-bold text-green-600 dark:text-green-400">
                  {waterReports.filter(w => w.quality === 'safe').length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Hospital className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Active Camps</span>
                </div>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {healthCamps.filter(c => c.status === 'ongoing' || c.status === 'upcoming').length}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Disease Filter */}
          {activeTab === 'diseases' && (
            <Card className="neumorphic-card">
              <CardHeader>
                <CardTitle className="text-base">Filter by Disease</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedDisease === 'all' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedDisease('all')}
                >
                  All Diseases
                </Button>
                {uniqueDiseases.map((disease) => (
                  <Button
                    key={disease}
                    variant={selectedDisease === disease ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedDisease(disease)}
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    {disease}
                    <Badge variant="secondary" className="ml-auto">
                      {diseaseReports.filter(d => d.diseaseType === disease).reduce((sum, d) => sum + d.cases, 0)}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Recent Reports */}
          <Card className="neumorphic-card">
            <CardHeader>
              <CardTitle className="text-base">Recent Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
              {diseaseReports.slice(0, 5).map((report) => (
                <div
                  key={report.id}
                  className="p-3 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{report.diseaseType}</span>
                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{ borderColor: getSeverityColor(report.severity) }}
                    >
                      {report.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{report.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {report.cases} cases • {new Date(report.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Report Button */}
          <Button className="w-full gap-2" size="lg">
            <MapPin className="h-5 w-5" />
            Report Health Issue
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
