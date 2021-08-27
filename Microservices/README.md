# :gear: **Microservices Architecture**

Microservices Web App: https://ms-client-askmeanything.herokuapp.com/

The services that were implemented are:

* **Auth:** Register, Login, Logout
* **Questions:** The registered user can ask a question and browse all questions.
* **Answers:** The registered user can answer a question.
* **Statistics per day:** Both registered users and visitors can see how many questions were posted and how many answers were created per day.
* **Statistics per keyword:** Both registered users and visitors can see how many questions were posted per keyword.
* **User statistics:** Each registered user can see his contribution and his total questions and answers.
* **Event-bus:** All the services above "communicating" with each other through the event-bus. Every time a service posts, it also sends the new data to event-bus so that every service is "interested" in the new data can be updated.
*  **Client:** The front-end of the web app. It communicates with all the services (through axios posts) except the event-bus and doen't have a database.

## :boom: **What happens when a service is down or crashes**

In general all the new data is stored in event-bus's database.

When the service that was previously down is running again, it will be updated from the event bus.
