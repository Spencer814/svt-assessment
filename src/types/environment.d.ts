export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      ROBOT_URL: string;
    }
  }
}