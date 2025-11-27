// frontend/src/pages/pitch-generator.tsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'; // npm install react-markdown

export default function PitchGeneratorPage() {
  const [formData, setFormData] = useState({
    project_name: '', problem: '', solution: '', target_market: '',
    business_model: '', competition: '', team_brief: '', funding_ask: '',
    tone: 'Confiant et visionnaire', length_words_per_section: '100-150 mots'
  });
  const [pitchResult, setPitchResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPitchResult('');

    try {
      const response = await fetch('/api/pitch-generator', { // Appel à votre API Next.js
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la génération du pitch.');
      }

      const data = await response.json();
      setPitchResult(data.pitch);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Cosmos Visionary Pitch Deck Generator</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Champs du formulaire ici, ex: */}
        <div>
          <label htmlFor="project_name" className="block text-sm font-medium text-gray-700">Nom du Projet</label>
          <input type="text" name="project_name" id="project_name" value={formData.project_name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
        </div>
        <div>
          <label htmlFor="problem" className="block text-sm font-medium text-gray-700">Problème Identifié</label>
          <textarea name="problem" id="problem" value={formData.problem} onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required></textarea>
        </div>
        {/* ... autres champs ... */}
        <div className="md:col-span-2">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Génération en cours...' : 'Générer le Pitch'}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {pitchResult && (
        <div className="mt-8 p-6 bg-gray-50 rounded-md shadow-inner">
          <h2 className="text-2xl font-semibold mb-4">Votre Pitch Généré :</h2>
          <ReactMarkdown className="prose max-w-none">{pitchResult}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}