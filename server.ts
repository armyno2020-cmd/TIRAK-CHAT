import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { AccessToken } from "livekit-server-sdk";
import { createServer as createViteServer } from "vite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Gemini Translation API
  app.post("/api/translate", async (req, res) => {
    try {
      const { text, targetLanguage = "th" } = req.body;
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required for translation" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY not configured on server" });
      }

      const ai = new GoogleGenAI({ apiKey });
      const languageMap: Record<string, string> = {
        th: "Thai (ภาษาไทย)",
        en: "English",
        zh: "Chinese (中文)",
        ja: "Japanese (日本語)",
        ko: "Korean (한국어)",
        es: "Spanish",
        fr: "French",
        de: "German"
      };

      const targetLangName = languageMap[targetLanguage] || targetLanguage;

      const prompt = `Translate the following chat message into ${targetLangName}. 
Maintain the natural tone, emotion, and context of a modern instant message.
Return ONLY the translation text without any quote marks, explanation, or extra metadata.

Message: "${text}"`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });

      const translation = response.text ? response.text.trim() : text;
      res.json({ translation });
    } catch (error: any) {
      console.error("Gemini translation error:", error);
      res.status(500).json({ error: "Translation failed: " + (error?.message || "Unknown error") });
    }
  });

  // Generate LiveKit token for video/voice calls
  app.post("/api/livekit/token", async (req, res) => {
    try {
      const { roomName, participantName, participantId } = req.body;

      if (!roomName || !participantName || !participantId) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      const apiKey = process.env.LIVEKIT_API_KEY;
      const apiSecret = process.env.LIVEKIT_API_SECRET;

      if (!apiKey || !apiSecret) {
        return res.status(500).json({ error: "LiveKit credentials not configured" });
      }

      const at = new AccessToken(apiKey, apiSecret, {
        identity: participantId,
        name: participantName,
      });

      at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });

      const token = await at.toJwt();
      res.json({ token });
    } catch (error) {
      console.error("Error generating LiveKit token:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support Express v4 syntax
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
