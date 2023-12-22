import { pipeline } from "@xenova/transformers";

export async function summarize(text) {
  try {
    console.log('Fazendo o resumo')
    console.log("Making summary...")
    const generator = await pipeline("summarization", "Xenova/distilbart-cnn-12-6")
    const output = await generator(text)
    console.log("Summary succesfull !")
    return output[0].summary_text
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}