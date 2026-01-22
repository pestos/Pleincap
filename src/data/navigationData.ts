import { Anchor, Map, Ship, Compass } from 'lucide-react';
import type { SectionContentWithTypes, SectionContentWithItems } from '../types/navigation';

export const navItems = ["CROISIERES", "VOYAGES", "NOS BATEAUX", "VISIOCONFÉRENCE", "L'ESPRIT PLEIN CAP"];

export const logoPlaceholder = "https://www.plein-cap.com/images/jpg/PleinCapLogo-Blanc_01.png";

export const sectionContent: Record<string, SectionContentWithTypes | SectionContentWithItems> = {
  "CROISIERES": {
    title: "Nos Croisières",
    description: "Découvrez nos croisières d'exception à travers les plus belles mers du monde",
    icon: Anchor,
    types: [
      { 
        name: "Croisière maritime", 
        description: "Parcourez les mers et océans du globe à bord de nos navires de prestige",
        icon: Ship
      },
      { 
        name: "Croisière fluviale", 
        description: "Découvrez la beauté des fleuves et rivières à travers des itinéraires exclusifs",
        icon: Anchor
      }
    ],
    offers: [
      { 
        name: "Trésors de l'Adriatique", 
        description: "8 jours entre Venise et les îles croates à bord du M/S Berlin",
        image: "https://images.unsplash.com/photo-1574010498346-911166f1ebcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: "1 490€",
        type: "maritime"
      },
      { 
        name: "Le Danube Impérial", 
        description: "10 jours de Vienne à Budapest avec excursions culturelles",
        image: "https://images.unsplash.com/photo-1609184270072-9447abbe1a6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: "2 290€",
        type: "fluvial"
      },
      { 
        name: "Fjords Norvégiens", 
        description: "15 jours d'aventure entre fjords majestueux et capitales scandinaves",
        image: "https://images.unsplash.com/photo-1506154666666-68506e7332d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: "3 190€",
        featured: true,
        type: "maritime",
        tag: "Coup de cœur 2024"
      },
      {
        name: "Secrets de la Seine",
        description: "7 jours entre Paris et Honfleur à bord d'un bateau intime",
        image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: "1 190€",
        featured: true,
        highlight: "rose",
        type: "fluvial",
        tag: "Coup de cœur"
      }
    ]
  },
    "VOYAGES": {
    title: "Nos Voyages",
    description: "Des itinéraires soigneusement élaborés pour des voyages inoubliables",
    icon: Map,
    types: [
      {
        name: "Voyages organisés",
        description: "Partez l'esprit tranquille avec nos circuits accompagnés",
        icon: Map
      },
      {
        name: "Voyages en train",
        description: "Découvrez l'Europe autrement grâce à nos itinéraires ferroviaires de charme",
        icon: Anchor
      }
    ],
    offers: [
      {
        name: "Grand Tour d'Italie",
        description: "12 jours de Rome à Venise en autocar premium et hôtels 4★",
        image: "https://images.unsplash.com/photo-1509358271058-acd22cc93872?auto=format&fit=crop&w=1000&q=80",
        price: "2 490€",
        type: "voyage"
      },
      {
        name: "Express des Alpes",
        description: "5 jours de Genève à Zermatt en train panoramique",
        image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1000&q=80",
        price: "1 190€",
        type: "train"
      },
      {
        name: "Splendeurs du Japon",
        description: "14 jours de Tokyo à Kyoto en Shinkansen et hébergements traditionnels",
        image: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=1000&q=80",
        price: "4 390€",
        featured: true,
        tag: "Coup de cœur 2024",
        type: "voyage"
      },
      {
        name: "Interrail Scandinave",
        description: "10 jours illimités en train de Copenhague à Oslo et Stockholm",
        image: "https://images.unsplash.com/photo-1536766768597-5c1a9d31d86e?auto=format&fit=crop&w=1000&q=80",
        price: "1 590€",
        featured: true,
        highlight: "rose",
        tag: "Coup de cœur",
        type: "train"
      }
    ]
  },
  "NOS BATEAUX": {
    title: "Notre Flotte",
    description: "Des navires alliant confort, élégance et intimité pour une expérience unique",
    icon: Ship,
    types: [
      {
        name: "Bateaux 5★",
        description: "Nos navires premium offrant un service 5 étoiles pour les plus exigeants",
        icon: Ship
      },
      {
        name: "Bateaux 4★",
        description: "Des bateaux confortables et élégants classés 4 étoiles",
        icon: Ship
      }
    ],
    offers: [
      {
        name: "MS Hamburg",
        description: "Navire 5★ de 144 m offrant 380 passagers une expérience luxueuse",
        image: "https://images.unsplash.com/photo-1501117716987-c8e3ec2f6029?auto=format&fit=crop&w=1000&q=80",
        price: "À partir de 250€/nuit",
        type: "5stars",
        featured: true,
        tag: "Nouveau 2024"
      },
      {
        name: "SH Diana",
        description: "Yacht d'expédition 5★, 125 m, prestations haut de gamme",
        image: "https://images.unsplash.com/photo-1570211776045-857a3c0d3a25?auto=format&fit=crop&w=1000&q=80",
        price: "À partir de 300€/nuit",
        type: "5stars"
      },
      {
        name: "MS Lady Cristina",
        description: "Bateau fluvial 4★, 110 m, ambiance chaleureuse",
        image: "https://images.unsplash.com/photo-1541842080514-35d7c53ca52e?auto=format&fit=crop&w=1000&q=80",
        price: "À partir de 180€/nuit",
        type: "4stars"
      },
      {
        name: "MS Lady Diletta",
        description: "Navire fluvial 4★ moderne, 135 m, cabines spacieuses",
        image: "https://images.unsplash.com/photo-1483683804023-a3edde28eedc?auto=format&fit=crop&w=1000&q=80",
        price: "À partir de 190€/nuit",
        type: "4stars",
        highlight: "rose",
        tag: "Coup de cœur"
      }
    ]
  },
  "VISIOCONFÉRENCE": {
    title: "Nos Visioconférences",
    description: "Participez à nos conférences en ligne animées par des experts du voyage et de la culture maritime",
    icon: Compass,
    types: [
      {
        name: "En direct",
        description: "Assistez en temps réel et posez vos questions aux conférenciers",
        icon: Compass
      },
      {
        name: "Replays",
        description: "Visionnez nos conférences enregistrées quand vous le souhaitez",
        icon: Compass
      }
    ],
    offers: [
      {
        name: "Exploration des Fjords",
        description: "Conférence de 45 min sur les itinéraires nordiques présentée par notre expert Pierre Lefèvre",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764ce7?auto=format&fit=crop&w=1000&q=80",
        type: "live",
        featured: true,
        tag: "Gratuit"
      },
      {
        name: "Patrimoines de Méditerranée",
        description: "Webinaire enregistré sur les sites UNESCO autour de la Grande Bleue",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        type: "replay"
      },
      {
        name: "Croisières fluviales d'exception",
        description: "Découvrez les plus beaux fleuves d'Europe avec notre spécialiste Anna Moreau",
        image: "https://images.unsplash.com/photo-1484680631156-1c5b4e74d898?auto=format&fit=crop&w=1000&q=80",
        type: "live"
      },
      {
        name: "Culture & Histoire en mer Rouge",
        description: "Replay exclusif présenté par l'historien Marc Duval",
        image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1000&q=80",
        type: "replay",
        highlight: "rose",
        tag: "Nouveau"
      }
    ]
  },
  "L'ESPRIT PLEIN CAP": {
    title: "L'Esprit Plein Cap",
    description: "Notre philosophie: une approche culturelle et authentique du voyage en mer",
    icon: Compass,
    items: [
      { 
        name: "Notre histoire", 
        description: "Plus de 30 ans d'expertise dans les croisières culturelles",
        image: "https://images.unsplash.com/photo-1495462911434-be47104d70fa?auto=format&fit=crop&w=1000&q=80"
      },
      { 
        name: "Notre équipe", 
        description: "Des professionnels passionnés à votre service",
        image: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?auto=format&fit=crop&w=1000&q=80"
      },
      { 
        name: "Nos valeurs", 
        description: "Authenticité, culture et respect de l'environnement",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
      },
      { 
        name: "Conférenciers", 
        description: "Des experts pour enrichir votre expérience",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  }
} as const;
