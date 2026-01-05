import api from "./api";

export const getIncomes = async () => {
  try {
    console.log("Fetching incomes from API...");
    const res = await api.get("/income/allIncomes");
    console.log("Incomes fetched:", res.data);
    return res.data; // <-- only the actual income array
  } catch (error) {
    console.error("Error fetching incomes:", error);
    throw error; // forward error to caller
  }
};
