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

    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    const response = await model.generateContent(prompt);
    
    const text = response.response.text();

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate notes: " + error.message);
  }
};

export {generateNotes};
