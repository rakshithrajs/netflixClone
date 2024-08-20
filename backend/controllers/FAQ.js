import { FaqModel } from "../models/faqModel.js";

export const getFAQ = async (req, res) => {
    try {
        const faq = await FaqModel.find();
        res.json(faq);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
