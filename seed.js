const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const products = [
    {
        name: "Boys School Uniform",
        description: "High-quality boys' school uniform set.",
        price: 29.99,
        image: "http://localhost:5000/uploads/A.webp"
    },
    {
        name: "Girls School Uniform",
        description: "Comfortable and stylish girls' uniform.",
        price: 34.99,
        image: "http://localhost:5000/uploads/B.webp"
    },
    {
        name: "Sports Uniform",
        description: "Lightweight sports uniform for school activities.",
        price: 24.99,
        image: "http://localhost:5000/uploads/C.webp"
    }
];

const seedDatabase = async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products added!");
    mongoose.connection.close();
};

seedDatabase();
