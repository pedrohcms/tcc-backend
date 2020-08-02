import crypto from "crypto";

/**
 * Given parameters return the hash generated with the passed value
 *
 * @author Pedro Henrique Correa Mota da Silva
 */
export default function hash(algorithm: string, text: string) {
  return String(crypto.createHash(algorithm).update(text).digest("hex"));
}
