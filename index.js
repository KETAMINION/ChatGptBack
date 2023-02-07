const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js")

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
      max_tokens: 50,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      /* stop: ["\n"], */
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

// app.post("/twitterpost", async (req, res) => {
  
//     const { prompt } = req.body;
//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `
//               ${prompt}
//               #
//             `,
//       max_tokens: 50,
//       temperature: 0.5,
//       top_p: 1,
//       frequency_penalty: 0.0,
//       presence_penalty: 0.0,
//       /* stop: ["\n"], */
//     });
   
// });
  
// const tweet = async () => {
//   try {
//     await twitterClient.v2.tweet("yoooooo");
//   } catch (e) {
//     console.log(e)
//   }
// }
app.post("/twitterpost", async function(req,res) {
  const result = await twitterClient.v2.tweet(req.body)
  return res.json({success: true, payload: result}) 
})


// tweet();

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server listening on port ${port}`));
