export type EventItem = {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string;
};

export const events: EventItem[] = [
    {
        image: "/images/event1.png",
        title: "React Summit US 2025",
        slug: "react-summit-us-2025",
        location: "San Francisco, CA, USA",
        date: "2025-11-07",
        time: "09:00 AM",
    },
    {
        image: "/images/event2.png",
        title: "KubeCon + CloudNativeCon Europe 2026",
        slug: "kubecon-cloudnativecon-europe-2026",
        location: "Paris, France",
        date: "2026-03-10",
        time: "08:30 AM",
    },
    {
        image: "/images/event3.png",
        title: "AWS re:Invent 2026",
        slug: "aws-reinvent-2026",
        location: "Las Vegas, NV, USA",
        date: "2026-12-01",
        time: "09:00 AM",
    },
    {
        image: "/images/event4.png",
        title: "JS World Conference 2026",
        slug: "js-world-conference-2026",
        location: "Amsterdam, Netherlands",
        date: "2026-06-18",
        time: "10:00 AM",
    },
    {
        image: "/images/event5.png",
        title: "Python PyCon 2026",
        slug: "python-pycon-2026",
        location: "Pittsburgh, PA, USA",
        date: "2026-05-14",
        time: "09:00 AM",
    },
    {
        image: "/images/event6.png",
        title: "Tailwind Connect 2026",
        slug: "tailwind-connect-2026",
        location: "London, UK",
        date: "2026-07-22",
        time: "11:00 AM",
    }
];
