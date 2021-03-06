import { ACTION_LOAD, ACTION_NOTIFY, ACTION_DONE } from './types.js';

export const enqueueDynamicArray = (functionArray) => {
  let p = Promise.resolve();
  for (let i = 0; i < functionArray.length; i += 1) {
    p = p.then(functionArray[i]);
  }
  return p;
};

export const actionNotify = (payload) => ({
  type: ACTION_NOTIFY,
  payload
});

export const errorReport = (error) => {
  let message = (error.response && error.response.data.message && error.response.data.message.name)
    || (error.response && error.response.data && error.response.data.message)
    || error.message;

  message = message === 'MongoError' ? 'Unable to connect to database' : message;

  return actionNotify(message);
};

export const actionLoad = () => ({
  type: ACTION_LOAD
});

export const actionDone = () => ({
  type: ACTION_DONE
});

export const timeOut = { timeout: 30000 };

export const isDeleted = (item) => item.isDeleted === false;

export const filterContent = (array) => (array === undefined || typeof array !== 'object' ? [] : array.filter(isDeleted));
