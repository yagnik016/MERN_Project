import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true, 
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    interests: {
        type: [],
        required: true
    },
    profilePicture: String,
    additionalNotes: String
});

const User = model('User', userSchema);

export default User;
