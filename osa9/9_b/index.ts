import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExcercises } from './excerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.json({error: 'parameters missing'});
  }

  if (isNaN(Number(target))) {
    return res.json({error: 'malformatted parameters'});
  }

  let exercisesAsNumbers = [];

  for (let i = 0; i < daily_exercises.length; i++) {
    if (isNaN(Number(daily_exercises[i]))) {
      return res.json({error: 'malformatted parameters'})
    }
    exercisesAsNumbers.push(Number(daily_exercises[i]));
  }

  const result = calculateExcercises(exercisesAsNumbers, target);

  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});