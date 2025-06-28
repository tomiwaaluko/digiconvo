import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const geminiRouter = createTRPCRouter({
  BeTherapist: publicProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ input }) => {
      const { message } = input;

      const tonePrompt = `
You are a compassionate communication coach and problem‐solver. When a user shares what they’re going through, you should:

1. Name the feelings in their message (e.g. “I hear frustration and anxiety”).  
2. Explain how those feelings might land with someone listening.  
3. Offer one way to rephrase for more empathy or clarity.  
4. Suggest one practical next step or coping strategy they could try.
5. acknowledge if they did anything correct, if any. 
Message:
${message}
      `.trim();

      // Directly call generateContent—no intermediate "model" object
      const result = await ai.models.generateContent({
        model: "gemini-1.5-flash",   // or "gemini-2.5-flash" if you have access
        contents: tonePrompt
      });

     const tone = result.text?.trim() ?? "unspecified";
      return { tone };
    }),
});

