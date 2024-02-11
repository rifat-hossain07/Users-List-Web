/* eslint-disable react/prop-types */
const Button = ({ text }) => {
  return (
    <div>
      <button className="btn  bg-accent text-black btn-wide">{text}</button>
    </div>
  );
};

export default Button;
