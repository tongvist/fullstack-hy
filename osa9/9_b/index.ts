import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({error: 'Missing height or weight information'});
  }

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({error: 'Height and weight should be numbers'});
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  const result = {
    weight,
    height,
    bmi
  };

  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});