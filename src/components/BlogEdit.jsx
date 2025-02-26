import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogEdit = ({ blogs, addBlog, updateBlog }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id !== undefined && id !== "new";

  const initialBlogState = {
    title: "",
    content: "",
    excerpt: "",
  };

  const [formData, setFormData] = useState(initialBlogState);
  const [error, setError] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  // Load blog data if in edit mode
  useEffect(() => {
    if (isEdit && blogs) {
      const blogToEdit = blogs.find((blog) => blog.id === id);
      if (blogToEdit) {
        setFormData({
          ...blogToEdit,
        });
      } else {
        setError("Blog not found!");
      }
    }
  }, [isEdit, id, blogs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate excerpt from content if it's the content being changed
    if (name === "content" && !formData.excerpt) {
      // Get first 150 characters of plain text content
      const plainText = value.replace(/[#*`_~[\]()]/g, "").substring(0, 150);
      const excerpt = plainText + (plainText.length > 150 ? "..." : "");
      setFormData((prev) => ({
        ...prev,
        excerpt,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required!");
      return;
    }

    if (isEdit) {
      // Update existing blog
      updateBlog(formData);
      navigate(`/blog/${id}`);
    } else {
      // Add new blog
      addBlog(formData);
      navigate("/dashboard");
    }
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  // Markdown toolbar buttons
  const markdownButtons = [
    { label: "Bold", prefix: "**", suffix: "**", placeholder: "bold text" },
    {
      label: "Italic",
      prefix: "_",
      suffix: "_",
      placeholder: "italicized text",
    },
    { label: "Heading", prefix: "## ", suffix: "", placeholder: "Heading" },
    { label: "Link", prefix: "[", suffix: "](url)", placeholder: "link text" },
    {
      label: "Image",
      prefix: "![",
      suffix: "](image-url)",
      placeholder: "alt text",
    },
    { label: "List", prefix: "- ", suffix: "", placeholder: "list item" },
    {
      label: "Code",
      prefix: "```\n",
      suffix: "\n```",
      placeholder: "code block",
    },
    { label: "Quote", prefix: "> ", suffix: "", placeholder: "quote" },
  ];

  const insertMarkdown = (prefix, suffix, placeholder) => {
    const textarea = document.getElementById("content");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.content;
    const selectedText = text.substring(start, end) || placeholder;

    const newText =
      text.substring(0, start) +
      prefix +
      selectedText +
      suffix +
      text.substring(end);

    setFormData((prev) => ({
      ...prev,
      content: newText,
    }));

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      const newCursorPos =
        start + prefix.length + selectedText.length + suffix.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="blog-edit max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">
        {isEdit ? "Edit Blog" : "Create New Blog"}
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-2 font-medium">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="content" className="font-medium">
              Blog Content (Markdown)
            </label>
            <button
              type="button"
              onClick={togglePreview}
              className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
            >
              {previewMode ? "Edit Mode" : "Preview Mode"}
            </button>
          </div>

          {/* Markdown Toolbar */}
          {!previewMode && (
            <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-100 rounded">
              {markdownButtons.map((button, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    insertMarkdown(
                      button.prefix,
                      button.suffix,
                      button.placeholder
                    )
                  }
                  className="px-2 py-1 text-sm bg-white border rounded hover:bg-gray-50"
                >
                  {button.label}
                </button>
              ))}
            </div>
          )}

          {previewMode ? (
            <div className="markdown-preview border rounded-md p-4 min-h-64 bg-white">
              {formData.content ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formData.content}
                </ReactMarkdown>
              ) : (
                <p className="text-gray-400">Preview will appear here</p>
              )}
            </div>
          ) : (
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Write your blog content in Markdown format..."
              rows="12"
              required
            />
          )}

          {/* Quick Markdown Help */}
          {!previewMode && (
            <div className="mt-2 text-sm text-gray-600">
              <p>
                Markdown tips: **bold**, _italic_, # heading, [link](url),
                ![image](url)
              </p>
            </div>
          )}
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
          >
            {isEdit ? "Update Blog" : "Create Blog"}
          </button>
          <button
            type="button"
            onClick={() => navigate(isEdit ? `/blog/${id}` : "/dashboard")}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEdit;
