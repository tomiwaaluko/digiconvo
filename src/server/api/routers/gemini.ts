import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const geminiRouter = createTRPCRouter({
  imageAnalyze: publicProcedure
    .input(z.object({ image: z.string(), mimeType: z.string(), conversationContext: z.string().optional(), }))
    .mutation(async ({ input }) => {
      const { image, mimeType, conversationContext } = input;
      const modelName = "gemini-1.5-flash"; // A powerful and fast multimodal model

      // The detailed prompt to guide Gemini's analysis
      const detailedPrompt = `
        You are an expert communication coach and a compassionate, empathetic assistant.
        Your task is to analyze the text message conversation from the provided screenshot.
        The user is seeking to improve their communication in difficult and sensitive situations.

        Here is some context from the user about this conversation: "${conversationContext || 'No additional context provided.'}"

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
});
