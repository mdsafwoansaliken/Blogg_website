import { FaBloggerB, FaComments, FaBalanceScale } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-8 w-full px-8 bg-gray-900 text-white py-6 md:py-8 mt-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <h3 className="text-lg font-bold mb-4 text-yellow-400">Featured Blogs</h3>
          <div className="flex flex-col items-center">
            <FaBloggerB className="text-yellow-400 text-2xl mb-1" />
            <p>Blog 1</p>
            <FaBloggerB className="text-yellow-400 text-2xl mb-1" />
            <p>Blog 2</p>
            <FaBloggerB className="text-yellow-400 text-2xl mb-1" />
            <p>Blog 3</p>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold mb-4 text-green-400">Help & Support</h3>
          <div className="flex flex-col items-center">
            <FaComments className="text-green-400 text-2xl mb-1" />
            <p>Forum</p>
            <FaComments className="text-green-400 text-2xl mb-1" />
            <p>Support</p>
            <FaComments className="text-green-400 text-2xl mb-1" />
            <p>Recent</p>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold mb-4 text-blue-400">Legal</h3>
          <div className="flex flex-col items-center">
            <FaBalanceScale className="text-blue-400 text-2xl mb-1" />
            <p>Privacy Policy</p>
            <FaBalanceScale className="text-blue-400 text-2xl mb-1" />
            <p>About Us</p>
            <FaBalanceScale className="text-blue-400 text-2xl mb-1" />
            <p>Terms & Conditions</p>
          </div>
        </div>
      </div>
      <p className="text-center mt-6 text-sm text-gray-400">All rights reserved &copy; Blog_App 2023</p>
    </footer>
  );
};

export default Footer;
