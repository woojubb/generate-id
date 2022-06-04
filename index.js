const DEFAULT_AVAILABLE_CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function generateId(
    index,
    baseNumber = new Date(1970, 1, 1, 0, 0, 0, 0).getTime(),
    availableCharacters = DEFAULT_AVAILABLE_CHARACTERS
) {
    const radix = availableCharacters.length;
    const num = (baseNumber + index);
    const f = (num, radix) => {
        const v = Math.floor(num / radix);
        const r = num % radix;

        return v > radix ? [...f(v, radix), r] : [v, r];
    }
    
    return f(num, radix)
        .reduce((acc, num) => {
            acc.push(availableCharacters[num])

            return acc;
        }, [])
        .join('');
}

module.exports = generateId;
