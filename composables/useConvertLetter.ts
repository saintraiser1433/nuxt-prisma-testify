export const useConvertLetter = () => {
  const convertToLetter = (index: number) => {
    return String.fromCharCode(65 + index);

  };

  const letterWithText = (index: number, text: string) => {
    return String.fromCharCode(65 + index) + ').' + text;

  };


  return { convertToLetter, letterWithText };
};
