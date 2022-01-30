import React, { useContext  } from "react";
import ReactLoading from "react-loading";
import { Store } from "../../../store";

const Loading = ({ children }) => {
  const { globalState, setGlobalState } = useContext(Store);

  const isLoading = globalState.loading;

  if (isLoading) {
    return (
      <section className="flex justify-center items-center h-screen">
        <div>
          <ReactLoading
            type="spin"
            color="#ebc634"
            height="100px"
            width="100px"
            className="mx-auto"
          />
          <p className="text-center mt-3">{}</p>
        </div>
      </section>
    );
  } else {
    return <>{children}</>;
  }
};

export default Loading;