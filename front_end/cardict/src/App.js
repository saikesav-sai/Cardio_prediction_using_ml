import React, { useState } from "react";

const HeartDiseasePrediction = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputData = {
      age: formData.age,
      sex: formData.sex,
      cp: formData.cp,
      trestbps: formData.trestbps,
      chol: formData.chol,
      fbs: formData.fbs,
      restecg: formData.restecg,
      thalach: formData.thalach,
      exang: formData.exang,
      oldpeak: formData.oldpeak,
      slope: formData.slope,
      ca: formData.ca,
      thal: formData.thal,
    };

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();
      setPrediction(data.prediction); // Assuming the response contains a "prediction" key
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div>
      <h1>Heart Disease Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Sex (0 for Female, 1 for Male):
          <input
            type="number"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Chest Pain Type (cp):
          <input
            type="number"
            name="cp"
            value={formData.cp}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Resting Blood Pressure (trestbps):
          <input
            type="number"
            name="trestbps"
            value={formData.trestbps}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Cholesterol Level (chol):
          <input
            type="number"
            name="chol"
            value={formData.chol}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Fasting Blood Sugar (fbs):
          <input
            type="number"
            name="fbs"
            value={formData.fbs}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Resting Electrocardiographic Results (restecg):
          <input
            type="number"
            name="restecg"
            value={formData.restecg}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Maximum Heart Rate (thalach):
          <input
            type="number"
            name="thalach"
            value={formData.thalach}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Exercise Induced Angina (exang):
          <input
            type="number"
            name="exang"
            value={formData.exang}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ST Depression Induced by Exercise Relative to Rest (oldpeak):
          <input
            type="number"
            name="oldpeak"
            value={formData.oldpeak}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Slope of Peak Exercise ST Segment (slope):
          <input
            type="number"
            name="slope"
            value={formData.slope}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Number of Major Vessels Colored by Fluoroscopy (ca):
          <input
            type="number"
            name="ca"
            value={formData.ca}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Thalassemia (thal):
          <input
            type="number"
            name="thal"
            value={formData.thal}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {prediction !== null && (
        <div>
          <h3>
            Prediction:{" "}
            {prediction === 1 ? "Heart Disease" : "No Heart Disease"}
          </h3>
        </div>
      )}
    </div>
  );
};

export default HeartDiseasePrediction;
