import React from "react";
import { Link } from "react-router-dom";

const LandingPage = ({ isAuthenticated }) => {
  return (
    <div className="landing-page min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-orange-300 to-gray-700 text-white py-20 px-4 flex-grow">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Create and Manage Your Blog Content with Ease
              </h1>
              <p className="text-xl opacity-90">
                A simple yet powerful platform for writers, bloggers, and
                content creators. Start writing today!
              </p>
              <div className="pt-4">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="bg-white text-orange-700 hover:bg-orange-50 px-8 py-3 rounded-lg font-medium text-lg inline-block transition shadow-lg hover:shadow-xl"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="bg-white text-orange-700 hover:bg-orange-50 px-8 py-3 rounded-lg font-medium text-lg inline-block transition shadow-lg hover:shadow-xl"
                  >
                    Sign Up Now
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white p-4 rounded-lg shadow-2xl transform rotate-3">
                <div className="h-64 bg-gray-100 rounded overflow-hidden">
                  <div className="p-4">
                    <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Blog Platform?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="text-orange-600 text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-semibold mb-2">Rich Text Editor</h3>
              <p className="text-gray-600">
                Format your content with ease using our intuitive editor. Add
                images, formatting, and more.
              </p>
            </div>

            <div className="feature-card bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="text-orange-600 text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
              <p className="text-gray-600">
                Your blog looks great on all devices, from desktop to mobile.
              </p>
            </div>

            <div className="feature-card bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="text-orange-600 text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Fast & Simple</h3>
              <p className="text-gray-600">
                No complicated setup. Start writing immediately with our
                user-friendly interface.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p>
            &copy; {new Date().getFullYear()} Blog Manager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
