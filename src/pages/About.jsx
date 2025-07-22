import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
    {
        question: "Can I download my resume as a PDF?",
        answer:
            "Yes! After building your resume, you can easily export it as a clean PDF file.",
    },
    {
        question: "Do I need to sign up to use CraftResume?",
        answer:
            "No sign-up is required for basic usage. Just jump in and start building.",
    },
    {
        question: "Is it free?",
        answer: "Yes, CraftResume is 100% free to use during this demo phase.",
    },
];

function FAQItem({ faq, isOpen, toggle }) {
    return (
        <div
            className="border-b py-4 cursor-pointer select-none"
            onClick={toggle}
        >
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium hover:text-blue-500 active:text-blue-600">{faq.question}</h3>
                {isOpen ? (
                    <FiChevronUp className="text-gray-500" />
                ) : (
                    <FiChevronDown className="text-gray-500" />
                )}
            </div>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-gray-600 text-base"
                >
                    {faq.answer}
                </motion.div>
            )}
        </div>
    );
}

export default function About() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) =>
        setOpenIndex(openIndex === index ? null : index);

    return (
        <section className="max-w-4xl mx-auto px-6 py-8 text-gray-800">
            <div

                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Craft<span className="text-blue-500">Resume</span></h1>
                <p className="text-lg text-gray-600">
                    A simple and elegant tool to create professional resumes with ease.
                </p>
            </div>

            <div className="space-y-12 text-lg leading-relaxed">
                <div

                >
                    <h2 className="text-xl font-semibold text-blue-600 mb-2">Why CraftResume?</h2>
                    <p>
                        CraftResume was built to solve a simple problem - building a clean, modern,
                        and professional resume shouldn't be complicated. Whether you're
                        applying for your first job or your fifth, we help you make the best
                        first impression.
                    </p>
                </div>

                <div

                >
                    <h2 className="text-xl font-semibold text-blue-600 mb-2">What You Get</h2>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>Live builder to create and preview your resume instantly</li>
                        <li>Multiple clean, elegant templates to choose from</li>
                        <li>Downloadable PDF export</li>
                        <li>No signup needed to get started</li>
                    </ul>
                </div>

                <div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-xl font-semibold text-blue-600 mb-2">Made for Everyone</h2>
                    <p>
                        Whether you're a student, a developer, a designer, or a career switcher —
                        CraftResume helps you stand out with a polished resume that reflects your
                        professionalism and personality.
                    </p>
                </div>

                <div className="mt-24">
                    <h2 className="font-bold text-xl md:text-3xl mb-4">Frequently Asked Questions</h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                faq={faq}
                                isOpen={openIndex === index}
                                toggle={() => toggleFAQ(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
