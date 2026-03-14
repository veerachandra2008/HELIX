'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  QrCode,
  Download,
  Share2,
  Shield,
  FileText,
  Calendar,
  Phone,
  MapPin,
  Droplet,
  Activity,
  Plus,
  CheckCircle,
  AlertCircle,
  Copy
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import QRCode from 'qrcode'

interface HealthRecord {
  id: string
  recordType: string
  title: string
  description: string
  provider: string
  facilityName: string
  date: string
  isEmergency: boolean
}

interface UserData {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  bloodType: string
  emergencyContact: string
  emergencyPhone: string
  address: string
  city: string
  state: string
  digitalHealthId: string
}

export default function DigitalHealthPassport({ onBack }: { onBack: () => void }) {
  const [qrCode, setQrCode] = useState<string>('')
  const [copied, setCopied] = useState(false)

  // Simulated user data
  const userData: UserData = {
    id: 'user_123',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1992-05-15',
    bloodType: 'O+',
    emergencyContact: 'Rajesh Sharma',
    emergencyPhone: '+91 98765 43211',
    address: '123 Health Street, Sector 7',
    city: 'Hyderabad',
    state: 'Telangana',
    digitalHealthId: 'HELIX-2024-784392'
  }

  // Simulated health records
  const healthRecords: HealthRecord[] = [
    {
      id: '1',
      recordType: 'vaccination',
      title: 'COVID-19 Booster Dose',
      description: 'Second booster dose administered',
      provider: 'Dr. Anjali Reddy',
      facilityName: 'City General Hospital',
      date: '2024-01-15',
      isEmergency: false
    },
    {
      id: '2',
      recordType: 'diagnosis',
      title: 'Annual Health Checkup',
      description: 'Complete health screening including blood tests',
      provider: 'Dr. Venkat Rao',
      facilityName: 'Apollo Clinics',
      date: '2024-02-10',
      isEmergency: false
    },
    {
      id: '3',
      recordType: 'lab_result',
      title: 'Blood Test Results',
      description: 'Complete blood count, lipid profile',
      provider: 'Dr. Anjali Reddy',
      facilityName: 'City Diagnostic Center',
      date: '2024-02-12',
      isEmergency: false
    }
  ]

  const [showAddRecord, setShowAddRecord] = useState(false)

  // Generate QR code on mount
  useEffect(() => {
    QRCode.toDataURL(JSON.stringify({
      digitalHealthId: userData.digitalHealthId,
      name: userData.name,
      bloodType: userData.bloodType
    }), {
      width: 200,
      margin: 2,
      color: {
        dark: '#003366',
        light: '#ffffff'
      }
    }).then(setQrCode)
  }, [])

  const handleCopyId = () => {
    if (userData?.digitalHealthId) {
      navigator.clipboard.writeText(userData.digitalHealthId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'vaccination':
        return <Shield className="h-5 w-5 text-green-600" />
      case 'diagnosis':
        return <Activity className="h-5 w-5 text-blue-600" />
      case 'lab_result':
        return <FileText className="h-5 w-5 text-purple-600" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  if (!qrCode) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="loading-skeleton w-full max-w-md h-64 rounded-2xl"></div>
      </div>
    )
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
            <h2 className="text-3xl font-bold text-gradient-helix">Digital Health Passport</h2>
            <p className="text-muted-foreground">Your portable healthcare identity</p>
          </div>
        </motion.div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Passport Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <Card className="neumorphic-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Health Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo Placeholder */}
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                >
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </motion.div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">{userData.name}</h3>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center space-y-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                {qrCode && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={qrCode}
                    alt="Health ID QR Code"
                    className="w-40 h-40"
                  />
                )}
                <div className="flex items-center gap-2 w-full">
                  <Input
                    value={userData.digitalHealthId}
                    readOnly
                    className="text-center font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyId}
                    className="flex-shrink-0"
                  >
                    {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Droplet className="h-4 w-4 text-red-500" />
                  <span>Blood Type: <Badge variant="secondary">{userData.bloodType}</Badge></span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>DOB: {new Date(userData.dateOfBirth).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{userData.city}, {userData.state}</span>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 rounded-xl">
                <p className="text-xs font-semibold text-orange-900 dark:text-orange-100 mb-1">Emergency Contact</p>
                <p className="text-sm font-medium">{userData.emergencyContact}</p>
                <p className="text-sm text-muted-foreground">{userData.emergencyPhone}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Health Records */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="neumorphic-card h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-teal-600" />
                    Health Records
                  </CardTitle>
                  <CardDescription>Your complete medical history</CardDescription>
                </div>
                <Button size="sm" className="gap-2" onClick={() => setShowAddRecord(true)}>
                  <Plus className="h-4 w-4" />
                  Add Record
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="vaccination">Vaccinations</TabsTrigger>
                  <TabsTrigger value="diagnosis">Diagnoses</TabsTrigger>
                  <TabsTrigger value="lab_result">Lab Results</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                  {healthRecords.map((record) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 border border-border rounded-xl hover:shadow-md transition-all duration-200 bg-slate-50/50 dark:bg-slate-800/50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="mt-0.5">{getRecordIcon(record.recordType)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{record.title}</h4>
                              {record.isEmergency && (
                                <Badge variant="destructive" className="text-xs">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Emergency
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{record.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(record.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Shield className="h-3 w-3" />
                                {record.provider}
                              </span>
                            </div>
                            {record.facilityName && (
                              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {record.facilityName}
                              </p>
                            )}
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize text-xs">
                          {record.recordType.replace('_', ' ')}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>
                <TabsContent value="vaccination" className="mt-4 space-y-3">
                  {healthRecords.filter(r => r.recordType === 'vaccination').map((record) => (
                    <motion.div
                      key={record.id}
                      className="p-4 border border-border rounded-xl bg-slate-50/50 dark:bg-slate-800/50"
                    >
                      <div className="flex items-center gap-3">
                        {getRecordIcon(record.recordType)}
                        <div>
                          <h4 className="font-semibold">{record.title}</h4>
                          <p className="text-sm text-muted-foreground">{new Date(record.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>
                <TabsContent value="diagnosis" className="mt-4 space-y-3">
                  {healthRecords.filter(r => r.recordType === 'diagnosis').map((record) => (
                    <motion.div
                      key={record.id}
                      className="p-4 border border-border rounded-xl bg-slate-50/50 dark:bg-slate-800/50"
                    >
                      <div className="flex items-center gap-3">
                        {getRecordIcon(record.recordType)}
                        <div>
                          <h4 className="font-semibold">{record.title}</h4>
                          <p className="text-sm text-muted-foreground">{new Date(record.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>
                <TabsContent value="lab_result" className="mt-4 space-y-3">
                  {healthRecords.filter(r => r.recordType === 'lab_result').map((record) => (
                    <motion.div
                      key={record.id}
                      className="p-4 border border-border rounded-xl bg-slate-50/50 dark:bg-slate-800/50"
                    >
                      <div className="flex items-center gap-3">
                        {getRecordIcon(record.recordType)}
                        <div>
                          <h4 className="font-semibold">{record.title}</h4>
                          <p className="text-sm text-muted-foreground">{new Date(record.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Add Record Modal */}
      <AnimatePresence>
        {showAddRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddRecord(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glassmorphic-panel w-full max-w-lg p-6"
            >
              <h3 className="text-xl font-bold mb-4">Add Health Record</h3>
              <div className="space-y-4">
                <div>
                  <Label>Record Type</Label>
                  <select className="w-full mt-1 px-3 py-2 border rounded-lg bg-background">
                    <option value="vaccination">Vaccination</option>
                    <option value="diagnosis">Diagnosis</option>
                    <option value="lab_result">Lab Result</option>
                    <option value="prescription">Prescription</option>
                  </select>
                </div>
                <div>
                  <Label>Title</Label>
                  <Input placeholder="Enter title" />
                </div>
                <div>
                  <Label>Description</Label>
                  <textarea
                    className="w-full mt-1 px-3 py-2 border rounded-lg bg-background min-h-[100px]"
                    placeholder="Enter description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Provider</Label>
                    <Input placeholder="Dr. Name" />
                  </div>
                  <div>
                    <Label>Facility</Label>
                    <Input placeholder="Hospital/Clinic" />
                  </div>
                </div>
                <div>
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button onClick={() => setShowAddRecord(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button className="flex-1">Save Record</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
