import I18n from "i18n";
import path from "path";

/**
 * Configure I18n
 */
I18n.configure({
  locales: ["pt-BR", "en-US"],
  directory: path.resolve(__dirname, "..", "locales"),
  defaultLocale: "en-US",
  updateFiles: true,
  syncFiles: true,
});

export default I18n;
