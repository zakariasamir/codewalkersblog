import React from "react";
import { Link } from "react-router-dom";

const BlogList = ({ blogs, deleteBlog }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Your Blogs</h2>

      {blogs.length === 0 ? (
        <div className="text-center p-8 bg-gray-100 rounded">
          <p className="text-lg text-gray-600">
            No blogs yet. Create your first blog!
          </p>
          <Link
            to="/blog/new"
            className="mt-4 inline-block px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
          >
            Create New Blog
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="rounded p-4 shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{blog.title}</h3>
                  <p className="text-sm text-gray-600">
                    Last updated: {new Date(blog.updatedAt).toLocaleString()}
                  </p>
                </div>
                <div className="space-x-2">
                  <Link
                    to={`/blog/${blog.id}`}
                    className="inline-block px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 transition"
                  >
                    View
                  </Link>
                  <Link
                    to={`/blog/edit/${blog.id}`}
                    className="inline-block px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this blog?"
                        )
                      ) {
                        deleteBlog(blog.id);
                      }
                    }}
                    className="inline-block px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-gray-700 line-clamp-2">
                  {blog.excerpt || "No excerpt available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
