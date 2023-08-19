/**
 * Basic string securize function
 * @param text String to securize
 * @returns Segurizes string
 */
const securizeString = (text: string): string => {
  return text.toLowerCase().trim();
};

export { securizeString };
