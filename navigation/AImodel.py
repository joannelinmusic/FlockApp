import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load the data
df = pd.read_csv('../CSV/data.csv')

# Data cleaning and preprocessing
df = df.dropna()  # Drop rows with missing values
df['date'] = pd.to_datetime(df['date'])  # Convert date column to datetime
df = pd.get_dummies(df)  # One-hot encode categorical columns

# Separate features (X) and target (y)
X = df.drop('target_column', axis=1)
y = df['target_column']

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale the data
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
