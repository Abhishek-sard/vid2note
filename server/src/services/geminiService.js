import getAI from "../config/gemini.js";

const generateNotes = async (transcript) => {
  try {
    const ai = getAI();
    const prompt = `
You are an expert teacher.

Analyze the following transcript and return ONLY valid JSON.

The JSON format must be:

{
  "summary":"",
  "keyPoints":[
      "",
      ""
  ],
  "flashcards":[
      {
          "question":"",
          "answer":""
      }
  ],
  "mcqs":[
      {
          "question":"",
          "options":["","","",""],
          "answer":""
      }
  ]
}

Transcript:

${transcript}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate notes: " + error.message);
  }
};

export {generateNotes};
