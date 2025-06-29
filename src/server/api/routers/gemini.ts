/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const emotionColors: { [key: string]: string } = {
  Happy: "#10B981",
  Sad: "#6B7280",
  Angry: "#EF4444",
  Anxious: "#F59E0B",
  Empathetic: "#3B82F6",
  Frustrated: "#DC2626",
  Calm: "#059669",
  Excited: "#8B5CF6",
  Neutral: "#9CA3AF",
};

const ai = new GoogleGenAI({});

export const geminiRouter = createTRPCRouter({
  imageAnalyze: publicProcedure
    .input(
      z.object({
        image: z.string(),
        mimeType: z.string(),
        conversationContext: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { image, mimeType, conversationContext } = input;
      const modelName = "gemini-1.5-flash";

      // The detailed prompt to guide Gemini's analysis
      const detailedPrompt = `
        You are an expert communication coach and a compassionate, empathetic assistant.
        Your task is to analyze the text message conversation from the provided screenshot.
        The user is seeking to improve their communication in difficult and sensitive situations.

        Here is some context from the user about this conversation: "${conversationContext ?? "No additional context provided."}"

        Please follow these steps in your analysis:

        1.  **Transcribe the Conversation:** First, carefully transcribe the text messages from the image. Identify the different speakers if possible (e.g., "Person A:", "Person B:").

        2.  **Analyze the Tone:** In a section called "Tone Analysis", describe the overall tone of the conversation. Is it tense, sad, angry, supportive, avoidant? Analyze the tone of each participant. Use descriptive words and explain your reasoning based on specific words and phrases from the text.

        3.  **Identify Areas for Improvement:** In a section called "Constructive Feedback", pinpoint specific messages or phrases that could be improved. For each point, quote the original text and explain *why* it might be perceived negatively or how it could be misinterpreted. Focus on clarity, empathy, and potential emotional impact.

        4.  **Suggest Concrete Alternatives:** For each point of feedback, provide specific, actionable suggestions for what could have been said instead. In a section called "Suggested Alternatives", offer 2-3 rephrased options for each identified message. These alternatives should aim to be more constructive, empathetic, or clearer, depending on the situation.

        5.  **Provide a Final Summary:** Conclude with a brief, encouraging summary that reinforces good communication practices.

        Structure your entire response in clear, well-formatted Markdown.
      `;

      try {
        const imagePart = {
          inlineData: {
            data: image,
            mimeType: mimeType,
          },
        };

        const contents = [imagePart, { text: detailedPrompt }];

        const result = await ai.models.generateContent({
          model: modelName,
          contents: contents,
        });

        return result.text ?? "AI could not provide analysis";
      } catch (error) {
        console.error("Error analyzing conversation with Gemini:", error);
        throw new Error("Failed to communicate with the AI model.");
      }
    }),

  toneAnalysis: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const { text } = input;
      const modelName = "gemini-1.5-flash";

      const textAnalysisPrompt = `
        You are an expert communication analyst and an empathetic coach.
        Your task is to analyze the following text, which represents a person's message in a sensitive conversation.
        Your goal is to identify the primary emotional tone and provide constructive feedback.

        Analyze this text: "${text}"

        Based on your analysis of this text, you MUST respond with a JSON object that strictly adheres to the provided schema. Do not add any text or markdown before or after the JSON object.

        Guidance for JSON Fields:
        - primaryEmotion: Select the single, most dominant emotion from the provided enum list.
        - intensity: On a scale of 1 (very mild) to 10 (extremely intense), how strong is this emotion?
        - confidence: As a percentage from 0 to 100, how confident are you in your assessment?
        - suggestions: Provide 2-3 brief, concrete, and actionable suggestions for how the author could improve their communication to be more effective or empathetic.
      `;

      try {
        const result = await ai.models.generateContent({
          model: modelName,
          contents: [{ role: "user", parts: [{ text: textAnalysisPrompt }] }],

          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                primaryEmotion: {
                  type: "STRING",
                  enum: Object.keys(emotionColors),
                },
                intensity: { type: "NUMBER" },
                confidence: { type: "NUMBER" },
                suggestions: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                },
              },
              required: [
                "primaryEmotion",
                "intensity",
                "confidence",
                "suggestions",
              ],
            },
          },
        });

        const responseText = result.text;
        if (!responseText) {
          throw new Error("AI did not return a valid response.");
        }

        const parsedJson = JSON.parse(responseText);
        const color =
          emotionColors[parsedJson.primaryEmotion] || emotionColors["Neutral"];

        return {
          ...parsedJson,
          color: color,
        };
      } catch (error) {
        console.error("Error analyzing text with Gemini:", error);
        throw new Error(
          "Failed to get a structured response from the AI model.",
        );
      }
    }),
  getAiScenarioReply: publicProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            sender: z.enum(["user", "ai"]),
            content: z.string(),
          }),
        ),
        scenario: z.object({
          persona: z.object({
            name: z.string(),
            personality: z.string(),
            emotionalTendency: z.string(),
            gender: z.enum(["MALE", "FEMALE", "NEUTRAL"]),
            voiceName: z.string(),
          }),
          description: z.string(),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      const { messages, scenario } = input;
      const chatModelName = "gemini-1.5-flash";
      const ttsModelName = "gemini-2.5-flash-preview-tts";

      const conversationPrompt = `
        You are a conversational practice partner. Your name is ${scenario.persona.name}.
        Your personality is: "${scenario.persona.personality}".
        Your emotional tendency is: "${scenario.persona.emotionalTendency}".

        You are role-playing in a conversation with a user. Do NOT break character.
        The scenario of this role play is: "${scenario.description}".
        The following is the conversation history so far. The user's last message is at the end.
        
        ${messages.map((msg) => `${msg.sender === "user" ? "The User" : scenario.persona.name}: ${msg.content}`).join("\n")}
        
        Based on your personality and the conversation history, provide a natural, in-character response to the user's last message.
        Your response must be a single block of text. Do not add any extra formatting.
      `;

      try {
        const textResult = await ai.models.generateContent({
          model: chatModelName,
          contents: [{ role: "user", parts: [{ text: conversationPrompt }] }],
        });

        const replyText =
          textResult?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!replyText) {
          throw new Error("AI failed to generate a text reply.");
        }

        const audioGenerationResult = await ai.models.generateContent({
          model: ttsModelName,
          // The contents are now just a simple instruction with the text we generated
          contents: [
            {
              parts: [
                { text: `[speaker: ${scenario.persona.name}] ${replyText}` },
              ],
            },
          ],
          config: {
            // As the error message dictated, we ONLY request AUDIO
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: scenario.persona.voiceName },
              },
            },
          },
        });

        // --- STEP 3: PARSE THE AUDIO-ONLY RESPONSE CORRECTLY ---
        // As per your new code snippet, the data is in `inlineData.data`
        const audioPart =
          audioGenerationResult?.candidates?.[0]?.content?.parts?.[0]
            ?.inlineData;
        const audioContent =
          audioGenerationResult?.candidates?.[0]?.content?.parts?.[0]
            ?.inlineData?.data;
        const audioMimeType = audioPart?.mimeType;

        console.log("DETECTED AUDIO MIME TYPE:", audioMimeType);

        if (!audioContent) {
          throw new Error("AI failed to generate audio for the reply.");
        }

        // --- STEP 4: RETURN BOTH RESULTS ---
        return {
          reply: replyText,
          audioContent: audioContent,
          mimeType: audioMimeType,
        };
      } catch (error) {
        console.error("Error in getAiReply two-step process:", error);
        throw new Error("Failed to get a complete response from the AI model.");
      }

      
    }),
});
