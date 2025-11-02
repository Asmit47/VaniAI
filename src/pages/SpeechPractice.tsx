import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, Square, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { uploadAudioToAssembly, createTranscript, pollTranscript } from "@/integrations/assembly";
import { generateGeminiResponse } from "@/integrations/gemini";
import { speakText } from "@/integrations/azureTts";

const SpeechPractice = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isRecording, audioBlob, startRecording, stopRecording, resetRecording } = useAudioRecorder();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [customTopic, setCustomTopic] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; score: number } | null>(null);
  const [voiceFeedbackEnabled, setVoiceFeedbackEnabled] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const suggestedTopics = [
    "My Career Goals",
    "Favorite Hobby",
    "A Challenge I Overcame",
    "Technology and Future",
    "Work-Life Balance",
    "Leadership Experience",
  ];

  const handleStartRecording = async () => {
    if (!selectedTopic && !customTopic) {
      toast({
        title: "Topic Required",
        description: "Please select or enter a topic first",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await startRecording();
      setFeedback(null);
      toast({
        title: "Recording Started",
        description: "Speak clearly about your chosen topic",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive",
      });
    }
  };

  const handleStopRecording = async () => {
    stopRecording();
    toast({
      title: "Processing",
      description: "Transcribing and analyzing your speech...",
    });
  };

  const processAudio = async () => {
    if (!audioBlob) return;

    setIsProcessing(true);
    try {
      // Upload and transcribe via AssemblyAI
      const uploadUrl = await uploadAudioToAssembly(audioBlob);
      const created = await createTranscript(uploadUrl);
      const result = await pollTranscript(created.id);

      const transcriptText: string = result.text || "";

      // Analyze with Gemini and request a numeric score and feedback in JSON
      const topic = selectedTopic || customTopic;
      const prompt = `You are a speech coach. Analyze the following speech on the topic "${topic}" and return a concise JSON object with keys: feedback (string) and score (number 0-100). Speech:\n\n${transcriptText}`;
      const analysisRaw = await generateGeminiResponse(prompt);
      let analysis = { feedback: analysisRaw, score: 0 } as { feedback: string; score: number };
      try {
        const jsonMatch = analysisRaw.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || analysisRaw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
          if (typeof parsed?.feedback === 'string' && typeof parsed?.score === 'number') {
            analysis = { feedback: parsed.feedback, score: parsed.score };
          }
        }
      } catch {}

      setFeedback({ text: analysis.feedback, score: analysis.score });

      toast({
        title: "Analysis Complete",
        description: `Score: ${analysis.score}/100`,
      });

      if (voiceFeedbackEnabled) {
        playVoiceFeedback(analysis.feedback);
      }
    } catch (error) {
      console.error('Error processing audio:', error);
      toast({
        title: "Error",
        description: "Failed to process audio",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      resetRecording();
    }
  };

  if (audioBlob && !isProcessing && !feedback) {
    processAudio();
  }

  const playVoiceFeedback = async (text: string) => {
    setIsPlayingAudio(true);
    try {
      await speakText(text);
      setIsPlayingAudio(false);
    } catch (error) {
      console.error('Error playing voice feedback:', error);
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">AI Speech Practice</h1>
              <p className="text-xs text-muted-foreground">Practice speaking on any topic</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 pb-24 animate-fade-in">
        {/* Topic Selection */}
        {!isRecording && (
          <>
            <GlassCard>
              <h3 className="text-lg font-semibold text-foreground mb-4">Choose Your Topic</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {suggestedTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => {
                      setSelectedTopic(topic);
                      setCustomTopic("");
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedTopic === topic
                        ? "border-primary bg-primary/10 shadow-lg scale-105"
                        : "border-border bg-white/40 hover:bg-white/60"
                    }`}
                  >
                    <p className="text-sm font-medium text-foreground">{topic}</p>
                  </button>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-semibold text-foreground mb-4">Or Enter Custom Topic</h3>
              <input
                type="text"
                value={customTopic}
                onChange={(e) => {
                  setCustomTopic(e.target.value);
                  setSelectedTopic(null);
                }}
                placeholder="Type your topic here..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </GlassCard>
          </>
        )}

        {/* Recording Interface */}
        <GlassCard className="text-center space-y-6 bg-gradient-to-br from-primary/5 to-secondary/5">
          {isRecording && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-2xl font-bold text-foreground">
                {selectedTopic || customTopic}
              </h3>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl animate-pulse">
                    <Mic className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary blur-xl opacity-50 animate-glow" />
                </div>
              </div>
              <p className="text-muted-foreground">Listening to your speech...</p>
            </div>
          )}

          {!isRecording && (selectedTopic || customTopic) && (
            <div className="space-y-4 animate-scale-in">
              <Sparkles className="w-12 h-12 mx-auto text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Ready to Practice</h3>
              <p className="text-muted-foreground">
                Topic: <span className="font-semibold text-foreground">{selectedTopic || customTopic}</span>
              </p>
            </div>
          )}

          <div className="flex justify-center gap-4 pt-4">
            {!isRecording ? (
              <Button
                variant="hero"
                size="lg"
                onClick={handleStartRecording}
                disabled={!selectedTopic && !customTopic}
              >
                <Mic className="w-5 h-5" />
                Start Recording
              </Button>
            ) : (
              <Button
                variant="destructive"
                size="lg"
                onClick={handleStopRecording}
              >
                <Square className="w-5 h-5" />
                Stop Recording
              </Button>
            )}
          </div>
        </GlassCard>

        {/* Feedback */}
        {feedback && (
          <GlassCard className="bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Your Score</h3>
                <div className="text-3xl font-bold text-primary">{feedback.score}/100</div>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{feedback.text}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setFeedback(null);
                  setSelectedTopic(null);
                  setCustomTopic("");
                }}
                className="w-full"
              >
                Practice Again
              </Button>
            </div>
          </GlassCard>
        )}

        {/* Voice Feedback Toggle */}
        {!isRecording && !isProcessing && (
          <GlassCard className="bg-accent/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Voice Feedback</h3>
                <p className="text-xs text-muted-foreground">Hear your results aloud</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={voiceFeedbackEnabled}
                  onChange={(e) => setVoiceFeedbackEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </GlassCard>
        )}

        {/* Tips */}
        {!isRecording && !feedback && !isProcessing && (
          <GlassCard className="bg-accent/10">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              Tips for Better Practice
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Speak clearly and at a natural pace</li>
              <li>• Structure your thoughts before speaking</li>
              <li>• Try to speak for at least 2-3 minutes</li>
              <li>• Practice in a quiet environment</li>
            </ul>
          </GlassCard>
        )}
      </div>
    </div>
  );
};

export default SpeechPractice;
