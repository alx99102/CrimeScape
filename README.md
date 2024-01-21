## Inspiration
Our inspiration to create the app about crime statistics in Montreal stemmed from a shared sense of responsibility and a strong desire to enhance the safety and well-being of our community. Understanding the transformative power of accessible information, we saw an opportunity to not only clarify and demystify crime data but also to empower our fellow residents with knowledge and awareness. This project transcends the realm of a mere technological endeavor; it is a testament to our commitment to harnessing innovation for the greater good. By pooling our skills and passion, we are not just crafting a useful tool – we are forging a beacon of awareness and a catalyst for positive change. Through our collaborative efforts, we aim to contribute to a safer, more connected Montreal, where information serves as a shield and a unifying force for its people. (This message has been co-authored by ChatGPT)

## What it does
CrimeScape is an app that can help anyone visualize the current and past crime rates in Montreal, as well as forecasting future crime rates in the city. Using open data provided by the city, we provide a heatmap visualization of where crimes occur, with user choice on what crimes to visualize, the time of day it occurs in and the date range the crime occured in. Due to time constraints, the future time predictions are mostly generated from random noise over crime stats from previous years, but they also cover the prediction data from our model.

## Significant region prediction
Our initial idea was ambitious, we planned to implement newly conducted research of graph neural networks in a spatiotemporal setting. Our goal was to conduct time series forecasting of crime rates on the island of Montreal. Although this seemed possible with the current dataset, its implementation was quite challenging. Recent research conducted in 2021 titled "Crime Prediction with Graph Neural Networks and Normal Distributions" by Selim Furkan Tekin and Suleyman S. Kozatwas our first resource in understanding and tackling this problem. Firstly, when constructing graph neural networks it is vital in understanding your the outline of the problem based on the dataset, as node and edge features have to be planned out and designed beforehand which was a mistake our group made when tackling this problem. Tekin and Kozatwas split the city in an I X J cells which represents some longitude and latitude similarly to us. They then transformed these cells into regions where each region contained some cluster of cells. Each cell will have a matrix to represent the crimes that occurred in that region at some time slot.  This set up is very methodical as the nodes of the graphs and edges are fixed all that changes are the features or rather the probabilities of crimes being committed in a region. This would have been the best way to structure the problem; however, due to the 24 hour time period constructing this complicated of a model to handle this type of data seemed to be unrealistic as the competition progressed. 

Instead we opted to forecast edge labels which contained data such as longitude latitude and a temporal aspect. When structuring the graph there are two distinct labels for the nodes time, and location which is represented by longitude and latitude. All times and location nodes were connected by edges which represent the location and time a crime occurred. From here the model turns into a classification problem where it attempts to predict the feature representation of an edge label. From this prediction a longitude and latitude can be extracted from it. This geolocation represents the most significant feature in the network.

## The Model
The model can be broken down into three types of layer:
-**SAGEConv**
This layer acts as a convolutional layer than performs significantly better or large networks, which was highlighted in "Inductive Representation Learning on Large Graphs" by William L. Hamilton, Rex Ying, Jure Leskovec. From our personal testing training and test accuracy increased by 12 percent over 100 epochs. 
-**BatchNormalization**
Enables stability in training and convergence
-**Dropout**
Prevents overfitting of the network

The train test validation split was conducted through a Random link split.

This validifies the output as: The split is performed such that the training split does not include edges in validation and test splits; and the validation split does not include edges in the test split.

Over multiple tests convergence was achieved quickly with no deviations in results over the course of development.

## How we built it
This application was built using various modern technologies, listed below:
### Backend
- **Python**: Flask web-app links the backend to frontend through a RESTFUL api.
- **Google App Engine**: Used to deploy the Flask back-end api (In Progress)
- **MongoDB Atlas**: Used to store the crime data pulled from the open data provided by the city of Montreal
- **Jupyter**: Used in development and training of our Graph AI model.
- **Google Cloud**: Google maps javascript API provides the ability to display the heatmaps we generate.

### Frontend
- **Cloudflare**: Used to deploy the React-App front end of our web-app (In Progress - out of our hands, passing by domain registrar)
- **.Tech Domains**: Acquired the crimescape.tech domain name to find our web-app's front-end portal
- **React**: We used the React javascript framework for our front-end user-interface and state-management code due to it's ease of use and familiarity within our team. 


## Challenges we ran into
- One of the most time-consuming challenges we faced was managing the state on the generated heatmaps to dynamically update them when any filter field would change. After many hours of perseverance, our team managed to figure out the correct implementation to get it working.
- Deployment was a pretty big challenge in terms of time, as we are writing this we are still waiting on Cloudflare to register our domain to the pages application we are hosting with them. We also ran into issues with CORS trying to communicate between our Flask app running on Google App engine and the React front end in Cloudflare, which we unfortunately won't have the time to correct during the 24 hours.
- We ran into a variety of challenges related to planning and executing the AI prediction model. The details of which can be found above. We continued and will continue in the coming weeks to strive to improve on our model and provide a high-volume accurate prediction of crime statistics in the city.

## Accomplishments that we're proud of
- Despite not achieving spatial temporal forecasting we still obtained meaningful predictions by treating the model as a classification problem.
- Incorporating heatmaps as a data-visualization with interactive filters.

## What we learned
- Graph Neural Networks was something none of us had ever worked with. We learned new modeling techniques and how to structure spatiotemporal data/problems.
- We also learned about the process to deploy applications to the cloud. We tried using Cloudflare and Google App Engine and had mixed success in doing so, but we learned what to do and what not to do in future projects/hacks.

## What's next
- We intend to finish this project's online deployment. We would like to have a publicly accessible site at our domain `crimescape.tech`.
- We also intend to improve on our Graph Neural Network model to output more datapoints on crime predictions.

## Works Cited
ChatGPT was consulted throughout the project for mainly debugging purposes. Some of our team members also have GitHub Copilot enabled in their code editors. 

The following article and notebook accompanied with it by Nick Titterton aided in developing the structure of the prediction model: https://medium.com/@nicktitt/predicting-crime-with-graph-neural-networks-ef89da99115d

**BibTeX**
@article{tekin2023crime,
  title={Crime prediction with graph neural networks and multivariate normal distributions},
  author={Tekin, Selim Furkan and Kozat, Suleyman Serdar},
  journal={Signal, Image and Video Processing},
  volume={17},
  number={4},
  pages={1053--1059},
  year={2023},
  publisher={Springer}
}
@article{hamilton2017inductive,
  title={Inductive representation learning on large graphs},
  author={Hamilton, Will and Ying, Zhitao and Leskovec, Jure},
  journal={Advances in neural information processing systems},
  volume={30},
  year={2017}
}

