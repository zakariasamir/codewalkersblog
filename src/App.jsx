import { useState, useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

// Lazy load our components for better performance
const LandingPage = lazy(() => import("./components/LandingPage"));
const BlogList = lazy(() => import("./components/BlogList"));
const BlogView = lazy(() => import("./components/BlogView"));
const BlogEdit = lazy(() => import("./components/BlogEdit"));
const SignupPage = lazy(() => import("./components/SignupPage"));

const App = () => {
  const [blogs, setBlogs] = useState(() =>
    JSON.parse(localStorage.getItem("blogs"))
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Load blogs from localStorage on initial render
  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  // Update localStorage whenever blogs change
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  // Add a new blog
  const addBlog = (blog) => {
    const newBlog = {
      ...blog,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setBlogs([...blogs, newBlog]);
  };

  // Update an existing blog
  const updateBlog = (updatedBlog) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === updatedBlog.id
          ? { ...updatedBlog, updatedAt: new Date().toISOString() }
          : blog
      )
    );
  };

  // Delete a blog
  const deleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  // Handle signup/login
  const handleAuthentication = (userData) => {
    // In a real app, you would validate credentials
    // For this demo, we'll just store the auth state in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container min-h-screen">
        {isAuthenticated && (
          <nav className="flex justify-between items-center shadow p-4 bg-neutral-50 text-gray-800">
            <h1 className="text-2xl font-bold text-orange-400">
              CodeWalkers Blog
            </h1>
            <div className="flex gap-4 items-center">
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/blog/new" className="hover:underline">
                New Blog
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </nav>
        )}

        <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={<LandingPage isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <SignupPage onSignup={handleAuthentication} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <BlogList blogs={blogs} deleteBlog={deleteBlog} />
                ) : (
                  <Navigate to="/signup" />
                )
              }
            />
            <Route
              path="/blog/:id"
              element={
                isAuthenticated ? (
                  <BlogView blogs={blogs} />
                ) : (
                  <Navigate to="/signup" />
                )
              }
            />
            <Route
              path="/blog/new"
              element={
                isAuthenticated ? (
                  <BlogEdit addBlog={addBlog} />
                ) : (
                  <Navigate to="/signup" />
                )
              }
            />
            <Route
              path="/blog/edit/:id"
              element={
                isAuthenticated ? (
                  <BlogEdit blogs={blogs} updateBlog={updateBlog} />
                ) : (
                  <Navigate to="/signup" />
                )
              }
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
