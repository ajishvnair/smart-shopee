export const category = [
    {
        _id: "c1",
        categoryNameEnglish: "Vegetables",
        categoryNameMalayalam: "പച്ചക്കറികൾ",
        image: null,
        active: false,
        isDeleted: false,
    },
    {
        _id: "c2",
        categoryNameEnglish: "Household items",
        categoryNameMalayalam: "വീട്ടുപകരണങ്ങൾ",
        image: null,
        active: true,
        isDeleted: false,
    },
];

export const products = [
    {
        _id: "p1",
        categoryId: "c1",
        active: true,
        productNameEnglish: "Carrat",
        productNameMalayalam: "കാരറ്റ്",
        actualPrice: "150",
        sellingPrice: "100",
        isDeleted: false,
        validity: {
            startTime: "",
            endTime: "",
        },
        description: "abcd",
        image: null,
    },
    {
        _id: "p2",
        categoryId: "c1",
        active: true,
        productNameEnglish: "Tomato",
        productNameMalayalam: "തക്കാളി",
        actualPrice: "150",
        sellingPrice: "100",
        isDeleted: false,
        validity: {
            startTime: "",
            endTime: "",
        },
        description: "abcd",
        image: null,
    },
    {
        _id: "p3",
        categoryId: "c1",
        active: true,
        productNameEnglish: "Ginger",
        productNameMalayalam: "ഇഞ്ചി",
        actualPrice: "120",
        sellingPrice: "80",
        isDeleted: false,
        validity: {
            startTime: "",
            endTime: "",
        },
        description: "abcd",
        image: null,
    },
    {
        _id: "p4",
        categoryId: "c2",
        active: true,
        productNameEnglish: "Soap",
        productNameMalayalam: "സോപ്പ്",
        actualPrice: "10",
        sellingPrice: "10",
        isDeleted: false,
        validity: {
            startTime: "",
            endTime: "",
        },
        description: "abcd",
        image: null,
    },
    {
        _id: "p5",
        categoryId: "c2",
        active: true,
        productNameEnglish: "Washing Powder",
        productNameMalayalam: "സോപ്പ് പൊടി",
        actualPrice: "50",
        sellingPrice: "45",
        isDeleted: false,
        validity: {
            startTime: "",
            endTime: "",
        },
        description: "abcd",
        image: null,
    },
    {
        _id: "p6",
        categoryId: "c2",
        active: true,
        productNameEnglish: "Rice",
        productNameMalayalam: "അരി",
        actualPrice: "150",
        sellingPrice: "100",
        isDeleted: false,
        validity: {
            startTime: "",
            endTime: "",
        },
        description: "abcd",
        image: null,
    },
    {
        _id: "p7",
        categoryId: "c2",
        active: true,
        productNameEnglish: "Detol",
        productNameMalayalam: "ഡെറ്റോൾ",
        actualPrice: "80",
        sellingPrice: "70",
        isDeleted: false,
        validity: {
            startTime: "",
            endTime: "",
        },
        description: "abcd",
        image: null,
    },
];

export const locations = [
    {
        _id: "l1",
        location: "686512 Parathodu",
    },
];

export const users = [
    {
        _id: "u1",
        name: "Ajish",
        phnNo: "9878675643",
        location: "l1",
        password: "hgty6754ertyui",
    },
];

export const orders = [
    {
        _id: "o1",
        accepted: true,
        user: "Ajish",
        user: "u1",
        location: "686512 parathodu",
        phoneNo: "9876543212",
        totalAmount: "500",
        orderedTime: "03:00",
        products: [
            {
                _id: "p1",
                productName: "Carrat",
                quantity: 3,
                total: "200",
            },
            {
                _id: "p2",
                productName: "Ginger",
                quantity: 2,
                total: "200",
            },
            {
                _id: "p3",
                productName: "Brinjal",
                quantity: 4,
                total: "100",
            },
        ],
    },
];
