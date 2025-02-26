import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogView = ({ blogs }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the blog with the matching id
  const blog = blogs.find((blog) => blog.id === id);

  // Handle case where blog doesn't exist
  if (!blog) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-red-600 mb-4">Blog not found!</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
        >
          Back to Blog List
        </button>
      </div>
    );
  }

  return (
    <div className="blog-view max-w-4xl mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-orange-600 hover:underline">
          &larr; Back to Blogs
        </Link>
        <Link
          to={`/blog/edit/${blog.id}`}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Edit this Blog
        </Link>
      </div>

      <article className="bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <div className="text-sm text-gray-600 mb-6">
          <p>Created: {new Date(blog.createdAt).toLocaleString()}</p>
          <p>Last updated: {new Date(blog.updatedAt).toLocaleString()}</p>
        </div>

        <div className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default BlogView;
