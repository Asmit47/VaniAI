export async function generateGeminiResponse(prompt: string): Promise<string> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Gemini API key is missing!");
      throw new Error("Gemini API key not configured");
    }

    console.log("Sending request to Gemini API...");

    // Use v1 endpoint and configurable model (default: gemini-1.5-flash)
    const model = import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-flash';
    const apiBase = import.meta.env.VITE_GEMINI_API_BASE || 'https://generativelanguage.googleapis.com';
    const url = `${apiBase}/v1/models/${model}:generateContent?key=${apiKey}`;

    const res = await fetch(
      url,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: prompt }] 
          }]
        })
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Gemini API Error:", res.status, errorText);
      throw new Error(`Gemini API failed: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    console.log("Gemini API Response:", data);
    
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      console.error("Empty response from Gemini:", data);
      throw new Error("No response from Gemini");
    }

    console.log("Successfully received response from Gemini");
    return responseText;
  } catch (error) {
    console.error("Error in generateGeminiResponse:", error);
    throw error;
  }
}