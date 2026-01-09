import api from "./api";

export const getIncomes = async (page: number = 1, limit: number = 20) => {
  try {
    console.log(`Fetching incomes from API (page: ${page}, limit: ${limit})...`);
    
    const res = await api.get(`/income`, {
      params: { page, limit } 
    });

    console.log("Incomes fetched:", res.data);
    return res.data; 
  } catch (error) {
    console.error("Error fetching incomes:", error);
    throw error;
  }
};


