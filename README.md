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

## Features that I would add next

* I would like to add something to use as a fallback in case the URL used to retrieve the list of robots is down
  * There was another endpoint in the instructions for this assessment, so that could potentially be backup
* A unit test of some kind would be useful, especially if this API would grow.
* Documentation using OpenAPI
  * This was written in Typescript, but having docs available may be useful for future developers (or myself eventually)
* My aim was to use very few libraries for this assessment but `axios` could have been used to make the call to retrieve the robots. In addition, a framework like `express` could be used if any additional routes were added.
* I thought about whether or not having logs of the load requests would be useful in certain events
  * If the closest robots happend to have low battery levels
  * If a load retrieved by a robot happens to have been in the wrong location

## Notes

This was a fun exercise and I would love to tackle problems like this on a daily basis. I would like to know more about how the robots operate because that could lead to some additional features or enhancements.
