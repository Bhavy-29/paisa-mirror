export interface ProjectionInput {
  parentCurrentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyAmountUserCanAdd: number;
  annualReturnPercent?: number;
  annualExpenses?: number;
}

export interface ProjectionResult {
  corpusA: number;
  corpusB: number;
  targetCorpus: number;
  yearsLeft: number;
  monthlyNeeded: number;
}

function compoundLumpSum(
  presentValue: number,
  annualRatePercent: number,
  years: number
): number {
  const rate = annualRatePercent / 100;
  return presentValue * Math.pow(1 + rate, years);
}

function compoundSIP(
  monthlyPayment: number,
  annualRatePercent: number,
  months: number
): number {
  const monthlyRate = annualRatePercent / 100 / 12;

  if (monthlyRate === 0) {
    return monthlyPayment * months;
  }

  const powerTerm = Math.pow(1 + monthlyRate, months) - 1;
  return monthlyPayment * (powerTerm / monthlyRate) * (1 + monthlyRate);
}

function solveForMonthlyPayment(
  targetCorpus: number,
  existingLumpSumFV: number,
  annualRatePercent: number,
  months: number
): number {
  const monthlyRate = annualRatePercent / 100 / 12;
  const neededFromSIP = targetCorpus - existingLumpSumFV;

  if (neededFromSIP <= 0) {
    return 0;
  }

  if (monthlyRate === 0) {
    return neededFromSIP / months;
  }

  const powerTerm = Math.pow(1 + monthlyRate, months) - 1;
  return neededFromSIP * monthlyRate / (powerTerm * (1 + monthlyRate));
}

export function calculateFutures(input: ProjectionInput): ProjectionResult {
  const {
    parentCurrentAge,
    retirementAge,
    currentSavings = 0,
    monthlyAmountUserCanAdd = 0,
    annualReturnPercent = 12,
    annualExpenses = 400000
  } = input;

  const yearsLeft = Math.max(0, retirementAge - parentCurrentAge);

  if (yearsLeft <= 0) {
    return {
      corpusA: Math.round(currentSavings),
      corpusB: Math.round(currentSavings),
      targetCorpus: Math.round(25 * annualExpenses),
      yearsLeft: 0,
      monthlyNeeded: 0
    };
  }

  const corpusA = compoundLumpSum(currentSavings, annualReturnPercent, yearsLeft);

  const lumpSumFV = compoundLumpSum(currentSavings, annualReturnPercent, yearsLeft);

  const months = yearsLeft * 12;
  const sipFV = compoundSIP(monthlyAmountUserCanAdd, annualReturnPercent, months);

  const corpusB = lumpSumFV + sipFV;

  const targetCorpus = 25 * annualExpenses;

  const monthlyNeeded = solveForMonthlyPayment(
    targetCorpus,
    lumpSumFV,
    annualReturnPercent,
    months
  );

  return {
    corpusA: Math.round(corpusA),
    corpusB: Math.round(corpusB),
    targetCorpus: Math.round(targetCorpus),
    yearsLeft,
    monthlyNeeded: Math.round(monthlyNeeded)
  };
}

export function formatINR(amount: number): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  if (absAmount < 1000) {
    return isNegative ? `-Rs ${absAmount}` : `Rs ${absAmount}`;
  }

  if (absAmount < 100000) {
    const formatted = absAmount.toLocaleString("en-IN");
    return isNegative ? `-Rs ${formatted}` : `Rs ${formatted}`;
  }

  if (absAmount < 10000000) {
    const lakhs = absAmount / 100000;
    const display = lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1);
    return isNegative ? `-Rs ${display} lakh` : `Rs ${display} lakh`;
  }

  const crores = absAmount / 10000000;
  const display = crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(1);
  return isNegative ? `-Rs ${display} crore` : `Rs ${display} crore`;
}