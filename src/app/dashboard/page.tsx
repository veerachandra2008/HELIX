'use client'

import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  Bell,
  Brain,
  Building2,
  Calculator,
  Camera,
  ChevronRight,
  CreditCard,
  Droplets,
  FileText,
  Heart,
  Hospital,
  LayoutDashboard,
  Map,
  Menu,
  MessageCircle,
  Moon,
  Plus,
  Search,
  Settings,
  Shield,
  Sparkles,
  Sun,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useTheme } from 'next-themes'
import { useToast } from '@/hooks/use-toast'
import DigitalHealthPassport from '@/components/helix/DigitalHealthPassport'
import AIAssistant from '@/components/helix/AIAssistant'
import ExpensePredictor from '@/components/helix/ExpensePredictor'
import MaternalHealth from '@/components/helix/MaternalHealth'
import DiseaseMap from '@/components/helix/DiseaseMap'
import NutritionScanner from '@/components/helix/NutritionScanner'
import AdminDashboard from '@/components/helix/AdminDashboard'
import GovtSchemeFinder from '@/components/helix/GovtSchemeFinder'
import CommunityHealthNetwork from '@/components/helix/CommunityHealthNetwork'
import EmergencySOS from '@/components/helix/EmergencySOS'

type Feature =
  | 'dashboard'
  | 'passport'
  | 'ai-assistant'
  | 'expense'
  | 'maternal'
  | 'map'
  | 'nutrition'
  | 'admin'
  | 'schemes'
  | 'community'
  | 'sos'

const navItems: { id: Feature; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'passport', label: 'Health Passport', icon: CreditCard },
  { id: 'ai-assistant', label: 'AI Assistant', icon: Brain },
  { id: 'maternal', label: 'Maternal Health', icon: Heart },
  { id: 'schemes', label: 'Govt Schemes', icon: Building2 },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'sos', label: 'Emergency SOS', icon: Zap },
  { id: 'expense', label: 'Expense', icon: Calculator },
  { id: 'map', label: 'Disease Map', icon: Map },
  { id: 'nutrition', label: 'Nutrition', icon: Camera },
  { id: 'admin', label: 'Admin', icon: Shield },
]

const featureCards: {
  id: Feature
  title: string
  description: string
  icon: typeof CreditCard
  color: string
  badge: string
}[] = [
  {
    id: 'passport',
    title: 'Digital Health Passport',
    description: 'Secure digital identity with QR code for seamless healthcare access.',
    icon: CreditCard,
    color: 'from-blue-500 to-cyan-500',
    badge: 'Essential',
  },
  {
    id: 'ai-assistant',
    title: 'AI Clinical Assistant',
    description: 'Interactive AI for health guidance and symptom support.',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    badge: 'AI Powered',
  },
  {
    id: 'schemes',
    title: 'Govt Scheme Finder',
    description: 'Discover healthcare programs and benefits you can apply for.',
    icon: Building2,
    color: 'from-indigo-500 to-blue-500',
    badge: 'New',
  },
  {
    id: 'community',
    title: 'Health Community',
    description: 'Connect with providers and people on similar health journeys.',
    icon: Users,
    color: 'from-pink-500 to-rose-500',
    badge: 'Social',
  },
  {
    id: 'sos',
    title: 'Emergency SOS',
    description: 'Trigger quick-response workflows with location sharing.',
    icon: Zap,
    color: 'from-red-500 to-orange-500',
    badge: 'Critical',
  },
  {
    id: 'maternal',
    title: 'Maternal Health Journey',
    description: 'Track pregnancy milestones, risks, and appointments.',
    icon: Heart,
    color: 'from-teal-500 to-cyan-500',
    badge: 'Maternal Care',
  },
  {
    id: 'expense',
    title: 'Expense Predictor',
    description: 'Forecast healthcare costs with simple risk factors.',
    icon: Calculator,
    color: 'from-orange-500 to-amber-500',
    badge: 'Financial',
  },
  {
    id: 'map',
    title: 'Disease Intelligence Map',
    description: 'View community health signals and local hotspots.',
    icon: Map,
    color: 'from-green-500 to-emerald-500',
    badge: 'Public Health',
  },
  {
    id: 'nutrition',
    title: 'Nutrition Scanner',
    description: 'Analyze meals and view pregnancy-safe nutrition guidance.',
    icon: Camera,
    color: 'from-violet-500 to-purple-500',
    badge: 'AI Vision',
  },
  {
    id: 'admin',
    title: 'Admin Intelligence',
    description: 'Population-level monitoring and emergency coordination.',
    icon: Shield,
    color: 'from-slate-500 to-gray-600',
    badge: 'Admin',
  },
]

export default function DashboardPage() {
  const [activeFeature, setActiveFeature] = useState<Feature>('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNewModal, setShowNewModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (localStorage.getItem('helix-authenticated') !== 'true') {
      window.location.href = '/login'
      return
    }

    setIsCheckingAuth(false)
  }, [])

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast({
      title: 'Search',
      description: searchQuery.trim()
        ? `Searching for "${searchQuery}"...`
        : 'Enter a search term to continue.',
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('helix-authenticated')
    localStorage.removeItem('helix-user')
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully.',
    })
    window.location.href = '/login'
  }

  const renderFeature = () => {
    switch (activeFeature) {
      case 'passport':
        return <DigitalHealthPassport onBack={() => setActiveFeature('dashboard')} />
      case 'ai-assistant':
        return <AIAssistant onBack={() => setActiveFeature('dashboard')} />
      case 'expense':
        return <ExpensePredictor onBack={() => setActiveFeature('dashboard')} />
      case 'maternal':
        return <MaternalHealth onBack={() => setActiveFeature('dashboard')} />
      case 'map':
        return <DiseaseMap onBack={() => setActiveFeature('dashboard')} />
      case 'nutrition':
        return <NutritionScanner onBack={() => setActiveFeature('dashboard')} />
      case 'admin':
        return <AdminDashboard onBack={() => setActiveFeature('dashboard')} />
      case 'schemes':
        return <GovtSchemeFinder />
      case 'community':
        return <CommunityHealthNetwork />
      case 'sos':
        return <EmergencySOS />
      default:
        return (
          <DashboardHome
            onSelectFeature={setActiveFeature}
            onViewAllServices={() =>
              toast({
                title: 'Healthcare Services',
                description: `Showing ${featureCards.length} services.`,
              })
            }
          />
        )
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="h-14 w-14 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin dark:border-slate-700 dark:border-t-indigo-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <nav className="sticky top-0 z-50 px-3 sm:px-4 pt-3">
        <div className="mx-auto w-full max-w-7xl rounded-[24px] border border-slate-200/70 bg-white/88 px-3 sm:px-4 py-3 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.22)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72">
          <div className="flex flex-wrap items-center gap-3 xl:flex-nowrap">
            <Link href="/landing">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/80 px-3 py-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 cursor-pointer shrink-0"
              >
                <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_top_left,_#a5b4fc,_#4f46e5_55%,_#312e81)] shadow-[0_12px_30px_-14px_rgba(79,70,229,0.9)]">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.28),transparent_52%)]" />
                  <Heart className="relative h-5 w-5 text-white" />
                </div>
                <div className="leading-none">
                  <div className="flex items-center gap-2">
                    <h1 className="font-wisteriano font-small-caps text-[17px] font-semibold text-slate-900 dark:text-slate-100">HELIX</h1>
                    <span className="font-small-caps rounded-full bg-indigo-100 px-2 py-1 text-[10px] font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                      Health OS
                    </span>
                  </div>
                  <p className="font-ragellan mt-1 hidden text-[11px] font-medium italic text-slate-500 sm:block dark:text-slate-400">
                    Intelligent care workspace
                  </p>
                </div>
              </motion.div>
            </Link>

            <div className="order-3 w-full xl:order-none xl:flex-1 xl:min-w-[220px]">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search features, records, or insights..."
                  className="h-11 rounded-2xl border-slate-200/80 bg-slate-50/85 pl-10 shadow-none focus-visible:ring-indigo-500/30 dark:border-slate-800 dark:bg-slate-900/70"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </form>
            </div>

            <div className="hidden 2xl:flex items-center gap-1 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-1 dark:border-slate-800 dark:bg-slate-900/65">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveFeature(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                      activeFeature === item.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                        : 'text-muted-foreground hover:bg-white hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-small-caps text-sm font-medium whitespace-nowrap">{item.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="ml-auto flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-1.5 dark:border-slate-800 dark:bg-slate-900/65">
              <Button className="btn-gradient-primary hidden sm:flex" onClick={() => setShowNewModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowUserMenu(true)}>
                <User className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="2xl:hidden"
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="2xl:hidden mt-3 mx-auto w-full max-w-7xl rounded-2xl border border-slate-200/70 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/88"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveFeature(item.id)
                        setMobileMenuOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeFeature === item.id
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                          : 'text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-small-caps font-medium">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="max-w-7xl mx-auto"
          >
            {renderFeature()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="glassmorphic-nav border-t border-border/40 mt-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="font-ragellan">© 2024 HELIX Healthcare. Aligned with UN SDG 3: Good Health and Well-being.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="font-small-caps hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="font-small-caps hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="font-small-caps hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showNotifications && (
          <ModalShell title="Notifications" onClose={() => setShowNotifications(false)} icon={<Bell className="h-5 w-5" />}>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {[
                { id: 1, title: 'New health record added', time: '2 min ago', type: 'success' },
                { id: 2, title: 'Appointment reminder: tomorrow at 10 AM', time: '1 hour ago', type: 'info' },
                { id: 3, title: 'Disease alert in your area', time: '3 hours ago', type: 'warning' },
                { id: 4, title: 'Vaccination reminder due', time: '5 hours ago', type: 'info' },
              ].map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'success'
                      ? 'bg-green-500'
                      : notification.type === 'warning'
                      ? 'bg-orange-500'
                      : 'bg-blue-500'
                  }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ModalShell>
        )}

        {showUserMenu && (
          <ModalShell title="Account" onClose={() => setShowUserMenu(false)}>
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  JS
                </div>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-muted-foreground">john.doe@email.com</p>
                </div>
              </div>
              <button
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => {
                  toast({ title: 'Profile', description: 'Profile page coming soon.' })
                  setShowUserMenu(false)
                }}
              >
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">My Profile</span>
              </button>
              <button
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => {
                  toast({ title: 'Settings', description: 'Settings page coming soon.' })
                  setShowUserMenu(false)
                }}
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Settings</span>
              </button>
              <button
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={handleLogout}
              >
                <X className="h-4 w-4" />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </ModalShell>
        )}

        {showNewModal && (
          <ModalShell title="Create New Record" onClose={() => setShowNewModal(false)}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Health Record', icon: FileText, feature: 'passport' as Feature, color: 'text-indigo-500' },
                { label: 'Community Post', icon: Users, feature: 'community' as Feature, color: 'text-purple-500' },
                { label: 'Report Emergency', icon: Zap, feature: 'sos' as Feature, color: 'text-red-500' },
                { label: 'Find Schemes', icon: Building2, feature: 'schemes' as Feature, color: 'text-green-500' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    className="p-4 border border-border rounded-xl hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all"
                    onClick={() => {
                      setActiveFeature(item.feature)
                      setShowNewModal(false)
                    }}
                  >
                    <Icon className={`h-6 w-6 mx-auto mb-2 ${item.color}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </ModalShell>
        )}
      </AnimatePresence>
    </div>
  )
}

function DashboardHome({
  onSelectFeature,
  onViewAllServices,
}: {
  onSelectFeature: (feature: Feature) => void
  onViewAllServices: () => void
}) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 text-white"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-small-caps text-sm font-medium opacity-90">Welcome back</span>
          </div>
          <h2 className="font-wisteriano text-4xl font-bold mb-2 sm:text-5xl">Your Health Dashboard</h2>
          <p className="font-ragellan text-white/80 max-w-2xl mb-6 text-lg">
            Monitor your health journey, track your wellness goals, and get AI-powered insights in one place.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Button className="bg-white text-indigo-600 hover:bg-slate-100" onClick={() => onSelectFeature('passport')}>
              View Records
            </Button>
            <Button
              variant="outline"
              className="border-white/40 bg-white/15 text-white shadow-lg backdrop-blur hover:bg-white/25 hover:text-white dark:bg-white/10"
              onClick={() => onSelectFeature('ai-assistant')}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Ask AI Assistant
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: 'Health Records', value: '24', icon: FileText, change: '+3 this month' },
          { label: 'Health Camps', value: '12', icon: Hospital, change: '2 upcoming' },
          { label: 'Disease Alerts', value: '3', icon: AlertTriangle, change: '-2 from last week' },
          { label: 'Safe Water Zones', value: '45', icon: Droplets, change: '+5 new' },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="modern-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-indigo-500" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <span className="font-small-caps">{stat.change}</span>
                  </Badge>
                </div>
                <p className="font-wisteriano text-3xl font-bold mt-4 mb-1">{stat.value}</p>
                <p className="font-small-caps text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-wisteriano text-2xl font-bold sm:text-3xl">Healthcare Services</h3>
          <Button variant="outline" className="gap-2" onClick={onViewAllServices}>
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.04 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="modern-card cursor-pointer h-full" onClick={() => onSelectFeature(feature.id)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <Badge className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20">
                        <span className="font-small-caps">{feature.badge}</span>
                      </Badge>
                    </div>
                    <CardTitle className="font-ragellan mt-4 text-[1.35rem]">{feature.title}</CardTitle>
                    <CardDescription className="font-ragellan text-[0.98rem] leading-6">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full group">
                      <span>Explore</span>
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

function ModalShell({
  title,
  icon,
  onClose,
  children,
}: {
  title: string
  icon?: ReactNode
  onClose: () => void
  children: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(event) => event.stopPropagation()}
        className="bg-card rounded-3xl max-w-lg w-full max-h-[85vh] overflow-auto"
      >
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            {icon}
            {title}
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </motion.div>
  )
}
