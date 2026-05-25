import express from 'express';
const router = express.Router();

// Mock static data endpoints to check client-server connectivity in Week 1
router.get('/', (req, res) => {
    res.json([
        { id: 1, name: "Figma Template Product Home", price: 29.99 },
        { id: 2, name: "Figma Template Product Listing", price: 49.99 }
    ]);
});

router.get('/:id', (req, res) => {
    res.json({ id: req.params.id, message: `Details layout for product item ${req.params.id}` });
});

export default router;