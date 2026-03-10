import { Leaf, Flower2, TreeDeciduous, Sparkles } from "lucide-react";

const FloatingPlants = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large floating leaves */}
      <div className="absolute top-[10%] left-[5%] text-sage-light/30 animate-drift">
        <Leaf className="w-12 h-12" />
      </div>
      <div className="absolute top-[20%] right-[8%] text-mint/20 animate-float-slow stagger-2">
        <Leaf className="w-16 h-16 rotate-45" />
      </div>
      <div className="absolute top-[60%] left-[3%] text-sage/15 animate-sway stagger-3">
        <Leaf className="w-10 h-10 -rotate-12" />
      </div>
      <div className="absolute bottom-[30%] right-[5%] text-mint-light/25 animate-drift stagger-4">
        <Leaf className="w-14 h-14 rotate-90" />
      </div>

      {/* Small floating flowers */}
      <div className="absolute top-[35%] left-[12%] text-sage-light/20 animate-wiggle">
        <Flower2 className="w-8 h-8" />
      </div>
      <div className="absolute top-[45%] right-[15%] text-mint/15 animate-breathe stagger-5">
        <Flower2 className="w-6 h-6" />
      </div>
      <div className="absolute bottom-[20%] left-[18%] text-sage/20 animate-float stagger-6">
        <Flower2 className="w-7 h-7" />
      </div>

      {/* Trees in corners */}
      <div className="absolute bottom-[5%] left-[2%] text-sage/10 animate-sway">
        <TreeDeciduous className="w-24 h-24" />
      </div>
      <div className="absolute bottom-[5%] right-[2%] text-mint/10 animate-sway stagger-3">
        <TreeDeciduous className="w-20 h-20" />
      </div>

      {/* Sparkles */}
      <div className="absolute top-[15%] left-[25%] text-sunlight/40 animate-sparkle">
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="absolute top-[50%] right-[20%] text-sunlight-soft/50 animate-sparkle stagger-4">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="absolute top-[70%] left-[30%] text-sunlight/30 animate-sparkle stagger-7">
        <Sparkles className="w-3 h-3" />
      </div>
      <div className="absolute top-[25%] right-[35%] text-sunlight-soft/40 animate-sparkle stagger-2">
        <Sparkles className="w-4 h-4" />
      </div>

      {/* Falling petals */}
      <div className="absolute top-0 left-[20%] text-sage-light/20 animate-petal-fall">
        <div className="w-3 h-3 rounded-full bg-current" />
      </div>
      <div className="absolute top-0 left-[40%] text-mint/15 animate-petal-fall stagger-5">
        <div className="w-2 h-2 rounded-full bg-current" />
      </div>
      <div className="absolute top-0 left-[60%] text-sage/20 animate-petal-fall stagger-8">
        <div className="w-4 h-4 rounded-full bg-current" />
      </div>
      <div className="absolute top-0 left-[80%] text-mint-light/25 animate-petal-fall stagger-3">
        <div className="w-2.5 h-2.5 rounded-full bg-current" />
      </div>

      {/* Floating leaf particles */}
      <div className="absolute top-[40%] left-[45%] animate-float-rotate">
        <div className="w-2 h-2 bg-sage/20 rounded-full" />
      </div>
      <div className="absolute top-[55%] left-[55%] animate-float-rotate stagger-6">
        <div className="w-1.5 h-1.5 bg-mint/25 rounded-full" />
      </div>
      <div className="absolute top-[30%] left-[70%] animate-float-rotate stagger-2">
        <div className="w-2.5 h-2.5 bg-sage-light/20 rounded-full" />
      </div>
    </div>
  );
};

export default FloatingPlants;
