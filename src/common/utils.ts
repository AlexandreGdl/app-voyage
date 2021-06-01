/**
 * Check if an email is valid
 * @param {string} email email to check
 * @returns {boolean} email is valid or not
 */
 export function emailIsValid(email: string): boolean {
  const regex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

/**
 * Check if a password fit rules
 * @param {string} password password to check
 * @param {'strong' | 'medium'} strength strength of the password, either strong or medium
 * @returns {boolean} password is valid or not
 */
export function passwordIsValid(password: string, strength: 'strong' | 'medium' | 'light'): boolean {
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&\\-*?;,€_+()"\':~|=])(?=.{8,})');
  const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
  const lightRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{4,})');
  if (strength === 'strong') return strongRegex.test(password);
  if (strength === 'medium') return mediumRegex.test(password);
  return lightRegex.test(password);
}

/**
 * Check if phone number is valid
 * @param {string} phoneNumber to check
 * @returns {boolean} if phone number is valid
 */
 export function isPhoneNumberValid(phoneNumber: string): boolean {
  // creating regex
  const regex = new RegExp(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/gmi);

  return regex.test(phoneNumber);
}
