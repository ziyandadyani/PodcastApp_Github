import { useState } from "react";
import { supabase } from "../../Config/supabase";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Alert } from "@mui/material";
import PropTypes from "prop-types";

const SignUp = (props) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.first_name,
            last_name: formData.last_name,
          },
        },
      });

      if (error) {
        setFetchError(error.message);
      }

      if (data.session !== null && data.user !== null) {
        navigate("/");
      }
    } catch {
      setFetchError("Failed to sign in");
    }

    setLoading(false);
  };
  
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-24 h-24 m-5 rounded-full flex items-center justify-center overflow-hidden">
        <img
          src="/android-chrome-384x384.png"
          alt="PodHub Logo"
          className="max-w-cc pt-cc"
        />
      </div>
      <form
        className="flex flex-col border-solid border-2 border-black rounded-xl m-0 mx-auto p-3"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl mt-0 text-center">Sign Up</h3>
        {fetchError && <Alert severity="error">{fetchError}</Alert>}
        <TextField
          label="First Name"
          type="text"
          name="first_name"
          autoComplete="on"
          variant="outlined"
          size="small"
          margin="dense"
          className="w-72"
        />
        <TextField
          label="Last Name"
          type="text"
          name="last_name"
          autoComplete="on"
          variant="outlined"
          size="small"
          margin="dense"
          className="w-72"
        />
        <TextField
          label="E-mail"
          type="email"
          name="email"
          autoComplete="on"
          variant="outlined"
          size="small"
          margin="dense"
          className="w-72"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          autoComplete="off"
          variant="outlined"
          size="small"
          margin="dense"
          className="w-72"
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          className="w-36 self-center"
        >
          Sign Up
        </Button>
      </form>
      <Button
        variant="text"
        className="p-5 bg-none underline cursor-pointer text-center"
        onClick={() => props.onFormSwitch("login")}
      >
        Already have an account? Login here.
      </Button>
    </div>
  );
};

SignUp.propTypes = {
  onFormSwitch: PropTypes.func,
};

export default SignUp;