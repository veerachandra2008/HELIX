'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Baby,
  Calendar,
  Activity,
  Heart,
  Droplet,
  AlertTriangle,
  CheckCircle,
  Bell,
  Clock,
  TrendingUp,
  TrendingDown,
  Plus,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PregnancyData {
  lastMenstrualDate: string
  dueDate: string
  currentWeek: number
  riskLevel: 'low' | 'medium' | 'high'
  numberOfPregnancies: number
  antenatalVisits: number
  weight: number
  height: number
  bloodPressure: string
  hemoglobin: number
  bloodSugar: number
}

interface Appointment {
  id: string
  type: string
  date: string
  time: string
  doctor: string
  location: string
  status: 'upcoming' | 'completed' | 'missed'
}

interface Milestone {
  week: number
  title: string
  description: string
  completed: boolean
}

export default function MaternalHealth({ onBack }: { onBack: () => void }) {
  const [pregnancyData, setPregnancyData] = useState<PregnancyData>({
    lastMenstrualDate: '2024-01-15',
    dueDate: '2024-10-22',
    currentWeek: 24,
    riskLevel: 'low',
    numberOfPregnancies: 1,
    antenatalVisits: 6,
    weight: 65,
    height: 165,
    bloodPressure: '118/75',
    hemoglobin: 12.5,
    bloodSugar: 95
  })

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      type: 'Antenatal Checkup',
      date: '2024-07-20',
      time: '10:00 AM',
      doctor: 'Dr. Anjali Reddy',
      location: 'City Hospital, Maternity Wing',
      status: 'upcoming'
    },
    {
      id: '2',
      type: 'Ultrasound Scan',
      date: '2024-07-05',
      time: '2:30 PM',
      doctor: 'Dr. Venkat Rao',
      location: 'Apollo Clinics',
      status: 'completed'
    }
  ])

  const [milestones, setMilestones] = useState<Milestone[]>([
    { week: 12, title: 'First Trimester Complete', description: 'All initial screenings passed', completed: true },
    { week: 20, title: 'Anomaly Scan', description: 'Detailed fetal anatomy scan', completed: true },
    { week: 24, title: 'Glucose Tolerance Test', description: 'Gestational diabetes screening', completed: false },
    { week: 28, title: 'Third Trimester Begins', description: 'Regular checkups every 2 weeks', completed: false },
    { week: 36, title: 'Weekly Checkups', description: 'Prepare for delivery', completed: false }
  ])

  const weekProgress = (pregnancyData.currentWeek / 40) * 100

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">High Risk</Badge>
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">Medium Risk</Badge>
      default:
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">Low Risk</Badge>
    }
  }

  const getTrimester = (week: number) => {
    if (week <= 13) return 'First'
    if (week <= 26) return 'Second'
    return 'Third'
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
            <h2 className="text-3xl font-bold text-gradient-helix">Maternal Health Journey</h2>
            <p className="text-muted-foreground">Your pregnancy tracking companion</p>
          </div>
        </motion.div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Entry
        </Button>
      </div>

      {/* Pregnancy Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <Card className="neumorphic-card h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Baby className="h-5 w-5 text-pink-600" />
                    Pregnancy Progress
                  </CardTitle>
                  <CardDescription>
                    Week {pregnancyData.currentWeek} of 40 • {getTrimester(pregnancyData.currentWeek)} Trimester
                  </CardDescription>
                </div>
                {getRiskBadge(pregnancyData.riskLevel)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-semibold">{Math.round(weekProgress)}%</span>
                </div>
                <Progress value={weekProgress} className="h-3" />
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-2xl font-bold">{pregnancyData.currentWeek}</p>
                  <p className="text-xs text-muted-foreground">Current Week</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-pink-500" />
                  <p className="text-2xl font-bold">{pregnancyData.antenatalVisits}</p>
                  <p className="text-xs text-muted-foreground">Visits Done</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p className="text-2xl font-bold">{pregnancyData.weight}kg</p>
                  <p className="text-xs text-muted-foreground">Weight</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                  <Heart className="h-8 w-8 mx-auto mb-2 text-red-500" />
                  <p className="text-2xl font-bold">{pregnancyData.bloodPressure}</p>
                  <p className="text-xs text-muted-foreground">Blood Pressure</p>
                </div>
              </div>

              {/* Due Date Countdown */}
              <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Due Date</p>
                    <p className="text-lg font-semibold">
                      {new Date(pregnancyData.dueDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Weeks Remaining</p>
                    <p className="text-lg font-semibold">{40 - pregnancyData.currentWeek} weeks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions & Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Upcoming Appointment */}
          <Card className="neumorphic-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                Next Appointment
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appointments.find(a => a.status === 'upcoming') ? (
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold">{appointments.find(a => a.status === 'upcoming')?.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointments.find(a => a.status === 'upcoming')?.doctor}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(appointments.find(a => a.status === 'upcoming')?.date || '').toLocaleDateString()} at{' '}
                      {appointments.find(a => a.status === 'upcoming')?.time}
                    </span>
                  </div>
                  <Button className="w-full" size="sm">View Details</Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No upcoming appointments</p>
              )}
            </CardContent>
          </Card>

          {/* Health Alerts */}
          <Card className="neumorphic-card border-orange-200 dark:border-orange-900/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-orange-500" />
                Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <Droplet className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Iron Supplements</p>
                  <p className="text-xs text-muted-foreground">Take daily with meals</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <Activity className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Kick Count</p>
                  <p className="text-xs text-muted-foreground">Count fetal movements daily</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Stay Hydrated</p>
                  <p className="text-xs text-muted-foreground">Drink 8-10 glasses of water</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Tabs */}
      <Card className="neumorphic-card">
        <CardContent className="p-6">
          <Tabs defaultValue="health" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="health">Health Metrics</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="development">Fetal Development</TabsTrigger>
            </TabsList>

            <TabsContent value="health" className="mt-6 space-y-6">
              <h3 className="text-lg font-semibold">Current Health Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Blood Pressure</span>
                    <Heart className="h-4 w-4 text-red-500" />
                  </div>
                  <p className="text-2xl font-bold">{pregnancyData.bloodPressure}</p>
                  <p className="text-xs text-green-600">Normal range</p>
                </div>
                <div className="p-4 border border-border rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Hemoglobin</span>
                    <Droplet className="h-4 w-4 text-red-500" />
                  </div>
                  <p className="text-2xl font-bold">{pregnancyData.hemoglobin} g/dL</p>
                  <p className="text-xs text-green-600">Normal range</p>
                </div>
                <div className="p-4 border border-border rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Blood Sugar</span>
                    <Activity className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold">{pregnancyData.bloodSugar} mg/dL</p>
                  <p className="text-xs text-green-600">Normal range</p>
                </div>
                <div className="p-4 border border-border rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Weight</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold">{pregnancyData.weight} kg</p>
                  <p className="text-xs text-blue-600">+2.5 kg from start</p>
                </div>
                <div className="p-4 border border-border rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Height</span>
                    <Activity className="h-4 w-4 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold">{pregnancyData.height} cm</p>
                  <p className="text-xs text-muted-foreground">BMI: 23.9</p>
                </div>
                <div className="p-4 border border-border rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pregnancy</span>
                    <Baby className="h-4 w-4 text-pink-500" />
                  </div>
                  <p className="text-2xl font-bold">{pregnancyData.numberOfPregnancies}st</p>
                  <p className="text-xs text-muted-foreground">First pregnancy</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appointments" className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Appointments</h3>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Schedule
                </Button>
              </div>
              <div className="space-y-3">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 border border-border rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{appointment.type}</h4>
                          <Badge
                            variant={appointment.status === 'upcoming' ? 'default' :
                                   appointment.status === 'completed' ? 'secondary' : 'destructive'}
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{appointment.doctor}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(appointment.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {appointment.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{appointment.location}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="milestones" className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Pregnancy Milestones</h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.week}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 border rounded-xl ${
                      milestone.completed
                        ? 'border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900/50'
                        : milestone.week <= pregnancyData.currentWeek
                        ? 'border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-900/50'
                        : 'border-border bg-slate-50 dark:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        milestone.completed
                          ? 'bg-green-500 text-white'
                          : milestone.week <= pregnancyData.currentWeek
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-300 dark:bg-slate-700'
                      }`}>
                        {milestone.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <span className="text-sm font-semibold">{milestone.week}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">Week {milestone.week}: {milestone.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="development" className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Fetal Development - Week {pregnancyData.currentWeek}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Card className="neumorphic-card">
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-900/30 dark:to-purple-900/30 flex items-center justify-center">
                          <Baby className="h-16 w-16 text-pink-600 dark:text-pink-400" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">Size of a Mango</p>
                          <p className="text-sm text-muted-foreground">Approximately 30 cm long</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-xl space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-500" />
                      This Week's Development
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Baby's lungs are developing surfactant</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Hearing is becoming more sensitive</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Baby responds to sounds and voices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Skin is becoming less transparent</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-xl">
                    <h4 className="font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-300 mb-2">
                      <Bell className="h-4 w-4" />
                      Mom's Tip
                    </h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Start talking and singing to your baby! They can now recognize your voice and may respond to familiar sounds.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
