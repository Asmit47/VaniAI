import { Home, LayoutDashboard, TrendingUp, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: LayoutDashboard, label: "Practice", path: "/dashboard" },
  { icon: TrendingUp, label: "Progress", path: "/progress" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    setIsVisible(true);
    
    if (hideTimer) {
      clearTimeout(hideTimer);
    }
    
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 6000);
    
    setHideTimer(timer);
  }, [hideTimer]);

  useEffect(() => {
    resetTimer();

    const handleMouseMove = (e: MouseEvent) => {
      // Show nav when mouse is in bottom 150px of screen
      if (window.innerHeight - e.clientY < 150) {
        resetTimer();
      }
    };

    const handleClick = () => {
      resetTimer();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [resetTimer]);

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border z-50 safe-bottom transition-transform duration-500",
      isVisible ? "translate-y-0" : "translate-y-full"
    )}>
      <div className="flex justify-around items-center h-20 px-4 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-300",
                isActive 
                  ? "text-primary scale-110" 
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "animate-scale-in")} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
