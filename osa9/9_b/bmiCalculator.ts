export const calculateBmi = (height: number, weight: number) => {
  // BMI: weight (kg) / height^2 (m)
  const bmi = weight / ((height / 100) ** 2);

  return bmi > 25.0 ? "Overweight" : bmi < 18.5 ? "Underweight" : "Normal (healthy weight)";
};