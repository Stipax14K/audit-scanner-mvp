// backend/src/application/use-cases/GeneratePitchUseCase.ts
import { PitchInput } from '../../domain/entities/Pitch';
import { GeminiAdapter } from '../../infrastructure/ai/GeminiAdapter';

export class GeneratePitchUseCase {
  private geminiAdapter: GeminiAdapter;

  constructor(geminiAdapter: GeminiAdapter) {
    this.geminiAdapter = geminiAdapter;
  }

  async execute(input: PitchInput): Promise<string> {
    // Ici, vous pourriez ajouter de la logique métier avant ou après l'appel à l'IA,
    // par exemple, valider les inputs plus en profondeur, enregistrer l'action dans une DB, etc.
    if (!input.project_name || !input.problem || !input.solution || !input.target_market || !input.business_model) {
      throw new Error('Missing required pitch parameters.');
    }

    const pitchContent = await this.geminiAdapter.generatePitchContent(input);
    return pitchContent;
  }
}