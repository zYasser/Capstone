export default function generateYearArray(numberOfYears) {
  const startYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < numberOfYears; i++) {
    years.push(startYear + i);
  }
  return years;
}
