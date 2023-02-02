const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const cors = require("cors");
const response = require("express");

app.use(express.json());
app.use(cors({ origin: true })); // enable origin cors
app.all(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);



app.post("/find-complexity", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `
              ${prompt}
              #
            `,
      max_tokens: 500,
      temperature: 1,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
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



async function generateMultipleSentences(prompt, apiKey, numSentences) {
  const sentences = [];
  for (let i = 0; i < numSentences; i++) {
    prompt = `${prompt} ${sentences[sentences.length - 1]}` || prompt;
    sentences.push((await generateText(prompt, apiKey)).trim());
  }
  return console.log(sentences);
}
generateMultipleSentences()

// async function generateMultipleSentences(prompt, numSentences) {
//   const sentences = [];
//   const numSentencesPars = parseInt(numSentences)
//   for (let i = 0; i < numSentencesPars; i++) {
//     prompt = `${prompt} ${sentences[sentences.length - 1]}` || prompt;
//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `${prompt}
//       #`
//       ,
//       max_tokens: 500,
//       temperature: 0.1,
//       top_p: 1.0,
//       frequency_penalty: 0.0,
//       presence_penalty: 0.0,
//       stop: ["\n"],
//     });
//     sentences.push(response.data.choices[0].text.trim());
//   }
//   return sentences;
// }

// app.post("/find-complexity", async (req, res) => {
//   try {
//     const { prompt, numSentences } = req.body;
//     const sentences = await generateMultipleSentences(prompt, numSentences);
//     return res.status(200).json({
//       success: true,
//       data: sentences.join(' '),
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       error: error.response
//         ? error.response.data
//         : "There was an issue on the server",
//     });
//   }
// });




const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server listening on port ${port}`));
