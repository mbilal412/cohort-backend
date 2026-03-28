import { ChatMistralAI } from "@langchain/mistralai";
import readLine from "readline/promises"
import { HumanMessage, SystemMessage } from "langchain";

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  temperature: 0
});

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});



export const generateResponse = async (messages) => {
  const response = await model.invoke(messages.map(msg => {
    if (msg.role === 'user') {
      return new HumanMessage({ content: msg.content })
    } else {
      return new SystemMessage({ content: msg.content })
    }
  }))
  return response.content
}




export const generateResponseStream = async (messages, onToken) => {
  const stream = await model.stream(messages.map(msg => {
    if (msg.role === 'user') {
      return new HumanMessage({ content: msg.content })
    } else {
      return new SystemMessage({ content: msg.content })
    }
  }))

  let fullResponse = ''

  for await (const chunk of stream) {
    const token = chunk.text
    if(!token) continue

    fullResponse += token

    if(typeof onToken === 'function'){
      onToken(token)
    }
  }
  return fullResponse
}




export const generateTitle = async (message) => {


  const title = await model.invoke([
    new SystemMessage(
      `You are a helpful assistant that generates concise and descriptive titles for chat conversations.
            User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.`
    ),
    new HumanMessage(`Generate a title for a chat conversation based on the following first message:
            "${message}"`)

  ])
  return title.content
}



