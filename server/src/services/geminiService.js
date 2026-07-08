import ai from "../config/gemini.js";

const generateNotes = async (transcript) => {
  try {
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
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    return JSON.parse(text);
  } catch (error) {
    console.error(error);
    throw new Error("Gemini AI Error");
  }
};

export {generateNotes};
