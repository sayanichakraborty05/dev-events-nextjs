import { events } from "@/lib/constant";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ slug: string }>;
}

const EventDetailsPage = async ({ params }: Props) => {
    const { slug } = await params;

    const event = events.find((e) => e.slug === slug);

    if (!event) {
        notFound();
    }

    return (
        <section className="max-w-4xl mx-auto mt-24 p-6 text-white">
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

            <div className="space-y-2 text-gray-300 bg-zinc-900/50 p-4 rounded-xl backdrop-blur">
                <p>📍 <strong>Location:</strong> {event.location}</p>
                <p>📅 <strong>Date:</strong> {event.date}</p>
                <p>⏰ <strong>Time:</strong> {event.time}</p>
            </div>
        </section>
    );
};

export default EventDetailsPage;
