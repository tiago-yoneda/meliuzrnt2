interface IAction {
  type: string;
  payload: {
    data: string;
  };
}

export const getToken = (data: string): IAction => {
  return {
    type: 'SET_TOKEN',
    payload: {
      data,
    },
  };
};
