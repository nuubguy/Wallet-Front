export default () => {
  global.localStorage = {
    getItem: jest.fn(),
    removeItem: jest.fn(),
    setItem: jest.fn(),
  };
};
