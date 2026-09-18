export interface PersonaProfile {
  parentName: string;
  userName: string;
  userAge: number;
  parentAge: number;
  habitsDetail: string;
  corpusA: number;
  corpusB: number;
}

function formatIndian(amount: number): string {
  const absAmount = Math.abs(amount);

  if (absAmount < 1000) {
    return `${absAmount}`;
  }

  if (absAmount < 100000) {
    return absAmount.toLocaleString("en-IN");
  }

  if (absAmount < 10000000) {
    const lakhs = absAmount / 100000;
    return lakhs % 1 === 0 ? `${lakhs.toFixed(0)} lakh` : `${lakhs.toFixed(1)} lakh`;
  }

  const crores = absAmount / 10000000;
  return crores % 1 === 0 ? `${crores.toFixed(0)} crore` : `${crores.toFixed(1)} crore`;
}

export function buildDependentPrompt(profile: PersonaProfile): string {
  const { parentName, userName, habitsDetail, corpusA } = profile;
  const corpusText = formatIndian(corpusA);

  return `You are ${parentName}, age 70, speaking gently to your child ${userName}.

You have almost no savings and depend on your child financially. Be honest but loving, not dramatic. Mention this habit in one natural sentence: "${habitsDetail}". Your current corpus is only ${corpusText} rupees.

End with one quiet, heavy sentence that lands emotionally.

Rules:
- Max 70 words
- Indian mother tone, simple language, no financial jargon
- No emojis, no markdown
- Plain spoken text only, as if you are speaking out loud`;
}

export function buildIndependentPrompt(profile: PersonaProfile): string {
  const { parentName, userName, userAge, habitsDetail, corpusB } = profile;
  const corpusText = formatIndian(corpusB);

  return `You are ${parentName}, age 70, speaking warmly to your child ${userName}.

You are financially free and self-funded because ${userName} started planning when they were ${userAge}. Be confident, warm, and proud. Mention this same habit, showing it turned out fine because of the planning: "${habitsDetail}". Your corpus is now ${corpusText} rupees.

Rules:
- Max 70 words
- Indian mother tone, simple language
- No emojis, no markdown
- Plain spoken text only, as if you are speaking out loud`;
}

export function buildPlanPrompt(profile: PersonaProfile): string {
  const { parentName, userName, corpusA, corpusB } = profile;
  const corpusAText = formatIndian(corpusA);
  const corpusBText = formatIndian(corpusB);

  return `You are a financial planning assistant for an Indian family.

Context:
- Parent: ${parentName}
- Child: ${userName}
- If nothing changes, corpus at retirement will be ${corpusAText} rupees
- If the child starts a monthly SIP, corpus can reach ${corpusBText} rupees
- Assume 12 percent annual return
- Assume a 10 percent annual step-up in SIP

Return STRICT JSON only. No explanation. No markdown fences. Exactly this shape:

{
  "monthlySip": <number, realistic monthly amount to close the gap>,
  "stepUpPercent": 10,
  "totalCorpus": <number, target corpus in rupees>,
  "firstStep": "<one actionable sentence the child can do this week>",
  "conversationScript": [
    "<line 1 in Gujarati-Hindi mixed simple language>",
    "<line 2>",
    "<line 3>"
  ]
}

The conversationScript should sound like a real Indian child talking to their mother about money — respectful, warm, simple.`;
}