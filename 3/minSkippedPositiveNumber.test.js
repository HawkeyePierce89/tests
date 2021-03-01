const minSkippedPositiveNumber = require('./minSkippedPositiveNumber');

test('should be 1', () => {
    expect(minSkippedPositiveNumber([3,5,4,0])).toBe(1);
});

test('should be 2', () => {
    expect(minSkippedPositiveNumber([6,7,8,-2,-1,1])).toBe(2);
});

test('should be 4', () => {
    expect(minSkippedPositiveNumber([6,2,7,3,8,-2,-1,1])).toBe(4);
});

test('should be 1', () => {
    expect(minSkippedPositiveNumber([42,43,44])).toBe(1);
});
