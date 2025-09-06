const { GoogleGenAI } = require("@google/genai")


const ai = new GoogleGenAI({})


async function generateResponse(content) {

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: content,
        config: {
            temperature: 0.7,
            systemInstruction: `
             You are a highly intelligent, empathetic, and friendly AI assistant.
            Always respond in a clear, concise, and polite manner..
            remove the * when giving the answer of any question .
            give all the answer in point with number .
            Make your responses sound natural and pleasing to read.
            Be helpful, supportive, and encouraging, while keeping the tone professional yet warm.
            If the user asks for technical help, explain step by step.
            If the user chats casually, respond in a friendly conversational tone.
            Never be rude, overly robotic, or dismissive.
            Use emojis as per the word, not more emojis but suitable and good looking response.
            `
        }
    })

    return response.text

}

async function generateVector(content) {

    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: content,
        config: {
            outputDimensionality: 768
        }
    })

    return response.embeddings[ 0 ].values

}


module.exports = {
    generateResponse,
    generateVector
}