import React, { useState } from "react";
import axios from "axios";
import "./QRCodeGenerator.css"; // Importing custom CSS for styling

const QRCodeGenerator = () => {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQRCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://qr-code-backend-flask.onrender.com/api/get_qr");
      console.log("QR Code response:", response);
      
      // Ensure response contains the QR code
      if (response.data && response.data.qr_code) {
        setQrCode(response.data.qr_code); // Set base64 data
      } else {
        setError("QR code data not found in the response.");
      }
    } catch (err) {
      setError("Failed to generate QR code.");
      console.error("Error generating QR code:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div>
    //   <button onClick={generateQRCode} disabled={loading}>
    //     {loading ? "Generating..." : "Generate QR Code"}
    //   </button>
    //   {error && <p style={{ color: "red" }}>{error}</p>}
    //   {qrCode && (
    //     <div>
    //       <h3>QR Code:</h3>
    //       <img
    //         src={qrCode}
    //         alt="QR Code"
    //         style={{ width: "200px", height: "200px" }}
    //       />
    //     </div>
    //   )}
    // </div>

    <div className="qr-generator-container">
    <h1>WhatsApp Connecting Device QR Code - <strong className="demo">Demo</strong></h1>
    <div className="qr-generator-card">
      <button
        className={`qr-generator-button ${loading ? "loading" : ""}`}
        onClick={generateQRCode}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate QR Code"}
      </button>
      {error && <p className="qr-generator-error">{error}</p>}
      {qrCode && (
        <div className="qr-code-display">
          <h3>Your QR Code:</h3>
          <img
            src={qrCode}
            alt="QR Code"
            className="qr-code-image"
            title="Right-click to save the QR code"
          />
        </div>
      )}
    </div>
  </div>
  );
};

export default QRCodeGenerator;
