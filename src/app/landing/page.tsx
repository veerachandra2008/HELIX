'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import {
  Heart,
  Brain,
  Shield,
  CreditCard,
  Activity,
  Baby,
  MapPin,
  Camera,
  Calculator,
  ArrowRight,
  CheckCircle,
  Users,
  Zap,
  Lock,
  Globe,
  Star,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  Play,
  Video
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import VantaCloudsBackground from '@/components/helix/VantaCloudsBackground'

const features = [
  {
    icon: CreditCard,
    title: 'Digital Health Passport',
    description: 'Secure, portable health identity with QR code for seamless care across facilities',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Brain,
    title: 'AI Clinical Assistant',
    description: '24/7 intelligent health guidance with 3D interactive avatar',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Calculator,
    title: 'Smart Expense Prediction',
    description: 'AI-powered healthcare cost forecasting and financial planning',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Baby,
    title: 'Maternal Health Journey',
    description: 'Complete pregnancy tracking with fetal development and risk alerts',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: MapPin,
    title: 'Disease Intelligence Map',
    description: 'Real-time community health tracking and outbreak monitoring',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Camera,
    title: 'AI Nutrition Scanner',
    description: 'Instant food analysis with pregnancy safety evaluation',
    color: 'from-violet-500 to-purple-500'
  }
]

const stats = [
  { value: '10M+', label: 'Users Protected' },
  { value: '50K+', label: 'Healthcare Providers' },
  { value: '100+', label: 'Cities Covered' },
  { value: '99.9%', label: 'Uptime' }
]

const testimonials = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Chief Medical Officer',
    content: 'HELIX has revolutionized how we approach preventive healthcare. The AI insights are incredibly accurate.',
    avatar: 'SJ'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Healthcare Administrator',
    content: 'The disease intelligence map helped us contain outbreaks 40% faster. A game-changer for public health.',
    avatar: 'RK'
  },
  {
    name: 'Priya Sharma',
    role: 'New Mother',
    content: 'The maternal health journey feature gave me peace of mind throughout my pregnancy. Absolutely invaluable!',
    avatar: 'PS'
  }
]

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showDemoModal, setShowDemoModal] = useState(false)

  const handleWatchDemo = () => {
    setShowDemoModal(true)
    toast({
      title: 'Demo Video',
      description: 'Loading demo...',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glassmorphic-nav">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient-primary">HELIX</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#stats" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Impact
              </a>
              <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:flex">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="btn-gradient-primary">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a href="#features" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Features
              </a>
              <a href="#stats" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Impact
              </a>
              <a href="#testimonials" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Testimonials
              </a>
              <a href="#pricing" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Pricing
              </a>
              <Link href="/login">
                <Button variant="ghost" className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <VantaCloudsBackground />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.4)_0%,rgba(248,250,252,0.92)_42%,rgba(248,250,252,1)_100%)] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.32)_0%,rgba(2,6,23,0.8)_44%,rgba(2,6,23,1)_100%)]" />
        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-6"
            >
              <Zap className="h-4 w-4 text-indigo-500" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                AI-Powered Healthcare Revolution
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Transforming Healthcare with{' '}
              <span className="text-gradient-primary">AI Intelligence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              HELIX is an AI-powered community healthcare ecosystem that brings preventive care,
              maternal safety, and early disease detection to everyone, everywhere.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/signup">
                <Button size="lg" className="btn-gradient-primary text-lg px-8 py-6 h-auto">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto" onClick={handleWatchDemo}>
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>24/7 Support</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Image/Card Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 relative"
          >
            <div className="glassmorphic-card rounded-3xl p-2 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl floating">
                    <Heart className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gradient-primary">
                    Your Health, Simplified
                  </h3>
                  <p className="text-muted-foreground">
                    Experience the future of healthcare management
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">HELIX Demo</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowDemoModal(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="aspect-video bg-black">
                <video
                  className="h-full w-full object-cover"
                  src="/login-showcase.mp4"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
              <div className="p-6">
                <Link href="/signup">
                  <Button className="w-full btn-gradient-primary">
                    Try It Now - It's Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features for <span className="text-gradient-primary">Modern Healthcare</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your health journey, powered by cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="modern-card h-full p-6">
                    <CardContent className="p-0">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                      <Button variant="ghost" className="mt-4 group">
                        Learn More
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by <span className="text-gradient-secondary">Healthcare Professionals</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our community has to say about HELIX
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="modern-card h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="animated-bg rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Health Journey?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join millions of users who trust HELIX for their healthcare needs.
                Start free, upgrade when you're ready.
              </p>
              <Link href="/signup">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 text-lg px-8 py-6 h-auto shadow-2xl">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-gradient-primary">HELIX</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 HELIX Healthcare. Aligned with UN SDG 3.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
