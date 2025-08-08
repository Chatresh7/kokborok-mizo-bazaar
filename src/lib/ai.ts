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
  // Placeholder: integrate browser speech recognition or ElevenLabs STS
  throw new Error("Voice input requires enabling a speech API key. Coming soon.");
}
