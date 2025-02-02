import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Optional: Custom styles

const Test = () => {
  const showSuccessToast = (text) => {
    toast.success(text, {
      position: "top-right",
      autoClose: 3000, // Close after 3 seconds
    });
  };

  const showErrorToast = () => {
    toast.error("Error! Something went wrong.", {
      position: "top-right",
      autoClose: 5000, // Close after 5 seconds
    });
  };

  const showWarningToast = () => {
    toast.warning("Warning! Please check your input.", {
      position: "top-right",
      autoClose: 4000, // Close after 4 seconds
    });
  };

  const showInfoToast = () => {
    toast.info("Info: This is a helpful message.", {
      position: "top-right",
      autoClose: 3000, // Close after 3 seconds
    });
  };

  return (
    <div className="App">
      <h1>React Toast Messages</h1>
      <div className="buttons">
        <button onClick={showSuccessToast}>Show Success Toast</button>
        <button onClick={showErrorToast}>Show Error Toast</button>
        <button onClick={showWarningToast}>Show Warning Toast</button>
        <button onClick={showInfoToast}>Show Info Toast</button>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Test;