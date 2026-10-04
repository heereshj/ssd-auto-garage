import axiosClient from "./axiosClient";

export const getVehicles = async () => {
  const response = await axiosClient.get("/vehicles");
  return response.data;
};

export const getVehicleById = async (id) => {
  const response = await axiosClient.get(`/vehicles/${id}`);
  return response.data;
};

export const createVehicle = async (vehicle) => {
  const response = await axiosClient.post(
    "/vehicles",
    vehicle
  );

  return response.data;
};