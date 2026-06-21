import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/api";

const Dashboard = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings/my-bookings");
        if (res.data.success) {
          setBookings(res.data.bookings);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed",
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "Cancelled",
  ).length;

  return (
    <section className="min-h-screen bg-ivory pt-28 px-4">
      {" "}
      <div className="max-w-6xl mx-auto">
        {/* Welcome Card */}{" "}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          {" "}
          <h1 className="text-3xl font-bold text-burgundy">
            Welcome, {user?.name}{" "}
          </h1>
          <p className="text-charcoal/60 mt-2">
            Manage your bookings and profile here.
          </p>
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-gold/10 p-6 rounded-2xl">
              <h3 className="font-semibold text-lg">Total Bookings</h3>

              <p className="text-3xl font-bold mt-2">
                {loading ? "..." : totalBookings}
              </p>
            </div>

            <div className="bg-green-100 p-6 rounded-2xl">
              <h3 className="font-semibold text-lg">Confirmed</h3>

              <p className="text-3xl font-bold mt-2">
                {loading ? "..." : confirmedBookings}
              </p>
            </div>

            <div className="bg-red-100 p-6 rounded-2xl">
              <h3 className="font-semibold text-lg">Cancelled</h3>

              <p className="text-3xl font-bold mt-2">
                {loading ? "..." : cancelledBookings}
              </p>
            </div>
          </div>
        </div>
        {/* My Bookings */}
        <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-burgundy mb-6">My Bookings</h2>

          {loading ? (
            <p className="text-charcoal/60">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="text-charcoal/60">No bookings found.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="border border-gold/20 rounded-2xl p-5 hover:shadow-md transition">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-charcoal">
                        {booking.service}
                      </h3>

                      <p className="text-sm text-charcoal/60 mt-1">
                        Date: {booking.date}
                      </p>

                      <p className="text-sm text-charcoal/60">
                        Time: {booking.time}
                      </p>

                      {booking.message && (
                        <p className="text-sm text-charcoal/60 mt-2">
                          Message: {booking.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : booking.status === "Completed"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
