function minSkippedPositiveNumber(numbers) {
    let minPositiveNumber = 1;
    const pastNumbers = {};

    numbers.forEach(number => {
        if (number < minPositiveNumber) return false;

        if (number > minPositiveNumber) {
            pastNumbers[number] = true;
        }

        if (number === minPositiveNumber) {
            do {
                minPositiveNumber++;
            } while (pastNumbers[minPositiveNumber])
        }
    });

    return minPositiveNumber;
}

module.exports = minSkippedPositiveNumber;
