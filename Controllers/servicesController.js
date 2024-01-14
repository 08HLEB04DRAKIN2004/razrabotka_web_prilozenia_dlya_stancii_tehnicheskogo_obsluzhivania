import ServiceModel from '../Models/services.js';

export const create = async (req, res) => {
    try {
        const doc = new ServiceModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
        });

        const service = await doc.save();

        res.json(service);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Create attempt failed',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const serviceId = req.params.id;

        const doc = await ServiceModel.findByIdAndDelete(serviceId);

        if (!doc) {
            return res.status(404).json({
                message: 'Service doesn\'t exist',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Remove attempt failed',
        });
    }
};

export const update = async (req, res) => {
    try {
        const serviceId = req.params.id;

        await ServiceModel.updateOne(
            {
                _id: serviceId,
            },
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
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
        const serviceId = req.params.id;

        const doc = await ServiceModel.findById(serviceId);

        if (doc) {
            res.json(doc);
        } else {
            res.status(404).json({ message: 'Service not found' });
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
        const services = await ServiceModel.find();

        res.json(services);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve parts',
        });
    }
};