import fs from 'fs';
import { ServerResponse, IncomingMessage } from 'http';
import https from 'https';
import path from 'path';

import { IRobot, ILoad, IResult } from './models';

import 'dotenv/config';

const { ROBOT_URL } = process.env;

/**
 * Retrieve a list of robots in the SVT fleet
 */
async function getRobots(): Promise<string> {
  return new Promise((resolve) => {
    let data = '';

    https.get(ROBOT_URL, res => {
      res.on('data', chunk => { data += chunk });
      res.on('end', () => { resolve(data); });
    });
  })
}

/**
 * Find the robot with the most battery remaining that is closest to the load
 */
async function findClosest(req: IncomingMessage, res: ServerResponse) {
  let data = '';

  try {
    // List of robots
    const robots: IRobot[] = JSON.parse(await getRobots());

    req.on('data', (chunk) => { data += chunk.toString(); });
    req.on('end', () => {
      // Load to be delivered
      const load: ILoad = JSON.parse(data);

      // Sorts the closest robots by hightest battery level and returns the first one
      const closestRobot: IResult = robots.reduce((closestRobots: IResult[], { x, y, ...robot }) => {
        // Calculate the distance between the robot and the load
        const distanceToGoal = Math.round(Math.sqrt(Math.pow(x - load.x, 2) + Math.pow(y - load.y, 2)) * 10) / 10;
        // Return robots that are within 10 units of the load
        return distanceToGoal <= 10 ? [...closestRobots, { ...robot, distanceToGoal }] : closestRobots;
      }, []).sort((a, b) => b.batteryLevel - a.batteryLevel)[0];

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          success: true,
          message: closestRobot,
        })
      );
    });
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: false,
        message: new Error('Error retrieving robots within 10 units of the load').message,
      })
    );
  }
}

/**
 * Error response for all other requests
 */
function handleBadRequest(req: IncomingMessage, res: ServerResponse) {
  let data = '';

  req.on('data', (chunk) => { data += chunk.toString(); });
  req.on('end', () => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: false,
        message: new Error('Invalid request').message,
      })
    );
  });
}

export { findClosest, handleBadRequest };
