import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-semibold mb-4">Contact Me 🐈</h1>
            <p className="text-lg mb-2">Email: harshchhallani3@gmail.com</p>
            <a
                href="https://github.com/HARSH825"
                className="text-lg text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                GitHub
            </a>
        </div>
    );
};

export default ContactPage;