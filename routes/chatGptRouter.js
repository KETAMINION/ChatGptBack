const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const router = express();


const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
  
  
  router.post("/chat-gpt", async (req, res) => {
    try {
      const { prompt } = req.body;
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `
                ${prompt}
              `,
        max_tokens: 2048,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        // n: 2,
        // best_of:3,
        // stop: ["\end end end"]
        // suffix: "Generating completed."
      });
      
      
      return (console.log(response.data), res.status(200).json({
        success: true,
        data: response.data.choices[0].text,
      }));
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.response
          ? error.response.data
          : "There was an issue on the server",
      });
    }
  });

module.exports = router ;