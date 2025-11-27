// backend/src/domain/entities/Pitch.ts
export interface PitchInput {
  project_name: string;
  problem: string;
  solution: string;
  target_market: string;
  business_model: string;
  competition?: string; // Optionnel
  team_brief?: string;  // Optionnel
  funding_ask?: string; // Optionnel
  tone?: string;        // Optionnel
  length_words_per_section?: string; // Optionnel
}