"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

const allClients = [
  { name: "EON", src: "/assets/clients/EON.png" },
  { name: "Gym Armour", src: "/assets/clients/gym-armour.png" },
  { name: "Cloudshift", src: "/assets/clients/Cloudshift.png" },
  { name: "Roofiant", src: "/assets/clients/roofiant.png" },
  { name: "Digital Bricks", src: "/assets/clients/Digital-Bricks.png" },
  { name: "Coverage By Design", src: "/assets/clients/covergaeByDesign.png" },
  { name: "AirGear Pro", src: "/assets/clients/AirGearPro.png" },
  { name: "Senpi", src: "/assets/clients/senpi.png" },
  { name: "Saltys Media", src: "/assets/clients/saltys-media.png" },
];

export default function ClientList() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12 2k:px-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Clients
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by leading brands and businesses worldwide
          </p>
        </div>

        {/* MotionCue Style Container */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {allClients.map((client) => (
              <div
                key={client.name}
                className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300"
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
            
            {/* Add More Button with Let&apos;s Talk */}
            <div className="relative flex items-center justify-center">
              <Link
                href="/contact"
                className="flex items-center justify-center p-4 group"
              >
                <Plus className="w-12 h-12 text-gray-400 group-hover:text-brand-cyan transition-colors" />
              </Link>
              
              {/* Let&apos;s Talk - positioned to the right of Plus */}
              <div className="absolute left-full ml-4 hidden md:flex items-center gap-2 whitespace-nowrap">
                <svg
                  width="40"
                  height="30"
                  viewBox="0 0 40 30"
                  className="text-brand-cyan"
                >
                  <path
                    d="M5 15 Q 20 5, 35 15 L 30 10 M 35 15 L 30 20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <p className="text-lg font-medium text-gray-700 italic">
                  Let&apos;s Talk
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}