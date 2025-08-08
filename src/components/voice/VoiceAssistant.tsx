import { useState } from "react";
import { toast } from "sonner";
import { Mic, Square } from "lucide-react";
import { startVoiceInput } from "@/lib/ai";

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);

  const handleClick = async () => {
    try {
      setListening(true);
      const text = await startVoiceInput();
      toast.success(text ? `Heard: ${text}` : "No speech detected");
    } catch (e: any) {
      toast.error(e?.message || "Voice input unavailable");
    } finally {
      setListening(false);
    }
  };

  return (
    <button
      aria-label={listening ? "Stop voice assistant" : "Start voice assistant"}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-xl border bg-primary text-primary-foreground hover-scale focus-visible:ring-2 px-4 h-12 flex items-center gap-2"
      title="Voice Assistant"
    >
      {listening ? <Square size={18} /> : <Mic size={18} />}
      <span className="text-sm font-medium">{listening ? "Listening…" : "Speak"}</span>
    </button>
  );
};

export default VoiceAssistant;
