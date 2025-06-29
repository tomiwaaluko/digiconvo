"use client";

import Image from "next/image";
import { useState } from "react";
import { api } from "~/trpc/react";
import ReactMarkdown from "react-markdown";

// A simple component to render an icon
const UploadIcon = () => (
  <svg
    className="mb-4 h-8 w-8 text-gray-500"
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
      setAnalysis(
        "## Error\n\nSorry, something went wrong while analyzing the image. Please check the console for more details and try again.",
      );
    },
    onSettled: () => {
      // This will run on both success and error
      setIsLoading(false);
    },
  });

  // Handles the file input change event
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Basic client-side validation for file type
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 md:p-8">
      <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-lg md:p-8">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800 md:text-4xl">
          Conversation Coach
        </h1>
        <p className="mb-6 text-center text-gray-500">
          Upload a screenshot of a text conversation for an AI-powered tone
          analysis.
        </p>

        <div className="mb-6 flex w-full flex-col items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="Selected Screenshot"
                width={300}
                height={200}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG or WEBP</p>
              </div>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <textarea
            value={conversationContext}
            onChange={(e) => setConversationContext(e.target.value)}
            placeholder="Optional: What is this conversation about? (e.g., 'A breakup text with my ex', 'Trying to console a friend who lost their job')"
            className="w-full rounded-md border border-gray-300 p-3 transition-shadow focus:border-violet-500 focus:ring-2 focus:ring-violet-500"
            rows={2}
          />
          <button
            onClick={handleAnalysis}
            disabled={!selectedImage || isLoading}
            className="w-full rounded-md bg-violet-600 px-4 py-3 font-bold text-white transition-colors hover:bg-violet-700 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyzing...
              </div>
            ) : (
              "Analyze Conversation"
            )}
          </button>
        </div>

        {(isLoading || analysis) && (
          <div className="mt-8">
            {isLoading && !analysis && (
              <div className="py-8 text-center">
                <div className="inline-flex items-center rounded-full bg-violet-100 px-4 py-2 text-violet-700">
                  <svg
                    className="mr-3 -ml-1 h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="font-medium">
                    Gemini is analyzing your conversation...
                  </span>
                </div>
              </div>
            )}
            {analysis && (
              <div className="conversation-analysis">
                <div className="prose prose-violet max-w-none">
                  <ReactMarkdown
                    components={{
                      h2: ({ children }) => (
                        <h2 className="analysis-section-title">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="analysis-subsection-title">
                          {children}
                        </h3>
                      ),
                      p: ({ children, ...props }) => {
                        // Handle participant messages by checking if children contains a colon pattern
                        if (
                          typeof children === "string" &&
                          children.includes(":")
                        ) {
                          const colonIndex = children.indexOf(":");
                          if (colonIndex > 0) {
                            const label = children
                              .substring(0, colonIndex)
                              .trim();
                            const message = children
                              .substring(colonIndex + 1)
                              .trim();
                            // Check if this looks like a participant message (not just any colon)
                            if (
                              label.length < 20 &&
                              (label.includes("Person") ||
                                label.includes("User") ||
                                label.includes("Gabe") ||
                                /^[A-Z][a-zA-Z\s]*[A-Za-z]:?$/.test(label))
                            ) {
                              // Determine if message should be on left or right
                              const isUser = label.toLowerCase().includes("person a") || 
                                           label.toLowerCase().includes("user") ||
                                           !label.toLowerCase().includes("gabe");
                              const isRight = isUser;
                              
                              return (
                                <div className={`chat-message ${isRight ? 'right' : 'left'}`}>
                                  <div className="chat-avatar">
                                    {label.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="chat-sender">{label}</div>
                                    <div className="chat-bubble">
                                      {message}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          }
                        }
                        return <p {...props}>{children}</p>;
                      },
                      ul: ({ children }) => (
                        <ul className="suggestion-list">{children}</ul>
                      ),
                      li: ({ children }) => (
                        <li className="suggestion-item">
                          <div className="suggestion-text">{children}</div>
                        </li>
                      ),
                      strong: ({ children }) => (
                        <span className="analysis-highlight">{children}</span>
                      ),
                      em: ({ children }) => (
                        <span className="key-insight">{children}</span>
                      ),
                    }}
                  >
                    {analysis}
                  </ReactMarkdown>
                  <div className="analysis-footer">
                    Analysis completed with AI-powered insights for better
                    communication
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <footer className="mt-6 text-center text-sm text-gray-500">
        <p>
          Powered by Google Gemini & Next.js. Today is{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          .
        </p>
      </footer>
    </main>
  );
}
