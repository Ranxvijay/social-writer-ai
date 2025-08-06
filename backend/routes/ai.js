const express = require('express');
const jwt = require('jsonwebtoken');
const { Configuration, OpenAIApi } = require('openai');
const router = express.Router();

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

// Auth middleware
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(403).json({ error: 'No token' });
  try {
    req.user = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}

router.post('/social-post', auth, async (req, res) => {
  const { topic, style } = req.body;
  const prompt = `Write a social media post about "${topic}" in a "${style}" style.`;
  try {
    const aiRes = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 120
    });
    res.json({ post: aiRes.data.choices[0].text });
  } catch (err) {
    res.status(500).json({ error: 'AI error' });
  }
});

router.post('/video-script', auth, async (req, res) => {
  const { idea, length } = req.body;
  const prompt = `Create a short-form viral video script for "${idea}" (${length} seconds).`;
  try {
    const aiRes = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 250
    });
    res.json({ script: aiRes.data.choices[0].text });
  } catch (err) {
    res.status(500).json({ error: 'AI error' });
  }
});

module.exports = router;
