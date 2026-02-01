import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, Play, Pause } from "lucide-react";

export default function StarsSettings({ settings, onSettingsChange, isPaused, onPausedChange }) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (key, value) => {
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    onSettingsChange(updated);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="absolute top-6 right-6 z-20 bg-white/10 hover:bg-white/20 border-white/30"
        >
          <Settings className="w-4 h-4 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Starfield Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Stars: {localSettings.count}</label>
            <Slider
              min={1}
              max={100}
              step={1}
              value={[localSettings.count]}
              onValueChange={(val) => handleChange("count", val[0])}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Speed (seconds): {localSettings.duration}</label>
            <Slider
              min={30}
              max={300}
              step={10}
              value={[localSettings.duration]}
              onValueChange={(val) => handleChange("duration", val[0])}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Color</label>
            <div className="flex gap-2">
              {["white", "yellow", "cyan", "purple", "pink"].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    localSettings.color === color ? "border-white scale-110" : "border-gray-400"
                  }`}
                  style={{
                    backgroundColor:
                      color === "white"
                        ? "white"
                        : color === "yellow"
                          ? "#FBBF24"
                          : color === "cyan"
                            ? "#06B6D4"
                            : color === "purple"
                              ? "#A78BFA"
                              : "#EC4899",
                  }}
                  onClick={() => handleChange("color", color)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Density: {localSettings.density}</label>
            <Slider
              min={20}
              max={80}
              step={5}
              value={[localSettings.density]}
              onValueChange={(val) => handleChange("density", val[0])}
              className="w-full"
            />
          </div>

          <Button
            onClick={() => onPausedChange(!isPaused)}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4 mr-2" /> Resume Stars
              </>
            ) : (
              <>
                <Pause className="w-4 h-4 mr-2" /> Pause Stars
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}