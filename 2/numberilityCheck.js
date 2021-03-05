function numberilityCheck(argString) {
    const string = argString.trim();

    return /^[+-]?\d+\.?(\d+)?(e(?=[+-]?\d+))?([+-]?\d+)?$/i.test(string);
}

module.exports = numberilityCheck;
