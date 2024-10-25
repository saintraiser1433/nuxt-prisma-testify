export const useConvertLetter = () => {
  const convertToLetter = (index: number) => {
    return String.fromCharCode(65 + index);
  };

  return { convertToLetter };
};
