import { motion } from "framer-motion";

export default function Home() {
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
        
        {/* Subtle underline accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-2 bg-white/30 rounded-full mx-auto mt-4"
          style={{ width: "40%" }}
        />
      </motion.div>
    </div>
  );
}