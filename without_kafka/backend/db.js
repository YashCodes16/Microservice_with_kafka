import { v4 as uuidv4 } from "uuid";

export const pay = async (cart, userId) => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
    //   reject("failed");
      resolve("success");
    }, 3000);
  });
  return promise;
};

export const createOrder = async (cart, userId) => {
  let id = uuidv4();
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(id);
    });
  }, 3000);

  return promise;
};

export const sendEmail = async (orderId, userId, emailResult) => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    });
  }, 3000);

  return promise;
};

export const logAnalytics = async (data, message) => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Analytic log created", message);
      resolve("success");
    }, 1000);
  });
  return promise;
};
