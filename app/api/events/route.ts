import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

cloudinary.config({
    secure: true,
});

export async function POST(req: NextRequest) {
    try {
        console.log("Starting event creation...");

        // Connect to MongoDB
        await connectDB();
        console.log("MongoDB connected");

        // Read multipart/form-data
        const formData = await req.formData();
        console.log("Form data received");

        // Get image
        const file = formData.get("image");

        if (!file || !(file instanceof File)) {
            return NextResponse.json(
                {
                    message: "Image file is required",
                },
                { status: 400 }
            );
        }

        console.log("Image received:", file.name, file.type, file.size);

        // Get normal fields
        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString();
        const overview = formData.get("overview")?.toString();
        const venue = formData.get("venue")?.toString();
        const location = formData.get("location")?.toString();
        const date = formData.get("date")?.toString();
        const time = formData.get("time")?.toString();
        const mode = formData.get("mode")?.toString();
        const audience = formData.get("audience")?.toString();
        const organizer = formData.get("organizer")?.toString();

        // Get tags and agenda
        let tags: string[] = [];
        let agenda: string[] = [];

        try {
            const tagsValue = formData.get("tags")?.toString();
            const agendaValue = formData.get("agenda")?.toString();

            if (tagsValue) {
                tags = JSON.parse(tagsValue);
            }

            if (agendaValue) {
                agenda = JSON.parse(agendaValue);
            }

            console.log("Tags:", tags);
            console.log("Agenda:", agenda);
        } catch (error) {
            console.error("JSON PARSE ERROR:", error);

            return NextResponse.json(
                {
                    message: "Invalid tags or agenda format",
                    error:
                        error instanceof Error
                            ? error.message
                            : String(error),
                },
                { status: 400 }
            );
        }

        // Convert image to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log("Image converted to buffer");

        // Upload image to Cloudinary
        const uploadResult = await new Promise<{
            secure_url: string;
        }>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        resource_type: "image",
                        folder: "DevEvent",
                    },
                    (error, result) => {
                        if (error) {
                            console.error("CLOUDINARY ERROR:", error);
                            reject(error);
                            return;
                        }

                        if (!result) {
                            reject(
                                new Error(
                                    "Cloudinary returned no upload result"
                                )
                            );
                            return;
                        }

                        console.log("Cloudinary upload successful");

                        resolve(result as { secure_url: string });
                    }
                )
                .end(buffer);
        });

        // Create event in MongoDB
        const createdEvent = await Event.create({
            title,
            description,
            overview,
            venue,
            location,
            date,
            time,
            mode,
            audience,
            organizer,
            tags,
            agenda,
            image: uploadResult.secure_url,
        });

        console.log("Event created successfully");

        return NextResponse.json(
            {
                message: "Event created successfully",
                event: createdEvent,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("=================================");
        console.error("EVENT CREATION ERROR:");
        console.error(error);
        console.error("=================================");

        return NextResponse.json(
            {
                message: "Event Creation Failed",
                error:
                    error instanceof Error
                        ? error.message
                        : String(error),
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({
            createdAt: -1,
        });

        return NextResponse.json(
            {
                message: "Events fetched successfully",
                events,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("EVENT FETCHING ERROR:", error);

        return NextResponse.json(
            {
                message: "Event fetching failed",
                error:
                    error instanceof Error
                        ? error.message
                        : String(error),
            },
            { status: 500 }
        );
    }
}