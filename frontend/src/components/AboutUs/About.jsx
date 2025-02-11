import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";


const admins = [
    {
        name: "Keshav kumar",
        job: "Full Stack Developer",
        image: "https://github.com/keshavk27.png", // Replace with actual image paths
        github: "https://github.com/keshavk27",
        linkedin: "https://www.linkedin.com/in/keshav-kumar-709aa0334",
        twitter: "https://twitter.com",
    },
    {
        name: "Prakhar Garg",
        job: "Full Stack Developer",
        image: "https://github.com/Prakhar-Garg7.png", // Replace with actual image paths
        github: "https://github.com/Prakhar-Garg7",
        linkedin: "https://www.linkedin.com/in/prakhar-garg-251659282",
        twitter: "https://twitter.com",
    },
];

export default function About() {
    return (
        <div className="py-16 bg-gray-100">
            <div className="container mx-auto px-6 text-gray-900 md:px-12 xl:px-6">
                <h2 className="text-center text-3xl font-bold md:text-4xl">
                    Meet the Makers 🚀
                </h2>
                <p className="text-center mt-2 text-gray-600">
                    Passionate developers behind this website.
                </p>

                <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {admins.map((admin, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
                        >
                            <img
                                src={admin.image}
                                alt={admin.name}
                                className="w-32 h-32 rounded-full border-4 border-orange-500"
                            />
                            <h3 className="mt-4 text-xl font-semibold">{admin.name}</h3>
                            <p className="text-gray-700">{admin.job}</p>
                            <p className="text-sm text-gray-500">{admin.expertise}</p>

                            {/* Social Links */}
                            <div className="mt-4 flex space-x-4">
                                <a href={admin.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-6 h-6 text-gray-700 hover:text-gray-900" />
                                </a>
                                <a href={admin.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="w-6 h-6 text-gray-700 hover:text-gray-900" />
                                </a>
                                <a href={admin.twitter} target="_blank" rel="noopener noreferrer">
                                    <Twitter className="w-6 h-6 text-gray-700 hover:text-gray-900" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
