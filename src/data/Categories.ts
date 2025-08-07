interface productType {
    id: string;
    name: string;
    icon: string;
}
export interface Category {
    id: string;
    name: string;
    icon: string;
    products?: productType[];
}

export const categories: Category[] = [
    {
        id: "frutas",
        name: "Frutas",
        icon: "https://img.icons8.com/plasticine/100/pear.png",
        products: [
            {
                id: "1",
                name: "Sandia",
                icon: "https://img.icons8.com/plasticine/100/watermelon.png"
            },
            {
                id: "2",
                name: "Banana",
                icon: "https://img.icons8.com/plasticine/100/banana.png"
            }
        ]
    },
    {
        id: "verduras",
        name: "Verduras",
        icon: "https://img.icons8.com/plasticine/100/lettuce.png",
        products: [
            {
                id: "1",
                name: "Papa",
                icon: "https://img.icons8.com/plasticine/100/potato.png"
            },
            {
                id: "2",
                name: "Lechuga",
                icon: "https://img.icons8.com/plasticine/100/lettuce.png"
            }
        ]
    },
    {
        id: "pescado",
        name: "Pescado",
        icon: "https://img.icons8.com/plasticine/100/fish.png",
        products: [
        ]
    },
    {
        id: "carnes",
        name: "Carnes",
        icon: "https://img.icons8.com/?size=100&id=iErixLlt7v9F&format=png",
        products: [
        ]
    },
    {
        id: "pan",
        name: "Pan",
        icon: "https://img.icons8.com/plasticine/100/bread.png",
        products: [
            {
                id: "1",
                name: "Pan",
                icon: "https://img.icons8.com/plasticine/100/bread.png"
            },
            {
                id: "2",
                name: "Galletas",
                icon: "https://img.icons8.com/plasticine/100/cookie.png"
            },
            
        ]
    },
    {
        id: "pasta",
        name: "Pasta",
        icon: "https://img.icons8.com/?size=100&id=gPZBYc1Ds8ns&format=png",
        products: [
            {
                id: "1",
                name: "Spaguetti",
                icon: "https://img.icons8.com/?size=100&id=gPZBYc1Ds8ns&format=png"
            }
        ]
    },
    {
        id: "especias",
        name: "Especias",
        icon: "https://img.icons8.com/?size=100&id=37464&format=png",
        products: [
            {
                id: "1",
                name: "Sal",
                icon: "https://img.icons8.com/?size=100&id=jvYp1sVslSCH&format=png"
            },
            {
                id: "2",
                name: "Azucar",
                icon: "https://img.icons8.com/?size=100&id=1DvVOLV7FxRS&format=png"
            }
        ]
    },
    {
        id: "granos",
        name: "Granos",
        icon: "https://img.icons8.com/?size=100&id=24467&format=png",
        products: [
            {
                id: "1",
                name: "Arroz",
                icon: "https://img.icons8.com/?size=100&id=1eC-uOE21K2R&format=png"
            },
        ]
    }
];
