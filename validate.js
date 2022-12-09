class Validate {
  static patternIsInvalid(elem) {
    if (elem.validity.patternMismatch) return true;
    return false;
  }
  static inputIsEmpty(elem) {
    if (elem.validity.valueMissing) return true;
    return false;
  }
  static belowMinLength(elem) {
    if (elem.validity.tooShort) return true;
    return false;
  }
  static passwordConditionsMet(password) {
    const containsUpperCase = /[A-Z]/;
    const containsLowerCase = /[a-z]/;
    const containsNumbers = /[0-9]/;

    if (
      containsLowerCase.test(password) &&
      containsUpperCase.test(password) &&
      containsNumbers.test(password)
    ) {
      return true;
    }
    return false;
  }
  static passwordMatch(firstPassword, finalPassword) {
    if (firstPassword === finalPassword) return true;
    return false;
  }
}

export default Validate;
