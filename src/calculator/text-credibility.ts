import fs from "fs";
import path from "path";
import nspell from "nspell";
// import { semanticScore } from "./bot-credibility";
import { Credibility, TextCredibilityWeights, Text, Language } from "./models";

// Bad words filter
const Filter = require("bad-words");
let filter = new Filter();

// Dictionary files
const enDictionaryBase = require.resolve("dictionary-en");
const frDictionaryBase = require.resolve("dictionary-fr");
const esDictionaryBase = require.resolve("dictionary-es");

// Load dictionaries
function generateDictionaries(dictBase: string): { aff: string; dic: string } {
  const aff = fs.readFileSync(path.join(dictBase, "..", "index.aff"), "utf-8");
  const dic = fs.readFileSync(path.join(dictBase, "..", "index.dic"), "utf-8");
  return { aff, dic };
}
const dictionaries = {
  en: generateDictionaries(enDictionaryBase),
  fr: generateDictionaries(frDictionaryBase),
  es: generateDictionaries(esDictionaryBase),
};

// Create spell checkers
const spellCheckers = {
  en: nspell(dictionaries.en.aff, dictionaries.en.dic),
  fr: nspell(dictionaries.fr.aff, dictionaries.fr.dic),
  es: nspell(dictionaries.es.aff, dictionaries.es.dic),
};

/**
 * Clean a tweet from all the unnecessary information:
 * - Remove all substrings that are URLs
 * - Remove all mentions (@)
 * - Remove all hashtags (#)
 * - Remove all emojis
 * - Remove all punctuation
 * - Remove all extra spaces
 * @param text The text to clean
 * @returns The cleaned text
 */
function cleanTweet(text: string): string {
  return text
    .replace(/https?:\/\/[^\s]+/g, "") // Remove URLs
    .replace(/@[^\s]+/g, "") // Remove mentions
    .replace(/#[^\s]+/g, "") // Remove hashtags
    .replace(/[\u{1F600}-\u{1F6FF}]/gu, "") // Remove emojis
    .replace(/[^\w\s]|_/g, "") // Remove punctuation
    .replace(/\s+/g, " ") // Remove extra spaces
    // .replace(/^-?[0-9]\d*(\.\d+)?$/g, "") //Remove all numbers (new parameter)
    .trim();
}

/**
 * Get words from a text
 * @param text The text to get words from
 * @returns The words
 */
const getWords = (text: string): string[] => text.split(" ");

// ------------- MISSPELLING CRITERIA -------------
/**
 * Misspelling criteria: Measures the misspelling proportion in a text
 * between 0 and 100 against the amount of words in the text
 * @param text The text to check
 * @returns The misspelling criteria
 */
function misspellingCriteria(text: Text): number {
  const cleanedText = cleanTweet(text.text);
  const words = getWords(cleanedText);
  const misspelledWords = words.filter(
    (word) => !spellCheckers[text.lang].correct(word)
  );
  return 100 - (100 * misspelledWords.length) / words.length;
}

// ------------- BAD WORDS CRITERIA -------------
/**
 * Check if a word is a bad word
 * @param word The word to check
 * @returns True if the word is a bad word, false otherwise
 */
const isBadWord = (word: string): boolean => filter.isProfane(word);

/**
 * Counts the number of bad words in a text
 * @param words The words to check
 * @returns The number of bad words
 */
const countBadWords = (words: string[]): number =>
  words.filter(isBadWord).length;

/**
 * Bad words criteria: Measures the bad words proportion in a text
 * between 0 and 100 against the amount of words in the text
 * @param text The text to check
 * @returns The bad words criteria
 */
function badWordsCriteria(text: string): number {
  const cleanedText = cleanTweet(text);
  const words = getWords(cleanedText);
  const badWordsCount = countBadWords(words);
  return 100 - (100 * badWordsCount) / words.length;
}

// ------------- SPAM CRITERIA -------------
/**
 * Calculate percentage of capital letters in a text
 * @param text The text to check
 * @returns The percentage of capital letters
 */
const percentCaps = (text: string): number => {
  let caps = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === text[i].toUpperCase()) {
      caps++;
    }
  }
  return (100 * caps) / text.length;
};

interface SimpleSpamFilterParams {
  minWords?: number;
  maxPercentCaps?: number;
  maxNumSwearWords?: number;
  lang: Language;
}

class SimpleSpamFilter {
  minWords?: number;
  maxPercentCaps?: number;
  maxNumSwearWords?: number;
  lang: Language;

  constructor(params: SimpleSpamFilterParams) {
    this.minWords = params.minWords;
    this.maxPercentCaps = params.maxPercentCaps;
    this.maxNumSwearWords = params.maxNumSwearWords;
    this.lang = params.lang;
  }

  isSpam(text: string): boolean {
    // Check if the text is too short
    if (this.minWords && getWords(text).length < this.minWords) {
      return true;
    }

    // Check if the text has too many capital letters
    if (this.maxPercentCaps && percentCaps(text) > this.maxPercentCaps) {
      return true;
    }

    // Check if the text has too many swear words
    const badWordsCount = countBadWords(getWords(text));
    if (this.maxNumSwearWords && badWordsCount > this.maxNumSwearWords) {
      return true;
    }

    return false;
  }
}

/**
 * Spam criteria: Determinate probability of a text being spam
 * @param text The text to check
 * @returns The spam criteria
 */
function spamCriteria(text: Text): number {
  const spamParams: SimpleSpamFilterParams = {
    minWords: 5,
    maxPercentCaps: 30,
    maxNumSwearWords: 2,
    lang: text.lang,
  };
  const spamFilter = new SimpleSpamFilter(spamParams);
  const cleanedText = cleanTweet(text.text);
  return spamFilter.isSpam(cleanedText) ? 0 : 100;
}

// ------------- TEXT CREDIBILITY -------------
/**
 * Calculates the credibility of a tweet, based on the bad words, spam and misspelling criteria
 * @param text The text to check
 * @param params The weights of each criteria
 * @returns The credibility of the tweet
 */
async function calculateTextCredibility(
  text: Text,
  params: TextCredibilityWeights
): Promise<Credibility> {
  // SPAM CRITERIA
  const spamCred =
    params.weightSpam === 0 ? 0 : spamCriteria(text) * params.weightSpam;

  // BAD WORDS CRITERIA
  const badWordsCred =
    params.weightBadWords === 0
      ? 0
      : badWordsCriteria(text.text) * params.weightBadWords;

  // MISSPELLING CRITERIA
  const misspellingCred =
    params.weightMisspelling === 0
      ? 0
      : misspellingCriteria(text) * params.weightMisspelling;

  // SEMANTIC CRITERIA
  // const semanticCred =
  //   params.weightSemantic === 0
  //     ? 0
  //     : (await semanticScore(cleanTweet(text.text), text.lang)) *
  //       params.weightSemantic;

  const credibility = badWordsCred + misspellingCred + spamCred;

  return { credibility };
}
export { calculateTextCredibility, spellCheckers, cleanTweet };
