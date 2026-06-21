import API from "./api";

export const getMyBookings = async () => {
  const response = await API.get("/bookings/my-bookings");
  return response.data;
};
