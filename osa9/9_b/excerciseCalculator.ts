interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExcercises = (hours: Array<number>, target: number): Result => {
  const periodLength = hours.length;
  let trainingDays = 0;

  for (let day of hours) {
    if (day > 0) {
      trainingDays += 1;
    }
  }

  let average = hours.reduce((previous, current) => previous + current, 0) / hours.length;

  const success = average >= target;

  const rating = average < target ? 
    1 : average == target ?
    2 : 3;

  let ratingDescription;
  if (rating == 1) {
    ratingDescription = 'Not good.';
  } else if (rating == 2) {
    ratingDescription = "Not bad, could be better..";
  } else {
    ratingDescription = "Target exceeded, well done!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}

const hours = [3, 2, 3, 4.5, 2.5, 3.5, 3];

console.log(calculateExcercises(hours, 3));