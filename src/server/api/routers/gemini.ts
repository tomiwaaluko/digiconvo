import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const geminiRouter = createTRPCRouter({
  // Placeholder for future Gemini API integration
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}!`,
      };
    }),
})