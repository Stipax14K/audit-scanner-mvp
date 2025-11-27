// backend/src/interfaces/api/pitch-generator.ts (Exemple pour Next.js API Route)
import type { NextApiRequest, NextApiResponse } from 'next';
import { GeneratePitchUseCase } from '../../application/use-cases/GeneratePitchUseCase';
import { GeminiAdapter } from '../../infrastructure/ai/GeminiAdapter';
import { PitchInput } from '../../domain/entities/Pitch'; // Importez l'interface

// Initialisez l'adaptateur et le Use Case (peut être fait via un conteneur d'injection de dépendances plus tard)
const geminiAdapter = new GeminiAdapter(process.env.GEMINI_API_KEY!);
const generatePitchUseCase = new GeneratePitchUseCase(geminiAdapter);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // 1. Authentification et Autorisation (Vérifier l'abonnement/crédits)
  // Ceci est un placeholder. Implémentez votre logique ici.
  // Par exemple, vérifier si l'utilisateur est connecté et a un abonnement valide via Supabase.
  const isAuthenticated = true; // Simulez pour l'instant
  if (!isAuthenticated) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const input: PitchInput = req.body;

  try {
    const pitchContent = await generatePitchUseCase.execute(input);
    res.status(200).json({ success: true, pitch: pitchContent });
  } catch (error: any) {
    console.error('Error generating pitch:', error);
    res.status(500).json({ message: 'Failed to generate pitch', error: error.message });
  }
}