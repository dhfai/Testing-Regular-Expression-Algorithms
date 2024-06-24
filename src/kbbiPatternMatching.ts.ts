export function matchPatternInWord(pattern: string, word: string): boolean {
    const regex = new RegExp(pattern, 'i');
    return regex.test(word);
}
