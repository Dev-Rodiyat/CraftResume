import { useState } from "react";
import FormSectionWrapper from "../FormSectionWrapper";
import {
    FaGithub,
    FaLinkedin,
    FaGlobe,
    FaLink,
    FaTimes,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const getIconForURL = (url) => {
    if (url.includes("linkedin.com")) return <FaLinkedin className="text-blue-700" />;
    if (url.includes("github.com")) return <FaGithub className="text-gray-800" />;
    if (url.includes("x.com")) return <FaXTwitter className="text-gray-800" />;
    if (url.includes("http")) return <FaGlobe className="text-green-600" />;
    return <FaLink className="text-gray-500" />;
};

const isValidURL = (url) => {
    try {
        const parsed = new URL(url);
        return ["http:", "https:"].includes(parsed.protocol);
    } catch {
        return false;
    }
};

export default function PersonalInfoForm({ formData, setFormData }) {
    const personalInfo = {
        fullName: formData.personalInfo?.fullName || "",
        email: formData.personalInfo?.email || "",
        phone: formData.personalInfo?.phone || "",
        location: formData.personalInfo?.location || "",
        socialLinks: Array.isArray(formData.personalInfo?.socialLinks)
            ? formData.personalInfo.socialLinks
            : [""],
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [field]: value,
            },
        }));
    };

    const handleSocialLinkChange = (index, value) => {
        const updatedLinks = [...personalInfo.socialLinks];
        updatedLinks[index] = value;

        setFormData((prev) => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                socialLinks: updatedLinks,
            },
        }));
    };

    const addSocialLink = () => {
        if (personalInfo.socialLinks.length < 2) {
            setFormData((prev) => ({
                ...prev,
                personalInfo: {
                    ...prev.personalInfo,
                    socialLinks: [...prev.personalInfo?.socialLinks, ""],
                },
            }));
        }
    };

    const removeSocialLink = (index) => {
        const updatedLinks = [...personalInfo.socialLinks];
        updatedLinks.splice(index, 1);
        setFormData((prev) => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                socialLinks: updatedLinks,
            },
        }));
    };

    return (
        <FormSectionWrapper title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={personalInfo.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={personalInfo.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                />
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={personalInfo.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={personalInfo.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                />
            </div>

            <div className="mt-6 space-y-3">
                <p className="text-sm font-medium text-gray-700">Social Links</p>

                {personalInfo.socialLinks.map((link, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded">{getIconForURL(link)}</div>
                        <input
                            type="url"
                            placeholder="https://..."
                            value={link}
                            onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                            className={`border px-3 py-2 rounded w-full ${link && !isValidURL(link) ? "border-red-500" : ""
                                }`}
                        />
                        {personalInfo.socialLinks.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeSocialLink(index)}
                                className="text-red-500 hover:text-red-700"
                                title="Remove"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>
                ))}

                {personalInfo.socialLinks.length < 2 &&
                    personalInfo.socialLinks.some(link => link && isValidURL(link)) && (
                        <button
                            type="button"
                            onClick={addSocialLink}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            + Add Social Link
                        </button>
                    )}
            </div>
        </FormSectionWrapper>
    );
}
