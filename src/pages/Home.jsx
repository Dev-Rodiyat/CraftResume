import { motion } from "framer-motion";
import { FaFileAlt, FaMagic, FaDownload } from "react-icons/fa";

export default function Home() {
    return (
        <section className="text-center py-8 px-4 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Craft Professional <span className="text-blue-600">Resumes</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Build sleek, modern resumes that highlight your skills and potential.
                </p>
                <a
                    href="/builder"
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
                >
                    Get Started
                </a>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-20 text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
            >
                <FeatureCard
                    icon={<FaFileAlt size={32} className="text-blue-600" />}
                    title="Customizable Layouts"
                    description="Choose from multiple elegant resume templates designed for professionals."
                />
                <FeatureCard
                    icon={<FaMagic size={32} className="text-blue-600" />}
                    title="Effortless Editing"
                    description="Drag-and-drop sections, smart suggestions, and intuitive controls."
                />
                <FeatureCard
                    icon={<FaDownload size={32} className="text-blue-600" />}
                    title="Download in PDF"
                    description="Export your finished resume in high-quality PDF format instantly."
                />
            </motion.div>

            <motion.div
                className="mt-24 text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
                    How It Works
                </h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
                    <StepCard
                        number="1"
                        title="Choose Template"
                        description="Pick a sleek, modern template for your resume. Designed for professionalism."
                    />
                    <StepCard
                        number="2"
                        title="Add Your Details"
                        description="Enter your experience, education, skills and more with our easy-to-use editor."
                    />
                    <StepCard
                        number="3"
                        title="Download Instantly"
                        description="Preview and download your resume as a high-quality PDF with one click."
                    />
                </div>
            </motion.div>
        </section>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="flex flex-col items-start p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="mb-4">{icon}</div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );
}

function StepCard({ number, title, description }) {
    return (
        <div className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow">
                {number}
            </div>
            <h3 className="text-lg font-semibold mb-2 mt-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );
}
