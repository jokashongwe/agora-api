import * as mongoose from 'mongoose';

export const UtilisateurSchema = new mongoose.Schema({ 
    username: {type: String, unique: true, required: true},
    password: String,
    createdDate: {type: Date, default: Date.now()},
    isActive: {type: Boolean, default: false},
    profile: mongoose.Schema.Types.Mixed,
    paymentInfo: mongoose.Schema.Types.Mixed
});