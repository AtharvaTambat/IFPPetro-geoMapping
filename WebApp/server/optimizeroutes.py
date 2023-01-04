import sys
import numpy as np
import pandas as pd
import math 
import pulp
import itertools
import gmaps
import googlemaps
import matplotlib.pyplot as plt
import time
from geopy import distance
pd.options.mode.chained_assignment = None  # default='warn'

from geopy.geocoders import Nominatim
geocoder = Nominatim(user_agent = 'IFP_WebApp')

from geopy.extra.rate_limiter import RateLimiter
geocode = RateLimiter(geocoder.geocode, min_delay_seconds = 1,   return_value_on_exception = None) 
# adding 1 second padding between calls

# The program accepts address list in the following manner
# address_depot#address1#address2 etc.
address_list = sys.argv[3].split('#')

# Inputs a string of volumes of used oil to be picked up from each location except the depot
volume_list = sys.argv[4].split('#')

# customer count ('0' is depot) 
customer_count = len(address_list)  # saves the number of locations

# the number of vehicle
vehicle_count = int(sys.argv[1])

# the capacity of vehicle
vehicle_capacity = int(sys.argv[2])

# fix random seed
np.random.seed(seed=779)

latitude_list = []
longitude_list = []

for i in range(customer_count):
    # after initiating geocoder
    location = geocode(address_list[i])
    # returns location object with longitude, latitude and altitude instances
    latitude_list.append(location.latitude)
    longitude_list.append(location.longitude)

volume_list = ['0'] + volume_list # set volume of the deopt to 0
# print(address_list)
# print(volume_list)
# make dataframe which contains vending machine location and demand
df_list = [latitude_list, longitude_list, volume_list]
df = pd.DataFrame (df_list).transpose()
df.columns = ['latitude', 'longitude', 'demand']
df['demand'] = pd.to_numeric(df['demand'], errors='coerce')
# print (df)

# function for plotting on google maps
def _plot_on_gmaps(_df):
    
    _marker_locations = []
    for i in range(len(_df)):
        _marker_locations.append((_df['latitude'].iloc[i],_df['longitude'].iloc[i]))
    
    _fig = gmaps.figure()
    _markers = gmaps.marker_layer(_marker_locations)
    _fig.add_layer(_markers)

    return _fig

# function for calculating distance between two pins
def _distance_calculator(_df):
    
    _distance_result = np.zeros((len(_df),len(_df)))
    _df['latitude-longitude'] = '0'
    for i in range(len(_df)):
        _df['latitude-longitude'].iloc[i] = str(_df.latitude[i]) + ',' + str(_df.longitude[i])
    
    for i in range(len(_df)):
        for j in range(len(_df)):
            # Currently calculates the shortest distance along the surface of earth
            _distance_result[i][j] = distance.distance((_df.latitude[i],_df.longitude[i]),(_df.latitude[j], _df.longitude[j])).km
    
    return _distance_result

distance = _distance_calculator(df)
plot_result = _plot_on_gmaps(df)
plot_result


# solve with pulp
for vehicle_count in range(1,vehicle_count+1):
    
    # definition of LpProblem instance
    problem = pulp.LpProblem("CVRP", pulp.LpMinimize)


    # definition of variables which are 0/1
    x = [[[pulp.LpVariable("x%s_%s,%s"%(i,j,k), cat="Binary") if i != j else None for k in range(vehicle_count)]for j in range(customer_count)] for i in range(customer_count)]

    # add objective function
    problem += pulp.lpSum(distance[i][j] * x[i][j][k] if i != j else 0
                          for k in range(vehicle_count) 
                          for j in range(customer_count) 
                          for i in range (customer_count))

    # constraints
    # foluma (2)
    for j in range(1, customer_count):
        problem += pulp.lpSum(x[i][j][k] if i != j else 0 
                              for i in range(customer_count) 
                              for k in range(vehicle_count)) == 1 

    # foluma (3)
    for k in range(vehicle_count):
        problem += pulp.lpSum(x[0][j][k] for j in range(1,customer_count)) == 1
        problem += pulp.lpSum(x[i][0][k] for i in range(1,customer_count)) == 1

    # foluma (4)
    for k in range(vehicle_count):
        for j in range(customer_count):
            problem += pulp.lpSum(x[i][j][k] if i != j else 0 
                                  for i in range(customer_count)) -  pulp.lpSum(x[j][i][k] for i in range(customer_count)) == 0

    #foluma (5)
    for k in range(vehicle_count):
        problem += pulp.lpSum(df.demand[j] * x[i][j][k] if i != j else 0 for i in range(customer_count) for j in range (1,customer_count)) <= vehicle_capacity 


    # fomula (6)
    subtours = []
    for i in range(2,customer_count):
         subtours += itertools.combinations(range(1,customer_count), i)

    for s in subtours:
        problem += pulp.lpSum(x[i][j][k] if i !=j else 0 for i, j in itertools.permutations(s,2) for k in range(vehicle_count)) <= len(s) - 1

    
    # print vehicle_count which needed for solving problem
    # print calculated minimum distance value
    if problem.solve(pulp.PULP_CBC_CMD(msg = 0)) == 1:

        ###### visualization : plotting with matplolib  ######
        plt.figure(figsize=(8,8))
        for i in range(customer_count):    
            if i == 0:
                plt.scatter(df.latitude[i], df.longitude[i], c='green', s=200)
                plt.text(df.latitude[i], df.longitude[i], "depot", fontsize=12)
            else:
                plt.scatter(df.latitude[i], df.longitude[i], c='orange', s=200)
                plt.text(df.latitude[i], df.longitude[i], str(df.demand[i]), fontsize=12)

        l = []
        for i in range(0, vehicle_count+1):
            l.append(tuple(np.random.choice(range(0, 2), size=3)))

        for k in range(vehicle_count):
            for i in range(customer_count):
                for j in range(customer_count):
                    if i != j and pulp.value(x[i][j][k]) == 1:
                        plt.plot([df.latitude[i], df.latitude[j]], [df.longitude[i], df.longitude[j]], c=l[k])
        
        plt.savefig("optimizedroutes.jpg")

        print('{','\"trucks\":', vehicle_count,",",'\"distance\":', pulp.value(problem.objective),'}')
        break

sys.stdout.flush()
        
        