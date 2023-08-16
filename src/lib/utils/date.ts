const check24h = (date: number): boolean => {
  const dayInMillis = 24 * 60 * 60 * 1000;
  const currentTime = Date.now();

  return currentTime - date > dayInMillis;
};

export { check24h };
