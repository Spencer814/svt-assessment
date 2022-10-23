interface Coordinates {
  x: number;
  y: number;
}

interface Robot {
  robotId: string | number;
  batteryLevel: number;
}

// Robot structure
interface IRobot extends Coordinates, Robot {}

// Load structure
interface ILoad extends Coordinates {
  loadId: string | number;
}

// Result structure
interface IResult extends Robot {
  distanceToGoal: number;
}

export { IRobot, ILoad, IResult };
