export const usePercentage = (totalCorrect: number | undefined, totalQuestion: number | undefined) => {
    let percentage = 0.00;
    let detail;
    let color;
    if (!totalCorrect || !totalQuestion) {
        return {
            percentage: 0.00,
            color: '#4b0406',
            detail: detail = 'NOT YET EXAM'
        };
    }

    percentage = (totalCorrect / totalQuestion) * 100;
    if (percentage >= 0.00 && percentage <= 50.99) {
        color = '#4b0406';
        detail = 'POOR';
    } else if (percentage >= 51.00 && percentage <= 69.99) {
        color = '#8482f7';
        detail = 'GOOD';
    } else if (percentage >= 70.00 && percentage <= 89.99) {
        color = '#063646';
        detail = 'VERY GOOD';
    } else if (percentage >= 90.00 && percentage <= 100) {
        color = '#062d19';
        detail = 'EXCELLENT';
    } else {
        color = '#4b0406';
        detail = 'NOT EXAM YET';
    }


    return {
        percentage,
        color,
        detail
    }
}