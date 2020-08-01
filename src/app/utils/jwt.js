const { sign } = require("jsonwebtoken");

module.exports = {
  /**
   * Given a string return a token using that string and the app secret
   * @function generateToken
   *
   * @param {string} payload
   * @returns {string} token
   *
   * @author Pedro Henrique Correa Mota da Silva
   */
  generateToken(payload) {
    const secret = process.env.APP_SECRET;

    payload = String(payload);

    const token = sign(
      {
        data: payload,
      },
      secret,
      {
        expiresIn: "6h",
      }
    );

    return token;
  },
};
