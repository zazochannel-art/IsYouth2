import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google Gen AI client with required httpOptions header for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Routes
app.post('/api/ai/generate-breakout', async (req, res) => {
  try {
    const { topic, biblePassage, targetAudience } = req.body;
    
    const prompt = `Ești un pastor de tineret și lider spiritual experimentat. Genera accesibil și profund 3-4 întrebări de discuție pentru grupuri mici de tineret (Breakout Groups).
    
Detalii mesaj:
- Tema: ${topic || 'Credința în viața de zi cu zi'}
- Pasaj Biblic: ${biblePassage || 'Romani 12:1-2'}
- Public țintă: ${targetAudience || 'Liceeni și Studenți'}

Răspunde exclusiv în format JSON cu structura:
{
  "questions": [
    "Întrebare 1 de spart gheața/spovedanie...",
    "Întrebare 2 de aprofundare biblică...",
    "Întrebare 3 aplicativă pentru săptămâna aceasta...",
    "Întrebare 4 scurtă de rugăciune reciprocă..."
  ],
  "leaderTip": "Un sfat scurt pentru liderii de grup pe baza temei."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const data = JSON.parse(response.text || '{}');
    res.json(data);
  } catch (error: any) {
    console.error('AI Breakout Error:', error);
    res.status(500).json({ error: error.message || 'Eroare la generarea întrebărilor.' });
  }
});

app.post('/api/ai/generate-icebreaker', async (req, res) => {
  try {
    const { gameType, durationMinutes, groupSize } = req.body;

    const prompt = `Creează un joc sau activitate interactivă memorabilă pentru o seară de tineret.
    
Parametri:
- Tip activitate: ${gameType || 'Icebreaker / Joc de echipă'}
- Durată estimată: ${durationMinutes || 15} minute
- Mărime grup: ${groupSize || '20-50 tineri'}

Răspunde în format JSON:
{
  "title": "Titlul jocului",
  "category": "Icebreaker / Echipă / Trivia",
  "rules": ["Regula 1", "Regula 2", "Regula 3"],
  "materialsNeeded": ["Material 1", "Material 2"],
  "leaderTip": "Sfat pentru prezentator / MC"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const data = JSON.parse(response.text || '{}');
    res.json(data);
  } catch (error: any) {
    console.error('AI Icebreaker Error:', error);
    res.status(500).json({ error: error.message || 'Eroare la generarea jocului.' });
  }
});

app.post('/api/ai/generate-sermon-outline', async (req, res) => {
  try {
    const { topic, biblePassage } = req.body;

    const prompt = `Construiește o schiță scurtă și de impact pentru mesajul biblic de tineret (20-30 minute).
    
Tema: ${topic}
Pasaj: ${biblePassage}

Format JSON:
{
  "title": "Titlu atractiv pentru tineri",
  "keyVerse": "Versetul cheie complet",
  "mainPoints": [
    { "point": "Punctul 1", "explanation": "Explicație scurtă" },
    { "point": "Punctul 2", "explanation": "Explicație scurtă" },
    { "point": "Punctul 3", "explanation": "Explicație scurtă" }
  ],
  "practicalTakeaway": "Aplicația practică principală",
  "prayerPrompt": "Motivul de rugăciune de la finalul mesajului"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const data = JSON.parse(response.text || '{}');
    res.json(data);
  } catch (error: any) {
    console.error('AI Sermon Error:', error);
    res.status(500).json({ error: error.message || 'Eroare la generarea schiței de predică.' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
    
    app.use('*', async (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) return next();
      try {
        const template = await vite.transformIndexHtml(
          req.originalUrl,
          await import('fs').then(fs => fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8'))
        );
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      if (req.originalUrl.startsWith('/api')) return;
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`YouthFlow server running on port ${PORT}`);
  });
}

startServer();
