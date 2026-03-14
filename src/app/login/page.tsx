'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  CheckCircle,
  Zap,
  Users,
  Github,
  Chrome,
  Sun,
  Moon,
  Play,
  Sparkles,
  ShieldCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('helix-authenticated') === 'true') {
      router.replace('/dashboard')
    }
  }, [router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const result = await response.json()

      if (!response.ok || result.status !== 'success') {
        const message = result.message || 'Unable to sign in'
        setErrorMessage(message)
        toast({
          title: 'Login failed',
          description: message,
          variant: 'destructive',
        })
        if (response.status === 401 || response.status === 404 || response.status === 409) {
          setTimeout(() => router.push('/signup'), 800)
        }
        return
      }

      localStorage.setItem('helix-authenticated', 'true')
      localStorage.setItem('helix-user', result.user?.username || formData.email)
      toast({
        title: 'Welcome back!',
        description: result.message || 'Successfully logged in to HELIX',
      })
      router.push('/dashboard')
    } catch {
      const message = 'Could not connect to the Flask server on http://127.0.0.1:5000.'
      setErrorMessage(message)
      toast({
        title: 'Server unavailable',
        description: message,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialAuth = (provider: string) => {
    toast({
      title: `${provider} Authentication`,
      description: `${provider} login integration coming soon!`,
    })
  }

  const handleTerms = () => {
    toast({
      title: 'Terms of Service',
      description: 'Terms of Service page coming soon!',
    })
  }

  const handlePrivacy = () => {
    toast({
      title: 'Privacy Policy',
      description: 'Privacy Policy page coming soon!',
    })
  }

  const benefits = [
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your health data is encrypted and protected'
    },
    {
      icon: Zap,
      title: 'AI-Powered Insights',
      description: 'Get personalized health recommendations'
    },
    {
      icon: Users,
      title: 'Community Connected',
      description: 'Join millions managing their health together'
    }
  ]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.18),transparent_26%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_48%,_#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.2),transparent_24%),linear-gradient(135deg,_#020617_0%,_#0f172a_52%,_#020617_100%)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />

      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-full glassmorphic"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Back to Home */}
      <Link href="/landing" className="fixed top-4 left-4 z-50">
        <Button variant="ghost" className="glassmorphic">
          <Heart className="h-5 w-5 mr-2" />
          HELIX
        </Button>
      </Link>

      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-[1.08fr_0.92fr] gap-8 xl:gap-12 items-center relative z-10">
        {/* Left Side - Story / Media */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="order-2 lg:order-1 space-y-6"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/55 dark:text-slate-200">
              <Sparkles className="h-3.5 w-3.5" />
              Secure access to HELIX
            </div>
            <div className="max-w-2xl">
              <h1 className="font-wisteriano text-5xl leading-[0.95] text-slate-900 dark:text-slate-50 sm:text-6xl xl:text-7xl">
                Modern care starts with a calmer sign-in experience.
              </h1>
              <p className="font-ragellan mt-4 max-w-xl text-lg leading-7 text-slate-600 dark:text-slate-300 sm:text-xl">
                Access your health records, AI guidance, and community intelligence from one refined workspace.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-white/65 bg-white/70 p-3 shadow-[0_30px_80px_-36px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/55">
            <div className="relative overflow-hidden rounded-[24px] bg-slate-950">
              <video
                className="h-[260px] w-full object-cover sm:h-[320px] xl:h-[420px]"
                src="/login-showcase.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.06)_0%,rgba(2,6,23,0.48)_100%)]" />
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-2 text-white backdrop-blur">
                <Play className="h-4 w-4" />
                <span className="font-small-caps text-xs">HELIX Preview</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                <p className="font-small-caps text-xs tracking-[0.26em] text-white/75">Care Intelligence</p>
                <p className="font-ragellan mt-2 max-w-md text-base leading-6 text-white/90 sm:text-lg">
                  A visual snapshot of the connected healthcare experience users step into after sign-in.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-[24px] border border-white/60 bg-white/72 p-5 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.45)] backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/50"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/12 to-cyan-500/14">
                    <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-ragellan text-lg font-semibold text-slate-900 dark:text-slate-50">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{benefit.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="rounded-[28px] border border-white/60 bg-white/72 p-6 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.3)] backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/55">
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <span className="font-ragellan text-lg font-semibold text-slate-900 dark:text-slate-50">
                Trusted by leading healthcare providers
              </span>
            </div>
            <div className="flex gap-4 opacity-60">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700" />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="order-1 lg:order-2"
        >
          <Card className="overflow-hidden rounded-[32px] border border-white/65 bg-white/82 shadow-[0_36px_90px_-42px_rgba(15,23,42,0.55)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/72">
            <div className="h-1.5 w-full bg-[linear-gradient(90deg,#38bdf8_0%,#6366f1_42%,#a855f7_100%)]" />
            <CardHeader className="space-y-3 text-center pb-6 pt-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,#0ea5e9_0%,#4f46e5_55%,#9333ea_100%)] shadow-[0_18px_36px_-20px_rgba(79,70,229,0.95)]">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2">
                <p className="font-small-caps text-xs text-slate-500 dark:text-slate-400">Member Login</p>
                <CardTitle className="font-wisteriano text-4xl text-slate-900 dark:text-slate-50">Sign In</CardTitle>
              </div>
              <CardDescription className="font-ragellan mx-auto max-w-sm text-base leading-6 text-slate-600 dark:text-slate-300">
                Enter your credentials to access your health dashboard and active care services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-small-caps text-[0.82rem] text-slate-700 dark:text-slate-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-12 rounded-2xl border-slate-200 bg-slate-50/80 pl-10 dark:border-slate-800 dark:bg-slate-900/60"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="font-small-caps text-[0.82rem] text-slate-700 dark:text-slate-300">Password</Label>
                    <Link href="#" className="font-small-caps text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                      Forgot password?
                    </Link>
                  </div> 
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="h-12 rounded-2xl border-slate-200 bg-slate-50/80 pl-10 pr-10 dark:border-slate-800 dark:bg-slate-900/60"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-2xl bg-[linear-gradient(135deg,#0ea5e9_0%,#4f46e5_55%,#9333ea_100%)] text-base text-white shadow-[0_18px_36px_-18px_rgba(79,70,229,0.9)] hover:opacity-95"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Sign In
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>

              {errorMessage ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300">
                  {errorMessage}
                </div>
              ) : null}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="font-small-caps bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 rounded-2xl border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-900/60" onClick={() => handleSocialAuth('GitHub')}>
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </Button>
                <Button variant="outline" className="h-12 rounded-2xl border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-900/60" onClick={() => handleSocialAuth('Google')}>
                  <Chrome className="mr-2 h-5 w-5" />
                  Google
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/signup" className="font-small-caps text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>

          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            <span className="font-small-caps">256-bit encryption active</span>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By signing in, you agree to our{' '}
            <button onClick={handleTerms} className="underline hover:text-foreground">
              Terms of Service
            </button>{' '}
            and{' '}
            <button onClick={handlePrivacy} className="underline hover:text-foreground">
              Privacy Policy
            </button>
          </p>
        </motion.div>
      </div>
    </div>
   )
}
