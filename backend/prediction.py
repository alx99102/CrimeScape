import db
import random

def get_prediction(type, start_date, end_date, time_of_day):
    # Our model currently only returns the highest probability location, so this will be our highest weighted point
    out = [[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312],[-73.52861785,45.51986312]]
    # This is what 2 hours of sleep did to me

    # We will also return a randomized version of 2023 data to fill out the rest as a temporary solution until the model is completed.

    prev_data = db.find(type, start_date-31536000, end_date-31536000, time_of_day)
    print(prev_data)
    
    for row in prev_data:
        print(0.01*random.randrange(-1,2))
        out.append([row['longitude']+0.01*random.randrange(-1,2), row['latitude']+0.01*random.randrange(-1,2)])
    return out
    