import { auth } from '../firebaseConfig';

/**
 * Sends a password reset email to the specified email address
 * @param {string} email - The email address to send the reset link to
 * @returns {Promise} A promise that resolves when the email is sent
 */
export const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    return { success: true };
  } catch (error) {
    let errorMessage = 'An error occurred while sending the reset email.';
    
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'The email address is invalid.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email address.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many attempts. Please try again later.';
        break;
      default:
        errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
}; 