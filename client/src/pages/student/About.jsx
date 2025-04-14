import React from "react";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaRobot, FaUsers, FaBook } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
      {/* Hero Section */}
      <section className="pt-28 pb-10 px-6 md:px-20 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Empowering Learning. Anywhere. Anytime.
        </motion.h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          TutorSync is your personalized digital classroom — connecting learners
          with expert tutors, AI-powered tools, and custom learning experiences.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white text-black py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl shadow-xl font-bold mb-4 p-7 rounded-xl">Our Mission</h2>
            <p className="text-lg shadow-xl p-7 rounded-xl">
              To bridge the gap between students and quality education using
              modern tools like quizzes, AI notes, interactive video lessons, and real tutors. We believe
              learning should be tailored, accessible, and effective — no matter where you are.
            </p>
          </motion.div>
          <motion.div
  className="bg-white text-black p-6 rounded-xl shadow-xl grid grid-cols-2 gap-4 text-center"
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
  <div>
    <p className="text-3xl font-bold text-purple-600">10K+</p>
    <p>Students Helped</p>
  </div>
  <div>
    <p className="text-3xl font-bold text-blue-600">1K+</p>
    <p>Tutors Onboarded</p>
  </div>
  <div>
    <p className="text-3xl font-bold text-green-600">5+</p>
    <p>Learning Tools</p>
  </div>
  <div>
    <p className="text-3xl font-bold text-orange-600">100%</p>
    <p>Personalized</p>
  </div>
</motion.div>


        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl text-center font-bold mb-12">What Makes TutorSync Special?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <motion.div
            className="bg-white text-black p-6 rounded-xl shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <FaChalkboardTeacher size={40} className="mx-auto text-blue-500 mb-3" />
            <h3 className="font-semibold text-xl mb-2">Expert Tutors</h3>
            <p>Connect with top educators who tailor lessons to your learning style and goals.</p>
          </motion.div>

          <motion.div
            className="bg-white text-black p-6 rounded-xl shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <FaRobot size={40} className="mx-auto text-purple-500 mb-3" />
            <h3 className="font-semibold text-xl mb-2">AI-Powered Tools</h3>
            <p>Use AI-generated quizzes, notes, and flashcards for fast, focused learning.</p>
          </motion.div>

          <motion.div
            className="bg-white text-black p-6 rounded-xl shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <FaBook size={40} className="mx-auto text-green-500 mb-3" />
            <h3 className="font-semibold text-xl mb-2">Interactive Content</h3>
            <p>Engage with videos, quizzes, and real-time Q&A for deeper understanding.</p>
          </motion.div>

          <motion.div
            className="bg-white text-black p-6 rounded-xl shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <FaUsers size={40} className="mx-auto text-orange-500 mb-3" />
            <h3 className="font-semibold text-xl mb-2">Community Support</h3>
            <p>Join a growing community of learners, share doubts, and grow together.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="py-16 text-center">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Ready to Learn Smarter?
        </motion.h2>
        <p className="text-lg mb-6">
          Start your learning journey with TutorSync today — it's free and easy!
        </p>
        <a
          href="/"
          className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Go to Home
        </a>
      </section>
    </div>
  );
};

export default About;
