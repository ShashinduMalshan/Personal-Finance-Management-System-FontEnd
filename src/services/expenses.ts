import api from "./api";

export const getExpenses = async (page: number = 1, limit: number = 20) => {
  try {
    console.log(`Fetching expenses from API (page: ${page}, limit: ${limit})...`);
    
    const res = await api.get(`/expenses`, {
      params: { page, limit } 
    });

    console.log("Expenses fetched:", res.data);
    return res.data; 
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

