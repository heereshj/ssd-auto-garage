import axiosClient from "./axiosClient";

export const getServiceRecords = async () => {
  const response = await axiosClient.get("/service-records");
  return response.data;
};

export const getServiceRecordById = async (id) => {
  const response = await axiosClient.get(
    `/service-records/${id}`
  );

  return response.data;
};

export const createServiceRecord = async (serviceRecord) => {
  const response = await axiosClient.post(
    "/service-records",
    serviceRecord
  );

  return response.data;
};