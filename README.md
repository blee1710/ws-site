# WSShare

WSShare is a simple RESTful web application I made for practice. It utilises MongoDB, Express, NodeJS (so not quite MEAN) and ejs as the view engine.

It is currently live [here](https://murmuring-waters-53885.herokuapp.com). Have a play around with the (test/test) account!

## Installation

To run it locally

```bash
npm install
```

Then create a .env file in the root directory with two env variables 

```python
CONNECTION_STRING= // your mongodb connection string
SECRET= // a secret key for express-session
```
Please check the [MongoDB documentation](https://docs.mongodb.com/guides/server/drivers/) for details about the connection string if you are unsure.

Then
```bash
npm run dev
```
To get started!

## To be added/updated

- An update to Bootstrap 4
- More details in the Webseries model
- UI enhancements

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
