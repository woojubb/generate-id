const DEFAULT_AVAILABLE_CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateId(
    index,
    length = 4,
    availableCharacters = DEFAULT_AVAILABLE_CHARACTERS
) {
    const radix = availableCharacters.length;
    const baseNumber = length
        ? getNumberById(availableCharacters[1] + availableCharacters[0].repeat(length - 1), 0)
        : 0;
    const value = baseNumber + index;
    const f = (num, radix) => {
        const v = Math.floor(num / radix);
        const r = num % radix;

        return v >= radix ? [...f(v, radix), r] : [v, r];
    }
    
    return f(value, radix)
        .reduce((acc, index) => {
            acc.push(availableCharacters[index])

            return acc;
        }, [])
        .join('');
}

function getNumberById(
    id,
    length = 4,
    availableCharacters = DEFAULT_AVAILABLE_CHARACTERS
) {
    const num = id
        .split('')
        .reverse()
        .reduce((acc, char, index) => {
            const charIndex = availableCharacters.indexOf(char);

            return acc + (charIndex * Math.pow(availableCharacters.length, index));
        }, 0);
    
    const baseNumber = length
        ? getNumberById(availableCharacters[1] + availableCharacters[0].repeat(length - 1), 0)
        : 0;

    return num - baseNumber;
}

const a = generateId(1234, 0);
console.log("a", a);
const b = getNumberById(a, 0);
console.log("b", b);
const c = generateId(1234, 4);
console.log("c", c);
const d = getNumberById(c, 4);
console.log("d", d);

module.exports = generateId;
