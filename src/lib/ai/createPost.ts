import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from '@langchain/core/output_parsers';

export async function createBlogPost(categories: string, keywords: string, mainidea: string) {
    const outputParser = new JsonOutputParser();
    const openAIKey = process.env.OPENAI_API_KEY;

    const model = new ChatOpenAI({
        model: "gpt-4-0125-preview",
        temperature: 0,
        apiKey: openAIKey,
        // maxTokens: 300,
    });


    const TEMPLATE = `You are a world-class tech-blog writer.

    You must always output a JSON object with an "title" key, "content" key, and "image" key.
    The "title" key must have a string value.
    The "content" key must have a string value.
    The "image" key must have a string value. 
    
    Consider the following in your response:
      - You should focus on factual information about the category.
      - Structure your content in a way that is easy to read and understand.
      - Start from the basics and gradually move to more advanced topics.
      - In the "image" key, return a prompt for an text-to-image model to create an image that is relevant to your blog post.


    {question}`;


    const input = `Create a technical blog post based on the following categories: 
                 ${JSON.stringify(categories)}

                Here is the main idea of the post:
                ${JSON.stringify(mainidea)}

                 Here are some key concepts to discuss: 
                ${JSON.stringify(keywords)}

                Make sure the content is less than 300 words.
                 `;

    const prompt = ChatPromptTemplate.fromTemplate(TEMPLATE);
    const chain = prompt.pipe(model).pipe(outputParser);

    try {
        const response = await chain.invoke({ question: input });
        console.log("Response from OpenAI:", response);
        return response;
    } catch (error) {
        console.error("Error invoking the chain:", error);
        return { error: 'Failed to get response from OpenAI' };
    }
}

