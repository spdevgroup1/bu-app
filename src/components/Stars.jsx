import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Stars = ({ settings, isPaused }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (isPaused) return;

    const duration = settings.duration * 1000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;
      setPosition(progress * 100);
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [settings.duration, isPaused]);

  // Generate stars scattered across top half of screen
  const stars = Array.from({ length: settings.count }, (_, i) => {
    const rand1 = Math.random();
    const rand2 = Math.random();
    
    // Scatter evenly across full width
    const x = rand1 * 100;
    
    // All stars distributed across top density% of screen
    const y = (rand2 * settings.density) / 100 * 100;
    
    return { x, y, id: i };
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