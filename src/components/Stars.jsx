import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Stars = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const duration = 30000; // 30 seconds for full cycle
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;
      setPosition(progress * 50); // Move 50% to the right
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Generate stars with concentration in center and top
  const stars = Array.from({ length: 80 }, (_, i) => {
    let x, y;
    
    // Bias towards center horizontally and top vertically
    const rand1 = Math.random();
    const rand2 = Math.random();
    
    // 70% of stars in center (30-70% horizontally)
    if (rand1 < 0.7) {
      x = 30 + Math.random() * 40;
    } else {
      x = Math.random() * 100;
    }
    
    // 80% of stars in top half (0-50% vertically)
    if (rand2 < 0.8) {
      y = Math.random() * 50;
    } else {
      y = 50 + Math.random() * 50;
    }
    
    const delay = Math.random() * 2;
    const duration = 2 + Math.random() * 1.5;
    
    return { x, y, delay, duration, id: i };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        style={{ x: `${position}%` }}
        transition={{ type: "tween", duration: 0 }}
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute text-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              fontSize: "0.75rem",
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Stars;