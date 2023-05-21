import express from "express";
import { calculateTextCredibility } from "./calculator/text-credibility";
import { TextCredibilityWeights } from "./calculator/models";
import { calculateUserCredibility } from "./calculator/user-credibility";
import { calculateSocialCredibility } from "./calculator/social-credibility";

const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Test Text Credibility
  const text = "I am a bad speller";
  const lang = "en";
  const weights: TextCredibilityWeights = {
    weightSpam: 0.44,
    weightBadWords: 0.33 ,
    weightMisspelling: 0.23,
  };
  const credibility = calculateTextCredibility({ text, lang }, weights);
  console.log(credibility);

  // Test User Credibility
  const user = {
    verified: true,
    yearJoined: 2010,
    followersCount: 100,
    friendsCount: 100,
  };
  const userCredibility = calculateUserCredibility(user);
  console.log(userCredibility);

  // Test Social Credibility
  const socialCredibility = calculateSocialCredibility({
    ...user,
    followersCount: 1000,
  }, 10000);
  console.log(socialCredibility);
});
