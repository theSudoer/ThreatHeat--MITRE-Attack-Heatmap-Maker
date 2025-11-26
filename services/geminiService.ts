import { GoogleGenAI, Type } from "@google/genai";
import { ActorProfile } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using Flash for speed and reliability in retrieving known threat data
const MODEL_NAME = "gemini-2.5-flash"; 

export const fetchThreatActorData = async (actorName: string): Promise<ActorProfile> => {
  const systemInstruction = `
    You are a world-class cyber threat intelligence analyst. 
    Analyze the threat actor provided by the user.
    
    1. Identify their primary aliases, origin, and target sectors.
    2. Map their known behaviors to specific MITRE ATT&CK Techniques (Enterprise).
    3. For each technique, provide a specific description of HOW they use it (e.g., "Uses PowerShell to download payload X").
    4. Assign a confidence score (0-100) based on how characteristic this technique is for this actor.
    
    Return the data in a strict JSON format matching the schema provided.
    Ensure 'tactic' matches standard MITRE tactic names (e.g., "Initial Access", "Execution").
    If the actor is unknown, return a profile indicating unknown status but do not make up data.
  `;

  try {
    const result = await genAI.models.generateContent({
      model: MODEL_NAME,
      contents: actorName,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Standard name of the threat actor" },
            aliases: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Other known names (e.g., APT28, Fancy Bear)" },
            description: { type: Type.STRING, description: "Brief summary of the group" },
            origin: { type: Type.STRING, description: "Suspected country or region of origin" },
            targets: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Targeted industries or countries" },
            techniques: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "MITRE Technique ID (e.g. T1059)" },
                  name: { type: Type.STRING, description: "Technique Name" },
                  tactic: { type: Type.STRING, description: "The tactic this belongs to (e.g. Initial Access)" },
                  usage: { type: Type.STRING, description: "Specific details on how this actor uses this technique" },
                  score: { type: Type.NUMBER, description: "Confidence/Frequency score (0-100)" }
                },
                required: ["id", "name", "tactic", "usage", "score"]
              }
            }
          },
          required: ["name", "aliases", "description", "origin", "targets", "techniques"]
        }
      }
    });

    if (!result.text) {
      throw new Error("No data returned from Gemini");
    }

    const data = JSON.parse(result.text) as ActorProfile;
    return data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};