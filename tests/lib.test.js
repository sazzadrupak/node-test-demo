const lib = require('../lib');

describe('absolute', () => {
  it('should return a positive num if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it('should return a positive num if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it('should return a 0 if input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('should return greeting message', () => {
    const result = lib.greet('Rupak');
    expect(result).toMatch(/rupak/i);
    expect(result).toContain('Rupak');
  });
});

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();

    expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
  });
});
