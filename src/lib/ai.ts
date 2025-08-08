export async function translateText(text: string, direction: "kok-en" | "en-kok") {
  // Placeholder: wire to your preferred translation API or local model
  // Show simple passthrough for now
  return text;
}

export async function suggestPrice(cropType: string, location: string, quantity: string) {
  // Placeholder suggestion logic; replace with AI integration
  const base = cropType.toLowerCase().includes("rice") ? 35 : 25;
  return base;
}

export async function startVoiceInput(): Promise<string> {
  return new Promise((resolve, reject) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return reject(new Error("This browser doesn't support speech recognition."));
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const text = event.results?.[0]?.[0]?.transcript ?? "";
      resolve(text);
    };
    recognition.onerror = (event: any) => {
      reject(new Error(event.error || "Speech recognition error"));
    };
    recognition.onend = () => {
      // If no result came, resolve empty string to avoid hanging
      resolve("");
    };

    try {
      recognition.start();
    } catch (e) {
      reject(new Error("Failed to start speech recognition"));
    }
  });
}
