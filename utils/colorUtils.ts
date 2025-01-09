export const hexToRgb = (hex: string): [number, number, number] => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
};

export const generateLighterColor = (hex: string, opacity: number): string => {
    const [r, g, b] = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};