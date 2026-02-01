import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import Stars from "@/components/Stars";
import StarsSettings from "@/components/StarsSettings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database } from "lucide-react";

const Birds = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const duration = 6000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;
      setPosition(progress);
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="absolute inset-x-0 -top-20 pointer-events-none">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          style={{
            left: `${position * 100 + (i * -15)}%`,
            top: `${Math.sin(position * Math.PI * 2 + i) * 20}px`,
            transform: "scaleX(-1)",
          }}
        >
          🐦
        </motion.div>
      ))}
    </div>
  );
};

const Cat = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const duration = 8000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;
      setPosition(progress);
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <motion.div
      className="absolute text-8xl top-8"
      style={{
        left: `${position * 90}%`,
      }}
      animate={{ scaleX: position > 0.5 ? -1 : 1 }}
      transition={{ type: "tween" }}
    >
      🐱
    </motion.div>
  );
};

const Monkey = ({ delay }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const duration = 20000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = (elapsed % duration) / duration;
      // Apply delay to each monkey
      const progress = Math.max(0, rawProgress - delay);
      setPosition(progress);
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [delay]);

  // First monkey (delay=0) makes a sound every 15 seconds
  useEffect(() => {
    if (delay !== 0) return;

    const playMonkeySound = () => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const now = audioContext.currentTime;
      
      // Create a monkey-like sound with varying frequencies
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      // Start with a high pitch and drop
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.4);
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.5);
      
      osc.start(now);
      osc.stop(now + 0.5);
    };

    const interval = setInterval(playMonkeySound, 15000);
    return () => clearInterval(interval);
  }, [delay]);

  const getTransform = () => {
    // Phase 1: Climbing up the ladder (0 - 0.2)
    if (position < 0.2) {
      const climbProgress = position / 0.2;
      return {
        x: '50%',
        y: `${100 - climbProgress * 100}%`,
        rotate: 0,
        opacity: 1
      };
    }
    // Phase 2: Wait at top for other monkeys (0.2 - 0.5)
    else if (position < 0.5) {
      return {
        x: '50%',
        y: '0%',
        rotate: 0,
        opacity: 1
      };
    }
    // Phase 3: Line up side by side (0.5 - 0.55)
    else if (position < 0.55) {
      const lineUpProgress = (position - 0.5) / 0.05;
      const monkeyIndex = delay * 10; // 0, 1, 2
      const spacing = monkeyIndex * 150;
      return {
        x: `${50 + spacing * lineUpProgress}%`,
        y: '0%',
        rotate: 90,
        opacity: 1
      };
    }
    // Phase 4: Walk right together toward U (0.55 - 0.75)
    else if (position < 0.75) {
      const walkProgress = (position - 0.55) / 0.2;
      const monkeyIndex = delay * 10;
      const spacing = monkeyIndex * 150;
      return {
        x: `${50 + spacing + walkProgress * 800}%`,
        y: '0%',
        rotate: 90,
        opacity: 1
      };
    }
    // Phase 5: Fall into U gap (0.75 - 0.85)
    else if (position < 0.85) {
      const fallProgress = (position - 0.75) / 0.1;
      const monkeyIndex = delay * 10;
      const spacing = monkeyIndex * 150;
      return {
        x: `${850 + spacing}%`,
        y: `${fallProgress * 50}%`,
        rotate: 180,
        opacity: 1
      };
    }
    // Phase 6: Stacked in U gap
    else {
      const monkeyIndex = delay * 10;
      const stackPosition = monkeyIndex * 80; // Stack vertically
      return {
        x: `${850 + 75}%`,
        y: `${50 + stackPosition}%`,
        rotate: 0,
        opacity: 1
      };
    }
  };

  const transform = getTransform();

  return (
    <motion.div
      className="absolute text-6xl -translate-x-1/2 -translate-y-1/2"
      style={{
        left: '0%',
        top: '0%',
        x: transform.x,
        y: transform.y,
        rotate: transform.rotate,
        opacity: transform.opacity
      }}
    >
      🐵
    </motion.div>
  );
};

export default function Home() {
  const [open, setOpen] = useState(false);

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => base44.entities.Contact.list(),
    initialData: [],
  });
  return (
    <div className="min-h-screen bg-blue-700 flex items-center justify-center relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" />

        {/* Twilight Stars */}
        <Stars />

        {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <div className="relative inline-block">
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[28rem] font-black text-white tracking-tighter leading-none select-none"
            style={{
              textShadow: "0 20px 60px rgba(0,0,0,0.3)",
              fontFamily: "Inter, system-ui, sans-serif"
            }}
          >
            BUBU
          </motion.h1>
          
          {/* Ladder on the B */}
          <div className="absolute left-[12%] top-[15%] bottom-[15%] w-[9%] pointer-events-none">
            <div className="relative w-full h-full">
              {/* Ladder sides */}
              <div className="absolute left-0 top-0 bottom-0 w-[25%] bg-amber-900/80 rounded-full" />
              <div className="absolute right-0 top-0 bottom-0 w-[25%] bg-amber-900/80 rounded-full" />
              {/* Ladder rungs */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 h-[3%] bg-amber-800/80 rounded-full"
                  style={{ top: `${i * 12.5 + 5}%` }}
                />
              ))}
            </div>
          </div>

          {/* Three Monkeys */}
          <div className="absolute left-[12%] top-[15%] w-[9%] h-[70%] pointer-events-none">
            <Monkey delay={0} />
            <Monkey delay={0.1} />
            <Monkey delay={0.2} />
          </div>
        </div>
        
        {/* Flock of Birds */}
        <Birds />
        
        {/* Prowling Cat */}
        <div className="absolute inset-x-0 pointer-events-none">
          <Cat />
        </div>
        
        {/* Subtle underline accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-2 bg-white/30 rounded-full mx-auto mt-4"
          style={{ width: "40%" }}
        />

        {/* Database Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-6 text-lg shadow-2xl"
              >
                <Database className="w-5 h-5 mr-2" />
                View Contacts
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl">Contact Database</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                {isLoading ? (
                  <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell className="font-medium">{contact.name}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </motion.div>
    </div>
  );
}