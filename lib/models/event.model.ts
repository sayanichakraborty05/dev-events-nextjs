import { Schema, model, models, Document } from 'mongoose';

export interface IEvent extends Document {
    title: string;
    description: string;
    overview: string;
    image: string;
    venue: string;
    location: string;
    date: Date;
    time: string;
    price: number;
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema<IEvent>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    image: { type: String, required: true },
    venue: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    audience: { type: String, required: true },
    agenda: [{ type: String }],
    organizer: { type: String, required: true },
    tags: [{ type: String }],
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
}, {
    timestamps: true
});

const Event = models.Event || model<IEvent>('Event', EventSchema);

export default Event;
