export const useAcronym = () => {
    const excludedWords = ["in","of"]; // Add more words if needed

    const getAcronym = (text: string): string => {
        if (!text) return "";

        return text
            .split(/\s+/) // Split by spaces
            .filter(word => !excludedWords.includes(word.toLowerCase())) // Exclude specific words
            .map(word => word[0]?.toUpperCase()) // Get first letter and uppercase it
            .join(""); // Join letters together
    };

    return { getAcronym };
}