
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Brain,
  Activity,
  AlertCircle,
  HeartPulse,
  Lightbulb,
  MessageCircle
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  severity?: 'info' | 'warning' | 'critical'
}

export default function AIAssistant({ onBack }: { onBack: () => void }) {

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hello! I'm your AI Clinical Assistant. I can help you understand symptoms, provide health guidance, and answer your medical questions. How can I assist you today?",
      timestamp: new Date(),
      severity: 'info'
    }
  ])

  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {

    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsThinking(true)

    try {

      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage.content
        })
      })

      const data = await res.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        severity: data.severity || 'info'
      }

      setMessages(prev => [...prev, aiMessage])

    } catch (error) {

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: "⚠️ Failed to connect to AI service.",
          timestamp: new Date(),
          severity: 'warning'
        }
      ])

    }

    setIsThinking(false)
  }

  const toggleListening = () => setIsListening(!isListening)
  const toggleSpeaking = () => setIsSpeaking(!isSpeaking)

  const getSeverityIcon = (severity?: 'info' | 'warning' | 'critical') => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'warning':
        return <Activity className="h-4 w-4 text-orange-500" />
      default:
        return <Lightbulb className="h-4 w-4 text-blue-500" />
    }
  }

  const getSeverityBadge = (severity?: 'info' | 'warning' | 'critical') => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Urgent</Badge>
      case 'warning':
        return <Badge className="bg-orange-100 text-orange-700">Attention</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div>
            <h2 className="text-3xl font-bold text-gradient-helix">
              AI Clinical Assistant
            </h2>
            <p className="text-muted-foreground">
              Your intelligent health companion
            </p>
          </div>

        </div>

        <Button
          variant={isSpeaking ? 'default' : 'outline'}
          size="sm"
          onClick={toggleSpeaking}
          className="gap-2"
        >
          {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          {isSpeaking ? 'Speaking' : 'Muted'}
        </Button>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* AI PANEL */}
        <Card className="lg:col-span-1">

          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-teal-600" />
              AI Assistant
            </CardTitle>
            <CardDescription>Interactive health advisor</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">

            <div className="flex justify-center py-10">
              <Brain className="h-24 w-24 text-blue-500" />
            </div>

            <Button
              variant={isListening ? 'default' : 'outline'}
              className="w-full gap-2"
              onClick={toggleListening}
            >
              {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              {isListening ? 'Stop Listening' : 'Speak'}
            </Button>

          </CardContent>

        </Card>

        {/* CHAT AREA */}
        <Card className="lg:col-span-2 flex flex-col h-[600px]">

          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              Health Consultation
            </CardTitle>
            <CardDescription>
              Ask about symptoms or health concerns
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">

            <ScrollArea className="flex-1 p-4 h-[420px] overflow-y-auto">

              <div ref={scrollRef} className="space-y-4">

                {messages.map((msg) => (

                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >

                    <div
                      className={`max-w-[600px] rounded-2xl p-4 break-words shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700'
                      }`}
                    >

                      <div className="flex items-start gap-2">

                        {msg.role === 'assistant' && getSeverityIcon(msg.severity)}

                        <div>

                          <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                            {msg.content}
                          </p>

                          <div className="flex items-center gap-2 mt-2">

                            <span className="text-xs opacity-70">
                              {msg.timestamp.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>

                            {getSeverityBadge(msg.severity)}

                          </div>

                        </div>

                      </div>

                    </div>

                  </motion.div>

                ))}

                {isThinking && (
                  <div className="text-sm text-muted-foreground">
                    AI is thinking...
                  </div>
                )}

              </div>

            </ScrollArea>

            {/* INPUT */}
            <div className="p-4 border-t flex gap-2">

              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about your health concerns..."
                disabled={isThinking}
              />

              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isThinking}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                Send
              </Button>

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  )
}

