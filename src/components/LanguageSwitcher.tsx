import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const languages = [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "ta", name: "தமிழ் (Tamil)", flag: "🇮🇳" },
        { code: "hi", name: "हिन्दी (Hindi)", flag: "🇮🇳" },
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 px-3">
                    <Languages className="w-4 h-4 text-[var(--neon-cyan)]" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-white/70">
                        {currentLanguage.code}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-xl border-white/10">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => i18n.changeLanguage(lang.code)}
                        className={`flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 focus:bg-white/10 ${i18n.language === lang.code ? "text-[var(--neon-cyan)]" : "text-white/70"
                            }`}
                    >
                        <span className="text-xs font-bold uppercase tracking-wider">{lang.name}</span>
                        <span className="text-lg">{lang.flag}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
