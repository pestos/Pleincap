"use client";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

interface ItineraryDay {
    day: string;
    title: string;
    desc: string;
    image: string;
    highlights?: string[];
}

interface Expert {
    name: string;
    role: string;
    quote: string;
    image: string;
}

interface Demeure {
    city: string;
    name: string;
    desc: string;
    image: string;
    features?: string[];
}

interface Pricing {
    category: string;
    description: string;
    price: number;
}

const itinerary: ItineraryDay[] = [
    {
        day: "01",
        title: "Vienne - Embarquement",
        desc: "Accueil à bord de votre navire à partir de 16h. Cocktail de bienvenue et présentation de l'équipage. Dîner de gala impérial pour débuter votre séjour dans la capitale autrichienne.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCnFCuj0j_-t0AC90skvOY0bnMAwpTy9wu_Y6XyVozNt2NwSwZbJZOmxw7oZrLX61h9lMwkcv5_wtHGy4lqoyg4zHDa2Rnmsd-5LaXyLTjgjSDLYLPT7V1qaZD5_lR-A3DO9EyiN_jq7AG2qKxPS1A8fDeBlnj8BOlAlyTgfs_WCQ9DUGM8QfaVUe5E-OWd0MzeT35RTCGuhIfWgb5j1sOeamYXDq20AVWU-SYyGYmWX5zUFSXqPzlAXCUqZcf6RwuEwCbaSJsRAY",
        highlights: [
            "Embarquement 16h",
            "Cocktail de bienvenue",
            "Dîner de gala",
        ],
    },
    {
        day: "02",
        title: "Dürnstein & Vallée de la Wachau",
        desc: "Escale dans le plus charmant village de la vallée. Visite de l'abbaye baroque de Melk, surplombant le fleuve, véritable chef-d'œuvre de l'architecture autrichienne avec ses fresques exceptionnelles.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeXOI8F29nwuSuLEcC_y4z2YyNPQUtR8cohNPIQ34o-6Qz-tNEgW8NhdbdGNXxtKX53Sr1G6KOsDIapOi22rPLXpooeOoAv6EoFEINsjBb89CrLqhBmfBCjcpnMxCwjLmoYAT2rW_ZACw2Xgzhr7pFxYG2r0DzzQLQtkZ9n_To10wBHQK8ICbtGSVjV7SfXySnijq9V-bqa517hCwuLc0MvwLFSqLdWcTaicDmiyWdhQDHVf8AwKKOExjqo7hRPnGRj5TsAJSSA0w",
        highlights: [
            "Abbaye de Melk",
            "Vignobles en terrasses",
            "Architecture baroque",
        ],
    },
    {
        day: "03",
        title: "Bratislava - La Perle du Danube",
        desc: "Découverte de la capitale slovaque : la vieille ville pavée, la cathédrale Saint-Martin où furent couronnés les rois de Hongrie, et le château offrant une vue panoramique sur trois pays.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsWx5JatNxZoCIurUSek3FArtCXYbHx6nhYLP0o2NZfm7zq1QtWUuqO-WSQn4COMX8Ney2gb6ri90XApI8YUuAy6pt8Ig-7NerA4gJ5N4xlD-WK5NAgegAlGqTCPl_NPWRWpUdXJBYZ9vHJBt1HUYLmGkJ8mIhdbeGEjBMc_QwbTyYxN76qv84wJzihYi7zaFCubEbup0DY1GOxO-A32rbQFBpDAXKJRJimowtbZFY0_nBPevflOpHPCQK3_NXsPmcR2ec2ycXssk",
        highlights: [
            "Château de Bratislava",
            "Vieille ville médiévale",
            "Cathédrale Saint-Martin",
        ],
    },
    {
        day: "04",
        title: "Budapest - La Perle du Danube",
        desc: "Journée complète dans la majestueuse capitale hongroise. Visite du Parlement néo-gothique, des Thermes Széchenyi, et promenade dans le quartier du château de Buda.",
        image: "https://www.plein-cap.com/images/stories/MsLadyDiletta/Lady-Diletta_08.jpg",
        highlights: [
            "Parlement hongrois",
            "Thermes historiques",
            "Château de Buda",
            "Croisière nocturne",
        ],
    },
    {
        day: "05",
        title: "Belgrade - Carrefour des Balkans",
        desc: "Découverte de la capitale serbe, mélange fascinant d'influences ottomanes et austro-hongroises. Visite de la forteresse de Kalemegdan et du quartier bohème de Skadarlija.",
        image: "https://www.plein-cap.com/images/2026/capitales_baltes/entete_capitales_baltes.jpg",
        highlights: [
            "Forteresse de Kalemegdan",
            "Quartier Skadarlija",
            "Confluence Danube-Sava",
        ],
    },
];

const experts: Expert[] = [
    {
        name: "Dr. Jean-Pierre Bastide",
        role: "Historien & Conférencier",
        quote: "\"Comprendre le Danube, c'est décrypter les strates de l'histoire européenne. Mon rôle est de faire revivre les empires à travers les pierres que nous croisons.\"",
        image: "https://www.plein-cap.com/images/stories/Conferenciers/Cedric_Cabanne_02.jpg",
    },
    {
        name: "Hélène de Vogué",
        role: "Spécialiste en Histoire de l'Art",
        quote: "\"De la rigueur baroque à la fantaisie rococo, j'accompagne nos voyageurs dans la lecture sensible des chefs-d'œuvre qui jalonnent ce fleuve mythique.\"",
        image: "https://www.plein-cap.com/images/stories/Conferenciers/PhilippeChalmin.jpg",
    },
];

const demeures: Demeure[] = [
    {
        city: "Cabine Standard",
        name: "Cabine extérieur avec hublot",
        desc: "Confortable et fonctionnelle, idéale pour profiter pleinement de l’expérience à bord.",
        features: [
            "Hublot extérieur",
            "Lit double ou twin",
            "Salle d'eau avec sèche-cheveux",
            "Climatisation individuelle",
        ],
        image: "https://www.plein-cap.com/images/stories/MsHamburg/ms_hamburg_cabine_04.jpg",
    },
    {
        city: "Cabine Supérieur",
        name: "Cabine avec fenêtre française",
        desc: "Plus spacieuse et raffinée, pour un confort optimisé et des prestations améliorées.",
        features: [
            "Fenêtre française panoramique",
            "Lit double ou twin rapprochable",
            "Espace salon dédié",
            "Peignoirs et salle d'eau équipée",
            "Coffre-fort et minibar",
        ],
        image: "https://www.plein-cap.com/images/stories/MsHamburg/ms_hamburg_cabine_08.jpg",
    },
    {
        city: "Suite impérial",
        name: "Suite de prestige avec balcon",
        desc: "Spacieuse et élégante, la suite impériale incarne le summum du confort et du raffinement. Elle offre des prestations haut de gamme, un espace généreux et une atmosphère exclusive pour une expérience d’exception.",
        features: [
            "Deux fenêtres panoramiques",
            "Deux lits simples rapprochables",
            "Salle de douche avec WC, peignoir, sèche-cheveux",
            "Armoire et commode",
            "Canapé, 2–3 chaises, bureau, table",
            "Climatisation individuelle",
            "Minibar et coffre-fort",
            "Téléphone à bord",
            "Deux téléviseurs avec caméra avant",
            "Balcon / véranda privé avec 2 transats",
        ],
        image: "https://www.plein-cap.com/images/stories/MsHamburg/ms_hamburg_cabine_09.jpg",
    },
];

const pricing: Pricing[] = [
    {
        category: "Cabine Standard",
        description: "Cabine extérieure avec hublot, 14m²",
        price: 2450,
    },
    {
        category: "Cabine Supérieure",
        description: "Cabine avec fenêtre française, 16m²",
        price: 2850,
    },
    {
        category: "Suite Junior",
        description: "Suite avec balcon privé, 22m²",
        price: 3650,
    },
    {
        category: "Suite Impériale",
        description: "Suite de prestige avec balcon, 28m²",
        price: 4850,
    },
];

const gallery = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCmTemJMIkB7Q-HwFHO9IOQt8WPr8VdbUqYpPf62rt-ELjNSeODvWEcX7iu7Dd_Y5iFRAi7snyeCBNi4Rdp01IBCSsk-wWtS7FQe_sv691LRkMhb-ww1DTgtdvQScZtM4VOWwaxJtXwUNy12T2z5ZK1l9-EQ2nF9XyPIP3LY2CzjRO3h4K-jqDXGD--BFpVnmsWR1Zf5zoMAddKGrydHN1UW_yCMAwaMI2ArmSS-spRKBVYzJJtaDK4rI19L3fZEeokY7svU7KtY2A",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCgIq-o2uIG-J2oTsChTf3rAi4zTocoAwmebgaC5Zqls_IOWnWBSNR_oc7mmGvt-1vMKyhW9iq0Fafx3-0yJvWUxiiTLDJ4bxpW0Hbs1s2OvFvsZu8eKELL9KwS5YRtFI9yFlEdIrHxIwH18BqF12Mpn8y2-HU9XSHpGXEW8KohAR3kaMD7gFQkhMaDe4Sr7-_tWADaWPLFFGJU-U1prvVsYg1uS_zev144UCnAzr0y1P5sG1HC-hmSP-33CVO9dxqh-z0b7cedEfo",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDTXV-VvgzljdC3y-n7KIMgCW00N8clZnH7Z9fm_v0xqNp_yIDyPKhFVTgZYN-9gJr2cXtS0iyTtapYVgRIhSLuFb9Jaca9RBL_mv9Oq6Efyu3z-G2nujjaQSswYPiDSiSSMAkPP5Ao0D9Z-pXwd1-73KvVpiLFLUtM1Wt-e8Cwb5D0SOvh3CveTsvWP6POGDuYbyi-aFxUsA6Of8GFDt0rOogeGRbsGPZ-Vnka3kfgwiX4m5MBw6EEmqM692Gy6hLaqhtlO4gPb8c",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCKQUs-DRR-pP2H0t2S8PZQxeunFAwz_Pbs98bD3qjKNKU1enzl0yI6BdJqT3Y0arAltQFp7xUF2l5wwdEU0bz8J-cdy9dG1-kYNZEKgYMsCt6mTj8DIEawJmLiXQISM_2kiRIQ8AwGqIylYFfQv5e65pakDZDEvR6-JcNxF59G-dWZnuI8YmNwi23XM0QH3nQPyiF5oaNaRoe90wD_NvAb8yKzAHRo4pO7n98vUn16Z3mR0g2_MBbSD9cdQtpFCQLnWL5wLSvKSBs",
];

const navItems = [
    { id: "apercu", label: "Aperçu" },
    { id: "navire", label: "Le Navire" },
    { id: "programme", label: "Programme" },
    { id: "experts", label: "Nos Experts" },
    { id: "demeures", label: "Demeures" },
    { id: "galerie", label: "Galerie" },
    { id: "reservation", label: "Réservation" },
];

export default function DanubeImperialPage() {
    const [activeSection, setActiveSection] = useState("apercu");
    const [selectedPricing, setSelectedPricing] = useState(0);
    const [selectedCabin, setSelectedCabin] = useState<Demeure | null>(null);

    const cabinIdToType: Record<string, string> = {
        "101": "Cabine extérieur avec hublot",
        "102": "Cabine extérieur avec hublot",
        "103": "Cabine extérieur avec hublot",
        "104": "Cabine extérieur avec hublot",
        "105": "Cabine avec fenêtre française",
        "106": "Cabine avec fenêtre française",
        "107": "Suite de prestige avec balcon",
        "108": "Suite de prestige avec balcon",
    };

    const handleCabinSelect = (id: string) => {
        const target = cabinIdToType[id];
        if (!target) return;
        const cabin = demeures.find(
            (d) => d.name === target || d.city === target,
        );
        if (cabin) {
            setSelectedCabin(cabin);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-abyss dark:bg-background-dark dark:text-ecru">
            <SiteHeader />

            <section className="relative flex h-[75vh] w-full items-center justify-center overflow-hidden pt-20">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(26, 43, 60, 0.6), rgba(26, 43, 60, 0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCZyCP5gv5N4t5Ej4NZTbUXJshRgWLYlHPaVrYV_FoGE1A5IjEFBMz-82onVUgmJlSi1CEA7EJ1uWyS-29fHaRa8fZvtFM-h6ecJsKu0JI9iuN5DfVhb5O4v_rK-GhgsuuS-WNJC-jRKyVFKyr_IAzuAbcTo3QZkE9zZMYq-XCfDkTsi1SUzKkIhvq2rLAkLFzl3xRIY85sBORIU1fceBSELfFTcGssQ6UOsi54FFXM0Dm9y4bKx3z0OpT2pd_1Y_mslMtzfF3QGgo')",
                    }}
                />
                <div className="relative z-10 mx-auto max-w-[1600px] px-6 text-center text-white md:px-16">
                    <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                        Voyage Culturel d'Exception
                    </span>
                    <h1 className="serif-heading mb-6 text-6xl md:text-8xl">
                        Le Danube Impérial
                    </h1>
                    <div className="flex flex-col items-center gap-4 text-white/90 md:flex-row md:justify-center md:gap-8">
                        <span className="flex items-center gap-2 text-sm">
                            <span className="material-symbols-outlined text-primary">
                                calendar_today
                            </span>
                            Vienne à Bucarest | 15 - 22 Mai 2026
                        </span>
                        <div className="h-4 w-[1px] bg-white/30 hidden md:block" />
                        <span className="text-xl font-semibold text-primary">
                            À partir de 2 450 €
                        </span>
                    </div>
                </div>
            </section>

            <nav className="sticky top-20 z-40 hidden border-b border-primary/10 bg-background-light/95 backdrop-blur-md lg:block">
                <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                    <div className="flex justify-center gap-8 py-4">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={() => setActiveSection(item.id)}
                                className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                                    activeSection === item.id
                                        ? "border-b-2 border-primary text-primary"
                                        : "text-abyss/60 hover:text-primary"
                                }`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="w-full">
                <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                    <div className="grid grid-cols-1 gap-12 py-[120px] lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-[120px]">
                            <section id="apercu">
                                <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                                    Aperçu du voyage
                                </span>
                                <h2 className="serif-heading mb-8 text-4xl md:text-5xl">
                                    Éveil Culturel au Fil de l'Eau
                                </h2>
                                <div className="prose prose-lg max-w-none space-y-6">
                                    <p className="text-sm font-light leading-relaxed opacity-70">
                                        Naviguez au cœur de l'histoire
                                        européenne. De la majesté de Vienne aux
                                        rives mystérieuses des Balkans, ce
                                        périple à bord du M/S Amadeus Diamond
                                        est une invitation à la contemplation et
                                        à la découverte des splendeurs baroques,
                                        des capitales impériales et des paysages
                                        préservés du Danube.
                                    </p>

                                    <div className="grid grid-cols-2 gap-8 border-t border-primary/20 pt-8 md:grid-cols-4">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                                Durée
                                            </span>
                                            <p className="text-sm font-semibold">
                                                8 Jours / 7 Nuits
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                                Navigation
                                            </span>
                                            <p className="text-sm font-semibold">
                                                Le Danube Bleu
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                                Langue
                                            </span>
                                            <p className="text-sm font-semibold">
                                                Français
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                                Accompagnement
                                            </span>
                                            <p className="text-sm font-semibold text-primary">
                                                Permanent
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border border-primary/30 bg-ecru p-8 mt-8">
                                        <div className="mb-4 flex items-center gap-3">
                                            <span className="material-symbols-outlined text-2xl text-primary">
                                                verified
                                            </span>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                                                Signature Plein Cap
                                            </span>
                                        </div>
                                        <h3 className="mb-3 text-xl font-semibold">
                                            Croisière Accompagnée
                                        </h3>
                                        <p className="text-sm font-light leading-relaxed opacity-70">
                                            Un membre de l'équipe Plein Cap vous
                                            accompagne tout au long de votre
                                            séjour pour assurer votre confort et
                                            enrichir votre expérience
                                            culturelle.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section id="navire">
                                <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                                    Le navire
                                </span>
                                <div className="grid grid-cols-1 gap-8 border border-primary/20 bg-white md:grid-cols-2">
                                    <div className="p-8">
                                        <h3 className="serif-heading mb-4 text-3xl">
                                            M/S Amadeus Diamond
                                        </h3>
                                        <p className="mb-6 text-sm font-light leading-relaxed opacity-70">
                                            Entièrement rénové, ce bijou de la
                                            flotte offre un cadre intimiste et
                                            luxueux. Ses larges baies vitrées
                                            permettent une immersion totale dans
                                            les paysages traversés du Danube
                                            impérial.
                                        </p>
                                        <div className="space-y-4">
                                            {[
                                                "60 Cabines Extérieures de Prestige",
                                                "Restaurant Gastronomique Panoramique",
                                                "Salon Club & Espace Fitness",
                                                "Pont-soleil avec chaises longues",
                                            ].map((feature) => (
                                                <div
                                                    key={feature}
                                                    className="flex items-center gap-3"
                                                >
                                                    <span className="material-symbols-outlined text-lg text-primary">
                                                        check_circle
                                                    </span>
                                                    <span className="text-sm">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1X6IYczeNOIskSHAswcvpVkHqJFkb-xP-IOVU_Hx4GO3RK0at89E-DSKrjvF_nJXn2kejg32xx4IMudLT3StapsOiGnY8oduhwZO4oEif30-27iBCzomPXqHhGTOdwwmSTulw2uY9gzEZSE8KH7Pi7H3YZy9z53vZJzAkkth5tyKLK5sROsQfBGYoIkQRPnyfD6SxXCNmAFpIn0MR8X1X0yCAgY1di0Jhr07ELs2vPaJu7qA0yOyuZnNiCkAqXBx7t7D8r4ejG7M"
                                            alt="M/S Amadeus Diamond"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                            </section>

                            <section id="programme">
                                <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                                    Programme
                                </span>
                                <h3 className="serif-heading mb-12 text-4xl">
                                    Programme Quotidien
                                </h3>
                                <div className="relative space-y-16 pl-12">
                                    <div className="absolute left-5 top-0 h-full w-px bg-primary/30" />
                                    {itinerary.map((day) => (
                                        <div
                                            key={day.day}
                                            className="group relative"
                                        >
                                            <div className="absolute -left-[52px] top-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                                                {day.day}
                                            </div>
                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                                <div className="md:col-span-2">
                                                    <h4 className="serif-heading mb-3 text-2xl leading-tight">
                                                        {day.title}
                                                    </h4>
                                                    <p className="mb-4 text-sm font-light leading-relaxed opacity-70">
                                                        {day.desc}
                                                    </p>
                                                    {day.highlights && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {day.highlights.map(
                                                                (highlight) => (
                                                                    <span
                                                                        key={
                                                                            highlight
                                                                        }
                                                                        className="border border-primary/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary"
                                                                    >
                                                                        {
                                                                            highlight
                                                                        }
                                                                    </span>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="aspect-[4/3] overflow-hidden">
                                                    <img
                                                        src={day.image}
                                                        alt={day.title}
                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="mt-12 flex items-center gap-2 border-b border-primary pb-2 text-[10px] font-bold uppercase tracking-widest text-primary transition-colors hover:border-abyss hover:text-abyss">
                                    Voir le programme complet
                                    <span className="material-symbols-outlined text-sm">
                                        arrow_forward
                                    </span>
                                </button>
                            </section>
                        </div>

                        <aside
                            id="reservation"
                            className="lg:sticky lg:top-40 lg:h-fit"
                        >
                            <div className="border border-primary/20 bg-white p-8 shadow-lg">
                                <h4 className="serif-heading mb-6 text-2xl">
                                    Informations & Réservation
                                </h4>

                                <div className="mb-8">
                                    <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                                        Choisissez votre cabine
                                    </span>
                                    <div className="space-y-3">
                                        {pricing.map((option, index) => (
                                            <label
                                                key={option.category}
                                                className={`flex cursor-pointer items-center justify-between border p-4 transition-all ${
                                                    selectedPricing === index
                                                        ? "border-primary bg-primary/5"
                                                        : "border-abyss/20 hover:border-primary/50"
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name="pricing"
                                                        checked={
                                                            selectedPricing ===
                                                            index
                                                        }
                                                        onChange={() =>
                                                            setSelectedPricing(
                                                                index,
                                                            )
                                                        }
                                                        className="text-primary"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-semibold">
                                                            {option.category}
                                                        </p>
                                                        <p className="text-xs opacity-60">
                                                            {option.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="text-lg font-bold text-primary">
                                                    {option.price.toLocaleString()}{" "}
                                                    €
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6 space-y-4">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                                        Le prix comprend
                                    </span>
                                    <ul className="space-y-2 text-xs">
                                        {[
                                            "Hébergement en cabine de luxe",
                                            "Accompagnement Plein Cap permanent",
                                            "Pension complète & Boissons",
                                            "Excursions mentionnées",
                                            "Wi-Fi gratuit à bord",
                                        ].map((item, idx) => (
                                            <li
                                                key={item}
                                                className={`flex items-start gap-2 ${idx === 1 ? "font-semibold" : ""}`}
                                            >
                                                <span
                                                    className={`material-symbols-outlined text-sm text-primary ${idx === 1 ? "fill-current" : ""}`}
                                                >
                                                    {idx === 1
                                                        ? "stars"
                                                        : "check_circle"}
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-8 border border-primary/20 bg-primary/5 p-4 text-center">
                                    <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                                        Prix sélectionné
                                    </p>
                                    <p className="text-3xl font-bold text-abyss">
                                        {pricing[
                                            selectedPricing
                                        ].price.toLocaleString()}{" "}
                                        €
                                    </p>
                                    <p className="text-[10px] uppercase tracking-widest opacity-60">
                                        par personne
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <button className="sharp-edge w-full bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-abyss">
                                        Réserver maintenant
                                    </button>
                                    <button className="sharp-edge w-full border border-abyss/20 bg-transparent px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-abyss hover:text-white">
                                        Télécharger la brochure
                                    </button>
                                    <button className="sharp-edge w-full border border-primary/30 bg-transparent px-8 py-3 text-xs font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-white">
                                        Demander un devis
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                <section className="w-full py-[80px]">
                    <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                        <div className="mb-10 text-center">
                            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                                Plan des cabines
                            </span>
                            <h3 className="serif-heading text-3xl text-abyss md:text-4xl">
                                Vue d'ensemble du pont
                            </h3>
                        </div>
                        <div className="overflow-x-auto rounded border border-primary/15 bg-ecru/60 p-4 shadow-sm">
                            <div className="min-w-[760px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 900 220"
                                    className="h-auto w-full"
                                    role="img"
                                    aria-label="Plan du pont avec zones cabines et espaces communs"
                                >
                                    <defs>
                                        <style>
                                            {`.hull { fill:#f2dfb8; stroke:#1f1f1f; stroke-width:3; }
.inner { fill:none; stroke:#1f1f1f; stroke-width:2; opacity:.9; }
.divider { stroke:#1f1f1f; stroke-width:2; }
.thin { stroke:#1f1f1f; stroke-width:1.4; opacity:.55; }
.zoneTerrace { fill:#f7f1e8; stroke:#1f1f1f; stroke-width:2; }
.zoneCabins  { fill:#ffffff; stroke:#1f1f1f; stroke-width:2; }
.zoneSalon   { fill:#f3d1c6; stroke:#1f1f1f; stroke-width:2; }
.zoneKitchen { fill:#f0ddc2; stroke:#1f1f1f; stroke-width:2; }
.zoneCrew    { fill:#e7eef6; stroke:#1f1f1f; stroke-width:2; }
.cabinBox { fill:#70BFB0; stroke:#1f1f1f; stroke-width:2; transition: fill .2s ease, stroke .2s ease; }
.cabinBox:hover { fill:#e5b769; stroke:#0f172a; }
.cabinText { font-family: Arial, Helvetica, sans-serif; font-size:14px; fill:#1f1f1f; }
.cabinText:hover { fill:#0f172a; font-weight:700; }`}
                                        </style>

                                        <linearGradient
                                            id="hullShade"
                                            x1="0"
                                            x2="0"
                                            y1="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0"
                                                stopColor="#f6e7c6"
                                            />
                                            <stop
                                                offset="1"
                                                stopColor="#efd7ab"
                                            />
                                        </linearGradient>
                                    </defs>

                                    <path
                                        className="hull"
                                        fill="url(#hullShade)"
                                        d="M110 25 H760 Q865 110 760 195 H110 Q35 110 110 25 Z"
                                    />

                                    <path
                                        className="inner"
                                        d="M120 35 H750 Q835 110 750 185 H120 Q55 110 120 35 Z"
                                    />

                                    <path
                                        d="M135 45 H735 Q810 110 735 175 H135 Q75 110 135 45 Z"
                                        fill="#ffffff"
                                        opacity=".92"
                                    />

                                    <line
                                        className="divider"
                                        x1="165"
                                        y1="48"
                                        x2="165"
                                        y2="172"
                                    />
                                    <line
                                        className="divider"
                                        x1="500"
                                        y1="48"
                                        x2="500"
                                        y2="172"
                                    />
                                    <line
                                        className="divider"
                                        x1="640"
                                        y1="48"
                                        x2="640"
                                        y2="172"
                                    />

                                    <line
                                        className="thin"
                                        x1="150"
                                        y1="110"
                                        x2="725"
                                        y2="110"
                                    />

                                    <rect
                                        className="zoneTerrace"
                                        x="128"
                                        y="52"
                                        width="33"
                                        height="116"
                                        rx="14"
                                    />
                                    <rect
                                        className="zoneCabins"
                                        x="175"
                                        y="52"
                                        width="318"
                                        height="116"
                                        rx="14"
                                    />
                                    <rect
                                        className="zoneSalon"
                                        x="510"
                                        y="52"
                                        width="125"
                                        height="116"
                                        rx="14"
                                    />
                                    <rect
                                        className="zoneKitchen"
                                        x="655"
                                        y="52"
                                        width="95"
                                        height="58"
                                        rx="14"
                                    />
                                    <rect
                                        className="zoneCrew"
                                        x="655"
                                        y="116"
                                        width="95"
                                        height="52"
                                        rx="14"
                                    />

                                    <g className="cursor-pointer">
                                        <rect
                                            className="cabinBox"
                                            x="205"
                                            y="66"
                                            width="62"
                                            height="40"
                                            rx="8"
                                            onClick={() => handleCabinSelect("101")}
                                        />
                                        <rect
                                            className="cabinBox"
                                            x="275"
                                            y="66"
                                            width="62"
                                            height="40"
                                            rx="8"
                                            onClick={() => handleCabinSelect("103")}
                                        />
                                        <rect
                                            className="cabinBox"
                                            x="345"
                                            y="66"
                                            width="62"
                                            height="40"
                                            rx="8"
                                            onClick={() => handleCabinSelect("105")}
                                        />
                                        <rect
                                            className="cabinBox"
                                            x="415"
                                            y="66"
                                            width="62"
                                            height="40"
                                            rx="8"
                                            onClick={() => handleCabinSelect("107")}
                                        />

                                        <rect
                                            className="cabinBox"
                                            x="205"
                                            y="122"
                                            width="62"
                                            height="40"
                                            rx="8"
                                            onClick={() => handleCabinSelect("102")}
                                        />
                                        <rect
                                            className="cabinBox"
                                            x="275"
                                            y="122"
                                            width="62"
                                            height="40"
                                            rx="8"
                                            onClick={() => handleCabinSelect("104")}
                                        />
                                        <rect
                                            className="cabinBox"
                                            x="345"
                                            y="122"
                                            width="62"
                                            height="40"
                                            rx="8"
                                            onClick={() => handleCabinSelect("106")}
                                        />
                                        <rect
                                            className="cabinBox"
                                            x="415"
                                            y="122"
                                            width="62"
                                            height="40"
                                            rx="8"
                                            onClick={() => handleCabinSelect("108")}
                                        />

                                        <text
                                            className="cabinText"
                                            x="236"
                                            y="91"
                                            textAnchor="middle"
                                            onClick={() => handleCabinSelect("101")}
                                        >
                                            101
                                        </text>
                                        <text
                                            className="cabinText"
                                            x="306"
                                            y="91"
                                            textAnchor="middle"
                                            onClick={() => handleCabinSelect("103")}
                                        >
                                            103
                                        </text>
                                        <text
                                            className="cabinText"
                                            x="376"
                                            y="91"
                                            textAnchor="middle"
                                            onClick={() => handleCabinSelect("105")}
                                        >
                                            105
                                        </text>
                                        <text
                                            className="cabinText"
                                            x="446"
                                            y="91"
                                            textAnchor="middle"
                                            onClick={() => handleCabinSelect("107")}
                                        >
                                            107
                                        </text>

                                        <text
                                            className="cabinText"
                                            x="236"
                                            y="147"
                                            textAnchor="middle"
                                            onClick={() => handleCabinSelect("102")}
                                        >
                                            102
                                        </text>
                                        <text
                                            className="cabinText"
                                            x="306"
                                            y="147"
                                            textAnchor="middle"
                                            onClick={() => handleCabinSelect("104")}
                                        >
                                            104
                                        </text>
                                        <text
                                            className="cabinText"
                                            x="376"
                                            y="147"
                                            textAnchor="middle"
                                            onClick={() => handleCabinSelect("106")}
                                        >
                                            106
                                        </text>
                                        <text
                                            className="cabinText"
                                            x="446"
                                            y="147"
                                            textAnchor="middle"
                                            onClick={() => handleCabinSelect("108")}
                                        >
                                            108
                                        </text>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="demeures" className="w-full py-[120px]">
                    <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                        <div className="mb-16 flex items-center justify-between">
                            <div>
                                <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                                    Hébergements
                                </span>
                                <h3 className="serif-heading text-4xl md:text-5xl">
                                    Nos Cabines
                                </h3>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {demeures.map((demeure) => (
                                <button
                                    type="button"
                                    key={demeure.name}
                                    onClick={() => setSelectedCabin(demeure)}
                                    className="group relative h-[500px] overflow-hidden text-left focus:outline-none"
                                >
                                    <img
                                        src={demeure.image}
                                        alt={demeure.name}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-8 text-white">
                                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                                            {demeure.city}
                                        </p>
                                        <h4 className="serif-heading mb-3 text-2xl">
                                            {demeure.name}
                                        </h4>
                                        <p className="text-sm font-light leading-relaxed opacity-90">
                                            {demeure.desc}
                                        </p>
                                        <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                                            Découvrir la cabine
                                            <span className="material-symbols-outlined text-sm">
                                                arrow_forward
                                            </span>
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="experts" className="w-full bg-ecru py-[120px]">
                    <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                        <div className="mb-16 text-center">
                            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                                Nos conférenciers
                            </span>
                            <h3 className="serif-heading text-4xl md:text-5xl">
                                L'Expertise Plein Cap
                            </h3>
                            <div className="mx-auto mt-6 h-px w-24 bg-primary" />
                        </div>
                        <div className="grid gap-16 md:grid-cols-2">
                            {experts.map((expert) => (
                                <div
                                    key={expert.name}
                                    className="group text-center"
                                >
                                    <div className="mx-auto mb-8 h-64 w-64 overflow-hidden">
                                        <img
                                            src={expert.image}
                                            alt={expert.name}
                                            className="h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0"
                                        />
                                    </div>
                                    <h4 className="serif-heading mb-2 text-2xl">
                                        {expert.name}
                                    </h4>
                                    <p className="mb-6 text-sm font-bold uppercase tracking-widest text-primary">
                                        {expert.role}
                                    </p>
                                    <p className="mx-auto max-w-md text-sm font-light leading-relaxed opacity-70">
                                        {expert.quote}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="galerie" className="w-full bg-ecru py-[120px]">
                    <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                        <div className="mb-16">
                            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                                Galerie
                            </span>
                            <h3 className="serif-heading text-4xl md:text-5xl">
                                Souvenirs de Voyage
                            </h3>
                        </div>
                        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
                            {gallery.map((src, idx) => (
                                <div
                                    key={src}
                                    className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                                        idx === 0
                                            ? "md:col-span-2 md:row-span-2"
                                            : ""
                                    } ${idx === 2 ? "md:row-span-2" : ""}`}
                                >
                                    <img
                                        src={src}
                                        alt="Souvenir de voyage"
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {selectedCabin && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                        onClick={() => setSelectedCabin(null)}
                    />
                    <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-out">
                        <div className="flex h-full flex-col">
                            <div className="relative h-64 w-full overflow-hidden">
                                <img
                                    src={selectedCabin.image}
                                    alt={selectedCabin.name}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 space-y-2 text-white">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur">
                                        <span className="material-symbols-outlined text-sm text-white">
                                            king_bed
                                        </span>
                                        {selectedCabin.city}
                                    </span>
                                    <p className="serif-heading text-2xl leading-tight drop-shadow">
                                        {selectedCabin.name}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedCabin(null)}
                                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-abyss shadow"
                                    aria-label="Fermer la fiche cabine"
                                >
                                    <span className="material-symbols-outlined">
                                        close
                                    </span>
                                </button>
                            </div>
                            <div className="flex-1 space-y-6 overflow-y-auto p-8">
                                <div className="flex items-start gap-3 rounded border border-primary/15 bg-primary/5 p-4">
                                    <span className="material-symbols-outlined text-xl text-primary">
                                        info
                                    </span>
                                    <p className="text-sm font-light leading-relaxed text-abyss/80">
                                        {selectedCabin.desc}
                                    </p>
                                </div>

                                {selectedCabin.features && (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                                            <span className="material-symbols-outlined text-base">
                                                workspace_premium
                                            </span>
                                            Points forts
                                        </div>
                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {selectedCabin.features.map(
                                                (feature) => (
                                                    <div
                                                        key={feature}
                                                        className="flex items-start gap-3 rounded border border-abyss/10 bg-white px-3 py-2 shadow-sm"
                                                    >
                                                        <span className="material-symbols-outlined text-lg text-primary">
                                                            check_circle
                                                        </span>
                                                        <span className="text-xs leading-relaxed text-abyss/80">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="rounded border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 text-xs text-abyss/80">
                                    Comparez avec les autres catégories dans la
                                    section réservation et choisissez le tarif
                                    qui vous convient.
                                </div>
                                <div className="space-y-3">
                                    <a
                                        href="#reservation"
                                        onClick={() => setSelectedCabin(null)}
                                        className="sharp-edge block w-full bg-primary px-6 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-abyss"
                                    >
                                        Voir les tarifs et réserver
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedCabin(null)}
                                        className="sharp-edge block w-full border border-abyss/15 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-abyss transition hover:bg-abyss hover:text-white"
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </>
            )}

            <SiteFooter />
        </div>
    );
}
