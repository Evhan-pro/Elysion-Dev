"use client";

import { motion } from "framer-motion";
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

const testimonials = [
  {
    name: "Jean Dupont",
    text: "Un outil indispensable pour préparer ma retraite ! Clair, précis et efficace.",
    rating: 5,
    avatar: "/avatars/avatar1.jpg",
  },
  {
    name: "Sophie Martin",
    text: "Grâce à Elysion, j’ai une vision plus claire de mes finances futures. Je recommande !",
    rating: 4,
    avatar: "/avatars/avatar2.jpg",
  },
  {
    name: "Marc Lefevre",
    text: "J'ai pu optimiser mes investissements grâce aux recommandations personnalisées.",
    rating: 5,
    avatar: "/avatars/avatar3.jpg",
  },
];

export default function Testimonials() {
  return (
    <div className="container py-5">
      <div className="row g-4">
        {testimonials.map((review, index) => (
          <motion.div
            key={index}
            className="col-12 col-md-6 col-lg-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="card h-100 shadow-sm border-0 text-center">
              <div className="card-body">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={60}
                  height={60}
                  className="rounded-circle mb-3 mx-auto d-block"
                />
                <p className="text-secondary fst-italic">"{review.text}"</p>
                <h5 className="mt-3 mb-1" style={{ color: "#1E3A8A" }}>{review.name}</h5>
                <div style={{ color: "#FCD34D", fontSize: "1.2rem" }}>
                  {"⭐".repeat(review.rating)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
