import React, { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("Bridal");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  // Fetch stats
  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await API.get("/admin/bookings");
      setBookings(res.data.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = filter === "ALL" || b.status.toUpperCase() === filter;
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const chartData = [
    {
      name: "Pending",
      value: bookings.filter((b) => b.status === "Pending").length,
    },
    {
      name: "Confirmed",
      value: bookings.filter((b) => b.status === "Confirmed").length,
    },
    {
      name: "Cancelled",
      value: bookings.filter((b) => b.status === "Cancelled").length,
    },
  ];

  const COLORS = ["#eab308", "#16a34a", "#ef4444"];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchStats();
      await fetchBookings();
      setLoading(false);
    };
    loadData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/bookings/${id}/status`, { status });
      toast.success("Booking updated");
      fetchBookings();
      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await API.delete(`/admin/bookings/${id}`);
      toast.success("Booking deleted");
      fetchBookings();
      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadGalleryImage = async () => {
    if (!image) return toast.error("Please select an image");
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("category", category);
      const res = await API.post("/gallery/upload", formData);
      if (res.data.success) {
        toast.success("Image uploaded successfully");
        setImage(null);
        setCategory("Bridal");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Upload failed",
      );
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 pt-28 animate-pulse">
        <div className="h-10 w-1/3 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-4 gap-4 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden pt-28 px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12 xs:mb-16">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-8 xs:w-12 h-px bg-gold/50"></span>
          <span className="text-gold font-semibold tracking-[0.2em] xs:tracking-[0.3em] uppercase text-[10px] xs:text-sm">
            Admin Control Center
          </span>
          <span className="w-8 xs:w-12 h-px bg-gold/50"></span>
        </div>

        <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Dashboard
          <span className="text-burgundy"> Management</span>
        </h1>

        <div className="w-16 xs:w-20 h-1 bg-gradient-to-r from-gold to-burgundy mx-auto mt-3 xs:mt-4"></div>

        <p className="text-charcoal/60 mt-3 xs:mt-4 text-xs xs:text-sm">
          Manage bookings, customers and gallery beautifully from one place.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 mb-8 xs:mb-10">
        <div className="group bg-white rounded-3xl border border-gold/10 p-4 xs:p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <p className="text-charcoal/50 uppercase tracking-wider text-[10px] xs:text-xs">
            Total Users
          </p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-burgundy mt-2 xs:mt-3">
            {stats?.totalUsers}
          </h2>
          <div className="mt-2 xs:mt-3 h-1 w-0 bg-gold group-hover:w-full transition-all duration-500"></div>
        </div>

        <div className="group bg-white rounded-3xl border border-gold/10 p-4 xs:p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <p className="text-charcoal/50 uppercase tracking-wider text-[10px] xs:text-xs">
            Total Bookings
          </p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-burgundy mt-2 xs:mt-3">
            {stats?.totalBookings}
          </h2>
          <div className="mt-2 xs:mt-3 h-1 w-0 bg-gold group-hover:w-full transition-all duration-500"></div>
        </div>

        <div className="group bg-white rounded-3xl border border-gold/10 p-4 xs:p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <p className="text-charcoal/50 uppercase tracking-wider text-[10px] xs:text-xs">
            Pending
          </p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-burgundy mt-2 xs:mt-3">
            {stats?.pendingBookings}
          </h2>
          <div className="mt-2 xs:mt-3 h-1 w-0 bg-gold group-hover:w-full transition-all duration-500"></div>
        </div>

        <div className="group bg-white rounded-3xl border border-gold/10 p-4 xs:p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <p className="text-charcoal/50 uppercase tracking-wider text-[10px] xs:text-xs">
            Confirmed
          </p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-burgundy mt-2 xs:mt-3">
            {stats?.confirmedBookings}
          </h2>
          <div className="mt-2 xs:mt-3 h-1 w-0 bg-gold group-hover:w-full transition-all duration-500"></div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-4 xs:mb-5">
        <input
          type="text"
          placeholder="Search bookings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            sm:w-96
            bg-white
            border
            border-gold/20
            rounded-full
            px-4 xs:px-6
            py-2 xs:py-3
            text-sm xs:text-base
            shadow-sm
            focus:outline-none
            focus:border-gold
            focus:ring-2
            focus:ring-gold/20
          "
        />
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-2 xs:gap-3 mb-6">
        <button
          onClick={() => setFilter("ALL")}
          className={`px-4 xs:px-5 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-semibold transition-all duration-300 ${
            filter === "ALL"
              ? "bg-burgundy text-white shadow-lg shadow-burgundy/20"
              : "bg-white border border-gold/20 text-charcoal/60 hover:bg-gold/10"
          }`}>
          All
        </button>

        <button
          onClick={() => setFilter("PENDING")}
          className={`px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium transition ${
            filter === "PENDING"
              ? "bg-yellow-500 text-white"
              : "bg-gray-100 text-gray-600"
          }`}>
          Pending
        </button>

        <button
          onClick={() => setFilter("CONFIRMED")}
          className={`px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium transition ${
            filter === "CONFIRMED"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}>
          Confirmed
        </button>

        <button
          onClick={() => setFilter("CANCELLED")}
          className={`px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium transition ${
            filter === "CANCELLED"
              ? "bg-red-500 text-white"
              : "bg-gray-100 text-gray-600"
          }`}>
          Cancelled
        </button>
      </div>

      {/* GALLERY UPLOAD */}
      <div className="bg-white rounded-3xl border border-gold/10 shadow-lg p-4 xs:p-6 sm:p-8 mb-12 xs:mb-16">
        <h2 className="font-serif text-2xl xs:text-3xl font-bold">
          Gallery
          <span className="text-burgundy"> Management</span>
        </h2>

        <p className="text-charcoal/50 text-xs xs:text-sm">
          Upload and manage portfolio images.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 xs:gap-4 py-4 xs:py-6 sm:py-8">
          <div>
            <label className="block text-xs xs:text-sm font-medium mb-1 xs:mb-2">
              Select Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border rounded-lg p-2 xs:p-2.5 text-xs xs:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs xs:text-sm font-medium mb-1 xs:mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-2 xs:p-2.5 text-xs xs:text-sm">
              <option value="Bridal">Bridal</option>
              <option value="Arabic">Arabic</option>
              <option value="Traditional">Traditional</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={uploadGalleryImage}
              disabled={uploading}
              className="w-full py-2 xs:py-3 rounded-full bg-gradient-to-r from-gold to-gold/80 text-charcoal font-bold text-sm xs:text-base hover:shadow-xl hover:shadow-gold/20 transition">
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        </div>

        {image && (
          <div className="mt-4 xs:mt-6">
            <p className="text-xs xs:text-sm text-gray-500 mb-2">Preview</p>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-32 xs:w-40 h-32 xs:h-40 object-cover rounded-xl border"
            />
          </div>
        )}
      </div>

      {/* BOOKINGS TABLE */}
      <div className="overflow-x-auto rounded-3xl border border-gold/10 shadow-lg">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-8 xs:py-10 text-gray-500">
            <p className="text-base xs:text-lg font-medium">
              No bookings found
            </p>
            <p className="text-xs xs:text-sm">Try changing filter or search</p>
          </div>
        ) : (
          <table className="w-full text-[10px] xs:text-xs sm:text-sm">
            <thead className="bg-gradient-to-r from-burgundy to-burgundy/90 text-white">
              <tr>
                <th className="p-2 xs:p-3 text-left">Name</th>
                <th className="p-2 xs:p-3 text-left hidden sm:table-cell">
                  Email
                </th>{" "}
                {/* hide email on tiny screens */}
                <th className="p-2 xs:p-3 text-left">Service</th>
                <th className="p-2 xs:p-3 text-left hidden xs:table-cell">
                  Date
                </th>{" "}
                {/* hide date on <400px */}
                <th className="p-2 xs:p-3 text-left">Status</th>
                <th className="p-2 xs:p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b._id} className="border-t">
                  <td className="p-2 xs:p-3 font-medium">{b.name}</td>
                  <td className="p-2 xs:p-3 hidden sm:table-cell">{b.email}</td>
                  <td className="p-2 xs:p-3">{b.service}</td>
                  <td className="p-2 xs:p-3 hidden xs:table-cell">{b.date}</td>
                  <td className="p-2 xs:p-3">
                    <span
                      className={`px-2 xs:px-3 py-0.5 xs:py-1 rounded-full text-[8px] xs:text-xs font-medium ${
                        b.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : b.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-2 xs:p-3">
                    <div className="flex flex-wrap gap-1 xs:gap-2">
                      <button
                        onClick={() => updateStatus(b._id, "Confirmed")}
                        className="flex-1 min-w-[60px] px-2 xs:px-3 py-1 xs:py-1.5 rounded-full bg-green-500 text-white text-[8px] xs:text-xs font-semibold hover:scale-105 transition">
                        Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(b._id, "Cancelled")}
                        className="flex-1 min-w-[60px] px-2 xs:px-3 py-1 xs:py-1.5 rounded-full bg-red-500 text-white text-[8px] xs:text-xs font-semibold hover:scale-105 transition">
                        Cancel
                      </button>
                      <button
                        onClick={() => deleteBooking(b._id)}
                        className="flex-1 min-w-[60px] px-2 xs:px-3 py-1 xs:py-1.5 rounded-full bg-charcoal text-white text-[8px] xs:text-xs font-semibold hover:scale-105 transition">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ANALYTICS */}
      <div className="mt-12 xs:mt-16 bg-white rounded-3xl border border-gold/10 shadow-lg p-4 xs:p-6 sm:p-8">
        <div className="mb-6 xs:mb-8 text-center">
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold">
            Booking
            <span className="text-burgundy"> Analytics</span>
          </h2>
          <div className="w-12 xs:w-16 h-1 bg-gradient-to-r from-gold to-burgundy mx-auto mt-2 xs:mt-3"></div>
        </div>

        <div className="h-[280px] xs:h-[320px] sm:h-[350px] mb-6 xs:mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                outerRadius={80} // smaller on mobile; responsive container will scale
                innerRadius={40}
                paddingAngle={4}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 xs:gap-6">
          <button className="bg-white border border-gold/10 rounded-3xl p-4 xs:p-6 hover:-translate-y-2 hover:shadow-xl transition cursor-pointer text-center">
            <span className="block text-2xl xs:text-3xl mb-2">📅</span>
            View Bookings
          </button>

          <button
            onClick={() => navigate("/gallery")}
            className="bg-white border border-gold/10 rounded-3xl p-4 xs:p-6 hover:-translate-y-2 hover:shadow-xl transition cursor-pointer text-center">
            <span className="block text-2xl xs:text-3xl mb-2">🖼</span>
            Manage Gallery
          </button>

          <button className="bg-white border border-gold/10 rounded-3xl p-4 xs:p-6 hover:-translate-y-2 hover:shadow-xl transition cursor-pointer text-center">
            <span className="block text-2xl xs:text-3xl mb-2">👥</span>
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
