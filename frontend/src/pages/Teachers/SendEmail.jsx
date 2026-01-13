import { useState } from "react";
import { sendEmail } from "../../services/emailService";

const SendEmail = () => {
  const [form, setForm] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await sendEmail(form);
      alert(`Email sent successfully ✅\n${result.message}`);
      setForm({ to: "", subject: "", message: "" });
    } catch (error) {
      alert(`Email failed ❌\n${error.message}`);
      console.error("Send email error:", error);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto"
    },
    heading: {
      color: "#2c3e50",
      marginBottom: "20px",
      fontSize: "24px"
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      fontSize: "14px",
      border: "2px solid #e0e0e0",
      borderRadius: "8px",
      marginBottom: "15px",
      transition: "border-color 0.3s",
      boxSizing: "border-box"
    },
    textarea: {
      width: "100%",
      padding: "12px 15px",
      fontSize: "14px",
      border: "2px solid #e0e0e0",
      borderRadius: "8px",
      marginBottom: "15px",
      fontFamily: "inherit",
      resize: "vertical",
      boxSizing: "border-box"
    },
    button: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      padding: "14px 32px",
      fontSize: "16px",
      fontWeight: "600",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
      width: "100%",
      textTransform: "uppercase",
      letterSpacing: "0.8px"
    },
    buttonDisabled: {
      background: "#6c757d",
      cursor: "not-allowed",
      opacity: "0.6",
      boxShadow: "none"
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Send Email</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="to"
          placeholder="Student / Parent Email"
          value={form.to}
          onChange={handleChange}
          required
          disabled={loading}
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = "#667eea"}
          onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
          disabled={loading}
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = "#667eea"}
          onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
        />

        <textarea
          name="message"
          placeholder="Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
          disabled={loading}
          style={styles.textarea}
          onFocus={(e) => e.target.style.borderColor = "#667eea"}
          onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
        />

        <button 
          type="submit" 
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading && styles.buttonDisabled)
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }
          }}
        >
          {loading ? "📤 Sending..." : "📧 Send Email"}
        </button>
      </form>
    </div>
  );
};

export default SendEmail;