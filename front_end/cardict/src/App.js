import React, { useState } from "react";
import "./App.css";


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

    // Check if any field is empty
    for (const field in formData) {
      if (formData[field] === "") {
        alert("Please enter all values");
        return; // Stop the form from being submitted
      }
    }

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

    const API_URL = 'http://192.168.1.6:5000/predict'; // Update with your API URL

    try {
      const response = await fetch(API_URL, {
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
    <div className="container">
      <h1 className="title">Heart Disease Prediction</h1>
      <form className="form" onSubmit={handleSubmit}>
            {[
      { label: "Age", name: "age" },
      { label: "Sex (0 for Female, 1 for Male)", name: "sex" },
      { label: "Chest Pain Type (cp)", name: "cp" },
      { label: "Resting Blood Pressure (trestbps)", name: "trestbps" },
      { label: "Cholesterol Level (chol)", name: "chol" },
      { label: "Fasting Blood Sugar (fbs)", name: "fbs" },
      { label: "Resting Electrocardiographic Results (restecg)", name: "restecg" },
      { label: "Maximum Heart Rate (thalach)", name: "thalach" },
      { label: "Exercise Induced Angina (exang)", name: "exang" },
      { label: "ST Depression Induced by Exercise Relative to Rest (oldpeak)", name: "oldpeak" },
      { label: "Slope of Peak Exercise ST Segment (slope)", name: "slope" },
      { label: "Number of Major Vessels Colored by Fluoroscopy (ca)", name: "ca" },
      { label: "Thalassemia (thal)", name: "thal" },
    ].map((field) => (
      <div className="form-group" key={field.name}>
        <label>{field.label}:</label>
        <input
          className="form-input"
          type="number"
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
        />
      </div>
    ))}
    <div className="form-links"> 
          <a
            href="#"
            className="form-link-sample"
            onClick={(e) => {
              e.preventDefault();
              setFormData({
                age: 54,
                sex: 1,
                cp: 0,
                trestbps: 122,
                chol: 286,
                fbs: 0,
                restecg: 0,
                thalach: 116,
                exang: 1,
                oldpeak: 3.2,
                slope: 1,
                ca: 2,
                thal: 2,
              });
            }}
          >
            Sample Input - Predict No Heart Disease
          </a>
          <a
            href="#"
            className="form-link-sample"
            onClick={(e) => {
              e.preventDefault();
              setFormData({
                age: 49,
                sex: 1,
                cp: 2,
                trestbps: 118,
                chol: 149,
                fbs: 0,
                restecg: 0,
                thalach: 126,
                exang: 0,
                oldpeak: 0.8,
                slope: 2,
                ca: 3,
                thal: 2,
              });
            }}
          >
            Sample Input - Predict Heart Disease
          </a>
        </div>

      <button className="form-button" type="submit">Submit</button>
      </form>

      {prediction !== null && (
        <div className="prediction-container">
          <h3 className="prediction-text">
            Prediction: {prediction === 1 ? "Heart Disease" : "No Heart Disease"}
          </h3>
    </div>
  )}
</div>

  );
};

export default HeartDiseasePrediction;
