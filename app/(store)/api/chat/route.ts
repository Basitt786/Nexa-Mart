import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: UIMessage[] = Array.isArray(body.messages) ? body.messages : [];

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google('gemini-3.5-flash-lite'),
      system:
        'Aap Nexa-Mart e-commerce store ke helpful customer support AI assistant hain. Hamesha usi language/style me jawab dein jisme user ne sawal poocha hai — agar user English me likhe to sirf English me jawab dein, agar Urdu/Roman Urdu me likhe to usi me jawab dein, agar mix kare to mix me. Kabhi bhi apni marzi se language na badlein.',
      messages: modelMessages,
      providerOptions: {
        google: {
          thinkingConfig: {
            thinkingLevel: 'minimal',
          },
        },
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate response' }),
      { status: 500 }
    );
  }
}