const numberilityCheck = require("./numberilityCheck");

test('0 should be true', () => {
    expect(numberilityCheck("0")).toBe(true);
});

test('0.5 should be true', () => {
    expect(numberilityCheck(" 0.5 ")).toBe(true);
});

test('fg should be false', () => {
    expect(numberilityCheck("fg")).toBe(false);
});

test('3 z should be false', () => {
    expect(numberilityCheck("3 z")).toBe(false);
});

test('1e20 should be true', () => {
    expect(numberilityCheck("1e20")).toBe(true);
});

test('-180e3 should be true', () => {
    expect(numberilityCheck("  -180e3 ")).toBe(true);
});

test('7e should be false', () => {
    expect(numberilityCheck("   7e")).toBe(false);
});

test('e9 should be false', () => {
    expect(numberilityCheck("e9")).toBe(false);
});

test('5e-2 should be true', () => {
    expect(numberilityCheck(" 5e-2")).toBe(true);
});

test('42e3.5 should be false', () => {
    expect(numberilityCheck(" 42e3.5 ")).toBe(false);
});

test('84. should be true', () => {
    expect(numberilityCheck("84.")).toBe(true);
});

test('126.e3 should be true', () => {
    expect(numberilityCheck("   126.e3")).toBe(true);
});

test('71.3e82 should be true', () => {
    expect(numberilityCheck("71.3e82")).toBe(true);
});

test('+21 should be true', () => {
    expect(numberilityCheck("+21  ")).toBe(true);
});

test('--7 should be false', () => {
    expect(numberilityCheck("--7 ")).toBe(false);
});

test('-+1 should be false', () => {
    expect(numberilityCheck("-+1")).toBe(false);
});

test('42z43f44 should be false', () => {
    expect(numberilityCheck("42z43f44")).toBe(false);
});
