import { CharacterFilter } from "./character_filter";
import { Tokenizer, whitespaceTokenizer } from "./tokenizer";
import { lowercaseTokenFilter, TokenFilter } from "./token_filter";
import { Extractor, toStringExtractor } from "./extractor";

/**
 * A analyzer converts a string into tokens which are added to the inverted index for searching.
 */
export interface Analyzer {
  extractor?: Extractor;

  /**
   * The character filters of the analyzer.
   */
  char_filter?: CharacterFilter[];
  /**
   * The tokenizer of the analyzer.
   */
  tokenizer: Tokenizer;
  /**
   * The token filters of the analyzer.
   */
  token_filter?: TokenFilter[];
}

/**
 * Analyzes a given string.
 * @param {Analyzer} analyzer - the analyzer
 * @param {string} doc - the document
 * @returns {string[]} - the tokens
 */
export function analyze(analyzer: Analyzer, doc: object | string): string[] {
  let str = doc;

  if (analyzer.extractor) {
    str = analyzer.extractor(doc);
  }

  if (!str) return [];

  if (typeof str !== "string") {
    str = str.toString();
  }

  if (analyzer.char_filter) {
    for (let j = 0; j < analyzer.char_filter.length; j++) {
      str = analyzer.char_filter[j](str);
    }
  }

  const tokens = analyzer.tokenizer(str);
  if (analyzer.token_filter) {
    for (let i = 0; i < tokens.length; i++) {
      for (let k = 0; k < analyzer.token_filter.length; k++) {
        tokens[i] = analyzer.token_filter[k](tokens[i], i, tokens);
      }
    }
  }

  // Remove empty tokens.
  return tokens.filter((token) => token);
}

/**
 * An analyzer with the whitespace tokenizer and the lowercase token filter.
 */
export class StandardAnalyzer implements Analyzer {
  extractor = toStringExtractor;
  tokenizer = whitespaceTokenizer;
  token_filter = [lowercaseTokenFilter];
}
