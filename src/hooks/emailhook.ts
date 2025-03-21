// hooks/useEmailJS.ts
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const  EmailHook = () => {
  const sendEmail = async (data: { email: string }, templateId: string) => {
    try {
      await emailjs.send(
        "service_j4iadia", // Your EmailJS Service ID
        templateId, // Template ID passed as an argument
        {
          to_email: data.email, // Dynamic variable for recipient's email
          from_name: "TutorFinder", // Sender's name
          message: "Welcome to TutorFinder! 🚀", // Optional dynamic content
        },
        "KkELVekd7y4iLBk6W" // Your EmailJS User ID
      );

      toast.success("Email sent! Check your inbox.");
      return true; // Indicate success
    } catch (error: any) {
      toast.error("Failed to send email. Please try again.");
      console.error("Error:", error);
      return false; // Indicate failure
    }
  };

  return { sendEmail };
};

export default EmailHook;