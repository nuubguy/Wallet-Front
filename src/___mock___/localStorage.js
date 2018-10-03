export default () => {
  global.localStorage = {
    getItem: jest.fn((param) =>{
      if(param === 'accountId') {
        return "A00000001";
      }
      else{
        return "C00000001";
      }
    }),
    removeItem: jest.fn(),
    setItem: jest.fn(),
  };
};
