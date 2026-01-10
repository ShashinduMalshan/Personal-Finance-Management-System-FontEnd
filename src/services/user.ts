
import api from "./api"; 
import type { User } from "../types";


export const getUserProfile = async (): Promise<User> => {
  try {
    console.log("Fetching user profile...");
    const res = await api.get("/user/profile"); 
    console.log("User profile fetched:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};


export const updateUserProfile = async (profileData: {
  name: string;
  email: string;
  phone?: string;
}): Promise<User> => {
  try {
    console.log("Updating user profile with data:", profileData);
    const res = await api.put("/user/updateProfile", profileData); 
    console.log("User profile updated:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};


export const updatePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<{ message: string }> => {
  try {
    console.log("Updating user password...");
    const res = await api.put("/user/updatePassword", {
      currentPassword,
      newPassword,
    });
    console.log("Password updated successfully:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};
