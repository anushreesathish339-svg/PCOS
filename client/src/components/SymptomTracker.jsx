import { useEffect, useState } from "react";
import { addSymptoms, getSymptoms, deleteSymptoms } from "../services/symptomService";
import { FaTrash } from "react-icons/fa";

const symptomLabels = {
    acne: "Acne",
    hairFall: "Hair fall",
    weightGain: "Weight gain",
    fatigue: "Fatigue",
    irregularPeriods: "Irregular periods",
    pelvicPain: "Pelvic pain",
    breastTenderness: "Breast tenderness",
    nippleSoreness: "Nipple soreness",
};

function SymptomTracker() {
    const emptyForm = {

        mood: "",

        acne: false,

        hairFall: false,

        weightGain: false,

        fatigue: false,

        irregularPeriods: false,

        pelvicPain: false,

        breastTenderness: false,

        nippleSoreness: false,

        bodyTemperature: ""

    };

    const [formData, setFormData] = useState(emptyForm);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [isSaving, setIsSaving] = useState(false);
    const [savedSymptoms, setSavedSymptoms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadSymptoms = async () => {
        try {
            const response = await getSymptoms();
            const records =
                response.data.data ||
                response.data.symptoms ||
                (Array.isArray(response.data) ? response.data : []);
            setSavedSymptoms(records);
        } catch (error) {
            setStatus({
                type: "error",
                message:
                    error.response?.data?.message ||
                    "Saved symptoms could not be loaded.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this symptom log?")) {
            return;
        }
        try {
            await deleteSymptoms(id);
            setStatus({
                type: "success",
                message: "Symptom log deleted successfully."
            });
            await loadSymptoms();
        } catch (error) {
            setStatus({
                type: "error",
                message: error.response?.data?.message || "Failed to delete symptom log."
            });
        }
    };

    useEffect(() => {
        getSymptoms()
            .then((response) => {
                const records =
                    response.data.data ||
                    response.data.symptoms ||
                    (Array.isArray(response.data) ? response.data : []);
                setSavedSymptoms(records);
            })
            .catch((error) => {
                setStatus({
                    type: "error",
                    message:
                        error.response?.data?.message ||
                        "Saved symptoms could not be loaded.",
                });
            })
            .finally(() => setIsLoading(false));
    }, []);

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setStatus({ type: "", message: "" });
        setIsSaving(true);

        try {
            const storedUser =
                localStorage.getItem("user") ||
                sessionStorage.getItem("user");
            const user = storedUser ? JSON.parse(storedUser) : null;

            if (!user?._id && !user?.id) {
                throw new Error("Your login session has no user information. Please log out and sign in again.");
            }

            await addSymptoms({
                ...formData,
                userId: user._id || user.id,
                bodyTemperature: formData.bodyTemperature
                    ? Number(formData.bodyTemperature)
                    : null,
            });

            setFormData(emptyForm);
            setStatus({
                type: "success",
                message: "Your symptoms were saved successfully.",
            });
            await loadSymptoms();

        } catch (error) {
            setStatus({
                type: "error",
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Symptoms could not be saved. Please try again.",
            });
        } finally {
            setIsSaving(false);

        }

    };

    return (

        <div className="health-grid symptom-page-grid">
        <div className="health-card">

            <h2>Symptom Tracker</h2>

            <form className="symptom-form" onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="mood"
                    placeholder="Mood"
                    value={formData.mood}
                    onChange={handleChange}
                />

                <label>
                    <input
                        type="checkbox"
                        name="acne"
                        checked={formData.acne}
                        onChange={handleChange}
                    />
                    Acne
                </label>

                <label>
                    <input
                        type="checkbox"
                        name="hairFall"
                        checked={formData.hairFall}
                        onChange={handleChange}
                    />
                    Hair Fall
                </label>

                <label>
                    <input
                        type="checkbox"
                        name="weightGain"
                        checked={formData.weightGain}
                        onChange={handleChange}
                    />
                    Weight Gain
                </label>

                <label>
                    <input
                        type="checkbox"
                        name="fatigue"
                        checked={formData.fatigue}
                        onChange={handleChange}
                    />
                    Fatigue
                </label>

                <label>
                    <input
                        type="checkbox"
                        name="irregularPeriods"
                        checked={formData.irregularPeriods}
                        onChange={handleChange}
                    />
                    Irregular Periods
                </label>

                <label>
                    <input
                        type="checkbox"
                        name="pelvicPain"
                        checked={formData.pelvicPain}
                        onChange={handleChange}
                    />
                    Pelvic Pain
                </label>

                <label>
                    <input
                        type="checkbox"
                        name="breastTenderness"
                        checked={formData.breastTenderness}
                        onChange={handleChange}
                    />
                    Breast Tenderness
                </label>

                <label>
                    <input
                        type="checkbox"
                        name="nippleSoreness"
                        checked={formData.nippleSoreness}
                        onChange={handleChange}
                    />
                    Nipple Soreness
                </label>

                <input
                    type="number"
                    name="bodyTemperature"
                    placeholder="Body Temperature"
                    value={formData.bodyTemperature}
                    onChange={handleChange}
                />

                <button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Symptoms"}
                </button>

                {status.message && (
                    <p className={`symptom-status ${status.type}`} role="status">
                        {status.message}
                    </p>
                )}

            </form>

        </div>

        <div className="health-card symptom-history">
            <h2>Saved symptoms</h2>

            {isLoading ? (
                <p className="health-empty">Loading your symptoms...</p>
            ) : savedSymptoms.length === 0 ? (
                <p className="health-empty">No symptoms saved yet.</p>
            ) : (
                savedSymptoms.map((record) => {
                    const activeSymptoms = Object.entries(symptomLabels)
                        .filter(([key]) => record[key])
                        .map(([, label]) => label);

                    return (
                        <article
                            className="symptom-record"
                            key={record._id || record.createdAt}
                        >
                            <div className="symptom-record-heading">
                                <strong>{record.mood || "Mood not recorded"}</strong>
                                <div className="d-flex align-items-center gap-2">
                                    <time>
                                        {record.createdAt
                                            ? new Date(record.createdAt).toLocaleDateString()
                                            : "Saved"}
                                    </time>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-link text-danger p-0"
                                        onClick={() => handleDelete(record._id)}
                                        title="Delete log"
                                        style={{ border: "none", background: "none", cursor: "pointer" }}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            {record.bodyTemperature != null && (
                                <p>Temperature: {record.bodyTemperature}°</p>
                            )}
                            <div className="symptom-tags">
                                {activeSymptoms.length ? (
                                    activeSymptoms.map((label) => (
                                        <span key={label}>{label}</span>
                                    ))
                                ) : (
                                    <span>No selected symptoms</span>
                                )}
                            </div>
                        </article>
                    );
                })
            )}
        </div>
        </div>

    );

}

export default SymptomTracker;
