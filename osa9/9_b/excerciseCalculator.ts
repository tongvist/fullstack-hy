interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Values {
  target: number,
  hours: Array<number>
}

const calculateExcercises = (hours: Array<number>, target: number): Result => {
  const periodLength = hours.length;
  let trainingDays = 0;

  for (const day of hours) {
    if (day > 0) {
      trainingDays += 1;
    }
  }

  const average = hours.reduce((previous, current) => previous + current, 0) / hours.length;

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
};

const parseArguments = (args: Array<string>): Values => {
  if (args.length < 3) {
    throw new Error('Please enter target hours and excercise hours.');
  }

  if (args.length < 4) {
    throw new Error('Excercise hours missing!');
  }

  for (const i of args.slice(2)) {
    if (isNaN(Number(i))) {
      throw new Error('All values must be numbers!');
    }
  }
  
  const hours = args.slice(3)
    .map((i: string) => Number(i));

  return {
    target: Number(args[2]),
    hours
  };
};

try {
  // console.log('args: ', process.argv[0], process.argv[1], process.argv[2])
  const {target, hours} = parseArguments(process.argv);
  console.log(calculateExcercises(hours, target));  
} catch (error: unknown) {
  let erroMessage = 'Something went wrong.';
  if (error instanceof Error) {
    erroMessage += ' Error: ' + error.message;
  }
  console.log(erroMessage);
}