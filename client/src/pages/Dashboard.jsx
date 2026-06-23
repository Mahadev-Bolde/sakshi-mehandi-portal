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
          setBookings(res.data.bookings || []);
        }
      } catch (error) {
        console.log("Dashboard booking error:", error);
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

  const getStatusStyle = (status) => {
    if (status === "Confirmed")
      return "bg-green-100 text-green-700 border border-green-200";
    if (status === "Cancelled")
      return "bg-red-100 text-red-700 border border-red-200";
    if (status === "Completed")
      return "bg-blue-100 text-blue-700 border border-blue-200";
    return "bg-yellow-100 text-yellow-700 border border-yellow-200";
  };

  return (
    <section className="min-h-screen bg-ivory pt-24 sm:pt-28 pb-8 px-4 xs:px-3 sm:px-6 md:px-8 lg:px-10">
      <div className="bg-black text-white p-4 xs:bg-red-500 sm:bg-blue-500 md:bg-green-500 lg:bg-yellow-500">
        Resize me – colors change at breakpoints!
      </div>
      <div className="max-w-7xl mx-auto w-full">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 xs:p-5 sm:p-7 md:p-8">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-burgundy break-words">
            Welcome, {user?.name || "User"}
          </h1>
          <p className="text-charcoal/60 mt-1 xs:mt-2 text-xs xs:text-sm sm:text-base">
            Manage your bookings and profile here.
          </p>

          {/* Stats - flexible grid with flex-wrap for better responsiveness */}
          <div className="flex flex-wrap gap-4 xs:gap-5 md:gap-6 mt-6 xs:mt-8 md:mt-10">
            <div className="flex-1 min-w-[140px] bg-gold/10 p-4 xs:p-5 sm:p-6 rounded-2xl">
              <h3 className="font-semibold text-sm xs:text-base sm:text-lg text-charcoal">
                Total Bookings
              </h3>
              <p className="text-2xl xs:text-3xl sm:text-4xl font-bold mt-1 xs:mt-2 text-charcoal">
                {loading ? "..." : totalBookings}
              </p>
            </div>
            <div className="flex-1 min-w-[140px] bg-green-100 p-4 xs:p-5 sm:p-6 rounded-2xl">
              <h3 className="font-semibold text-sm xs:text-base sm:text-lg text-charcoal">
                Confirmed
              </h3>
              <p className="text-2xl xs:text-3xl sm:text-4xl font-bold mt-1 xs:mt-2 text-green-700">
                {loading ? "..." : confirmedBookings}
              </p>
            </div>
            <div className="flex-1 min-w-[140px] bg-red-100 p-4 xs:p-5 sm:p-6 rounded-2xl">
              <h3 className="font-semibold text-sm xs:text-base sm:text-lg text-charcoal">
                Cancelled
              </h3>
              <p className="text-2xl xs:text-3xl sm:text-4xl font-bold mt-1 xs:mt-2 text-red-700">
                {loading ? "..." : cancelledBookings}
              </p>
            </div>
          </div>
        </div>

        {/* My Bookings */}
        <div className="mt-6 sm:mt-8 w-full overflow-hidden rounded-2xl bg-white p-3 xs:p-4 sm:p-6 md:p-8 shadow-lg">
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 border-b border-gold/10 pb-3 xs:pb-4 mb-4 xs:mb-6">
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-burgundy break-words">
              My Bookings
            </h2>
            {!loading && bookings.length > 0 && (
              <span className="rounded-full bg-gold/10 px-3 py-1 text-xs text-charcoal/60 whitespace-nowrap">
                {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {loading ? (
            <div className="py-10 text-center">
              <p className="text-sm text-charcoal/60">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gold/30 px-3 py-10 text-center">
              <p className="text-base font-medium text-charcoal/70">
                No bookings found.
              </p>
              <p className="mt-2 text-sm text-charcoal/50">
                Your future bookings will appear here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:gap-4">
              {bookings.map((booking) => (
                <article
                  key={booking._id}
                  className="w-full overflow-hidden rounded-xl border border-gold/20 p-3 xs:p-4 sm:p-5">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Left side: service + details */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm xs:text-base sm:text-lg font-semibold leading-snug text-charcoal break-words">
                        {booking.service}
                      </h3>

                      {/* Date & Time - side by side on xs and up */}
                      <div className="mt-3 grid grid-cols-2 gap-2 xs:gap-3">
                        <div className="rounded-lg bg-ivory/70 px-3 py-2">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-charcoal/45">
                            Date
                          </p>
                          <p className="text-xs xs:text-sm font-medium text-charcoal break-words">
                            {booking.date}
                          </p>
                        </div>
                        <div className="rounded-lg bg-ivory/70 px-3 py-2">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-charcoal/45">
                            Time
                          </p>
                          <p className="text-xs xs:text-sm font-medium text-charcoal break-words">
                            {booking.time}
                          </p>
                        </div>
                      </div>

                      {booking.message && (
                        <div className="mt-3 rounded-lg bg-ivory/70 p-3">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-charcoal/45">
                            Message
                          </p>
                          <p className="text-xs xs:text-sm leading-relaxed text-charcoal/70 break-words whitespace-pre-wrap">
                            {booking.message}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Status badge - full width on mobile, auto width on larger */}
                    <div className="w-full md:w-auto md:min-w-[130px] md:max-w-[180px]">
                      <span
                        className={`block w-full md:w-auto text-center rounded-full px-3 py-2 text-xs sm:text-sm font-semibold ${getStatusStyle(
                          booking.status,
                        )}`}>
                        {booking.status || "Pending"}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
