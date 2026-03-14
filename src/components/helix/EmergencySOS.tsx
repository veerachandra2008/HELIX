'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone,
  MapPin,
  AlertTriangle,
  Share2,
  Clock,
  Navigation,
  X,
  CheckCircle,
  Ambulance,
  Flame,
  Shield,
  Zap,
  Radio,
  Send,
  Copy,
  Eye,
  EyeOff,
  MessageSquare,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'

type EmergencyType = 'medical' | 'fire' | 'police' | 'other'

const emergencyTypes: { type: EmergencyType; label: string; icon: any; color: string; number: string }[] = [
  { type: 'medical', label: 'Medical Emergency', icon: Ambulance, color: 'from-red-500 to-rose-600', number: '108' },
  { type: 'fire', label: 'Fire Emergency', icon: Flame, color: 'from-orange-500 to-red-600', number: '101' },
  { type: 'police', label: 'Police Emergency', icon: Shield, color: 'from-blue-500 to-indigo-600', number: '100' },
  { type: 'other', label: 'Other Emergency', icon: AlertTriangle, color: 'from-purple-500 to-pink-600', number: '112' }
]

const emergencyContacts = [
  { name: 'Dr. Priya Sharma', role: 'Emergency Physician', phone: '+91 98765 43210', available: true },
  { name: 'City Hospital Emergency', role: '24/7 Emergency Ward', phone: '+91 98765 11111', available: true },
  { name: 'Ambulance Service', role: 'Quick Response', phone: '+91 108', available: true }
]

export default function EmergencySOS() {
  const { toast } = useToast()
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(null)
  const [isActivating, setIsActivating] = useState(false)
  const [isActivated, setIsActivated] = useState(false)
  const [locationShared, setLocationShared] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [countdown, setCountdown] = useState(5)

  const handleSOS = (type: EmergencyType) => {
    setSelectedType(type)
    setIsActivating(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          activateEmergency(type)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const activateEmergency = (type: EmergencyType) => {
    setIsActivating(false)
    setIsActivated(true)
    toast({
      title: 'Emergency Activated',
      description: `${type} response has been triggered.`,
      variant: 'destructive',
    })
    // Simulate emergency activation
    setTimeout(() => {
      setLocationShared(true)
    }, 1000)
  }

  const handleCancel = () => {
    setIsActivating(false)
    setProgress(0)
    setSelectedType(null)
  }

  const handleReset = () => {
    setIsActivated(false)
    setLocationShared(false)
    setProgress(0)
    setSelectedType(null)
  }

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`
          navigator.clipboard.writeText(locationUrl)
          setLocationShared(true)
          toast({
            title: 'Location Shared',
            description: 'Your location was copied to the clipboard.',
          })
        },
        () => {
          toast({
            title: 'Location Error',
            description: 'Unable to get location. Please enable location services.',
            variant: 'destructive',
          })
        }
      )
      return
    }

    toast({
      title: 'Location Unsupported',
      description: 'Geolocation is not supported on this device.',
      variant: 'destructive',
    })
  }

  const quickCall = (number: string) => {
    const link = document.createElement('a')
    link.href = `tel:${number}`
    link.click()
  }

  const handleSpeakToDispatcher = () => {
    const emergencyNumber =
      emergencyTypes.find((emergency) => emergency.type === selectedType)?.number ?? '112'
    quickCall(emergencyNumber)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gradient-primary">Emergency SOS</h2>
          <p className="text-muted-foreground mt-1">Quick emergency assistance when you need it most</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isActivated ? 'default' : 'secondary'} className="px-4 py-2">
            {isActivated ? '🔴 Emergency Active' : '🟢 System Ready'}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main SOS Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Emergency Types */}
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-red-500" />
                Quick Emergency Response
              </CardTitle>
              <CardDescription>
                Select emergency type for instant response
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {emergencyTypes.map((emergency) => {
                  const Icon = emergency.icon
                  return (
                    <motion.button
                      key={emergency.type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSOS(emergency.type)}
                      disabled={isActivating || isActivated}
                      className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all ${
                        isActivated && selectedType === emergency.type
                          ? 'ring-4 ring-red-500'
                          : ''
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${emergency.color} opacity-10`} />
                      <div className="relative z-10">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${emergency.color} flex items-center justify-center shadow-lg mb-4`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-1">{emergency.label}</h3>
                        <p className="text-3xl font-bold text-gradient-primary">{emergency.number}</p>
                        <p className="text-sm text-muted-foreground mt-1">Tap to activate SOS</p>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Activation Progress */}
          <AnimatePresence>
            {isActivating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="modern-card border-2 border-red-500 bg-red-50 dark:bg-red-950/20">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 mx-auto rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                        <AlertTriangle className="h-10 w-10 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">
                          Activating Emergency Response...
                        </h3>
                        <p className="text-red-700 dark:text-red-300">
                          Don't hang up! Help is on the way.
                        </p>
                      </div>
                      <Progress value={progress} className="h-3 bg-red-200 dark:bg-red-900" />
                      <Button variant="outline" className="border-red-500 text-red-700 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-900/30" onClick={handleCancel}>
                        Cancel Emergency
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Emergency Status */}
          <AnimatePresence>
            {isActivated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="modern-card border-2 border-green-500 bg-green-50 dark:bg-green-950/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center shadow-lg">
                          <CheckCircle className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-green-900 dark:text-green-100">
                            Emergency Response Activated
                          </h3>
                          <p className="text-green-700 dark:text-green-300">
                            Help is on the way. Stay calm.
                          </p>
                        </div>
                      </div>
                      <Button onClick={handleReset} variant="outline" className="border-green-500">
                        Reset
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-green-600" />
                          <span>Emergency services notified</span>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-green-600" />
                          <span>Location shared with responders</span>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Navigation className="h-5 w-5 text-green-600" />
                          <span>Nearest emergency unit alerted</span>
                        </div>
                        <Clock className="h-5 w-5 text-orange-500 animate-pulse" />
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={handleSpeakToDispatcher}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Speak to Dispatcher
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={shareLocation}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Location
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Emergency Contacts */}
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.role}</p>
                  </div>
                  <Button
                    size="icon"
                    className="h-8 w-8 rounded-full bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => quickCall(contact.phone)}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full btn-gradient-primary" onClick={shareLocation}>
                <MapPin className="mr-2 h-4 w-4" />
                Share My Location
              </Button>
              <Button variant="outline" className="w-full" onClick={() => quickCall('108')}>
                <Ambulance className="mr-2 h-4 w-4" />
                Call Ambulance
              </Button>
              <Button variant="outline" className="w-full" onClick={() => quickCall('100')}>
                <Shield className="mr-2 h-4 w-4" />
                Call Police
              </Button>
            </CardContent>
          </Card>

          {/* Emergency Tips */}
          <Card className="modern-card border-2 border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-950/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-orange-700 dark:text-orange-300">
                <Radio className="h-5 w-5" />
                Stay Safe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Stay calm and don't panic</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Clearly state your location</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Follow dispatcher instructions</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Stay on the line until help arrives</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
