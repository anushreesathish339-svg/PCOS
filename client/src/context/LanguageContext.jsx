import { createContext, useContext, useEffect, useState } from "react";

const translations = {
  en: {
    about: "About", features: "Features", contact: "Contact", login: "Login",
    register: "Register", dashboard: "Dashboard", prediction: "Prediction",
    cycle: "Cycle Tracker", symptoms: "Symptoms", medication: "Medication",
    reminders: "Reminders", diet: "Diet Plan", yoga: "Yoga Plan",
    labs: "Lab Reports", analytics: "Analytics", history: "History",
    profile: "Profile", logout: "Logout", search: "Search your health records",
    myProfile: "My profile", language: "Language", riskGuide: "Risk Guidance",
  },
  hi: {
    about: "हमारे बारे में", features: "सुविधाएँ", contact: "संपर्क", login: "लॉग इन",
    register: "पंजीकरण", dashboard: "डैशबोर्ड", prediction: "पूर्वानुमान",
    cycle: "मासिक चक्र", symptoms: "लक्षण", medication: "दवाइयाँ",
    reminders: "रिमाइंडर", diet: "आहार योजना", yoga: "योग योजना",
    labs: "लैब रिपोर्ट", analytics: "विश्लेषण", history: "इतिहास",
    profile: "प्रोफ़ाइल", logout: "लॉग आउट", search: "स्वास्थ्य रिकॉर्ड खोजें",
    myProfile: "मेरी प्रोफ़ाइल", language: "भाषा", riskGuide: "जोखिम मार्गदर्शन",
  },
  ta: {
    about: "எங்களை பற்றி", features: "அம்சங்கள்", contact: "தொடர்பு", login: "உள்நுழைக",
    register: "பதிவு", dashboard: "முகப்புப் பலகை", prediction: "கணிப்பு",
    cycle: "மாதவிடாய் சுழற்சி", symptoms: "அறிகுறிகள்", medication: "மருந்துகள்",
    reminders: "நினைவூட்டல்கள்", diet: "உணவுத் திட்டம்", yoga: "யோகா திட்டம்",
    labs: "ஆய்வக அறிக்கைகள்", analytics: "பகுப்பாய்வு", history: "வரலாறு",
    profile: "சுயவிவரம்", logout: "வெளியேறு", search: "உடல்நலப் பதிவுகளைத் தேடுங்கள்",
    myProfile: "என் சுயவிவரம்", language: "மொழி", riskGuide: "ஆபத்து வழிகாட்டி",
  },
  ml: {
    about: "ഞങ്ങളെക്കുറിച്ച്", features: "സവിശേഷതകൾ", contact: "ബന്ധപ്പെടുക", login: "ലോഗിൻ",
    register: "രജിസ്റ്റർ", dashboard: "ഡാഷ്ബോർഡ്", prediction: "പ്രവചനം",
    cycle: "ആർത്തവ ചക്രം", symptoms: "ലക്ഷണങ്ങൾ", medication: "മരുന്നുകൾ",
    reminders: "ഓർമ്മപ്പെടുത്തലുകൾ", diet: "ഭക്ഷണ പദ്ധതി", yoga: "യോഗ പദ്ധതി",
    labs: "ലാബ് റിപ്പോർട്ടുകൾ", analytics: "വിശകലനം", history: "ചരിത്രം",
    profile: "പ്രൊഫൈൽ", logout: "ലോഗ് ഔട്ട്", search: "ആരോഗ്യ രേഖകൾ തിരയുക",
    myProfile: "എന്റെ പ്രൊഫൈൽ", language: "ഭാഷ", riskGuide: "അപകട മാർഗ്ഗനിർദ്ദേശം",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("pcos-language") || "en");

  useEffect(() => {
    localStorage.setItem("pcos-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
