'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Building2,
  Calendar,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  FileText,
  Award,
  Heart,
  Baby,
  GraduationCap,
  Shield,
  Download,
  ExternalLink,
  Check,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'

const schemes = [
  {
    id: 1,
    name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
    description: 'Health insurance scheme providing coverage of up to ₹5 lakhs per family per year for secondary and tertiary care hospitalization',
    category: 'Health Insurance',
    eligibility: 'All families identified through SECC data',
    benefits: ['₹5 Lakh coverage per family', 'Cashless hospitalization', 'Pre and post-hospitalization expenses'],
    icon: Shield,
    color: 'from-blue-500 to-cyan-500',
    status: 'Active',
    deadline: 'Ongoing'
  },
  {
    id: 2,
    name: 'Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)',
    description: 'Free ANC check-ups, diagnostic services and IFA supplementation for pregnant women on 9th of every month',
    category: 'Maternal Health',
    eligibility: 'Pregnant women',
    benefits: ['Free health checkups', 'Diagnostic services', 'IFA supplements', 'High-risk pregnancy identification'],
    icon: Baby,
    color: 'from-pink-500 to-rose-500',
    status: 'Active',
    deadline: 'Monthly (9th)'
  },
  {
    id: 3,
    name: 'National Health Mission (NHM)',
    description: 'Comprehensive healthcare program strengthening public health delivery systems',
    category: 'Healthcare Infrastructure',
    eligibility: 'All citizens',
    benefits: ['Strengthened health systems', 'Improved access to healthcare', 'Community health workers'],
    icon: Building2,
    color: 'from-green-500 to-emerald-500',
    status: 'Active',
    deadline: 'Ongoing'
  },
  {
    id: 4,
    name: 'Janani Suraksha Yojana (JSY)',
    description: 'Promotes institutional delivery among poor pregnant women with cash assistance',
    category: 'Maternal Health',
    eligibility: 'Pregnant women from BPL families',
    benefits: ['Cash assistance for delivery', 'Institutional delivery promotion', 'Post-delivery care'],
    icon: Heart,
    color: 'from-red-500 to-orange-500',
    status: 'Active',
    deadline: 'Ongoing'
  },
  {
    id: 5,
    name: 'Rashtriya Swasthya Bima Yojana (RSBY)',
    description: 'Health insurance for below poverty line families',
    category: 'Health Insurance',
    eligibility: 'BPL families',
    benefits: ['Health insurance coverage', 'Hospitalization benefits', 'Cashless treatment'],
    icon: Award,
    color: 'from-purple-500 to-pink-500',
    status: 'Active',
    deadline: 'Ongoing'
  },
  {
    id: 6,
    name: 'National Mental Health Programme (NMHP)',
    description: 'Comprehensive mental health services across the country',
    category: 'Mental Health',
    eligibility: 'All citizens',
    benefits: ['Mental health services', 'Awareness programs', 'Training for healthcare workers'],
    icon: Users,
    color: 'from-indigo-500 to-purple-500',
    status: 'Active',
    deadline: 'Ongoing'
  }
]

const categories = ['All', 'Health Insurance', 'Maternal Health', 'Healthcare Infrastructure', 'Mental Health']

export default function GovtSchemeFinder() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedScheme, setSelectedScheme] = useState<typeof schemes[0] | null>(null)
  const [showApplyModal, setShowApplyModal] = useState(false)

  const handleApplyNow = () => {
    if (selectedScheme) {
      setShowApplyModal(true)
    }
  }

  const handleApplyConfirm = () => {
    toast({
      title: 'Application Submitted',
      description: `Application for ${selectedScheme?.name} submitted successfully!`,
    })
    setShowApplyModal(false)
  }

  const handleDownloadSchemes = () => {
    toast({
      title: 'Downloading...',
      description: 'Preparing scheme information for download...',
    })
  }

  const handleDownloadDetails = () => {
    if (selectedScheme) {
      toast({
        title: 'Downloading Details',
        description: `${selectedScheme.name} details downloaded`,
      })
    }
  }

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gradient-primary">Government Scheme Finder</h2>
          <p className="text-muted-foreground mt-1">Discover healthcare schemes you're eligible for</p>
        </div>
        <Button className="btn-gradient-primary" onClick={handleDownloadSchemes}>
          <FileText className="mr-2 h-4 w-4" />
          Download All Schemes
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="modern-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes by name or description..."
                className="pl-10 h-12 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
                      : ''
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Schemes List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredSchemes.map((scheme, index) => {
            const Icon = scheme.icon
            return (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`modern-card cursor-pointer transition-all ${
                    selectedScheme?.id === scheme.id ? 'ring-2 ring-indigo-500' : ''
                  }`}
                  onClick={() => setSelectedScheme(scheme)}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${scheme.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg leading-tight">{scheme.name}</CardTitle>
                          <Badge className="shrink-0">{scheme.status}</Badge>
                        </div>
                        <CardDescription className="mt-2 line-clamp-2">
                          {scheme.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {scheme.deadline}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {scheme.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Scheme Details */}
        <div className="lg:col-span-1">
          <Card className="modern-card sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Scheme Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedScheme ? (
                <>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedScheme.color} flex items-center justify-center shadow-lg mx-auto`}>
                    <selectedScheme.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{selectedScheme.name}</h3>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                      {selectedScheme.status}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4 text-indigo-500" />
                        Eligibility
                      </h4>
                      <p className="text-sm text-muted-foreground">{selectedScheme.eligibility}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4 text-green-500" />
                        Benefits
                      </h4>
                      <ul className="space-y-2">
                        {selectedScheme.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-border/50">
                      <Button className="w-full btn-gradient-primary" onClick={handleApplyNow}>
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="w-full mt-2" onClick={handleDownloadDetails}>
                        <FileText className="mr-2 h-4 w-4" />
                        Download Details
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Select a scheme to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Apply Modal */}
      <AnimatePresence>
        {showApplyModal && selectedScheme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowApplyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl max-w-md w-full max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b border-border/50 flex items-center justify-between">
                <h3 className="text-xl font-bold">Apply for {selectedScheme.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowApplyModal(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  You are about to apply for the <strong>{selectedScheme.name}</strong>. Please review the details carefully before submitting.
                </p>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <h4 className="font-semibold mb-2">Eligibility</h4>
                  <p className="text-sm text-muted-foreground">{selectedScheme.eligibility}</p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/20 border border border-green-200 dark:border-green-900/50 rounded-xl">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Award className="h-4 w-4 text-green-600" />
                    Key Benefits
                  </h4>
                  <ul className="space-y-1">
                    {selectedScheme.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" onClick={() => setShowApplyModal(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 btn-gradient-primary" onClick={handleApplyConfirm}>
                    Submit Application
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
