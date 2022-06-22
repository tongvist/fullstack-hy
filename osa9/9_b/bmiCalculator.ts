const calculateBmi = (height: number, weight: number) => {
  // BMI: weight (kg) / height^2 (m)
  const bmi = weight / ((height / 100) ** 2);
  console.log("BMI: ", bmi);

  return bmi > 25.0 ? "Overweight" : bmi < 18.5 ? "Underweight" : "Normal (healthy weight)";

}

const h = Number(process.argv[2]);
const w = Number(process.argv[3]);

console.log(h, w);

console.log(calculateBmi(h, w));