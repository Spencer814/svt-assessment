# SVT Robotics - Take Home Recruiting Assessment

This assessment was written in Typescript and contains the following dependencies:
    *`@types/node`
    *`dotenv`
    *`typescript`
    *`ts-node`

## Instructions

1: Clone this repo and run `yarn` to install dependencies
2: Run `yarn start`
3: Make a POST request to **`https://localhost:5001/api/robots/closest/`** using a JSON payload for a load
    example:

```json
{
    "loadId": 231, //Arbitrary ID of the load which needs to be moved.
    "x": 5, //Current x coordinate of the load which needs to be moved.
    "y": 3 //Current y coordinate of the load which needs to be moved.
}
```
