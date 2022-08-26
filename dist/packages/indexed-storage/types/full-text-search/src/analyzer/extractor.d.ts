/**
 * An extractor read a string value from the document.
 */
export declare type Extractor = (doc: object | string) => string | null;
/**
 * Extract string from a single field of the document.
 * @param {string} field - the document field
 * @returns {Extractor} - the extractor
 */
export declare function fieldExtractor(field: string): Extractor;
export declare function toStringExtractor(doc: object | string): string;
