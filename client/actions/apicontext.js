"use client";
import { useState, useEffect } from "react";
import AuthContext from "./authContext";

const AuthState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  const url = "https://fair-red-marlin-tie.cyclic.app";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const storeUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    localStorage.removeItem("user");
  };

  const SignUpAdmin = async (data) => {
    const res = await fetch(`${url}/admin/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setEmail(result?.email);
    return result;
  };

  const Verify = async (data) => {
    const res = await fetch(`${url}/admin/verify`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  };

  const loginAdmin = async (data) => {
    const res = await fetch(`${url}/admin/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setUser(result.user);
    if (result.user) {
      storeUser(result.user);
    }
    return result;
  };

  const AddCity = async (data) => {
    const res = await fetch(`${url}/admin/addcity`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  };
  const AddSubject = async (data) => {
    const res = await fetch(`${url}/admin/addsubject`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  };

  const logout = () => {
    setUser(null);
    removeUser();
  };

  const SignUpUser = async (data) => {
    const res = await fetch(`${url}/user/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setEmail(result?.email);
    return result;
  };

  const VerifyUser = async (data) => {
    const res = await fetch(`${url}/user/verify`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  };

  const loginUser = async (data) => {
    const res = await fetch(`${url}/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setUser(result.user);
    storeUser(result.user);
    return result;
  };

  const getStates = async () => {
    const res = await fetch(`${url}/user/states`, {
      method: "Get",
    });
    const result = await res.json();
    return result;
  };

  const getCities = async (state) => {
    const res = await fetch(`${url}/user/cities/${state}`, {
      method: "Get",
    });
    const result = await res.json();
    return result;
  };

  const getSubjects = async () => {
    const res = await fetch(`${url}/user/subjects`, {
      method: "Get",
    });
    const result = await res.json();
    return result;
  };

  const getDates = async (subject) => {
    const res = await fetch(`${url}/user/date/${subject}`, {
      method: "Get",
    });
    const result = await res.json();
    return result;
  };

  const getSlots = async (data) => {
    const res = await fetch(`${url}/user/getslots`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  };
  const addData = async (data) => {
    const res = await fetch(`${url}/user/add`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  };

  const getUsers = async () => {
    const res = await fetch(`${url}/admin/registrations`, {
      method: "GET",
    });
    const result = await res.json();
    return result;
  };
  const getRegistration = async (id) => {
    const res = await fetch(`${url}/admin/registration/${id}`, {
      method: "GET",
    });
    const result = await res.json();
    return result;
  };
  const deleteRegistration = async (id) => {
    const res = await fetch(`${url}/admin/delete/${id}`, {
      method: "delete",
    });
    const result = await res.json();
    return result;
  };
  const editRegistration = async (id, data) => {
    const res = await fetch(`${url}/admin/registration/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        SignUpAdmin,
        loginAdmin,
        Verify,
        email,
        AddCity,
        logout,
        AddSubject,
        SignUpUser,
        VerifyUser,
        loginUser,
        getStates,
        getCities,
        getSubjects,
        getDates,
        getSlots,
        addData,
        getUsers,
        deleteRegistration,
        getRegistration,
        editRegistration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
