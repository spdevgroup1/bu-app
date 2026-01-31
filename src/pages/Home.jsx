import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
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

const ClimbingMonkey = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const duration = 12000; // 12 seconds for full cycle
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

  // Calculate position based on animation progress
  const getTransform = () => {
    if (position < 0.3) {
      // Climbing up the ladder (center)
      const upProgress = position / 0.3;
      return {
        x: '0%',
        y: `${100 - upProgress * 100}%`,
        rotate: 0
      };
    } else if (position < 0.4) {
      // Moving across top
      const acrossProgress = (position - 0.3) / 0.1;
      return {
        x: `${-acrossProgress * 600}%`,
        y: '0%',
        rotate: -90
      };
    } else if (position < 0.8) {
      // Climbing down the left side
      const downProgress = (position - 0.4) / 0.4;
      return {
        x: '-600%',
        y: `${downProgress * 100}%`,
        rotate: 180
      };
    } else {
      // Moving back to ladder start
      const backProgress = (position - 0.8) / 0.2;
      return {
        x: `${-600 + backProgress * 600}%`,
        y: '100%',
        rotate: 90
      };
    }
  };

  const transform = getTransform();

  return (
    <motion.div
      className="absolute text-6xl"
      style={{
        left: '50%',
        top: '0%',
        x: transform.x,
        y: transform.y,
        rotate: transform.rotate,
        transformOrigin: 'center',
        marginLeft: '-1.5rem',
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
            BU
          </motion.h1>
          
          {/* Ladder on the B */}
          <div className="absolute left-[12%] top-[10%] bottom-[10%] w-[3%] pointer-events-none">
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

          {/* Climbing Monkey */}
          <div className="absolute left-[12%] top-[10%] w-[3%] h-[80%] pointer-events-none">
            <ClimbingMonkey />
          </div>
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