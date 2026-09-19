import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

function EditProfile() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        age: "",
        height: "",
        weight: "",
        bmi: "",
        bloodGroup: "",
        phone: ""
    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await API.get("/users/profile");

            setFormData({
                fullName: response.data.user.fullName || "",
                age: response.data.user.age || "",
                height: response.data.user.height || "",
                weight: response.data.user.weight || "",
                bmi: response.data.user.bmi || "",
                bloodGroup: response.data.user.bloodGroup || "",
                phone: response.data.user.phone || ""
            });

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.put(
                "/users/profile",
                formData
            );

            alert(response.data.message);

            navigate("/profile");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Profile Update Failed"
            );

        }

    };

    return (

        <DashboardLayout>

            <div className="container mt-4">

                <div className="card shadow p-4">

                    <h2 className="mb-4">
                        Edit Profile
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="fullName"
                            className="form-control mb-3"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="age"
                            className="form-control mb-3"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="height"
                            className="form-control mb-3"
                            placeholder="Height (cm)"
                            value={formData.height}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="weight"
                            className="form-control mb-3"
                            placeholder="Weight (kg)"
                            value={formData.weight}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            step="0.1"
                            name="bmi"
                            className="form-control mb-3"
                            placeholder="BMI"
                            value={formData.bmi}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="bloodGroup"
                            className="form-control mb-3"
                            placeholder="Blood Group"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="phone"
                            className="form-control mb-4"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Save Profile
                        </button>

                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default EditProfile;