import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from mpl_toolkits.mplot3d import Axes3D
from sklearn.cluster import MiniBatchKMeans


def remove_outliers(df,columns,n_std):
    for col in columns:
        print('Removing outliers in column: {}'.format(col))
        
        mean = df[col].mean()
        sd = df[col].std()
        
        df = df[(df[col] <= mean+(n_std*sd))]
        
    return df
def plot_dataframe(df, color_map, numclusters):
    '''Plotting the Clusters'''
    fig = plt.figure(figsize=(10, 10))
    ax = plt.axes(projection='3d')
    ax.scatter3D(df['Distance'],df['True Quantity'], df['Rate per litre'], c= color_map)
    plt.xlabel('Distance (Normalized)')
    plt.ylabel('True Quantity (Normalized)')
    ax.set_zlabel(r'Rate per Litre (Normalized)', labelpad=30)
    plt.savefig("usedOilDataset_clusters"+str(numclusters)+".png")

df = pd.read_csv('usedOilDataset.csv')
cols = ['True Quantity','Distance', 'Rate per litre']
df = df[cols]

'''Formatting the csv data to extract relevant information into the dataframe'''
# get names of indexes for which address cannot be found by google maps API or gave multiple results on Google Maps
index_names = df[ (df['Distance'] == 'Error: ZERO_RESULTS') | (df['Distance'] == 'Error: NOT_FOUND') ].index
# drop these row indexes from dataFrame
df.drop(index_names, inplace = True)
# drop rows in dataframe which have value as NaN
df.dropna(subset=['Distance'], inplace=True) 
# To reset the indices
df = df.reset_index(drop = True)
# converting each value of column to a string
df[cols] = df[cols].apply(pd.to_numeric, errors='coerce', axis=1)


'''Normalizing the dataset'''
for col in df.columns:
    df[col] = (df[col] - df[col].mean())/df[col].std()

'''Remove the outliers'''
df = remove_outliers(df,cols,3)

'''Visualizing the data'''
fig = plt.figure(figsize=(10, 10))
ax = plt.axes(projection='3d')
ax.scatter3D(df['Distance'],df['True Quantity'], df['Rate per litre'])
plt.xlabel('Distance (Normalized)')
plt.ylabel('True Quantity (Normalized)')
ax.set_zlabel(r'Rate per Litre (Normalized)', labelpad=30)

plt.savefig("usedOilDataset.png")

'''Performing Clustering on the Dataset'''
X = df[cols].copy()
kmeans2 = MiniBatchKMeans(n_clusters=2,random_state=0,batch_size=6,max_iter=10,n_init="auto").fit_predict(X)
kmeans3 = MiniBatchKMeans(n_clusters=3,random_state=0,batch_size=6,max_iter=10,n_init="auto").fit_predict(X)

'''Plotting the clustered data'''
print("Plotting the data")
plot_dataframe(df, kmeans2, 2)
plot_dataframe(df, kmeans3, 3)


