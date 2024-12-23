export const usePercentage = (totalCorrect: number | undefined, totalQuestion: number | undefined) => {
    let percentage = 0.00;
    let detail;
    let hexColor;
    if (!totalCorrect || !totalQuestion) {
        return {
            percentage: 0.00,
            hexColor: '#4b0406',
            detail: detail = 'NOT YET EXAM'
        };
    }

    percentage = (totalCorrect / totalQuestion) * 100;
    if (percentage >= 0.00 && percentage <= 50.99) {
        hexColor = '#ff4c51';
        detail = 'POOR';
    } else if (percentage >= 51.00 && percentage <= 69.99) {
        hexColor = '#8482f7';
        detail = 'GOOD';
    } else if (percentage >= 70.00 && percentage <= 89.99) {
        hexColor = '#063646';
        detail = 'VERY GOOD';
    } else if (percentage >= 90.00 && percentage <= 100) {
        hexColor = '#062d19';
        detail = 'EXCELLENT';
    } else {
        hexColor = '#4b0406';
        detail = 'NOT EXAM YET';
    }


    return {
        percentage,
        hexColor,
        detail
    }
}