import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await API.get("/users/profile");
      setProfile(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your profile? This will permanently delete all your predictions, symptoms, and health records, and log you out. This action cannot be undone."
      )
    ) {
      try {
        await API.delete("/users/delete");
        localStorage.clear();
        sessionStorage.clear();
        alert("Your profile has been deleted successfully.");
        navigate("/register");
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.message || "Failed to delete profile.");
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-center py-3">
        <div
          className="card border-0 shadow-sm rounded-4 p-4 text-start bg-white"
          style={{ maxWidth: "680px", width: "100%" }}
        >
          <div className="d-flex align-items-center gap-3 border-bottom pb-3 mb-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm"
              style={{
                width: "48px",
                height: "48px",
                fontSize: "18px",
                background: "linear-gradient(135deg, #bca8ed, #f1a9c7)",
              }}
            >
              {profile.fullName?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h5 className="fw-bold m-0 text-dark" style={{ fontSize: "16px" }}>
                {profile.fullName || "User Profile"}
              </h5>
              <small className="text-muted">PCOS Care Member</small>
            </div>
          </div>

          <div className="list-group list-group-flush mb-3">
            <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-bottom">
              <span className="text-secondary small fw-semibold">1. Email</span>
              <span className="fw-medium text-dark small">{profile.email || "-"}</span>
            </div>

            <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-bottom">
              <span className="text-secondary small fw-semibold">2. Phone</span>
              <span className="fw-medium text-dark small">{profile.phone || "-"}</span>
            </div>

            <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-bottom">
              <span className="text-secondary small fw-semibold">3. Age</span>
              <span className="fw-medium text-dark small">{profile.age ? `${profile.age} years` : "-"}</span>
            </div>

            <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-bottom">
              <span className="text-secondary small fw-semibold">4. Height</span>
              <span className="fw-medium text-dark small">{profile.height ? `${profile.height} cm` : "-"}</span>
            </div>

            <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-bottom">
              <span className="text-secondary small fw-semibold">5. Weight</span>
              <span className="fw-medium text-dark small">{profile.weight ? `${profile.weight} kg` : "-"}</span>
            </div>

            <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-bottom">
              <span className="text-secondary small fw-semibold">6. BMI Index</span>
              <span className="fw-medium text-dark small">{profile.bmi || "-"}</span>
            </div>

            <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2 border-bottom">
              <span className="text-secondary small fw-semibold">7. Blood Group</span>
              <span className="fw-medium text-dark small">{profile.bloodGroup || "-"}</span>
            </div>
          </div>

          <div className="d-flex gap-2 pt-2">
            <button
              className="btn btn-sm btn-primary px-3"
              onClick={() => navigate("/edit-profile")}
            >
              Edit Profile
            </button>
            <button
              className="btn btn-sm btn-outline-danger px-3"
              onClick={handleDeleteAccount}
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
