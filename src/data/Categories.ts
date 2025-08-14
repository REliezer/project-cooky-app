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
                id: "1",
                name: "Sandia",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="35" fill="#FF5722"/><circle cx="50" cy="50" r="28" fill="#FFEB3B"/><circle cx="50" cy="50" r="20" fill="#4CAF50"/><circle cx="42" cy="45" r="2" fill="#000"/><circle cx="58" cy="45" r="2" fill="#000"/><circle cx="50" cy="55" r="2" fill="#000"/><circle cx="45" cy="60" r="1.5" fill="#000"/><circle cx="55" cy="60" r="1.5" fill="#000"/></svg>`
            },
            {
                id: "2",
                name: "Banana",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M30 20c5-5 15-5 20 0 8 8 8 25 5 35-2 8-8 15-15 18-7-3-13-10-15-18-3-10-3-27 5-35z" fill="#FFEB3B"/><path d="M35 25c3-3 8-3 10 0 5 5 5 18 3 25-1 5-5 10-8 12-3-2-7-7-8-12-2-7-2-20 3-25z" fill="#FFF176"/></svg>`
            },
            {
                id: "3",
                name: "Pera",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M50 85c-12 0-22-10-22-22 0-8 4-15 10-19-2-3-3-7-3-11 0-8 7-15 15-15s15 7 15 15c0 4-1 8-3 11 6 4 10 11 10 19 0 12-10 22-22 22z" fill="#8BC34A"/><path d="M50 18c-2 0-4 1-5 3-1-2-3-3-5-3-3 0-5 2-5 5s2 5 5 5c2 0 4-1 5-3 1 2 3 3 5 3 3 0 5-2 5-5s-2-5-5-5z" fill="#4CAF50"/></svg>`
            }
        ]
    },
    {
        id: "verduras",
        name: "Verduras",
        svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><g fill="#4CAF50"><path d="M50 20c-8 0-15 7-15 15v20c0 8 7 15 15 15s15-7 15-15V35c0-8-7-15-15-15z"/><path d="M40 35h20v5H40z"/><path d="M40 45h20v5H40z"/><path d="M40 55h20v5H40z"/></g></svg>`,
        products: [
            {
                id: "1",
                name: "Papa",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="55" rx="20" ry="25" fill="#8D6E63"/><circle cx="45" cy="45" r="2" fill="#5D4037"/><circle cx="55" cy="50" r="1.5" fill="#5D4037"/><circle cx="48" cy="60" r="1.5" fill="#5D4037"/><circle cx="58" cy="65" r="1" fill="#5D4037"/></svg>`
            },
            {
                id: "2",
                name: "Lechuga",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><g fill="#4CAF50"><path d="M50 20c-8 0-15 7-15 15v20c0 8 7 15 15 15s15-7 15-15V35c0-8-7-15-15-15z"/><path d="M40 35h20v5H40z"/><path d="M40 45h20v5H40z"/><path d="M40 55h20v5H40z"/></g></svg>`
            }
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
                id: "1",
                name: "Pan",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M25 45c0-10 10-20 25-20s25 10 25 20v15c0 8-7 15-15 15H40c-8 0-15-7-15-15V45z" fill="#8D6E63"/><circle cx="40" cy="40" r="2" fill="#5D4037"/><circle cx="50" cy="42" r="2" fill="#5D4037"/><circle cx="60" cy="40" r="2" fill="#5D4037"/></svg>`
            },
            {
                id: "2",
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
                id: "1",
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
                id: "1",
                name: "Sal",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><rect x="35" y="30" width="30" height="40" rx="5" fill="#ECEFF1"/><rect x="40" y="35" width="20" height="30" rx="3" fill="#FFFFFF"/><circle cx="45" cy="45" r="1" fill="#B0BEC5"/><circle cx="55" cy="50" r="1" fill="#B0BEC5"/><circle cx="50" cy="55" r="1" fill="#B0BEC5"/><circle cx="48" cy="60" r="1" fill="#B0BEC5"/></svg>`
            },
            {
                id: "2",
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
                id: "1",
                name: "Arroz",
                svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="45" rx="4" ry="12" fill="#ECEFF1"/><ellipse cx="42" cy="50" rx="4" ry="12" fill="#ECEFF1"/><ellipse cx="58" cy="50" rx="4" ry="12" fill="#ECEFF1"/><ellipse cx="35" cy="55" rx="4" ry="12" fill="#ECEFF1"/><ellipse cx="50" cy="55" rx="4" ry="12" fill="#ECEFF1"/><ellipse cx="65" cy="55" rx="4" ry="12" fill="#ECEFF1"/></svg>`
            }
        ]
    }
];
