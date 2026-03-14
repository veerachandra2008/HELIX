'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Image as ImageIcon,
  Video,
  Users,
  TrendingUp,
  Hash,
  Search,
  Plus,
  Send,
  ThumbsUp,
  UserPlus,
  Shield,
  MapPin,
  Calendar,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

const posts = [
  {
    id: 1,
    user: { name: 'Dr. Priya Sharma', avatar: 'PS', role: 'Gynecologist', verified: true },
    content: 'Just completed a successful high-risk pregnancy delivery at our clinic. The mother and baby are both healthy! #MaternalHealth #HealthcareHeroes',
    image: null,
    likes: 234,
    comments: 45,
    shares: 12,
    time: '2 hours ago',
    category: 'Success Story'
  },
  {
    id: 2,
    user: { name: 'Health Camp Team', avatar: 'HC', role: 'Healthcare NGO', verified: true },
    content: '🏥 Free health camp conducted in rural Telangana. 500+ beneficiaries received free checkups, medicines, and health education. Together we can make healthcare accessible to all!',
    image: 'health-camp',
    likes: 567,
    comments: 89,
    shares: 34,
    time: '5 hours ago',
    category: 'Health Camp'
  },
  {
    id: 3,
    user: { name: 'Rajesh Kumar', avatar: 'RK', role: 'Community Health Worker', verified: false },
    content: 'Successfully vaccinated 200+ children against measles in our village. Together with local volunteers, we\'re building a healthier community. #VaccinationDrive #PublicHealth',
    image: null,
    likes: 189,
    comments: 23,
    shares: 8,
    time: '8 hours ago',
    category: 'Vaccination'
  }
]

const trendingTopics = [
  { tag: 'MaternalHealth', posts: '12.5K' },
  { tag: 'HealthCamp', posts: '8.2K' },
  { tag: 'VaccinationDrive', posts: '6.7K' },
  { tag: 'PublicHealth', posts: '15.3K' },
  { tag: 'DiseasePrevention', posts: '9.1K' }
]

const suggestedUsers = [
  { name: 'Dr. Anjali Reddy', role: 'Pediatrician', avatar: 'AR', followers: '12.5K' },
  { name: 'City Hospital', role: 'Healthcare Facility', avatar: 'CH', followers: '45.2K' },
  { name: 'Rural Health Initiative', role: 'NGO', avatar: 'RH', followers: '8.7K' }
]

export default function CommunityHealthNetwork() {
  const { toast } = useToast()
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set())
  const [newPost, setNewPost] = useState('')
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<number | null>(null)

  const handleCreatePost = () => {
    if (!newPost.trim()) {
      toast({
        title: 'Empty Post',
        description: 'Please write something to post',
        variant: 'destructive'
      })
      return
    }

    toast({
      title: 'Post Created',
      description: 'Your post has been shared with the community!',
    })
    setNewPost('')
    setShowCreatePost(false)
  }

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
        toast({
          title: 'Post Liked!',
          description: 'You liked this post',
        })
      }
      return newSet
    })
  }

  const toggleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
        toast({ title: 'Removed from Bookmarks', description: 'Post removed from bookmarks' })
      } else {
        newSet.add(postId)
        toast({
          title: 'Bookmarked!',
          description: 'Post saved to bookmarks',
        })
      }
      return newSet
    })
  }

  const handleComment = (postId: number) => {
    toast({
      title: 'Comments',
      description: 'Comments section coming soon!',
    })
  }

  const handleShare = (postId: number) => {
    setSelectedPost(postId)
    setShowShareModal(true)
  }

  const handleCopyLink = () => {
    if (navigator.clipboard && selectedPost) {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: 'Link Copied!',
        description: 'Post link copied to clipboard',
      })
      setShowShareModal(false)
    }
  }

  const handleConnect = (userName: string) => {
    toast({
      title: 'Connection Request Sent',
      description: `Connection request sent to ${userName}`,
    })
  }

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords
        const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`
        navigator.clipboard.writeText(locationUrl)
        toast({
          title: 'Location Shared',
          description: 'Location copied to clipboard',
        })
      }, (error) => {
        toast({
          title: 'Location Error',
          description: 'Could not get your location',
          variant: 'destructive'
        })
      })
    } else {
      toast({
        title: 'Location Not Available',
        description: 'Geolocation is not supported',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gradient-primary">Community Health Network</h2>
          <p className="text-muted-foreground mt-1">Connect, share, and learn from healthcare professionals</p>
        </div>
        <Button className="btn-gradient-primary" onClick={() => setShowCreatePost(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          {showCreatePost && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Card className="modern-card">
                <CardContent className="p-6">
                  <Textarea
                    placeholder="Share your healthcare story, achievement, or insight..."
                    className="min-h-[120px] resize-none mb-4"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Video
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShareLocation}>
                        <MapPin className="h-4 w-4 mr-2" />
                        Location
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" onClick={() => setShowCreatePost(false)}>
                        Cancel
                      </Button>
                      <Button className="btn-gradient-primary" disabled={!newPost.trim()} onClick={handleCreatePost}>
                        <Send className="h-4 w-4 mr-2" />
                        Post
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Posts Feed */}
          {posts.map((post) => (
            <Card key={post.id} className="modern-card">
              <CardContent className="p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/avatars/${post.user.avatar}.png`} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                        {post.user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{post.user.name}</span>
                        {post.user.verified && (
                          <Shield className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{post.user.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.time}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-sm mb-4 leading-relaxed">{post.content}</p>

                {/* Post Image */}
                {post.image && (
                  <div className="rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8 text-center">
                    <ImageIcon className="h-16 w-16 mx-auto text-indigo-500 mb-2" />
                    <p className="text-sm text-muted-foreground">Image: {post.image}</p>
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-2 ${likedPosts.has(post.id) ? 'text-red-500' : ''}`}
                    >
                      <Heart className={`h-5 w-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                      <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => handleComment(post.id)}>
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => handleShare(post.id)}>
                      <Share2 className="h-5 w-5" />
                      <span>{post.shares}</span>
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleBookmark(post.id)}
                  >
                    <Bookmark className={`h-5 w-5 ${bookmarkedPosts.has(post.id) ? 'fill-current text-indigo-500' : ''}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-indigo-500" />
                      <span className="font-medium text-sm">{topic.tag}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{topic.posts} posts</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suggested Users */}
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Suggested Connections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestedUsers.map((user, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0" onClick={() => handleConnect(user.name)}>
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card className="modern-card">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-6 w-6 text-green-500" />
                  <span className="font-semibold">Verified Healthcare Network</span>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div>
                    <p className="text-2xl font-bold text-gradient-primary">50K+</p>
                    <p className="text-xs text-muted-foreground">Healthcare Providers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gradient-secondary">1M+</p>
                    <p className="text-xs text-muted-foreground">Community Members</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
