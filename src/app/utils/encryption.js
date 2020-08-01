const crypto = require("crypto");

module.exports = {
  /**
   * Given parameters return the hash generated with the passed value
   * @function hash
   *
   * @param {string} algorithm
   * @param {string} text
   * @param {string} exit_type
   *
   * @returns {string} hash
   *
   * @author Pedro Henrique Correa Mota da Silva
   */
  hash(algorithm, text, exit_type) {
    return crypto.createHash(algorithm).update(text).digest(exit_type);
  },
};
