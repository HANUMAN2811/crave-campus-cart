
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:54321/functions/v1/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedImage(data.imageUrl);
      toast.success("Image generated successfully!");
    } catch (error) {
      toast.error("Failed to generate image. Please try again.");
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6 animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">AI Image Generator</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Enter your image prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={generateImage}
            disabled={isLoading}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate'
            )}
          </Button>
        </div>
      </div>

      {generatedImage && (
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src={generatedImage}
            alt="AI Generated"
            className="w-full h-auto"
          />
        </div>
      )}
    </div>
  );
};
