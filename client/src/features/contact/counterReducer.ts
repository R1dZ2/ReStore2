export const COUNTER_INCREMENT = "COUNTER_INCREMENT";
export const COUNTER_DECREMENT = "COUNTER_DECREMENT";

export interface CounterState {
  count: number;
  title: string;
}

const initialState: CounterState = {
  count: 0,
  title: "Contact Page",
};

export const increment = (amount = 1) => ({
  type: COUNTER_INCREMENT,
  payload: amount,
});

export const decrement = (amount = 1) => ({
  type: COUNTER_DECREMENT,
  payload: amount,
});

interface Action {
  type: string;
  payload: number;
}

export default function counterReducer(state = initialState, action: Action) {
  switch (action.type) {
    case COUNTER_INCREMENT:
      return { ...state, count: state.count + action.payload };
    case COUNTER_DECREMENT:
      return { ...state, count: state.count - action.payload };
    default:
      return state;
  }
}
