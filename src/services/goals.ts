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



export const updateGoal = async (id: string, goalData: any) => {
  try {
    console.log(`Updating goal ${id} with data:`, goalData);

    const res = await api.put(`/goals/updateGoalRecord/${id}`, goalData);

    console.log("Goal updated:", res.data);
    return res.data;
  } catch (error) {
    console.error(`Error updating goal ${id}:`, error);
    throw error;
  }
};

export const deleteGoal = async (id: string) => {
  try {
    console.log(`Deleting goal with ID: ${id}`);

    const res = await api.delete(`/goals/deleteGoalRecord/${id}`);

    console.log("Goal deleted:", res.data);
    return res.data;
  } catch (error) {
    console.error(`Error deleting goal ${id}:`, error);
    throw error;
  }
};



export const createGoal = async (goalData: any) => {
  try {
    console.log("Creating goal with data:", goalData);

    const res = await api.post(`/goals/createGoalRecord`, goalData);

    console.log("Goal created:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error creating goal:", error);
    throw error;
  }
};