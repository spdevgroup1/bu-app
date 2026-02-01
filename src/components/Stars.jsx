import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Stars = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const duration = 120000; // 120 seconds for full cycle (much slower)
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;
      setPosition(progress * 100); // Move 100% to the right over 120 seconds (2 minutes)
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Generate stars scattered across top half of screen
  const stars = Array.from({ length: 45 }, (_, i) => {
    const rand1 = Math.random();
    const rand2 = Math.random();
    
    // Scatter evenly across full width
    const x = rand1 * 100;
    
    // All stars distributed across top 50% of screen
    const y = rand2 * 50;
    
    const delay = Math.random() * 2;
    const duration = 2 + Math.random() * 1.5;
    
    return { x, y, delay, duration, id: i };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        style={{ x: `${position}%`, width: "100%", height: "100%" }}
        transition={{ type: "linear", duration: 120, repeat: Infinity }}
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute text-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              fontSize: "1.25rem",
            }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0 }}
          >
            ✨
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Stars;