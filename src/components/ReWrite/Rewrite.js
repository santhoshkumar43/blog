import axios from "axios";
import DOMPurify from "dompurify";
import { useState } from "react";
import "./ReWrite.css"; // Import CSS

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // Use environment variable

async function rewriteInReact(userPrompt) {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `System Prompt:
                You are an AI-powered content rewriter for a blog application. Users will provide content that may contain HTML tags from a rich text editor. Your task is to rewrite the content while preserving the original HTML structure. Ensure that formatting, links, headings, bold/italic text, and other rich text elements remain intact. The rewritten content should be clear, engaging, and contextually accurate while improving readability and flow. Do not remove or alter HTML tags unless necessary for better readability.

                Prompt:
                ${userPrompt}`,
              },
            ],
          },
        ],
      }
    );

    if (response.data && response.data.candidates) {
      let rewrittenContent = response.data.candidates[0].content.parts[0].text;

      // Remove any markdown-like code blocks (```html ... ```)
      rewrittenContent = rewrittenContent.replace(/```html|```/g, "");

      // Sanitize the response
      rewrittenContent = DOMPurify.sanitize(rewrittenContent);

      return rewrittenContent;
    }

    throw new Error("Invalid response from Gemini API");
  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    return null;
  }
}

function Rewrite({ content, setPostText }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    console.log("clicked");
    const result = await rewriteInReact(content);
    if (result) {
      setPostText(result);
    }
    setLoading(false);
  };

  return (
    <div className="rewrite-container">
      <button className="rewrite-button" onClick={handleClick} disabled={loading}>
        {loading ? <span className="spinner"></span> : "Re-write Content with AI"}
      </button>
    </div>
  );
}

export default Rewrite;
