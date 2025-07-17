const mongoose = require('mongoose');
const fs = require('fs');
const { join } = require('path');
require('dotenv');

const ProductSchema = new mongoose.Schema(
    {
        name: String,
        imageUrl: String,
        status: String,
        description: String,
    },
    { timestamps: true },
);

const Product = mongoose.model('products', ProductSchema);

(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce-store');

    const productData = fs.readFileSync(join(__dirname, 'product.json'));

    const rawProductData = JSON.parse(productData, 'utf-8');

    await Product.insertMany(rawProductData);

    console.log('Initialized successfully');
    process.exit(1);
})();
