import OpenAI from "openai";

export const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});
// Make sure to set OPENAI_API_KEY in your environment variables
// You can get your API key from https://platform.openai.com/account/api-keys