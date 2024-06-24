import { matchPatternInWord } from '../kbbiPatternMatching.ts';

describe('KBBI Pattern Matching Algorithm', () => {
    it('should match word ending with "kan"', () => {
        const pattern = '.*kan$';
        const word = 'membacakan';
        const result = matchPatternInWord(pattern, word);
        console.log(`Kata: "${word}", Hasil: ${result ? 'Berhasil' : 'Tidak berhasil'} mencocokkan pola.`);
        expect(result).toBe(true);
    });

    it('should match word starting with "me" and ending with "kan"', () => {
        const pattern = '^me.*kan$';
        const word = 'memperkuatkan, mengecilkan, menyembuhkan';
        const result = matchPatternInWord(pattern, word);
        console.log(`Kata: "${word}", Hasil: ${result ? 'Berhasil' : 'Tidak berhasil'} mencocokkan pola.`);
        expect(result).toBe(true);
    });

    it('should match word starting with "per" and ending with "an"', () => {
        const pattern = '^per.*an$';
        const word = 'perubahan';
        const result = matchPatternInWord(pattern, word);
        console.log(`Kata: "${word}", Hasil: ${result ? 'Berhasil' : 'Tidak berhasil'} mencocokkan pola.`);
        expect(result).toBe(true);
    });

    it('should match word containing "i.*i.*"', () => {
        const pattern = '.*i.*i.*';
        const word = 'indikasi';
        const result = matchPatternInWord(pattern, word);
        console.log(`Kata: "${word}", Hasil: ${result ? 'Berhasil' : 'Tidak berhasil'} mencocokkan pola.`);
        expect(result).toBe(true);
    });

    it('should match word containing "a" and ending with "i"', () => {
        const pattern = '.*a.*i$';
        const word = 'cemasai';
        const result = matchPatternInWord(pattern, word);
        console.log(`Kata: "${word}", Hasil: ${result ? 'Berhasil' : 'Tidak berhasil'} mencocokkan pola.`);
        expect(result).toBe(true);
    });

    it('should match word ending with "ul"', () => {
        const pattern = '.*ul$';
        const word = 'tanggul';
        const result = matchPatternInWord(pattern, word);
        console.log(`Kata: "${word}", Hasil: ${result ? 'Berhasil' : 'Tidak berhasil'} mencocokkan pola.`);
        expect(result).toBe(true);
    });

    it('should match word starting with "di" and containing "i.*i.*"', () => {
        const pattern = '^di.*i.*';
        const word = 'dikunjungi';
        const result = matchPatternInWord(pattern, word);
        console.log(`Kata: "${word}", Hasil: ${result ? 'Berhasil' : 'Tidak berhasil'} mencocokkan pola.`);
        expect(result).toBe(true);
    });
});




describe('KBBI Pattern Matching Algorithm - Boundary Conditions', () => {
  it('should match word containing "i.*i.*"', () => {
      const pattern = '.*i.*i.*';
      const word = 'indikasi';
      const result = matchPatternInWord(pattern, word);
      console.log(`Kata: "${word}", Hasil: ${result ? 'Berhasil' : 'Tidak berhasil'} mencocokkan pola.`);
      expect(result).toBe(true);
  });

  it('should handle empty keyword', () => {
      const pattern = '';
      const word = 'perubahan';
      const result = matchPatternInWord(pattern, word);
      console.log(`Kata: "${word}", Hasil: ${result ? 'Berhasil' : 'Tidak berhasil'} mencocokkan pola.`);
      expect(result).toBe(true);
  });

  it('should match word with specific length', () => {
      const pattern = '^.{5}$';
      const word = 'buku';
      const result = matchPatternInWord(pattern, word);
      console.log(`Kata: "${word}", Hasil: ${result ? 'Berhasil' : 'Tidak berhasil'} mencocokkan pola.`);
      expect(result).toBe(false);
  });

  it('should match word starting with "me" and ending with "kan"', () => {
      const pattern = '^me.*kan$';
      const word = 'mengecilkan';
      const result = matchPatternInWord(pattern, word);
      console.log(`Kata: "${word}", Hasil: ${result ? 'Berhasil' : 'Tidak berhasil'} mencocokkan pola.`);
      expect(result).toBe(true);
  });

  it('should match word starting with "di" and containing "i.*i.*"', () => {
      const pattern = '^di.*i.*';
      const word = 'dikunjungi';
      const result = matchPatternInWord(pattern, word);
      console.log(`Kata: "${word}", Hasil: ${result ? 'Berhasil' : 'Tidak berhasil'} mencocokkan pola.`);
      expect(result).toBe(true);
  });
});
