import axios from "@axios";

export const getReportsFn = async ({ limit, offset, filters }) => {
  const response = await axios.get(
    `/report?limit=${limit}&offset=${offset}${filters}`
  );
  return response.data;
};

export const registerReportRequest = async () => {
  const response = await axios.post("/registerReportRequest");
  return response.data.token;
};
