interface productType {
    id: string;
    name: string;
    svg: string;
}
export interface Category {
    id: string;
    name: string;
    svg: string;
    products?: productType[];
}

export const categories: Category[] = [
    {
        id: "frutas",
        name: "Frutas",
        svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50 85c-15.5 0-28-12.5-28-28 0-10.5 6-19.5 14.5-24.5C38 25 42 18 50 18s12 7 13.5 14.5C72 37.5 78 46.5 78 57c0 15.5-12.5 28-28 28z" fill="#8BC34A"/><path d="M50 18c-2 0-4 1-5 3-1-2-3-3-5-3-3 0-5 2-5 5s2 5 5 5c2 0 4-1 5-3 1 2 3 3 5 3 3 0 5-2 5-5s-2-5-5-5z" fill="#4CAF50"/></svg>`,
        products: [
            {
                id: "sandia",
                name: "Sandia",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="35" fill="#FF5722"/><circle cx="50" cy="50" r="28" fill="#FFEB3B"/><circle cx="50" cy="50" r="20" fill="#4CAF50"/><circle cx="42" cy="45" r="2" fill="#000"/><circle cx="58" cy="45" r="2" fill="#000"/><circle cx="50" cy="55" r="2" fill="#000"/><circle cx="45" cy="60" r="1.5" fill="#000"/><circle cx="55" cy="60" r="1.5" fill="#000"/></svg>`
            },
            {
                id: "banana",
                name: "Banana",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M30 20c5-5 15-5 20 0 8 8 8 25 5 35-2 8-8 15-15 18-7-3-13-10-15-18-3-10-3-27 5-35z" fill="#FFEB3B"/><path d="M35 25c3-3 8-3 10 0 5 5 5 18 3 25-1 5-5 10-8 12-3-2-7-7-8-12-2-7-2-20 3-25z" fill="#FFF176"/></svg>`
            },
            {
                id: "pera",
                name: "Pera",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50 85c-12 0-22-10-22-22 0-8 4-15 10-19-2-3-3-7-3-11 0-8 7-15 15-15s15 7 15 15c0 4-1 8-3 11 6 4 10 11 10 19 0 12-10 22-22 22z" fill="#8BC34A"/><path d="M50 18c-2 0-4 1-5 3-1-2-3-3-5-3-3 0-5 2-5 5s2 5 5 5c2 0 4-1 5-3 1 2 3 3 5 3 3 0 5-2 5-5s-2-5-5-5z" fill="#4CAF50"/></svg>`
            },
            {
                id: "fresa",
                name: "Fresa",
                svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M35 70 Q30 50 35 45 Q45 35 50 35 Q55 35 65 45 Q70 50 65 70 Q60 80 50 80 Q40 80 35 70" fill="#FF1493"/><path d="M38 65 Q33 50 38 47 Q46 40 50 40 Q54 40 62 47 Q67 50 62 65 Q58 75 50 75 Q42 75 38 65" fill="#FF69B4"/><path d="M42 25 Q50 20 58 25 Q55 30 50 28 Q45 30 42 25" fill="#32CD32"/><circle cx="42" cy="55" r="1.5" fill="#8B0000"/><circle cx="52" cy="50" r="1.5" fill="#8B0000"/><circle cx="48" cy="65" r="1.5" fill="#8B0000"/><circle cx="58" cy="60" r="1.5" fill="#8B0000"/></svg>'
            },

        ]
    },
    {
        id: "verduras",
        name: "Verduras",
        svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><g fill="#4CAF50"><path d="M50 20c-8 0-15 7-15 15v20c0 8 7 15 15 15s15-7 15-15V35c0-8-7-15-15-15z"/><path d="M40 35h20v5H40z"/><path d="M40 45h20v5H40z"/><path d="M40 55h20v5H40z"/></g></svg>`,
        products: [
            {
                id: "papa",
                name: "Papa",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="55" rx="20" ry="25" fill="#8D6E63"/><circle cx="45" cy="45" r="2" fill="#5D4037"/><circle cx="55" cy="50" r="1.5" fill="#5D4037"/><circle cx="48" cy="60" r="1.5" fill="#5D4037"/><circle cx="58" cy="65" r="1" fill="#5D4037"/></svg>`
            },
            {
                id: "lechuga",
                name: "Lechuga",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><g fill="#4CAF50"><path d="M50 20c-8 0-15 7-15 15v20c0 8 7 15 15 15s15-7 15-15V35c0-8-7-15-15-15z"/><path d="M40 35h20v5H40z"/><path d="M40 45h20v5H40z"/><path d="M40 55h20v5H40z"/></g></svg>`
            },
            {
                id: "cebolla",
                name: "Cebolla",
                svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="55" rx="25" ry="30" fill="#DDA0DD"/><ellipse cx="50" cy="55" rx="20" ry="25" fill="#E6E6FA"/><path d="M35 25 Q50 15 65 25 Q60 30 50 28 Q40 30 35 25" fill="#8FBC8F"/><circle cx="45" cy="50" r="2" fill="#9370DB" opacity="0.3"/><circle cx="55" cy="60" r="1.5" fill="#9370DB" opacity="0.3"/><path d="M40 45 Q50 42 60 45" stroke="#BA55D3" stroke-width="1" fill="none" opacity="0.5"/></svg>'
            },
            {
                id: "tomate",
                name: "Tomate",
                svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="55" r="25" fill="#FF6347"/><circle cx="50" cy="55" r="20" fill="#FF4500"/><path d="M40 30 Q45 25 50 28 Q55 25 60 30 Q55 35 50 32 Q45 35 40 30" fill="#32CD32"/><path d="M45 32 Q50 28 55 32" fill="#228B22"/><circle cx="45" cy="50" r="2" fill="#8B0000" opacity="0.4"/><circle cx="58" cy="60" r="1.5" fill="#8B0000" opacity="0.4"/><path d="M35 50 Q50 45 65 50" stroke="#DC143C" stroke-width="1" fill="none" opacity="0.3"/></svg>'
            },
            {
                id: "cilantro",
                name: "Cilantro",
                svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="48" y="60" width="4" height="30" fill="#228B22"/><path d="M25 45 Q30 35 35 40 L40 45 Q35 50 30 45 Q25 50 20 45 Q25 40 25 45" fill="#32CD32"/><path d="M45 35 Q50 25 55 30 L60 35 Q55 40 50 35 Q45 40 40 35 Q45 30 45 35" fill="#90EE90"/><path d="M65 50 Q70 40 75 45 L80 50 Q75 55 70 50 Q65 55 60 50 Q65 45 65 50" fill="#32CD32"/><path d="M35 25 Q40 15 45 20 L50 25 Q45 30 40 25 Q35 30 30 25 Q35 20 35 25" fill="#90EE90"/><path d="M55 55 Q60 45 65 50 L70 55 Q65 60 60 55 Q55 60 50 55 Q55 50 55 55" fill="#228B22"/><circle cx="27" cy="42" r="1" fill="#006400" opacity="0.7"/><circle cx="47" cy="32" r="1" fill="#006400" opacity="0.7"/><circle cx="67" cy="47" r="1" fill="#006400" opacity="0.7"/></svg>'
            },
            {
                id: "aceituna",
                name: "Aceituna",
                svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="55" rx="20" ry="25" fill="#2F4F2F"/><ellipse cx="50" cy="55" rx="15" ry="20" fill="#556B2F"/><circle cx="50" cy="45" r="3" fill="#8FBC8F"/><path d="M47 30 Q50 25 53 30 Q50 35 47 30" fill="#228B22"/></svg>'
            },
            {
                id: "brocoli",
                name: "Brócoli",
                svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="46" y="65" width="8" height="25" fill="#8FBC8F"/><circle cx="35" cy="45" r="8" fill="#228B22"/><circle cx="50" cy="38" r="10" fill="#32CD32"/><circle cx="65" cy="45" r="8" fill="#228B22"/><circle cx="42" cy="55" r="6" fill="#90EE90"/><circle cx="58" cy="55" r="6" fill="#90EE90"/><circle cx="50" cy="52" r="7" fill="#32CD32"/><circle cx="30" cy="52" r="5" fill="#006400"/><circle cx="70" cy="52" r="5" fill="#006400"/><circle cx="38" cy="38" r="4" fill="#90EE90"/><circle cx="62" cy="38" r="4" fill="#90EE90"/><circle cx="25" cy="42" r="3" fill="#228B22"/><circle cx="75" cy="42" r="3" fill="#228B22"/><path d="M42 68 L46 70 L50 68 L54 70 L58 68" stroke="#228B22" stroke-width="1" fill="none"/></svg>'
            },
            {
                id: "champiñon",
                name: "Champiñón",
                svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="45" rx="30" ry="20" fill="#D2B48C"/><ellipse cx="50" cy="45" rx="25" ry="15" fill="#F5DEB3"/><rect x="45" y="55" width="10" height="25" fill="#FFFACD"/><circle cx="40" cy="40" r="2" fill="#8B4513" opacity="0.5"/><circle cx="60" cy="42" r="1.5" fill="#8B4513" opacity="0.5"/><circle cx="52" cy="38" r="1" fill="#8B4513" opacity="0.3"/></svg>'
            },
            {
                id: "ajo",
                name: "Ajo",
                svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="60" rx="18" ry="25" fill="#F5F5DC"/><ellipse cx="50" cy="60" rx="15" ry="22" fill="#FFFACD"/><path d="M45 35 Q50 30 55 35 Q52 40 50 38 Q48 40 45 35" fill="#90EE90"/><circle cx="50" cy="65" r="2" fill="#8B4513" opacity="0.3"/><path d="M47 50 Q50 48 53 50" stroke="#DEB887" stroke-width="1" fill="none"/></svg>'
            },
            {
                id: "pimiento",
                name: "Pimiento",
                svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M35 70 Q30 50 35 40 Q45 30 55 30 Q65 30 75 40 Q80 50 75 70 Q70 80 50 80 Q30 80 35 70" fill="#FF6347"/><path d="M38 65 Q33 50 38 42 Q46 35 54 35 Q62 35 72 42 Q77 50 72 65 Q68 75 50 75 Q32 75 38 65" fill="#FF4500"/><path d="M45 25 Q50 20 55 25 Q52 30 50 28 Q48 30 45 25" fill="#228B22"/><circle cx="45" cy="50" r="2" fill="#8B0000" opacity="0.3"/></svg>'
            },
            {
                id: "picante",
                name: "Picante",
                svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M45 80 Q40 60 42 50 Q45 40 50 35 Q55 30 60 35 Q62 45 60 55 Q58 70 55 80" fill="#DC143C"/><path d="M47 75 Q42 58 44 50 Q46 42 50 38 Q54 35 58 38 Q60 46 58 54 Q56 68 53 75" fill="#FF0000"/><path d="M55 25 Q60 20 65 25 Q62 30 60 28 Q58 30 55 25" fill="#228B22"/><circle cx="48" cy="45" r="1" fill="#8B0000" opacity="0.5"/></svg>'
            },
            {
                id: "pepino",
                name: "Pepino",
                svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="50" rx="15" ry="35" fill="#32CD32"/><ellipse cx="50" cy="50" rx="12" ry="32" fill="#90EE90"/><circle cx="45" cy="35" r="2" fill="#228B22" opacity="0.6"/><circle cx="55" cy="40" r="1.5" fill="#228B22" opacity="0.6"/><circle cx="48" cy="50" r="1.5" fill="#228B22" opacity="0.6"/><circle cx="54" cy="55" r="2" fill="#228B22" opacity="0.6"/><circle cx="46" cy="65" r="1.5" fill="#228B22" opacity="0.6"/></svg>'
            },
            {
                id: "maiz",
                name: "Maíz",
                svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="50" rx="15" ry="35" fill="#FFD700"/><ellipse cx="50" cy="50" rx="12" ry="32" fill="#FFF8DC"/><g fill="#DAA520"><circle cx="45" cy="35" r="2"/><circle cx="55" cy="38" r="2"/><circle cx="47" cy="43" r="2"/><circle cx="53" cy="46" r="2"/><circle cx="45" cy="51" r="2"/><circle cx="55" cy="54" r="2"/><circle cx="47" cy="59" r="2"/><circle cx="53" cy="62" r="2"/><circle cx="50" cy="67" r="2"/></g><path d="M35 20 Q50 15 65 20 Q60 25 50 23 Q40 25 35 20" fill="#228B22"/><path d="M38 75 Q50 80 62 75" stroke="#8B4513" stroke-width="2" fill="none"/></svg>'
            },
        ]
    },
    {
        id: "pescado",
        name: "Pescado",
        svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M25 50c0-8 8-15 20-15h10c12 0 20 7 20 15s-8 15-20 15H45c-12 0-20-7-20-15z" fill="#2196F3"/><path d="M75 45l15-5v20l-15-5v-10z" fill="#1976D2"/><circle cx="60" cy="45" r="3" fill="#000"/><path d="M35 40c-3 0-5 2-5 5v10c0 3 2 5 5 5" stroke="#1976D2" stroke-width="2" fill="none"/></svg>`,
        products: []
    },
    {
        id: "carnes",
        name: "Carnes",
        svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M30 30h40v40H30z" fill="#D32F2F"/><path d="M35 35h30v30H35z" fill="#F44336"/><path d="M40 40h20v20H40z" fill="#FFCDD2"/><circle cx="45" cy="45" r="2" fill="#D32F2F"/><circle cx="55" cy="45" r="2" fill="#D32F2F"/><circle cx="50" cy="55" r="2" fill="#D32F2F"/></svg>`,
        products: []
    },
    {
        id: "pan",
        name: "Pan",
        svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M25 45c0-10 10-20 25-20s25 10 25 20v15c0 8-7 15-15 15H40c-8 0-15-7-15-15V45z" fill="#8D6E63"/><path d="M30 50h40v5H30z"/><path d="M30 60h40v5H30z"/><circle cx="40" cy="40" r="2" fill="#5D4037"/><circle cx="50" cy="42" r="2" fill="#5D4037"/><circle cx="60" cy="40" r="2" fill="#5D4037"/></svg>`,
        products: [
            {
                id: "pan",
                name: "Pan",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M25 45c0-10 10-20 25-20s25 10 25 20v15c0 8-7 15-15 15H40c-8 0-15-7-15-15V45z" fill="#8D6E63"/><circle cx="40" cy="40" r="2" fill="#5D4037"/><circle cx="50" cy="42" r="2" fill="#5D4037"/><circle cx="60" cy="40" r="2" fill="#5D4037"/></svg>`
            },
            {
                id: "galletas",
                name: "Galletas",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="20" fill="#8D6E63"/><circle cx="45" cy="45" r="2" fill="#3E2723"/><circle cx="55" cy="45" r="2" fill="#3E2723"/><circle cx="45" cy="55" r="2" fill="#3E2723"/><circle cx="55" cy="55" r="2" fill="#3E2723"/><circle cx="50" cy="50" r="1.5" fill="#3E2723"/></svg>`
            }
        ]
    },
    {
        id: "pasta",
        name: "Pasta",
        svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><g stroke="#FFC107" stroke-width="3" fill="none"><path d="M20 30c10-5 20-5 30 0s20 5 30 0"/><path d="M20 40c10-5 20-5 30 0s20 5 30 0"/><path d="M20 50c10-5 20-5 30 0s20 5 30 0"/><path d="M20 60c10-5 20-5 30 0s20 5 30 0"/><path d="M20 70c10-5 20-5 30 0s20 5 30 0"/></g></svg>`,
        products: [
            {
                id: "spaguetti",
                name: "Spaguetti",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><g stroke="#FFC107" stroke-width="3" fill="none"><path d="M20 30c10-5 20-5 30 0s20 5 30 0"/><path d="M20 40c10-5 20-5 30 0s20 5 30 0"/><path d="M20 50c10-5 20-5 30 0s20 5 30 0"/><path d="M20 60c10-5 20-5 30 0s20 5 30 0"/><path d="M20 70c10-5 20-5 30 0s20 5 30 0"/></g></svg>`
            }
        ]
    },
    {
        id: "especias",
        name: "Especias",
        svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="40" y="20" width="20" height="30" rx="10" fill="#8D6E63"/><rect x="42" y="22" width="16" height="26" rx="8" fill="#A1887F"/><circle cx="50" cy="60" r="8" fill="#FF9800"/><circle cx="45" cy="70" r="2" fill="#FF5722"/><circle cx="55" cy="70" r="2" fill="#FF5722"/><circle cx="50" cy="75" r="2" fill="#FF5722"/><circle cx="40" cy="72" r="1.5" fill="#FF5722"/><circle cx="60" cy="72" r="1.5" fill="#FF5722"/></svg>`,
        products: [
            {
                id: "sal",
                name: "Sal",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="35" y="30" width="30" height="40" rx="5" fill="#ECEFF1"/><rect x="40" y="35" width="20" height="30" rx="3" fill="#FFFFFF"/><circle cx="45" cy="45" r="1" fill="#B0BEC5"/><circle cx="55" cy="50" r="1" fill="#B0BEC5"/><circle cx="50" cy="55" r="1" fill="#B0BEC5"/><circle cx="48" cy="60" r="1" fill="#B0BEC5"/></svg>`
            },
            {
                id: "azucar",
                name: "Azucar",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="35" y="30" width="30" height="40" rx="5" fill="#FFF3E0"/><rect x="40" y="35" width="20" height="30" rx="3" fill="#FFFFFF"/><rect x="42" y="40" width="4" height="4" fill="#FFFFFF" stroke="#E0E0E0"/><rect x="50" y="45" width="4" height="4" fill="#FFFFFF" stroke="#E0E0E0"/><rect x="46" y="50" width="4" height="4" fill="#FFFFFF" stroke="#E0E0E0"/><rect x="52" y="55" width="4" height="4" fill="#FFFFFF" stroke="#E0E0E0"/></svg>`
            }
        ]
    },
    {
        id: "granos",
        name: "Granos",
        svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="35" r="8" fill="#8D6E63"/><circle cx="40" cy="50" r="8" fill="#8D6E63"/><circle cx="60" cy="50" r="8" fill="#8D6E63"/><circle cx="35" cy="65" r="8" fill="#8D6E63"/><circle cx="50" cy="65" r="8" fill="#8D6E63"/><circle cx="65" cy="65" r="8" fill="#8D6E63"/></svg>`,
        products: [
            {
                id: "arroz",
                name: "Arroz",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="45" rx="4" ry="12" fill="#ECEFF1"/><ellipse cx="42" cy="50" rx="4" ry="12" fill="#ECEFF1"/><ellipse cx="58" cy="50" rx="4" ry="12" fill="#ECEFF1"/><ellipse cx="35" cy="55" rx="4" ry="12" fill="#ECEFF1"/><ellipse cx="50" cy="55" rx="4" ry="12" fill="#ECEFF1"/><ellipse cx="65" cy="55" rx="4" ry="12" fill="#ECEFF1"/></svg>`
            }
        ]
    },
    {
        id: "lacteos",
        name: "Lacteos",
        svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="35" r="8" fill="#8D6E63"/><circle cx="40" cy="50" r="8" fill="#8D6E63"/><circle cx="60" cy="50" r="8" fill="#8D6E63"/><circle cx="35" cy="65" r="8" fill="#8D6E63"/><circle cx="50" cy="65" r="8" fill="#8D6E63"/><circle cx="65" cy="65" r="8" fill="#8D6E63"/></svg>`,
        products: [
            {
                id: "leche",
                name: "Leche",
                svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="35" y="30" width="30" height="50" rx="5" fill="#F0F8FF"/><rect x="38" y="33" width="24" height="44" rx="3" fill="#FFFFFF"/><rect x="40" y="20" width="20" height="15" rx="3" fill="#E0E0E0"/><circle cx="45" cy="27" r="2" fill="#B0B0B0"/><circle cx="55" cy="27" r="2" fill="#B0B0B0"/><path d="M42 45 Q50 42 58 45" stroke="#E6E6E6" stroke-width="1" fill="none"/><path d="M42 55 Q50 52 58 55" stroke="#E6E6E6" stroke-width="1" fill="none"/><path d="M42 65 Q50 62 58 65" stroke="#E6E6E6" stroke-width="1" fill="none"/></svg>'
            },
            {
                id: "mantequilla",
                name: "Mantequilla",
                svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="30" y="40" width="40" height="25" rx="5" fill="#FFE135"/><rect x="32" y="42" width="36" height="21" rx="3" fill="#FFF44F"/><path d="M35 50 Q50 47 65 50" stroke="#FFD700" stroke-width="1" fill="none"/><path d="M35 55 Q50 52 65 55" stroke="#FFD700" stroke-width="1" fill="none"/><circle cx="40" cy="48" r="1" fill="#FFA500" opacity="0.5"/><circle cx="60" cy="58" r="1" fill="#FFA500" opacity="0.5"/><path d="M25 35 Q50 30 75 35 Q70 40 50 38 Q30 40 25 35" fill="#F0E68C"/></svg>'
            },
        ]
    }
];
