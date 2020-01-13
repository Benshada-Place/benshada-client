import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faLock,
  faUser,
  faEnvelope,
  faDollarSign
} from "@fortawesome/free-solid-svg-icons";

import "./BenshadaForm.css";

class BenshadaForm extends React.Component {
  onSubmit = formValues => this.props.onSubmitForm(formValues);

  makeid(length) {
    let result = "",
      characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return <small className="text-danger text-left w-100">{error}</small>;
    }
  }

  renderFieldIconPrepend(name) {
    return name === "password" || name === "confirmpassword" ? (
      <div className="input-group-append border-0 bg-light">
        <div className="input-group-text bg-white border-top-0 border-left-0 border-right-0 rounded-0 border-bottom-primary">
          <FontAwesomeIcon icon={faEye} />
        </div>
      </div>
    ) : (
      ""
    );
  }

  renderFieldIconHelper(icon, name) {
    return icon !== 0 || icon === undefined ? (
      <div className="input-group-prepend border-0 bg-light">
        <div className="input-group-text bg-white border-top-0 border-left-0 border-right-0 rounded-0 border-bottom-primary">
          {this.renderFieldIcon(name)}
        </div>
      </div>
    ) : (
      ""
    );
  }

  renderFieldIcon(name) {
    let { user } = this.props;

    switch (name) {
      case "name":
        return <FontAwesomeIcon icon={faUser} />;
      case "email":
        return <FontAwesomeIcon icon={faEnvelope} />;
      case "confirmpassword":
        return <FontAwesomeIcon icon={faLock} />;
      case "password":
        return <FontAwesomeIcon icon={faLock} />;
      default:
        return user.country === undefined ||
          user.country === null ||
          user.country === "" ? (
          <FontAwesomeIcon icon={faDollarSign} />
        ) : user.country === "Nigeria" ? (
          <span>&#8358;</span>
        ) : (
          <span>GHS</span>
        );
    }
  }

  renderSelectOptions(options) {
    return options.map((option, key) => {
      return (
        <option key={key} value={option}>
          {option}
        </option>
      );
    });
  }

  renderFormControl(
    input,
    name,
    label,
    varClass,
    type,
    options,
    className,
    meta,
    value
  ) {
    const { error, touched } = meta;
    className = `form-control bg-white border-left-0 border-right-0 border-top-0 rounded-0 ${className}`;

    let title = touched && error ? "error" : "",
      randString = this.makeid(5);
    label = (name => {
      switch (name) {
        case "email":
          return "e.g: example@gmail.com";
        case "confirmpassword":
          return "Same as password";
        case "street":
          return "e.g: 123 Right Avenue";
        case "state":
          return "e.g: Lagos";
        case "country":
          return "e.g: Nigeria";
        case "bio":
          return "Tell us a bit about yourself";
        case "description":
          return "Enter a description";
        case "phone":
          return "e.g: +2348161923259";
        case "price":
          return "e.g: 1000";
        case "quantity":
          return "e.g: 10";
        default:
          return label;
      }
    })(name);

    switch (varClass) {
      case "input":
        return (
          <input
            defaultValue={value}
            type={type}
            className={className}
            id={`${randString}${name}`}
            aria-describedby={`${name}Help`}
            placeholder={label}
            title={title}
            required
            {...input}
          />
        );
      case "select":
        return (
          <div>
            <input
              className={className}
              id={`${randString}${name}`}
              aria-describedby={`${name}Help`}
              title={`Select a ${name}`}
              list={`${name}-list`}
              placeholder={label}
              {...input}
            />
            <datalist id={`${name}-list`}>
              {this.renderSelectOptions(options.sort())}
            </datalist>
          </div>
        );
      case "textarea":
        return (
          <textarea
            defaultValue={value}
            className={className}
            id={`${randString}${name}`}
            aria-describedby={`${name}Help`}
            placeholder={label}
            title={title}
            rows="2"
            required
            {...input}
          />
        );
      default:
        break;
    }
  }

  renderFormField = ({
    input,
    label,
    meta,
    varClass,
    type,
    options,
    icon,
    row,
    value
  }) => {
    const { name } = input;

    //meta to help us display error
    const className = meta.error && meta.touched ? "error" : "";

    return (
      <div
        className={`my-3 ${
          row === undefined || row === 0
            ? ""
            : row === 1
            ? "d-inline-flex w-100 w-md-50 pr-md-5"
            : "d-inline-flex w-100 w-md-50 pl-md-5"
        }`}
      >
        <div className="w-100">
          <label
            className="text-uppercase m-0 p-0 text-primary"
            htmlFor="profileName"
          >
            <small className="font-weight-bold">{label}</small>
          </label>
          <div className="input-group">
            {this.renderFieldIconHelper(icon, name)}

            {this.renderFormControl(
              input,
              name,
              label,
              varClass,
              type,
              options,
              className,
              meta,
              value
            )}
            {this.renderFieldIconPrepend(name)}
          </div>
          {this.renderError(meta)}
        </div>
      </div>
    );
  };

  renderFields(fields) {
    return fields.map((field, key) => {
      let {
        desc,
        placeholder,
        varClass,
        type,
        options,
        icon,
        row,
        value
      } = field;

      return (
        <Field
          name={desc}
          component={this.renderFormField}
          label={placeholder}
          varClass={varClass}
          type={type}
          options={options}
          key={key}
          icon={icon}
          row={row}
          value={value}
        />
      );
    });
  }

  renderButtons(buttons) {
    return buttons.map((button, key) => {
      let { value, className } = button;
      return (
        <p key={key}>
          <button
            className={`${className} mt-3 btn text-uppercase border border-0`}
          >
            {value}
          </button>
        </p>
      );
    });
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className={this.props.className}
      >
        {this.renderFields(this.props.fields)}
        {this.renderButtons(this.props.buttons)}
      </form>
    );
  }
}

const emailIsValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validate = ({ name, email, password, confirmpassword }) => {
  const errors = {};

  errors.email = !email
    ? ""
    : emailIsValid(email)
    ? ""
    : "Please enter a valid email";

  errors.password = !password
    ? ""
    : !/\d/.test(password)
    ? "Password must contain a number"
    : !/[A-Z]/.test(password)
    ? "Password must contain an upperCase letter"
    : password.length < 6
    ? "Password must be at least 6 characters long"
    : "";

  errors.confirmpassword = !confirmpassword
    ? ""
    : confirmpassword !== password
    ? "Passwords do not match"
    : "";

  return errors;
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "benshadaForm",
    validate
  })(BenshadaForm)
);