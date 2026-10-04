import axiosClient from "./axiosClient";

export const getCustomers = async () => {
  const response = await axiosClient.get("/customers");

  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await axiosClient.get(`/customers/${id}`);

  return response.data;
};

export const createCustomer = async (customer) => {
  const response = await axiosClient.post("/customers", customer);

  return response.data;
};