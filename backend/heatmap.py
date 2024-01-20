def get_heatmap_data(data):
    out = []
    for row in data:
        out.append([row['longitude'], row['latitude']])
    print(out)
    return out
