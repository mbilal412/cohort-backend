import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY
});

export async function testAi(){

    // const stream = await model.stream("why do parrot talks?");
    // for await (const chunk of stream)
    // console.log(chunk.text)

    const response = await model.invoke("why do parrot talks?");
    console.log(response.content)
    

}
