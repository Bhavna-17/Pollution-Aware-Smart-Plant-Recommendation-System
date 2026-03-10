import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Users, Plus, Search, TrendingUp, Award } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingPlants from "@/components/background/FloatingPlants";
import CommunityTip from "@/components/community/CommunityTip";
import { toast } from "sonner";

const communityTips = [
  {
    author: { name: "Priya Sharma", location: "Mumbai, India" },
    content: "Snake plants are absolute champions in high pollution areas! I've had mine for 3 years on my roadside balcony and it's thriving. Pro tip: Don't overwater - once every 2 weeks is enough.",
    plant: "Snake Plant",
    likes: 234,
    comments: 45,
    isVerified: true,
    tags: ["pollution-resistant", "beginner-tips", "balcony"],
    createdAt: "2 hours ago",
  },
  {
    author: { name: "Rahul Verma", location: "Delhi, India" },
    content: "For anyone struggling with high PM2.5 levels, I recommend grouping 3-4 air purifying plants together. The combined effect is much better than single plants scattered around.",
    plant: "Multiple Plants",
    likes: 189,
    comments: 32,
    isVerified: false,
    tags: ["air-quality", "arrangement", "tips"],
    createdAt: "5 hours ago",
  },
  {
    author: { name: "Anita Gupta", location: "Bangalore, India" },
    content: "Added vermicompost to my Peace Lily and the difference is incredible! More flowers, bigger leaves. Highly recommend organic fertilizers for indoor plants.",
    plant: "Peace Lily",
    likes: 156,
    comments: 28,
    isVerified: true,
    tags: ["fertilizer", "organic", "indoor"],
    createdAt: "1 day ago",
  },
  {
    author: { name: "Amit Patel", location: "Chennai, India" },
    content: "Summer tip: Move your Areca Palm slightly away from direct afternoon sun. Mine was getting brown tips until I moved it to a spot with filtered light.",
    plant: "Areca Palm",
    likes: 98,
    comments: 15,
    isVerified: false,
    tags: ["summer-care", "sunlight", "troubleshooting"],
    createdAt: "2 days ago",
  },
];

const topContributors = [
  { name: "Priya S.", tips: 45, badge: "🌟 Expert" },
  { name: "Rahul V.", tips: 32, badge: "🌿 Pro" },
  { name: "Meera K.", tips: 28, badge: "🌱 Rising" },
];

const Community = () => {
  const [newTip, setNewTip] = useState("");
  const [plantName, setPlantName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmitTip = () => {
    if (!newTip.trim()) {
      toast.error("Please write something!", {
        description: "Share your plant wisdom with the community.",
      });
      return;
    }
    
    toast.success("Tip submitted! 🌿", {
      description: "Your tip will be reviewed and published shortly.",
    });
    setNewTip("");
    setPlantName("");
  };

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingPlants />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-sage" />
            <span className="text-sage font-medium text-sm">Community Wisdom</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Plant Tips & Experiences
          </h1>
          <p className="text-muted-foreground">
            Learn from fellow planters and share your own green journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <div className="relative animate-fade-in-up">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tips by plant name or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11"
              />
            </div>

            {/* Share a tip */}
            <Card variant="nature" className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="w-5 h-5 text-sage" />
                  Share Your Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Plant name (optional)"
                  value={plantName}
                  onChange={(e) => setPlantName(e.target.value)}
                />
                <Textarea
                  placeholder="Share your tip, experience, or advice with the community..."
                  value={newTip}
                  onChange={(e) => setNewTip(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <Button variant="eco" onClick={handleSubmitTip}>
                  <Plus className="w-4 h-4 mr-2" />
                  Share Tip
                </Button>
              </CardContent>
            </Card>

            {/* Community Tips */}
            <div className="space-y-4">
              {communityTips.map((tip, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                >
                  <CommunityTip {...tip} />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card variant="elevated" className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-sage" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["#pollution-resistant", "#summer-care", "#indoor-plants", "#beginner-tips", "#air-purifier", "#organic"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-sage/10 text-sage text-sm font-medium cursor-pointer hover:bg-sage/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card variant="glass" className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-4 h-4 text-sunlight" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {topContributors.map((contributor, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-card/50 hover:bg-card transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-sage">{i + 1}</span>
                        <div>
                          <p className="font-medium text-foreground">{contributor.name}</p>
                          <p className="text-xs text-muted-foreground">{contributor.tips} tips shared</p>
                        </div>
                      </div>
                      <span className="text-sm">{contributor.badge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card variant="default" className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              <CardHeader>
                <CardTitle className="text-lg">📋 Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Be respectful and helpful</li>
                  <li>• Share accurate, tested information</li>
                  <li>• Include plant names when relevant</li>
                  <li>• Report misleading content</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
