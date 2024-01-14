import PartModel from '../Models/parts.js';

export const create = async (req, res) =>{
    try{
        const doc = new PartModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            available: req.body.available,
            imageUrl: req.body.imageUrl,
        });

        const part = await doc.save();

        res.json(part);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Create attempt failed',
        });
    }
};

export const remove = async (req, res) => {
    try{
        const partId = req.params.id;

        const doc = await PartModel.findByIdAndDelete(partId);

        if (!doc) {
            return res.status(404).json({
                message: 'Part doesn\'t exist',
            });
        }

        res.json({
            success: true,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Remove attempt failed',
        });
    }
};

export const update = async (req, res) => {
    try {
        const partId = req.params.id;

        await PartModel.updateOne(
            {
                _id: partId,
            },
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                available: req.body.available,
                imageUrl: req.body.imageUrl,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Update attempt failed',
        });
    }
};

export const getOne = async (req, res) => {
    try{
        const partId = req.params.id;

        const doc = await PartModel.findById(partId);

        if (doc) {
            res.json(doc);
        } else {
            res.status(404).json({ message: 'Part not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Search attempt failed',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const parts = await PartModel.find();
        
        res.json(parts);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve parts',
        });
    }
};