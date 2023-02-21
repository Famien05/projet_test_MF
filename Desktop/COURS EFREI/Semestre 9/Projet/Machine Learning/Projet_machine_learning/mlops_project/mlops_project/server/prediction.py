import ast
import nltk
import numpy as np
import pandas as pd
from gensim.models import Word2Vec
from nltk.tokenize import word_tokenize
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_score
from sklearn.metrics import mean_squared_error, r2_score



def process_and_remove_list_columns(df, columns):
    for column_name in columns:
        processed_values = []
        for i, row in df.iterrows():
            values = row[column_name]
            if not pd.isnull(values):
                values = ast.literal_eval(values)
                for value in values:
                    processed_values.append((i, value))
        processed_values = list(set(processed_values))
        df_processed = pd.DataFrame(processed_values, columns=['Index', column_name])
        df_pivot = df_processed.pivot(index='Index', columns=column_name, values=column_name)
        df_pivot.fillna(0, inplace=True)
        df_pivot = df_pivot.astype(bool).astype(int)
        prefix = "studio_" if column_name == "Studio" else "producer_"
        df_pivot.columns = [prefix + col for col in df_pivot.columns]
        df = df.join(df_pivot)
        df = df.drop(column_name, axis=1)
    return df

def preprocess(df):
    df.dropna(axis=0, inplace=True)
    df = process_and_remove_list_columns(df, ['Genre', 'Studio', 'Producer'])
    df["Synopsis_tokenized"] = df["Synopsis"].apply(word_tokenize)
    model = Word2Vec(df["Synopsis_tokenized"], window=5, min_count=1)
    df["Synopsis_vectorized"] = df["Synopsis_tokenized"].apply(lambda x: [sum(model.wv[word])/len(x) for word in x]).tolist()
    df = pd.get_dummies(df, columns=["Type"])
    corr = df.corr()
    high_corr = corr[((corr > 0.05) | (corr < -0.05)) & (corr < 1)]
    correlated_columns = {}
    for col in high_corr.columns:
        correlated_features = high_corr.columns[(~high_corr[col].isna())].tolist()
        correlated_features = list(set(correlated_features).difference(set(correlated_columns.keys())))
        correlated_columns[col] = correlated_features
    selected_features = correlated_columns["Rating"]
    for feature in selected_features.copy():
        correlated_correlated_features = high_corr[feature].abs().sort_values(ascending=False)
        features_to_select = correlated_correlated_features[(correlated_correlated_features > 0.1) & (correlated_correlated_features < 0.9)][:3].index.tolist()
        selected_features.extend(features_to_select)
    df = df.loc[:, np.unique(selected_features)]
    X = df.drop(columns=["Rating"])
    y = df["Rating"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    return X_train, X_test, y_train, y_test

def prediction(df):
    X_train, X_test, y_train, y_test = preprocess(df)
    regressor = LinearRegression()
    regressor.fit(X_train, y_train)
    y_pred = regressor.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    print(" R2 : ", r2)
    print(" mse : ", mse)
    return y_pred


#df = pd.read_csv("Anime_data.csv")
#prediction(df)
