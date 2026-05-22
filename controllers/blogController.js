import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GITHUB_API = "https://api.github.com";

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

// ========================
// GET BLOGS
// ========================
export const getBlogs = async (req, res) => {
  try {
    const url = `${GITHUB_API}/repos/${process.env.GITHUB_REPO}/contents/posts`;

    const response = await axios.get(url, { headers });

    return res.json(response.data);
  } catch (err) {
    console.log("🔥 BLOG FETCH ERROR:");
    console.log(err.response?.data || err.message);

    return res.status(500).json({
      error: "Failed to fetch blogs",
      detail: err.response?.data || err.message,
    });
  }
};
// ========================
// CREATE BLOG
// ========================
export const createBlog = async (req, res) => {
  try {
    console.log("GITHUB_REPO:", process.env.GITHUB_REPO);
console.log("GITHUB_TOKEN exists:", !!process.env.GITHUB_TOKEN);
    const { title, content, image, author, excerpt, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content required" });
    }

    const slug = title.toLowerCase().replace(/\s+/g, "-");
    const path = `posts/${slug}.json`;

    const data = {
      slug,
      title,
      content,
      image: image || "",
      author: author || "Admin",
      excerpt: excerpt || "",
      category: category || "general",
      date: new Date().toISOString(),
    };

    const fileContent = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");

    const url = `${GITHUB_API}/repos/${process.env.GITHUB_REPO}/contents/${path}`;

    await axios.put(
      url,
      {
        message: `Add post: ${title}`,
        content: fileContent,
        branch: "main",
      },
      { headers }
    );

    return res.status(201).json({
      message: "Blog created",
      post: data,
    });

  } catch (err) {
    console.log("CREATE ERROR:", err.response?.data || err.message);

    return res.status(500).json({
      error: "Failed to create blog",
      detail: err.response?.data || err.message,
    });
  }
  
};
// ========================
// UPDATE BLOG
// ========================
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const path = `posts/${id}.json`;
    const url = `${GITHUB_API}/repos/${process.env.GITHUB_REPO}/contents/${path}`;

    const file = await axios.get(url, { headers });

    const updated = Buffer.from(
      JSON.stringify(req.body)
    ).toString("base64");

    await axios.put(
      url,
      {
        message: `Update ${id}`,
        content: updated,
        sha: file.data.sha,
      },
      { headers }
    );

    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

// ========================
// DELETE BLOG
// ========================
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing blog id" });
    }

    const path = `posts/${id}.json`;
    const url = `${GITHUB_API}/repos/${process.env.GITHUB_REPO}/contents/${path}`;

    let file;

    try {
      file = await axios.get(url, { headers });
    } catch (err) {
      return res.status(404).json({ error: "Blog not found on GitHub" });
    }

    if (!file?.data?.sha) {
      return res.status(400).json({ error: "Missing file SHA" });
    }

    await axios.delete(url, {
      headers,
      data: {
        message: `Delete ${id}`,
        sha: file.data.sha,
      },
    });

    return res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.log("DELETE ERROR:", err.response?.data || err.message);

    return res.status(500).json({
      error: "Delete failed",
      detail: err.response?.data || err.message,
    });
  }
};

  // ========================
  // UPLOAD IMAGE (GITHUB VERSION)
  // ========================
  export const uploadImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const base64 = file.buffer.toString("base64");

    const path = `images/${Date.now()}-${file.originalname}`;

    const url = `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${path}`;

    await axios.put(
      url,
      {
        message: "upload image",
        content: base64,
        branch: "main",
      },
      { headers }
    );

    const imageUrl = `https://raw.githubusercontent.com/${process.env.GITHUB_REPO}/main/${path}`;

    return res.json({ imageUrl });

  } catch (err) {
    console.log(err.response?.data || err.message);

    return res.status(500).json({
      error: "Image upload failed",
      detail: err.response?.data || err.message,
    });
  }
};