import { convertPLNToUSD } from './../convertPLNtoUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });

  it('should return NaN when input is text', () => {
    expect(convertPLNToUSD('6')).toBeNaN();
    expect(convertPLNToUSD('abc')).toBeNaN();
    expect(convertPLNToUSD('-5332')).toBeNaN();
    expect(convertPLNToUSD('wyscig zaraz!')).toBeNaN();
  });

  it('should return NaN when input is empty', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });

  it('should return ERROR when input is not a number or string', () => {
    expect(convertPLNToUSD([])).toBe('ERROR')
    expect(convertPLNToUSD({})).toBe('ERROR')
    expect(convertPLNToUSD(true)).toBe('ERROR')
    expect(convertPLNToUSD(function() {})).toBe('ERROR')
  });

  it('should return $0.00 when input is < 0', () => {
    expect(convertPLNToUSD(-2)).toBe('$0.00')
    expect(convertPLNToUSD(-345333)).toBe('$0.00')
    expect(convertPLNToUSD(-231)).toBe('$0.00')
  });
});

