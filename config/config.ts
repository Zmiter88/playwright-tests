export { sauceDemoBaseURL, automationExerciseBaseURL };

const sauceDemoBaseURL = process.env.SAUCEDEMO_BASE_URL;
if (!sauceDemoBaseURL) {
  throw new Error('SAUCEDEMO_BASE_URL is not defined');
}
const automationExerciseBaseURL = process.env.AUTOMATION_EXERCISE_BASE_URL;
if (!automationExerciseBaseURL) {
  throw new Error('AUTOMATION_EXERCISE_BASE_URL is not defined');
}