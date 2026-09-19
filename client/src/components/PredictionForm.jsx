import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { predictPCOS } from "../services/predictionService";
function PredictionForm() {

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    bmi: "",
    cycleLength: "",
    bodyTemperature: "",
    lh: "",
    fsh: "",
    testosterone: "",
    insulin: "",
    amh: "",
    cycleRegularity: "",
    sexuallyActive: "",
    contraceptivePills: "",
    breastTenderness: "",
    nippleSoreness: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => {
      const next = { ...current, [name]: value };
      if (name === "weight" || name === "height") {
        const weight = Number(name === "weight" ? value : next.weight);
        const heightMetres = Number(name === "height" ? value : next.height) / 100;
        next.bmi = weight > 0 && heightMetres > 0
          ? (weight / (heightMetres ** 2)).toFixed(1)
          : "";
      }
      return next;
    });
    setError("");
  };
const handleSubmit = async (e) => {

    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {

        const storedUser =
            localStorage.getItem("user") ||
            sessionStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        const requestData = {

            userId: user?._id,

            Age: Number(formData.age),
            Weight: Number(formData.weight),
            Height: Number(formData.height),
            BMI: Number(formData.bmi),

            Cycle_Length: Number(formData.cycleLength),

            LH: Number(formData.lh),
            FSH: Number(formData.fsh),
            Testosterone: Number(formData.testosterone),
            Insulin: Number(formData.insulin),
            AMH: Number(formData.amh),

            Body_Temperature: Number(formData.bodyTemperature),

            Cycle_Regularity:
                formData.cycleRegularity === "Regular" ? 2 : 4,

            // These three fields are still required by the current ML model,
            // but they are no longer shown in the form per the requested UI.
            Weight_Gain: 0,

            Hair_Loss: 0,

            Acne: 0,

            Sexually_Active:
                formData.sexuallyActive === "Yes" ? 1 : 0,

            Contraceptive_Pills:
                formData.contraceptivePills === "Yes" ? 1 : 0,

            Breast_Tenderness:
                formData.breastTenderness === "Yes" ? 1 : 0,

            Nipple_Soreness:
                formData.nippleSoreness === "Yes" ? 1 : 0

        };

        const response = await predictPCOS(requestData);
        const modelResult = response.data?.result;
        const rawProbability = Number(modelResult?.probability);

        if (!modelResult || !Number.isFinite(rawProbability)) {
            throw new Error("The prediction service returned an invalid response.");
        }

        // The model returns a 0–1 probability; presentation components use
        // percentages throughout.
        const prediction = {
            ...modelResult,
            probability: Number(
                (rawProbability <= 1 ? rawProbability * 100 : rawProbability).toFixed(2)
            )
        };

        localStorage.setItem(
            "prediction",
            JSON.stringify({
                ...prediction,
                inputData: requestData,
                predictedAt: new Date().toISOString()
            })
        );

        navigate("/results");

    } catch (error) {
        setError(
            error.response?.data?.message ||
            error.message ||
            "Prediction failed. Please check that the prediction service is running."
        );
    } finally {
        setIsSubmitting(false);
    }

};

 return (
<form onSubmit={handleSubmit}>

<div className="container">

<h4 className="mb-4 text-primary">
Personal Information
</h4>

<div className="row">

<div className="col-md-6 mb-3">
<label className="form-label">Age</label>
<input
type="number"
name="age"
className="form-control"
value={formData.age}
onChange={handleChange}
min="12"
max="60"
required
/>
</div>

<div className="col-md-6 mb-3">
<label className="form-label">Weight (kg)</label>
<input
type="number"
name="weight"
className="form-control"
value={formData.weight}
onChange={handleChange}
min="25"
max="250"
step="0.1"
required
/>
</div>

<div className="col-md-6 mb-3">
<label className="form-label">Height (cm)</label>
<input
type="number"
name="height"
className="form-control"
value={formData.height}
onChange={handleChange}
min="100"
max="220"
step="0.1"
required
/>
</div>

<div className="col-md-6 mb-3">
<label className="form-label">BMI</label>
<input
type="number"
step="0.1"
name="bmi"
className="form-control"
value={formData.bmi}
readOnly
required
/>
<div className="form-text">Calculated automatically from weight and height.</div>
</div>

<div className="col-md-6 mb-3">
<label className="form-label">
Cycle Length
</label>

<input
type="number"
name="cycleLength"
className="form-control"
value={formData.cycleLength}
onChange={handleChange}
min="15"
max="90"
required
/>

</div>

<div className="col-md-6 mb-3">

<label className="form-label">
Body Temperature (°C)
</label>

<input
type="number"
step="0.1"
name="bodyTemperature"
className="form-control"
value={formData.bodyTemperature}
onChange={handleChange}
min="34"
max="42"
required
/>

</div>

</div>

<hr className="my-4"/>

<h4 className="mb-4 text-primary">
Hormonal Information
</h4>

<div className="row">

<div className="col-md-4 mb-3">

<label>LH (mIU/mL)</label>

<input
type="number"
step="0.1"
name="lh"
className="form-control"
value={formData.lh}
onChange={handleChange}
min="0"
max="200"
required
/>

</div>

<div className="col-md-4 mb-3">

<label>FSH (mIU/mL)</label>

<input
type="number"
step="0.1"
name="fsh"
className="form-control"
value={formData.fsh}
onChange={handleChange}
min="0"
max="200"
required
/>

</div>

<div className="col-md-4 mb-3">

<label>AMH (ng/mL)</label>

<input
type="number"
step="0.1"
name="amh"
className="form-control"
value={formData.amh}
onChange={handleChange}
min="0"
max="50"
required
/>

</div>

<div className="col-md-6 mb-3">

<label>Testosterone (ng/dL)</label>

<input
type="number"
step="0.1"
name="testosterone"
className="form-control"
value={formData.testosterone}
onChange={handleChange}
min="0"
max="300"
required
/>

</div>

<div className="col-md-6 mb-3">

<label>Fasting Insulin (µIU/mL)</label>

<input
type="number"
step="0.1"
name="insulin"
className="form-control"
value={formData.insulin}
onChange={handleChange}
min="0"
max="300"
required
/>

</div>

</div>

<hr className="my-4"/>
<h4 className="mb-4 text-primary">
Additional Information
</h4>

<div className="row">

<div className="col-md-6 mb-3">

<label className="form-label">
Cycle Regularity
</label>

<select
name="cycleRegularity"
className="form-select"
value={formData.cycleRegularity}
onChange={handleChange}
required
>

<option value="">Select</option>
<option value="Regular">Regular</option>
<option value="Irregular">Irregular</option>

</select>

</div>

<div className="col-md-6 mb-3">

<label className="form-label">
Sexually Active
</label>

<select
name="sexuallyActive"
className="form-select"
value={formData.sexuallyActive}
onChange={handleChange}
required
>

<option value="">Select</option>
<option value="Yes">Yes</option>
<option value="No">No</option>

</select>

</div>

<div className="col-md-6 mb-3">

<label className="form-label">
Contraceptive Pills
</label>

<select
name="contraceptivePills"
className="form-select"
value={formData.contraceptivePills}
onChange={handleChange}
required
>

<option value="">Select</option>
<option value="Yes">Yes</option>
<option value="No">No</option>

</select>

</div>

<div className="col-md-6 mb-3">

<label className="form-label">
Breast Tenderness
</label>

<select
name="breastTenderness"
className="form-select"
value={formData.breastTenderness}
onChange={handleChange}
required
>

<option value="">Select</option>
<option value="Yes">Yes</option>
<option value="No">No</option>

</select>

</div>

<div className="col-md-6 mb-3">

<label className="form-label">
Nipple Soreness
</label>

<select
name="nippleSoreness"
className="form-select"
value={formData.nippleSoreness}
onChange={handleChange}
required
>

<option value="">Select</option>
<option value="Yes">Yes</option>
<option value="No">No</option>

</select>

</div>

</div>

<div className="text-center mt-4">

{error && (
<div className="alert alert-danger text-start" role="alert">
{error}
</div>
)}

<div className="alert alert-info text-start">
<strong>How your data is used:</strong> values entered here are converted to numbers,
Yes/No answers become 1/0, and the complete feature set is sent securely to the
prediction API. The trained model returns a PCOS screening probability. This is
not a medical diagnosis.
</div>

<button
type="submit"
className="btn btn-primary btn-lg px-5"
disabled={isSubmitting}
>

{isSubmitting ? "Analysing…" : "Predict PCOS"}

</button>

</div>

</div>

</form>

);
}

export default PredictionForm;
