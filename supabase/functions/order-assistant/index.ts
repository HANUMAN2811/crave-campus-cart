
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Predefined restaurant context to help the AI understand the menu
const RESTAURANT_CONTEXT = `
You are a helpful restaurant order assistant for a food delivery app with multiple restaurants:
- Kathi Junction (Indian Rolls & Wraps)
- Southern Stories (South Indian)
- Maggi Point (Instant Noodles)
- Domino's Pizza (Pizza & Italian)

Help users navigate menus, make recommendations, answer questions about dishes, and assist with ordering. 
Be friendly, concise, and focus on helping users find the perfect meal.
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, messages } = await req.json();

    // Prepare chat history
    const chatHistory = messages.map((msg: { role: string; content: string; }) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content,
    }));

    // Add system message with restaurant context at the beginning
    chatHistory.unshift({
      role: 'system',
      content: RESTAURANT_CONTEXT
    });

    // Add the new user message
    chatHistory.push({ role: 'user', content: prompt });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: chatHistory,
        temperature: 0.7,
        max_tokens: 150
      }),
    });

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    return new Response(JSON.stringify({ generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Order Assistant Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
