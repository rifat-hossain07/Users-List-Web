import { Link } from "react-router-dom";
import Button from "../Components/Button";
const Error = () => {
  return (
    <div className="hero min-h-screen bg-accent">
      <div className="hero-content flex-col ">
        <div className="card flex-shrink-0 w-2/5 shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="text-center space-y-5 ">
              <img src="https://i.ibb.co/Z8fPv2z/error.jpg" alt="" />
            </div>
          </div>
          <Link className="mx-auto mb-5" to="/">
            <Button text="Go Home" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
