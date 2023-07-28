import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render } from "@testing-library/react";
import App from "../App";

const mockStore = configureStore([]);

test('renders with mock reducer', () => {
  const store = mockStore({
    app: {
      requestAnimalList: {
        loading: false,
        data: null,
        error: null,
      },
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/get ready/i)).toBeInTheDocument();
});
