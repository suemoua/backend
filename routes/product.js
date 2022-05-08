const Product = require("../models/Product");
const { route } = require("./user");

const router = require("express").Router();

// insert
router.post("/", async(req, res) =>{
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});

// update
router.put("/:id", async(req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json(err);
    }
});

//delete
router.delete("/:id", async(req, res) =>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted..!");
    }catch(err){
        res.status(500).json(err);
    }
});

// get product
router.get("/find/:id", async(req, res) =>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
});

// get all proudcts
router.get("/", async(req, res) =>{
    try{
        let offset = parseInt(req.query.offset);
        let limit = parseInt(req.query.limit);
        if (!offset) { offset = 0; }
        if (!limit) { limit = 10; }

       
        products = await Product.find().skip(offset ).limit(limit);

        if(products.length>0){
            res.status(200).json(products)
        }else{
            res.status(404).json("Not Found")
        }
    
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/image", async(req, res) =>{
    try{
        let img_path = req.query.img_path;
        
        console.log(img_path);
        res.sendFile(img_path);
        
        
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;