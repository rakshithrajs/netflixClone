import mongoose from "mongoose";
const { Schema, model } = mongoose;

const faqSchema = new Schema({
    question: {
        type: String,
        required: true,
        index: true,
    },
    answer: String,
});

export const FaqModel = new model("faq", faqSchema);
