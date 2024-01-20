import json
import flask
import prediction
import heatmap
import db


app = flask.Flask(__name__)

"""

expected body:

{
   is_prediction: boolean
   type: array of strings
   start_date: unix timestamp
   end_date: unix timestamp
   time_of_day: string
}
"""


@app.route('/generate', methods=['POST'])
def generate():
    body = flask.request.get_json()
    print(body)
    if body is None:
        return flask.jsonify({'message': 'Invalid request'}), 400
    
    
    if body['is_prediction'] is True:
        pred_date = prediction.get_prediction(body['type'], body['start date'], body['time_of_day'])
        return heatmap.get_heatmap_data(pred_date), 200

    else:
        data = db.find(body['type'], body['start_date'], body['end_date'], body['time_of_day'])
        return heatmap.get_heatmap_data(data), 200
    

        
    
    


if __name__ == '__main__':
    app.run(debug=True)