import api from "./api";

export const getIncomes = async () => {
  try {
    const res = await api.get("/income/allIncomes");
    return res.data; // <-- only the actual income array
  } catch (error) {
    console.error("Error fetching incomes:", error);
    throw error; // forward error to caller
  }
};
