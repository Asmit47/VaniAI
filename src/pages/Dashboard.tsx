import { PracticeCard } from "@/components/PracticeCard";
import { BottomNav } from "@/components/BottomNav";
import { GlassCard } from "@/components/GlassCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Mic, Briefcase, Presentation, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const practiceModesData = [
    {
      title: "AI Speech Practice",
      description: "Practice speaking on any topic with AI feedback on fluency, grammar, and clarity",
      icon: Mic,
      gradient: "bg-gradient-to-br from-primary to-primary-glow",
      path: "/practice/speech",
    },
    {
      title: "Mock Interview",
      description: "Prepare for job interviews with customized questions and detailed feedback",
      icon: Briefcase,
      gradient: "bg-gradient-to-br from-secondary to-accent",
      path: "/practice/interview",
    },
    {
      title: "Presentation Practice",
      description: "Upload your slides and practice delivering confident presentations",
      icon: Presentation,
      gradient: "bg-gradient-to-br from-accent to-primary",
      path: "/practice/presentation",
    },
    {
      title: "Group Discussion",
      description: "Simulate group discussions with AI participants and improve your debate skills",
      icon: Users,
      gradient: "bg-gradient-to-br from-primary to-secondary",
      path: "/practice/group",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Practice Modes</h1>
              <p className="text-sm text-muted-foreground mt-1">Choose your training today</p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                V
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
        {/* Today's Goal */}
        <GlassCard className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Daily Goal</h3>
              <p className="text-sm text-muted-foreground">Complete 2 practice sessions today</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">1/2</div>
              <p className="text-xs text-muted-foreground">sessions</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-white/50 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500" />
          </div>
        </GlassCard>

        {/* Practice Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practiceModesData.map((mode, index) => (
            <div
              key={mode.title}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PracticeCard
                title={mode.title}
                description={mode.description}
                icon={mode.icon}
                gradient={mode.gradient}
                onClick={() => navigate(mode.path)}
              />
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <GlassCard hover={false} className="text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground mt-1">Total Sessions</p>
          </GlassCard>
          <GlassCard hover={false} className="text-center">
            <div className="text-2xl font-bold text-secondary">5</div>
            <p className="text-xs text-muted-foreground mt-1">Day Streak</p>
          </GlassCard>
          <GlassCard hover={false} className="text-center">
            <div className="text-2xl font-bold text-accent">78%</div>
            <p className="text-xs text-muted-foreground mt-1">Avg Score</p>
          </GlassCard>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
