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
  // filter bookings
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

  // Update status
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

  // Delete booking
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
    if (!image) {
      return toast.error("Please select an image");
    }

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
      console.log("UPLOAD ERROR:", error);
      console.log("UPLOAD RESPONSE:", error.response?.data);

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
    <div className="min-h-screen bg-white relative overflow-hidden pt-28 px-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-12 h-px bg-gold/50"></span>

          <span className="text-gold font-semibold tracking-[0.3em] uppercase text-sm">
            Admin Control Center
          </span>

          <span className="w-12 h-px bg-gold/50"></span>
        </div>

        <h1 className="font-serif text-5xl md:text-6xl font-bold">
          Dashboard
          <span className="text-burgundy"> Management</span>
        </h1>

        <div className="w-20 h-1 bg-gradient-to-r from-gold to-burgundy mx-auto mt-4"></div>

        <p className="text-charcoal/60 mt-4 text-sm">
          Manage bookings, customers and gallery beautifully from one place.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="group bg-white rounded-3xl border border-gold/10 p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <p className="text-charcoal/50 uppercase tracking-wider text-xs">
            Total Users
          </p>
          <h2 className="text-4xl font-serif font-bold text-burgundy mt-3">
            {stats?.totalUsers}
          </h2>
          <div className="mt-3 h-1 w-0 bg-gold group-hover:w-full transition-all duration-500"></div>
        </div>

        <div className="group bg-white rounded-3xl border border-gold/10 p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <p className="text-charcoal/50 uppercase tracking-wider text-xs">
            Total Bookings
          </p>
          <h2 className="text-4xl font-serif font-bold text-burgundy mt-3">
            {stats?.totalBookings}
          </h2>
          <div className="mt-3 h-1 w-0 bg-gold group-hover:w-full transition-all duration-500"></div>
        </div>

        <div className="group bg-white rounded-3xl border border-gold/10 p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <p className="text-charcoal/50 uppercase tracking-wider text-xs">
            Pending
          </p>
          <h2 className="text-4xl font-serif font-bold text-burgundy mt-3">
            {stats?.pendingBookings}
          </h2>
          <div className="mt-3 h-1 w-0 bg-gold group-hover:w-full transition-all duration-500"></div>
        </div>

        <div className="group bg-white rounded-3xl border border-gold/10 p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <p className="text-charcoal/50 uppercase tracking-wider text-xs">
            Confirmed
          </p>
          <h2 className="text-4xl font-serif font-bold text-burgundy mt-3">
            {stats?.confirmedBookings}
          </h2>
          <div className="mt-3 h-1 w-0 bg-gold group-hover:w-full transition-all duration-500"></div>
        </div>
      </div>

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search bookings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
  w-full
  md:w-96
  bg-white
  border
  border-gold/20
  rounded-full
  px-6
  py-3
  shadow-sm
  focus:outline-none
  focus:border-gold
  focus:ring-2
  focus:ring-gold/20
"
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setFilter("ALL")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            filter === "ALL"
              ? "bg-burgundy text-white shadow-lg shadow-burgundy/20"
              : "bg-white border border-gold/20 text-charcoal/60 hover:bg-gold/10"
          }`}>
          All
        </button>

        <button
          onClick={() => setFilter("PENDING")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            filter === "PENDING"
              ? "bg-yellow-500 text-white"
              : "bg-gray-100 text-gray-600"
          }`}>
          Pending
        </button>

        <button
          onClick={() => setFilter("CONFIRMED")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            filter === "CONFIRMED"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}>
          Confirmed
        </button>

        <button
          onClick={() => setFilter("CANCELLED")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            filter === "CANCELLED"
              ? "bg-red-500 text-white"
              : "bg-gray-100 text-gray-600"
          }`}>
          Cancelled
        </button>
      </div>

      {/* GALLERY UPLOAD */}
      <div
        className="
bg-white
rounded-3xl
border
border-gold/10
shadow-lg
p-8
mb-16
">
        <h2 className="font-serif text-3xl font-bold">
          Gallery
          <span className="text-burgundy"> Management</span>
        </h2>

        <p className="text-charcoal/50 text-sm">
          Upload and manage portfolio images.
        </p>

        <div className="grid md:grid-cols-3 gap-4 py-8">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-2">
              <option value="Bridal">Bridal</option>
              <option value="Arabic">Arabic</option>
              <option value="Traditional">Traditional</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={uploadGalleryImage}
              disabled={uploading}
              className="w-full py-3 rounded-full bg-gradient-to-r  from-gold to-gold/80 text-charcoal font-bold hover:shadow-xl hover:shadow-gold/20 transition">
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        </div>

        {image && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">Preview</p>

            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-xl border"
            />
          </div>
        )}
      </div>

      {/* BOOKINGS TABLE */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg font-medium">No bookings found</p>
          <p className="text-sm">Try changing filter or search</p>
        </div>
      ) : (
        <div
          className="
bg-white
rounded-3xl
border
border-gold/10
shadow-lg
overflow-hidden
">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-burgundy to-burgundy/90 text-white">
              <tr className="border-b hover:bg-gold/5 transition">
                <th className="p-3 text-left">Name</th>
                <th>Email</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b._id} className="border-t ">
                  <td className="p-3">{b.name}</td>
                  <td>{b.email}</td>
                  <td>{b.service}</td>
                  <td>{b.date}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        b.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : b.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}>
                      {b.status}
                    </span>
                  </td>

                  <td className="flex gap-2 p-2">
                    <button
                      onClick={() => updateStatus(b._id, "Confirmed")}
                      className="px-4 py-2 rounded-full bg-green-500 text-white text-xs font-semibold hover:scale-105 transition ">
                      Confirm
                    </button>

                    <button
                      onClick={() => updateStatus(b._id, "Cancelled")}
                      className="
px-4
py-2
rounded-full
bg-red-500
text-white
text-xs
font-semibold
hover:scale-105
transition
">
                      Cancel
                    </button>

                    <button
                      onClick={() => deleteBooking(b._id)}
                      className="
px-4
py-2
rounded-full
bg-charcoal
text-white
text-xs
font-semibold
hover:scale-105
transition
">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ANALYTICS */}
      <div
        className="
mt-16
bg-white
rounded-3xl
border
border-gold/10
shadow-lg
p-8
">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-4xl font-bold">
            Booking
            <span className="text-burgundy"> Analytics</span>
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-gold to-burgundy mx-auto mt-3"></div>
        </div>
        <div className="h-[350px] mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                outerRadius={140}
                innerRadius={70}
                paddingAngle={5}
                label>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <button className="bg-white border border-gold/10 rounded-3xl p-6 hover:-translate-y-2 hover:shadow-xl transition cursor-pointer">
            📅 View Bookings
          </button>

          <button
            onClick={() => {
              navigate("/gallery");
            }}
            className="bg-white border border-gold/10 rounded-3xl p-6 hover:-translate-y-2 hover:shadow-xl transition cursor-pointer">
            🖼 Manage Gallery
          </button>

          <button className="bg-white border border-gold/10 rounded-3xl p-6 hover:-translate-y-2 hover:shadow-xl transition cursor-pointer">
            👥 Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
