import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "nav": {
                "browse": "Browse",
                "visualize": "Visualize",
                "benchmark": "Benchmark",
                "recommend": "AI Recommend",
                "learn": "Learn"
            },
            "learn": {
                "hero_badge": "AlgoVerse Premium Learning",
                "hero_title": "Master Algorithms Through Interaction",
                "hero_subtitle": "Stop reading, start solving. Our adaptive paths and visual simulations help you internalize complexity like never before.",
                "stats": {
                    "paths": "Learning Paths",
                    "mastered": "Algorithms Mastered",
                    "progress": "Overall Progress",
                    "streak": "Daily Streak"
                },
                "daily_protocol": {
                    "title": "Daily Protocol",
                    "subtitle": "The algorithm challenge of the day",
                    "accept": "Accept Protocol",
                    "skip": "Skip for Today"
                },
                "knowledge_mapping": {
                    "title": "Knowledge Mapping",
                    "subtitle": "Visualize your cognitive connections"
                },
                "learning_paths": {
                    "title": "Learning Paths",
                    "subtitle": "Curated journeys for specific career goals",
                    "resume": "Resume Module",
                    "enroll": "Enroll Now"
                }
            },
            "landing": {
                "get_started": "Get Started",
                "hero_title": "Unified Algorithm Intelligence Platform",
                "hero_subtitle": "Explore, visualize, and benchmark 1000+ algorithms across multiple domains with AI-powered recommendations"
            }
        }
    },
    ta: {
        translation: {
            "nav": {
                "browse": "உலாவுக",
                "visualize": "காண்க",
                "benchmark": "ஒப்பீடு",
                "recommend": "AI பரிந்துரை",
                "learn": "கற்றுக்கொள்"
            },
            "learn": {
                "hero_badge": "AlgoVerse பிரீமியம் கற்றல்",
                "hero_title": "ஊடாடல் மூலம் அல்காரிதம்களை மாஸ்டர் செய்யுங்கள்",
                "hero_subtitle": "வாசிப்பதை நிறுத்திவிட்டு, தீர்வுகளைத் தொடங்கவும். எங்களின் தகவமைப்புப் பாதைகள் சிக்கலானவற்றை முன்னெப்போதும் இல்லாத வகையில் உள்வாங்க உதவுகின்றன.",
                "stats": {
                    "paths": "கற்றல் பாதைகள்",
                    "mastered": "தேர்ச்சி பெற்ற அல்காரிதம்கள்",
                    "progress": "ஒட்டுமொத்த முன்னேற்றம்",
                    "streak": "தினசரி தொடர்ச்சி"
                },
                "daily_protocol": {
                    "title": "தினசரி நெறிமுறை",
                    "subtitle": "இன்றைய அல்காரிதம் சவால்",
                    "accept": "ஏற்றுக்கொள்",
                    "skip": "இன்று தவிர்க்கவும்",
                    "skip_info": "புதிய நெறிமுறை நாளை ஒதுக்கப்படும்."
                },
                "knowledge_mapping": {
                    "title": "அறிவு வரைபடம்",
                    "subtitle": "உங்கள் அறிவாற்றல் தொடர்புகளைக் காட்சிப்படுத்துங்கள்"
                },
                "learning_paths": {
                    "title": "கற்றல் பாதைகள்",
                    "subtitle": "குறிப்பிட்ட தொழில் இலக்குகளுக்கான பயணங்கள்",
                    "resume": "தொடரவும்",
                    "enroll": "இப்போது சேரவும்"
                }
            },
            "landing": {
                "get_started": "தொடங்கவும்",
                "hero_title": "ஒருங்கிணைந்த அல்காரிதம் புலனாய்வுத் தளம்",
                "hero_subtitle": "AI-ஆல் இயக்கப்படும் பரிந்துரைகளுடன் பல களங்களில் 1000+ அல்காரிதம்களை ஆராய்ந்து, காட்சிப்படுத்தவும் மற்றும் ஒப்பிடவும்"
            }
        }
    },
    hi: {
        translation: {
            "nav": {
                "browse": "ब्राउज़ करें",
                "visualize": "कल्पना करें",
                "benchmark": "बेंचमार्क",
                "recommend": "AI अनुशंसा",
                "learn": "सीखें"
            },
            "learn": {
                "hero_badge": "AlgoVerse प्रीमियम लर्निंग",
                "hero_title": "बातचीत के माध्यम से एल्गोरिदम में महारत हासिल करें",
                "hero_subtitle": "पढ़ना बंद करें, समाधान शुरू करें। हमारे अनुकूली पथ और दृश्य सिमुलेशन आपको जटिलता को पहले की तरह समझने में मदद करते हैं।",
                "stats": {
                    "paths": "सीखने के रास्ते",
                    "mastered": "महारत हासिल एल्गोरिदम",
                    "progress": "कुल प्रगति",
                    "streak": "दैनिक निरंतरता"
                },
                "daily_protocol": {
                    "title": "दैनिक प्रोटोकॉल",
                    "subtitle": "आज की एल्गोरिदम चुनौती",
                    "accept": "प्रोटोकॉल स्वीकार करें",
                    "skip": "आज के लिए छोड़ें",
                    "skip_info": "नया प्रोटोकॉल कल सौंपा जाएगा।"
                },
                "knowledge_mapping": {
                    "title": "ज्ञान मानचित्रण",
                    "subtitle": "अपने संज्ञानात्मक संबंधों की कल्पना करें"
                },
                "learning_paths": {
                    "title": "सीखने के रास्ते",
                    "subtitle": "विशिष्ट करियर लक्ष्यों के लिए तैयार यात्राएं",
                    "resume": "फिर से शुरू करें",
                    "enroll": "अभी नामांकन करें"
                }
            },
            "landing": {
                "get_started": "शुरू करें",
                "hero_title": "एकीकृत एल्गोरिदम इंटेलिजेंस प्लेटफॉर्म",
                "hero_subtitle": "AI-संचालित अनुशंसाओं के साथ कई डोमेन में 1000+ एल्गोरिदम का अन्वेषण, कल्पना और बेंचमार्क करें"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
