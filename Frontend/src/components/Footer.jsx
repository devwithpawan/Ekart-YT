import React from "react";
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-200 py-10">
            <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between">
                {/* //info */}
                <div className="mb-6 md:mb-0">
                    <Link to='/'>
                    <img src="Ekart.png" alt="" className="w-32"/>
                    </Link>
                    <p className="mt-2 text-5m">Powering Your World with the Best in Electronics.</p>
                    <p className="mt-2 text-5m">123 Eectronics St, Style City, NY 10001.</p>
                    <p className="text-5m">Email: support@ekart.com</p>
                    <p className="text-5m">Phone: (123) 456-78959</p>
                </div>
                {/* //customer service Link */}
                <div className="mb-6 md:mb-0">
                    <h3 className="text-xl font-semibold">Customer Service</h3>
                    <ul className="mt-2 text-5m space-y-2">
                        <li>Contact Us</li>
                        <li>Shipping & Returns</li>
                        <li>FAQs</li>
                        <li>Order Tracking</li>
                        <li>Size Guide</li>
                    </ul>
                </div>
                {/* social medias links */}
                <div className="mb-6 md:mb-0">
                    <h3 className="text-xl font-semibold">Follow Us</h3>
                    <div className="flex space-x-4 mt-2">
                        <FaFacebook/>
                        <FaInstagram/>
                        <FaTwitterSquare/>
                        <FaPinterest/>
                    </div>
                </div>
                {/* newsletter subscription */}
                <div>
                    <h3 className="text-xl font-semibold">Stay in the Loop</h3>
                    <p className="mt-2 text-5m">Subscribe to get special offers, free giveaways, and more</p>
                    <form action='' className="mt-4 flex">
                        <input
                        type="email" 
                        placeholder="Your Email Address"
                        className="w-full p-2 rounded-1-md bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100"
                        />
                        <button type="submit" className="bg-pink-600 text-white px-4 rounded-r-md hover:bg-red-700">Subscribe</button>
                    </form>
                </div>
            </div>
            {/* button section */}
            <div className="mt-8 border-gray-700 pt-6 text-center text-5m">
                <p>&copy; {new Date().getFullYear()} <span className="text-pink-600">Ekart</span>.All rights reserved</p>
            </div>

        </footer>
    )
}
export default Footer