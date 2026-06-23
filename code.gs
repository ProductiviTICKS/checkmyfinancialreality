function doGet(e) {

  return HtmlService
    .createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Financial Reality Check')
    .setXFrameOptionsMode(
      HtmlService.XFrameOptionsMode.ALLOWALL
    )
    .addMetaTag(
      'viewport',
      'width=device-width, initial-scale=1'
    );

}

function include(filename) {
return HtmlService
.createHtmlOutputFromFile(filename)
.getContent();
}

const SPREADSHEET_ID =
"1DJqLvCXq39_EIMAg17dGL3Czdr9I8uKOIihPot0RMVU";

function getQuestions() {

return [


// =====================================
// EARNING POWER
// =====================================

{
  id: 1,
  pillar: "Earning Power",
  question: "If you stopped working tomorrow, what would happen to your household income?",
  options: [
    "It would stop completely",
    "Most of it would stop",
    "About half would continue",
    "Most would continue",
    "It would continue almost unchanged"
  ]
},

{
  id: 2,
  pillar: "Earning Power",
  question: "How many income sources currently contribute to your household income?",
  options: [
    "One",
    "Two",
    "Three",
    "Four",
    "Five or more"
  ]
},

{
  id: 3,
  pillar: "Earning Power",
  question: "Which best describes your financial responsibility today?",
  options: [
    "I mainly support myself",
    "I help support another person",
    "I support my spouse or partner",
    "I support children or parents",
    "Multiple people depend on my income"
  ]
},

// =====================================
// FINANCIAL SAFETY NET
// =====================================

{
  id: 4,
  pillar: "Financial Safety Net",
  question: "If an unexpected ₱50,000 expense happened next month, how would you most likely handle it?",
  options: [
    "Borrow money",
    "Use a credit card",
    "Use part of my savings",
    "Use savings comfortably",
    "It would have little impact"
  ]
},

{
  id: 5,
  pillar: "Financial Safety Net",
  question: "If your income stopped today, how long could your household maintain its current lifestyle?",
  options: [
    "Less than 1 month",
    "1-3 months",
    "4-6 months",
    "7-12 months",
    "More than 12 months"
  ]
},

{
  id: 6,
  pillar: "Financial Safety Net",
  question: "How much of your monthly income is already committed to loans, debt, or financing?",
  options: [
    "More than 50%",
    "31-50%",
    "16-30%",
    "1-15%",
    "None"
  ]
},

// =====================================
// FAMILY SECURITY
// =====================================

{
  id: 7,
  pillar: "Family Security",
  question: "If you passed away unexpectedly, how would your family likely cope financially?",
  options: [
    "Major financial crisis",
    "Significant struggles",
    "Temporary difficulties",
    "Mostly manageable",
    "Financially secure"
  ]
},

{
  id: 8,
  pillar: "Family Security",
  question: "If a serious illness prevented you from working for six months, what would most likely happen?",
  options: [
    "Severe financial hardship",
    "Need to borrow money",
    "Use most savings",
    "Manage with existing resources",
    "Minimal financial disruption"
  ]
},

{
  id: 9,
  pillar: "Family Security",
  question: "Which best describes your current protection coverage?",
 options: [

  "I have no meaningful protection coverage",

  "I only have government benefits (PhilHealth, SSS, GSIS)",

  "I have one form of personal protection (Life Insurance OR HMO)",

  "I have multiple forms of protection (Life Insurance, HMO, or similar)",

  "I have comprehensive protection covering my health, income, and family"

]
},

// =====================================
// FUTURE GROWTH
// =====================================

{
  id: 10,
  pillar: "Future Growth",
  question: "Which best describes your current saving behavior?",
  options: [
    "I rarely save",
    "I save occasionally",
    "I save monthly but inconsistently",
    "I save consistently every month",
    "Saving is automated and disciplined"
  ]
},

{
  id: 11,
  pillar: "Future Growth",
  question: "Which best describes your current investing activity?",
  options: [
    "None",
    "Learning about investing",
    "Started investing recently",
    "Invest regularly",
    "Investments are a major part of my financial plan"
  ]
},

{
  id: 12,
  pillar: "Future Growth",
  question: "Aside from government benefits, how prepared are you for retirement?",
  options: [
    "No preparation yet",
    "Minimal preparation",
    "Some preparation",
    "Consistent retirement planning",
    "Strong retirement strategy"
  ]
},

// =====================================
// FINANCIAL CONFIDENCE
// =====================================

{
  id: 13,
  pillar: "Financial Confidence",
  question: "How often do financial concerns affect your peace of mind?",
  options: [
    "Almost every day",
    "Weekly",
    "Monthly",
    "Occasionally",
    "Rarely"
  ]
},

{
  id: 14,
  pillar: "Financial Confidence",
  question: "How confident are you in your current financial direction?",
  options: [
    "Very uncertain",
    "Somewhat uncertain",
    "Neutral",
    "Confident",
    "Very confident"
  ]
},

{
  id: 15,
  pillar: "Financial Confidence",
  question: "Which statement best describes your situation today?",
  options: [
    "I rely entirely on active income",
    "I earn income but have little financial backup",
    "I have savings that provide security",
    "Some of my money works for me",
    "My assets generate meaningful income"
  ]
}


];
}

function saveAssessment(data) {

const responseSheet =
SpreadsheetApp
.openById(SPREADSHEET_ID)
.getSheetByName("Raw Responses");

responseSheet.appendRow([


new Date(),

data.firstName,
data.lastName,
data.email,
data.mobile,
data.city,

data.answers[0] || "",
data.answers[1] || "",
data.answers[2] || "",
data.answers[3] || "",
data.answers[4] || "",
data.answers[5] || "",
data.answers[6] || "",
data.answers[7] || "",
data.answers[8] || "",
data.answers[9] || "",
data.answers[10] || "",
data.answers[11] || "",
data.answers[12] || "",
data.answers[13] || "",
data.answers[14] || "",

data.maritalStatus || "",
data.children || "",
data.breadwinnerStatus || "",
data.ageGroup || "",

"FRC_v3.0"


]);

return true;
}
// =====================================
// PART 2 - SCORING ENGINE
// =====================================

function calculateScore(data) {

const answers = data.answers;

// =====================================
// EARNING POWER
// =====================================

const earningPower =
calculatePillarScore([
scoreAnswer(1, answers[0]),
scoreAnswer(2, answers[1]),
scoreAnswer(3, answers[2])
]);

// =====================================
// FINANCIAL SAFETY NET
// =====================================

const financialSafetyNet =
calculatePillarScore([
scoreAnswer(4, answers[3]),
scoreAnswer(5, answers[4]),
scoreAnswer(6, answers[5])
]);

// =====================================
// FAMILY SECURITY
// =====================================

const familySecurity =
calculatePillarScore([
scoreAnswer(7, answers[6]),
scoreAnswer(8, answers[7]),
scoreAnswer(9, answers[8])
]);

// =====================================
// FUTURE GROWTH
// =====================================

const futureGrowth =
calculatePillarScore([
scoreAnswer(10, answers[9]),
scoreAnswer(11, answers[10]),
scoreAnswer(12, answers[11])
]);

// =====================================
// FINANCIAL CONFIDENCE
// =====================================

const financialConfidence =
calculatePillarScore([
scoreAnswer(13, answers[12]),
scoreAnswer(14, answers[13]),
scoreAnswer(15, answers[14])
]);

// =====================================
// OVERALL SCORE
// =====================================

const overallScore = Math.round(
(
earningPower +
financialSafetyNet +
familySecurity +
futureGrowth +
financialConfidence
) / 5
);

// =====================================
// LABELS
// =====================================

const earningPowerLabel =
getScoreLabel(earningPower);

const financialSafetyNetLabel =
getScoreLabel(financialSafetyNet);

const familySecurityLabel =
getScoreLabel(familySecurity);

const futureGrowthLabel =
getScoreLabel(futureGrowth);

const financialConfidenceLabel =
getScoreLabel(financialConfidence);

const strongestArea =
  getStrongestArea(
    earningPower,
    financialSafetyNet,
    familySecurity,
    futureGrowth
  );

const growthOpportunity =
  getGrowthOpportunity(
    earningPower,
    financialSafetyNet,
    familySecurity,
    futureGrowth
  );

const financialIdentity =
  determineFinancialIdentity({
    earningPower,
    financialSafetyNet,
    familySecurity,
    futureGrowth,
    overallScore,
    breadwinnerStatus: data.breadwinnerStatus,
    children: data.children
  });

const primaryInsight =
  getPrimaryInsight(growthOpportunity);

const reflectionQuestions =
  getReflectionQuestions(growthOpportunity);

const consultationTopic =
  getConsultationTopic(growthOpportunity);

savePillarScores(
  data,
  earningPower,
  financialSafetyNet,
  familySecurity,
  futureGrowth,
  financialConfidence,
  overallScore
);

saveResultsEngine(
  data,
  financialIdentity,
  primaryInsight,
  reflectionQuestions,
  consultationTopic
);
// =====================================
// RETURN BASE RESULT
// PART 3 WILL ADD INTELLIGENCE ENGINE
// =====================================

return {

  overallScore,

  earningPower,
  financialSafetyNet,
  familySecurity,
  futureGrowth,
  financialConfidence,

  earningPowerLabel,
  financialSafetyNetLabel,
  familySecurityLabel,
  futureGrowthLabel,
  financialConfidenceLabel,

  financialIdentity,

  strongestArea,
  growthOpportunity,

  primaryInsight,

  reflectionQuestion1:
    reflectionQuestions.question1,

  reflectionQuestion2:
    reflectionQuestions.question2,

  consultationTopic

};
}

// =====================================
// CONVERT 3 ANSWERS TO 0-100 SCORE
// =====================================

function calculatePillarScore(scores) {

const total =
scores[0] +
scores[1] +
scores[2];

return Math.round(
(total / 15) * 100
);

}

// =====================================
// SCORE LABELS
// =====================================

function getScoreLabel(score) {

if (score >= 80) {
return "Strong";
}

if (score >= 60) {
return "Developing";
}

if (score >= 40) {
return "Emerging";
}

return "Starting Point";

}

// =====================================
// QUESTION SCORING
// =====================================

function scoreAnswer(questionId, answer) {

switch(questionId) {


// =====================================
// Q1
// =====================================

case 1:

  return {
    "It would stop completely": 1,
    "Most of it would stop": 2,
    "About half would continue": 3,
    "Most would continue": 4,
    "It would continue almost unchanged": 5
  }[answer] || 1;

// =====================================
// Q2
// =====================================

case 2:

  return {
    "One": 1,
    "Two": 2,
    "Three": 3,
    "Four": 4,
    "Five or more": 5
  }[answer] || 1;

// =====================================
// Q3
// REVERSE SCORED
// =====================================

case 3:

  return {
    "I mainly support myself": 5,
    "I help support another person": 4,
    "I support my spouse or partner": 3,
    "I support children or parents": 2,
    "Multiple people depend on my income": 1
  }[answer] || 1;

// =====================================
// Q4
// =====================================

case 4:

  return {
    "Borrow money": 1,
    "Use a credit card": 2,
    "Use part of my savings": 3,
    "Use savings comfortably": 4,
    "It would have little impact": 5
  }[answer] || 1;

// =====================================
// Q5
// =====================================

case 5:

  return {
    "Less than 1 month": 1,
    "1-3 months": 2,
    "4-6 months": 3,
    "7-12 months": 4,
    "More than 12 months": 5
  }[answer] || 1;

// =====================================
// Q6
// =====================================

case 6:

  return {
    "More than 50%": 1,
    "31-50%": 2,
    "16-30%": 3,
    "1-15%": 4,
    "None": 5
  }[answer] || 1;

// =====================================
// Q7
// =====================================

case 7:

  return {
    "Major financial crisis": 1,
    "Significant struggles": 2,
    "Temporary difficulties": 3,
    "Mostly manageable": 4,
    "Financially secure": 5
  }[answer] || 1;

// =====================================
// Q8
// =====================================

case 8:

  return {
    "Severe financial hardship": 1,
    "Need to borrow money": 2,
    "Use most savings": 3,
    "Manage with existing resources": 4,
    "Minimal financial disruption": 5
  }[answer] || 1;

// =====================================
// Q9
// =====================================

case 9:

  return {
    "I have no meaningful protection coverage": 1,

    "I only have government benefits (PhilHealth, SSS, GSIS)": 2,

    "I have one form of personal protection (Life Insurance OR HMO)": 3,

    "I have multiple forms of protection (Life Insurance, HMO, or similar)": 4,

    "I have comprehensive protection covering my health, income, and family": 5

  }[answer] || 1;

// =====================================
// Q10
// =====================================

case 10:

  return {
    "I rarely save": 1,
    "I save occasionally": 2,
    "I save monthly but inconsistently": 3,
    "I save consistently every month": 4,
    "Saving is automated and disciplined": 5
  }[answer] || 1;

// =====================================
// Q11
// =====================================

case 11:

  return {
    "None": 1,
    "Learning about investing": 2,
    "Started investing recently": 3,
    "Invest regularly": 4,
    "Investments are a major part of my financial plan": 5
  }[answer] || 1;

// =====================================
// Q12
// =====================================

case 12:

  return {
    "No preparation yet": 1,
    "Minimal preparation": 2,
    "Some preparation": 3,
    "Consistent retirement planning": 4,
    "Strong retirement strategy": 5
  }[answer] || 1;

// =====================================
// Q13
// =====================================

case 13:

  return {
    "Almost every day": 1,
    "Weekly": 2,
    "Monthly": 3,
    "Occasionally": 4,
    "Rarely": 5
  }[answer] || 1;

// =====================================
// Q14
// =====================================

case 14:

  return {
    "Very uncertain": 1,
    "Somewhat uncertain": 2,
    "Neutral": 3,
    "Confident": 4,
    "Very confident": 5
  }[answer] || 1;

// =====================================
// Q15
// =====================================

case 15:

  return {
    "I rely entirely on active income": 1,
    "I earn income but have little financial backup": 2,
    "I have savings that provide security": 3,
    "Some of my money works for me": 4,
    "My assets generate meaningful income": 5
  }[answer] || 1;

default:
  return 1;


}

}
// =====================================
// PART 3 - INTELLIGENCE ENGINE
// =====================================

// ADD THIS AT THE END OF calculateScore()
// BEFORE THE FINAL RETURN


function determineFinancialIdentity(data) {

const objectivePillars = [


data.earningPower,
data.financialSafetyNet,
data.familySecurity,
data.futureGrowth


];

const strongPillars =
objectivePillars.filter(function(score) {
return score >= 75;
}).length;

// BUILDER

if (strongPillars >= 3) {
return "🏆 The Builder";
}

// PROTECTOR

if (
data.familySecurity >= 75 &&
data.financialSafetyNet >= 70
) {
return "🛡 The Protector";
}

// PROVIDER

if (
data.breadwinnerStatus === "Primary Breadwinner" ||
data.children === "1-2" ||
data.children === "3+"
) {
return "💼 The Provider";
}

// PLANNER

if (data.overallScore >= 55) {
return "📈 The Planner";
}

// STARTER

return "🌱 The Starter";

}

// =====================================
// STRONGEST AREA
// =====================================

function getStrongestArea(
earningPower,
financialSafetyNet,
familySecurity,
futureGrowth
) {

const pillars = [


{
  name: "Earning Power",
  score: earningPower
},

{
  name: "Financial Safety Net",
  score: financialSafetyNet
},

{
  name: "Family Security",
  score: familySecurity
},

{
  name: "Future Growth",
  score: futureGrowth
}


];

pillars.sort(function(a,b){
return b.score - a.score;
});

return pillars[0].name;

}

// =====================================
// GROWTH OPPORTUNITY
// =====================================

function getGrowthOpportunity(
earningPower,
financialSafetyNet,
familySecurity,
futureGrowth
) {

const pillars = [


{
  name: "Earning Power",
  score: earningPower
},

{
  name: "Financial Safety Net",
  score: financialSafetyNet
},

{
  name: "Family Security",
  score: familySecurity
},

{
  name: "Future Growth",
  score: futureGrowth
}


];

pillars.sort(function(a,b){
return a.score - b.score;
});

return pillars[0].name;

}

// =====================================
// PRIMARY INSIGHT
// =====================================

function getPrimaryInsight(growthOpportunity) {

switch(growthOpportunity) {


case "Earning Power":

  return "Your current lifestyle appears to rely heavily on your ability to continue earning income.";

case "Financial Safety Net":

  return "Unexpected financial challenges may place additional pressure on your current finances.";

case "Family Security":

  return "The people who depend on you may also be highly dependent on your ability to continue earning.";

case "Future Growth":

  return "Your future financial goals may benefit from stronger long-term planning and wealth-building habits.";

default:

  return "Your assessment highlights opportunities to strengthen your financial foundation.";


}

}

// =====================================
// REFLECTION QUESTIONS
// =====================================

function getReflectionQuestions(
growthOpportunity
) {

switch(growthOpportunity) {


case "Earning Power":

  return {

    question1:
    "If your income stopped for six months, what would change most in your household?",

    question2:
    "What financial responsibility matters most to you today?"

  };

case "Financial Safety Net":

  return {

    question1:
    "How prepared would you feel for an unexpected financial emergency?",

    question2:
    "What would give you greater financial peace of mind over the next year?"

  };

case "Family Security":

  return {

    question1:
    "If something happened to you tomorrow, who would be affected most?",

    question2:
    "What would financial security for your family look like?"

  };

case "Future Growth":

  return {

    question1:
    "What financial goal matters most over the next 5 to 10 years?",

    question2:
    "Are your current habits helping you reach that goal?"

  };

default:

  return {

    question1:
    "What financial goal matters most to you right now?",

    question2:
    "What would financial progress look like over the next year?"

  };


}

}

// =====================================
// CONSULTATION TOPIC
// =====================================

function getConsultationTopic(
growthOpportunity
) {

switch(growthOpportunity) {


case "Earning Power":
  return "Income Stability Planning";

case "Financial Safety Net":
  return "Emergency Fund Planning";

case "Family Security":
  return "Family Protection Review";

case "Future Growth":
  return "Long-Term Financial Planning";

default:
  return "Financial Reality Review";


}

}

// =====================================
// SHEET 2
// PILLAR SCORES
// =====================================

function savePillarScores(
data,
earningPower,
financialSafetyNet,
familySecurity,
futureGrowth,
financialConfidence,
overallScore
) {

const sheet =
SpreadsheetApp
.openById(SPREADSHEET_ID)
.getSheetByName("Pillar Scores");

sheet.appendRow([


data.firstName + " " + data.lastName,

earningPower,
financialSafetyNet,
familySecurity,
futureGrowth,
financialConfidence,

overallScore


]);

}

// =====================================
// SHEET 3
// RESULTS ENGINE
// =====================================

function saveResultsEngine(
data,
financialIdentity,
primaryInsight,
reflectionQuestions,
consultationTopic
) {

const sheet =
SpreadsheetApp
.openById(SPREADSHEET_ID)
.getSheetByName("Results Engine");

sheet.appendRow([


data.firstName + " " + data.lastName,

financialIdentity,

primaryInsight,

reflectionQuestions.question1,

reflectionQuestions.question2,

consultationTopic


]);

}
