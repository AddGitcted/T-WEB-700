import "./Input.scss";

const Input = ({ label, ...props }) => {
  return (
    <div className="form__group field">
      <input {...props} className="form__field" required />
      <label className="form__label">{label}</label>
    </div>
  );
};
export default Input;
