const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const lineGenerator = (minLineLength: number, maxLineLength: number): string => {
    if (minLineLength > maxLineLength) {
        throw new Error(`minLineLength (${minLineLength}) must be less than maxLiineLength (${maxLineLength})`);
    }

    const lineLength = minLineLength + Math.round(Math.random() * (maxLineLength - minLineLength + 1));

    const line = [...Array(lineLength).keys()]
        .reduce((line) => {
            const index = Math.floor(characters.length * Math.random());
            const symbol = characters[index];
            return line + symbol;
        }, '')

    return line;
}

export default lineGenerator;