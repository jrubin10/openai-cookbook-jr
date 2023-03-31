import { useState } from 'react';
import openai from 'openai';
import dotenv from 'dotenv';

// Set the OpenAI API key
dotenv.config();
openai.api_key = process.env.OpenAI_API_Key;

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [engine, setEngine] = useState('text-davinci-002'); // Default engine

  // Call the OpenAI API
  const generateText = async () => {
    const prompt = `This is a prompt: ${input}`;
    const response = await openai.Completion.create({
      engine: engine,
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      stop: '\n',
    });
    setOutput(response.choices[0].text);
  };

  return (
    <div>
      <h1>OpenAI Demo</h1>
      <label>
        Input:
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      </label>
      <label>
        Engine:
        <select value={engine} onChange={(e) => setEngine(e.target.value)}>
          <option value="text-davinci-002">Davinci</option>
          <option value="text-curie-001">Curie</option>
          <option value="text-babbage-001">Babbage</option>
          <option value="text-ada-001">Ada</option>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
        </select>
      </label>
      <button onClick={generateText}>Generate</button>
      <label>
        Output:
        <textarea rows="4" cols="50" value={output} readOnly />
      </label>
    </div>
  );
}

export default App;
