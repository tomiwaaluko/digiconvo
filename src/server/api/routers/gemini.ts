import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const ai = new GoogleGenAI({});

export const geminiRouter = createTRPCRouter({

})