import api from "./api";

export const getExpenses = async (page: number = 1, limit: number = 20) => {
  try {
    console.log(`Fetching expenses from API (page: ${page}, limit: ${limit})...`);
    
    const res = await api.get(`/expences`, {
      params: { page, limit } 
    });

    console.log("Expenses fetched:", res.data);
    return res.data; 
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

export const createExpense = async (expenseData: any) => {
  try {
    console.log("Creating expense with data:", expenseData);
    
    const res = await api.post(`/expences/createExpenceRecord`, expenseData);

    console.log("Expense created:", res.data);
    return res.data; 
  } catch (error) {
    console.error("Error creating expense:", error);
    throw error;
  }
};

export const updateExpense = async (id: string, expenseData: any) => {
  try {
    console.log(`Updating expense ${id} with data:`, expenseData);
    
    const res = await api.put(`/expences/updateExpenceRecord/${id}`, expenseData);

    console.log("Expense updated:", res.data);
    return res.data; 
  } catch (error) {
    console.error(`Error updating expense ${id}:`, error);
    throw error;
  }
};


export const deleteExpense = async (id: string) => {
  try {
    console.log(`Deleting expense with ID: ${id}`);
    
    const res = await api.delete(`/expences/deleteExpenceRecord/${id}`);

    console.log("Expense deleted:", res.data);
    return res.data; 
  } catch (error) {
    console.error(`Error deleting expense ${id}:`, error);
    throw error;
  }
};