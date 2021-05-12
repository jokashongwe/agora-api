import * as mongoose from 'mongoose';

export const UtilisateurSchema = new mongoose.Schema({ 
    username: String,
    password: String,
    createdDate: Date,
    isActive: Boolean,
    profile: mongoose.Schema.Types.Mixed,
    paymentInfo: mongoose.Schema.Types.Mixed
});