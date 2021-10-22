const woof = require('../JS/forTesting.js');
test('should return number of woofs', () => {
const result = woof('oh herro');
console.log(result)
expect(result).toBe("8woof!");
expect(result).not.toBe('bark')
expect({ a: "one", b: "two "}).toEqual({ a: "one", b: "two "});
});
