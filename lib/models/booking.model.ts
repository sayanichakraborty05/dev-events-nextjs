import { Schema, model, models, Document } from 'mongoose';

export interface IBooking extends Document {
    eventId: Schema.Types.ObjectId;
    userEmail: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Event reference is required']
    },
    userEmail: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        lowercase: true,
        match: [/^\s*[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}\s*$/, 'Please fill a valid email address']
    }
}, {
    timestamps: true
});

// Indexes for query optimization
BookingSchema.index({ eventId: 1, userEmail: 1 }, { unique: true });

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
