export const getDynamicFontSizeClass = (string) => {
  const textLength = string.length;
  if (textLength > 10) {
    return "large"; // Should match the class name defined in your config
  } else if (textLength > 25) {
    return "medium"; // Should match the class name defined in your config
  } else if (textLength > 50) {
    return "small"; // Should match the class name defined in your config
  } else {
    return "base"; // Should match the class name defined in your config
  }
};