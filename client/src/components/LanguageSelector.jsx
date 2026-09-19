import { useLanguage } from "../context/LanguageContext";

function LanguageSelector({ compact = false }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <label className={`language-selector ${compact ? "compact" : ""}`}>
      <span>{t("language")}</span>
      <select
        aria-label={t("language")}
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="ta">தமிழ்</option>
        <option value="ml">മലയാളം</option>
      </select>
    </label>
  );
}

export default LanguageSelector;
