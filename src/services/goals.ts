import api from "./api";

export const getGoals = async (page: number = 1, limit: number = 20) => {
  try {
    console.log(`Fetching goals from API (page: ${page}, limit: ${limit})...`);
    
    const res = await api.get(`/goals`, {
      params: { page, limit } 
    });

    console.log("Goals fetched:", res.data);
    return res.data; 
  } catch (error) {
    console.error("Error fetching goals:", error);
    throw error;
  }
};


