// AuthServices.ts
export const LogoutUser = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_Base_URL}/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Accept": "application/json"
        }
      }
    );

    if (response.ok) {
      localStorage.clear()
      return true;
    }
    return false;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};