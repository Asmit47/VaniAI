export async function speakText(text: string): Promise<void> {
  try {
    const apiKey = import.meta.env.VITE_AZURE_API_KEY;
    const region = import.meta.env.VITE_AZURE_REGION || "centralindia";

    // Check if API key exists
    if (!apiKey) {
      console.error("Azure TTS API key is missing!");
      throw new Error("Azure TTS API key not configured");
    }

    console.log("Speaking text:", text.substring(0, 50) + "...");

    const res = await fetch(
      `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
        },
        body: `<speak version='1.0' xml:lang='en-US'>
                <voice xml:lang='en-US' xml:gender='Female' name='en-US-JennyNeural'>
                  ${escapeXml(text)}
                </voice>
              </speak>`,
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Azure TTS Error:", res.status, errorText);
      throw new Error(`Azure TTS failed: ${res.status} - ${errorText}`);
    }

    const blob = await res.blob();
    
    // Check if blob has content
    if (blob.size === 0) {
      throw new Error("Received empty audio blob from Azure TTS");
    }

    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    
    // Add event listeners for debugging
    audio.oncanplaythrough = () => {
      console.log("Audio ready to play");
    };
    
    audio.onerror = (e) => {
      console.error("Audio playback error:", e);
    };
    
    audio.onended = () => {
      URL.revokeObjectURL(audioUrl); // Clean up
      console.log("Audio playback completed");
    };

    await audio.play();
    console.log("Audio playback started");
    
  } catch (error) {
    console.error("Error in speakText:", error);
    throw error;
  }
}

// Helper function to escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}