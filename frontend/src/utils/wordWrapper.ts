export const wordTrimmer = (word: string) => {
    const trimmed = word.slice(0, 10);
    return trimmed + '...';
};
