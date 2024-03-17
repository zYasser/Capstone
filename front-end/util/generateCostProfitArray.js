export default function generateCostProfitArray(costs) {
  const x = [-costs.cost];
  for (let i = 1; i < costs.years; i++) {
    x.push(x[i - 1] + costs.profit);
  }
  return x
}
