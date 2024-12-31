export const useAlphabet = () => {
    const indexToLetter = (index: number) => {
        return String.fromCharCode(65 + index);
    }

    return {
        indexToLetter
    }
}