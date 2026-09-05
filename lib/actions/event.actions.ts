'use server';

import Event from '@/database/event.model';
import connectDB from "@/lib/mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug });

        let similarEvents = await Event.find({
            _id: { $ne: event._id },
            tags: { $in: event.tags }
        }).limit(3).lean();

        if (similarEvents.length === 0) {
            similarEvents = await Event.find({ _id: { $ne: event._id } })
                .sort({ createdAt: -1 })
                .limit(3)
                .lean();
        }
        return JSON.parse(JSON.stringify(similarEvents));
    } catch {
        return [];
    }
}