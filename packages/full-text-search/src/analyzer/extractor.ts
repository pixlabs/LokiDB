/**
 * An extractor read a string value from the document.
 */
export type Extractor = (doc: object | string) => string | null;

/**
 * Extract string from a single field of the document.
 * @param {string} field - the document field
 * @returns {Extractor} - the extractor
 */
export function fieldExtractor(field: string): Extractor {
  return (doc: object | string) => {
    if (typeof doc === "string") return doc;

    const value = doc[field];
    if (!value) return null;

    if (typeof value !== "string") {
      // Convert number to string.
      if (typeof value === "number") {
        return value.toString();
      } else {
        throw TypeError("Unsupported field type for full text search.");
      }
    }

    return value;
  };
}

export function toStringExtractor(doc: object | string) {
  if (typeof doc === "string") return doc;
  return doc.toString();
}
