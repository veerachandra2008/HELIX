'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Users,
  Hospital,
  AlertTriangle,
  Activity,
  TrendingUp,
  TrendingDown,
  Shield,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Filter,
  Download,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface StatCard {
  title: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: any
  color: string
}

interface EmergencyAlert {
  id: string
  type: string
  location: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  time: string
  status: 'active' | 'responding' | 'resolved'
}

interface HospitalCapacity {
  id: string
  name: string
  totalBeds: number
  occupiedBeds: number
  icuBeds: number
  occupiedIcu: number
  emergencyWard: 'available' | 'limited' | 'full'
}

export default function AdminDashboard({ onBack }: { onBack: () => void }) {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')

  const stats: StatCard[] = [
    {
      title: 'Total Population',
      value: '1,247,832',
      change: 2.3,
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Cases',
      value: '2,847',
      change: -12.5,
      trend: 'down',
      icon: Activity,
      color: 'text-orange-600'
    },
    {
      title: 'Health Facilities',
      value: '156',
      change: 3,
      trend: 'up',
      icon: Hospital,
      color: 'text-green-600'
    },
    {
      title: 'Emergency Alerts',
      value: '23',
      change: 8.7,
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ]

  const emergencyAlerts: EmergencyAlert[] = [
    {
      id: '1',
      type: 'Disease Outbreak',
      location: 'Secunderabad Zone A',
      severity: 'critical',
      time: '2 hours ago',
      status: 'responding'
    },
    {
      id: '2',
      type: 'Water Contamination',
      location: 'Kukatpally Sector 4',
      severity: 'high',
      time: '4 hours ago',
      status: 'active'
    },
    {
      id: '3',
      type: 'Maternal Emergency',
      location: 'Madhapur Community Health Center',
      severity: 'critical',
      time: '30 mins ago',
      status: 'resolved'
    },
    {
      id: '4',
      type: 'Food Poisoning Cluster',
      location: 'Gachibowli IT Park',
      severity: 'medium',
      time: '6 hours ago',
      status: 'active'
    }
  ]

  const hospitalCapacities: HospitalCapacity[] = [
    {
      id: '1',
      name: 'City General Hospital',
      totalBeds: 500,
      occupiedBeds: 412,
      icuBeds: 50,
      occupiedIcu: 45,
      emergencyWard: 'limited'
    },
    {
      id: '2',
      name: 'Apollo Hospitals',
      totalBeds: 350,
      occupiedBeds: 280,
      icuBeds: 40,
      occupiedIcu: 32,
      emergencyWard: 'available'
    },
    {
      id: '3',
      name: 'Care Hospital',
      totalBeds: 400,
      occupiedBeds: 375,
      icuBeds: 45,
      occupiedIcu: 43,
      emergencyWard: 'full'
    },
    {
      id: '4',
      name: 'Yashoda Hospital',
      totalBeds: 450,
      occupiedBeds: 320,
      icuBeds: 55,
      occupiedIcu: 38,
      emergencyWard: 'available'
    }
  ]

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-500">Critical</Badge>
      case 'high':
        return <Badge className="bg-orange-500">High</Badge>
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>
      default:
        return <Badge className="bg-blue-500">Low</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="destructive">Active</Badge>
      case 'responding':
        return <Badge className="bg-orange-500">Responding</Badge>
      default:
        return <Badge className="bg-green-500">Resolved</Badge>
    }
  }

  const getEmergencyStatus = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available'
      case 'limited':
        return 'Limited'
      default:
        return 'Full'
    }
  }

  const getEmergencyColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500'
      case 'limited':
        return 'bg-orange-500'
      default:
        return 'bg-red-500'
    }
  }

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
            <h2 className="text-3xl font-bold text-gradient-helix">Admin Health Intelligence</h2>
            <p className="text-muted-foreground">Population health monitoring and management</p>
          </div>
        </motion.div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            {selectedPeriod === '7d' ? 'Last 7 Days' : selectedPeriod === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="neumorphic-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="font-semibold">{Math.abs(stat.change)}%</span>
                  </div>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emergency Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <Card className="neumorphic-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Active Emergency Alerts
                  </CardTitle>
                  <CardDescription>Real-time emergency monitoring</CardDescription>
                </div>
                <Badge variant="destructive">{emergencyAlerts.filter(a => a.status === 'active').length} Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {emergencyAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 border border-border rounded-xl hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{alert.type}</h4>
                          {getSeverityBadge(alert.severity)}
                          {getStatusBadge(alert.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {alert.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {alert.time}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <Card className="neumorphic-card">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Shield className="h-4 w-4" />
                Initiate Health Camp
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <MapPin className="h-4 w-4" />
                Report Disease Outbreak
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Hospital className="h-4 w-4" />
                Check Hospital Capacity
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="h-4 w-4" />
                Manage Healthcare Workers
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Activity className="h-4 w-4" />
                Generate Health Report
              </Button>
            </CardContent>
          </Card>

          <Card className="neumorphic-card">
            <CardHeader>
              <CardTitle className="text-base">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Data Sync</span>
                <Badge className="bg-green-500">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Services</span>
                <Badge className="bg-green-500">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Alert System</span>
                <Badge className="bg-green-500">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge className="bg-green-500">Healthy</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Hospital Capacities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="neumorphic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hospital className="h-5 w-5 text-blue-500" />
              Hospital Capacity Overview
            </CardTitle>
            <CardDescription>Real-time bed occupancy and emergency ward status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hospitalCapacities.map((hospital) => (
                <div key={hospital.id} className="p-4 border border-border rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{hospital.name}</h4>
                    <Badge className={getEmergencyColor(hospital.emergencyWard)}>
                      {getEmergencyStatus(hospital.emergencyWard)}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>General Ward</span>
                        <span className="font-medium">{hospital.occupiedBeds}/{hospital.totalBeds}</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            (hospital.occupiedBeds / hospital.totalBeds) > 0.9 ? 'bg-red-500' :
                            (hospital.occupiedBeds / hospital.totalBeds) > 0.7 ? 'bg-orange-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${(hospital.occupiedBeds / hospital.totalBeds) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>ICU Beds</span>
                        <span className="font-medium">{hospital.occupiedIcu}/{hospital.icuBeds}</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            (hospital.occupiedIcu / hospital.icuBeds) > 0.9 ? 'bg-red-500' :
                            (hospital.occupiedIcu / hospital.icuBeds) > 0.7 ? 'bg-orange-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${(hospital.occupiedIcu / hospital.icuBeds) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Health Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="neumorphic-card">
          <CardHeader>
            <CardTitle>Health Trends Overview</CardTitle>
            <CardDescription>Key health metrics and trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="diseases" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="diseases">Disease Trends</TabsTrigger>
                <TabsTrigger value="maternal">Maternal Health</TabsTrigger>
                <TabsTrigger value="vaccination">Vaccination</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              </TabsList>

              <TabsContent value="diseases" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-border rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Dengue Cases</span>
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-xs text-green-600">-18% from last month</p>
                  </div>
                  <div className="p-4 border border-border rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Malaria Cases</span>
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    </div>
                    <p className="text-2xl font-bold">892</p>
                    <p className="text-xs text-red-600">+5% from last month</p>
                  </div>
                  <div className="p-4 border border-border rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Typhoid Cases</span>
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold">456</p>
                    <p className="text-xs text-green-600">-12% from last month</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="maternal" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border border-border rounded-xl text-center">
                    <p className="text-3xl font-bold text-pink-600">2,847</p>
                    <p className="text-sm text-muted-foreground">Active Pregnancies</p>
                  </div>
                  <div className="p-4 border border-border rounded-xl text-center">
                    <p className="text-3xl font-bold text-green-600">98.2%</p>
                    <p className="text-sm text-muted-foreground">Antenatal Care Coverage</p>
                  </div>
                  <div className="p-4 border border-border rounded-xl text-center">
                    <p className="text-3xl font-bold text-blue-600">156</p>
                    <p className="text-sm text-muted-foreground">Safe Deliveries (Month)</p>
                  </div>
                  <div className="p-4 border border-border rounded-xl text-center">
                    <p className="text-3xl font-bold text-orange-600">12</p>
                    <p className="text-sm text-muted-foreground">High-Risk Cases</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="vaccination" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-border rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">COVID-19 Vaccination</p>
                    <p className="text-2xl font-bold">87.3%</p>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-2">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '87.3%' }} />
                    </div>
                  </div>
                  <div className="p-4 border border-border rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">Routine Immunization</p>
                    <p className="text-2xl font-bold">92.1%</p>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-2">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '92.1%' }} />
                    </div>
                  </div>
                  <div className="p-4 border border-border rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">Maternal Vaccination</p>
                    <p className="text-2xl font-bold">95.8%</p>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-2">
                      <div className="h-full bg-pink-500 rounded-full" style={{ width: '95.8%' }} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="nutrition" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border border-border rounded-xl text-center">
                    <p className="text-3xl font-bold text-green-600">76%</p>
                    <p className="text-sm text-muted-foreground">Adequate Nutrition</p>
                  </div>
                  <div className="p-4 border border-border rounded-xl text-center">
                    <p className="text-3xl font-bold text-yellow-600">18%</p>
                    <p className="text-sm text-muted-foreground">Mild Malnutrition</p>
                  </div>
                  <div className="p-4 border border-border rounded-xl text-center">
                    <p className="text-3xl font-bold text-orange-600">5%</p>
                    <p className="text-sm text-muted-foreground">Moderate Malnutrition</p>
                  </div>
                  <div className="p-4 border border-border rounded-xl text-center">
                    <p className="text-3xl font-bold text-red-600">1%</p>
                    <p className="text-sm text-muted-foreground">Severe Malnutrition</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
