from flask import Flask, request, jsonify
import joblib
import pandas as pd
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the pre-trained model
model = joblib.load('final_rf_model.pkl')

# Load scaler (use the same scaler used during training)
scaler = StandardScaler()

# Predefined columns from the training data (after one-hot encoding)
training_columns = ['age', 'trestbps', 'chol', 'fbs', 'thalach', 'oldpeak', 'sex_0', 'sex_1', 'cp_0', 'cp_1', 
                    'cp_2', 'cp_3', 'restecg_0', 'restecg_1', 'restecg_2', 'exang_0', 'exang_1', 'slope_0', 
                    'slope_1', 'slope_2', 'ca_0', 'ca_1', 'ca_2', 'ca_3', 'ca_4', 'thal_0', 'thal_1', 'thal_2', 
                    'thal_3']

# Define the route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Get input data from request
    input_data = request.json

    # Convert input data to DataFrame
    new_data_df = pd.DataFrame([input_data])
    print("New data:", new_data_df)
    print("New data shape:", new_data_df.shape)
    

    # One-hot encode categorical variables
    new_data_encoded = pd.get_dummies(new_data_df, columns=['sex', 'cp', 'restecg', 'exang', 'slope', 'ca', 'thal'])

    # Scale the features
    features_to_scale = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
    new_data_encoded[features_to_scale] = scaler.fit_transform(new_data_encoded[features_to_scale])

    # Align the columns (fill missing ones with 0)
    new_data_encoded = new_data_encoded.reindex(columns=training_columns, fill_value=0)

    # Make prediction
    prediction = model.predict(new_data_encoded)
    print("Prediction:", prediction)
    # Return prediction as JSON response
    return jsonify({'prediction': int(prediction[0])})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
