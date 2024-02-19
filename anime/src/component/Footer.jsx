import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'; // นำเข้าไอคอน

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-4">
          {/* ไอคอน Facebook */}
          <a href="#" className="text-gray-400 hover:text-white mr-4">
            <FaFacebook size={24} />
          </a>

          {/* ไอคอน Twitter */}
          <a href="#" className="text-gray-400 hover:text-white mr-4">
            <FaTwitter size={24} />
          </a>

          {/* ไอคอน Instagram */}
          <a href="#" className="text-gray-400 hover:text-white mr-4">
            <FaInstagram size={24} />
          </a>

          {/* ไอคอน GitHub */}
          <a href="#" className="text-gray-400 hover:text-white">
            <FaGithub size={24} />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Natdanai Wongsa and ChatGPT . All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
