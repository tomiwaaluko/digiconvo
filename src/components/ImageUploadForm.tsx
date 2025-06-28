"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import ReactMarkdown from "react-markdown";

// A simple component to render an icon
const UploadIcon = () => (
  <svg
    className="w-8 h-8 mb-4 text-gray-500 "
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 16"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
    />
  </svg>
);


export default function ImageUploadForm() {
  // State for the image file and its preview URL
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // State for user-provided context about the conversation
  const [conversationContext, setConversationContext] = useState<string>("");
  
  // State to hold the analysis result from Gemini
  const [analysis, setAnalysis] = useState<string>("");
  
  // State to manage the loading status
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // tRPC mutation hook to call our backend procedure
  const analyzeMutation = api.gemini.imageAnalyze.useMutation({
    onSuccess: (data) => {
      setAnalysis(data);
    },
    onError: (error) => {
      console.error("Error analyzing conversation:", error);
      setAnalysis("## Error\n\nSorry, something went wrong while analyzing the image. Please check the console for more details and try again.");
    },
    onSettled: () => {
      // This will run on both success and error
      setIsLoading(false);
    }
  });

  // Handles the file input change event
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Basic client-side validation for file type
      if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
        alert("Please select a valid image file (PNG, JPG, WEBP).");
        return;
      }
      setImageFile(file);
      // FileReader to create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Triggers the mutation to send data to the backend
  const handleAnalysis = () => {
    if (selectedImage && imageFile) {
      const base64Image = selectedImage.split(",")[1];
      if (base64Image) {
        setIsLoading(true);
        setAnalysis(""); // Clear previous analysis
        analyzeMutation.mutate({
          image: base64Image,
          mimeType: imageFile.type,
          conversationContext,
        });
      }
    } else {
      alert("Please select an image first.");
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center text-gray-800">
          Conversation Coach
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Upload a screenshot of a text conversation for an AI-powered tone analysis.
        </p>
        
        <div className="flex flex-col items-center justify-center w-full mb-6">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            {selectedImage ? (
                <img src={selectedImage} alt="Selected Screenshot" className="object-contain h-full w-full p-2" />
            ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon />
                    <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 ">PNG, JPG or WEBP</p>
                </div>
            )}
            <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} />
          </label>
        </div> 

        <div className="flex flex-col gap-4">
          <textarea
            value={conversationContext}
            onChange={(e) => setConversationContext(e.target.value)}
            placeholder="Optional: What is this conversation about? (e.g., 'A breakup text with my ex', 'Trying to console a friend who lost their job')"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow"
            rows={2}
          />
          <button
            onClick={handleAnalysis}
            disabled={!selectedImage || isLoading}
            className="w-full bg-violet-600 text-white font-bold py-3 px-4 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                </div>
            ) : "Analyze Conversation"}
          </button>
        </div>

        {(isLoading || analysis) && (
          <div className="mt-8 p-4 md:p-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Communication Analysis:</h2>
            {isLoading && !analysis && (
              <p className="text-gray-500 animate-pulse">Gemini is thinking...</p>
            )}
            <div className="prose prose-violet max-w-none">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
       <footer className="text-center mt-6 text-sm text-gray-500">
        <p>Powered by Google Gemini & Next.js. Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.</p>
       </footer>
    </main>
  );
}