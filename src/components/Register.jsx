import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
    const [accountType, setAccountType] = useState("user");
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        password: "",
        companyName: "",
        location: "",
        website: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        // Common validations
        if (!user.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!user.password) {
            newErrors.password = "Password is required";
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(user.password)) {
            newErrors.password = "Password must be at least 8 characters with one uppercase, one number, and one special character";
        }

        // Account type specific validations
        if (accountType === "user") {
            if (!user.fullname) {
                newErrors.fullname = "Full name is required";
            } else if (user.fullname.length < 3 || user.fullname.length > 30) {
                newErrors.fullname = "Full name must be between 3 and 30 characters";
            }
        } else {
            if (!user.companyName) {
                newErrors.companyName = "Company name is required";
            }
            if (!user.location) {
                newErrors.location = "Location is required";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle register API call
    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors({});
        setSuccessMessage("");

        try {
            // Prepare data for API
            const registerData = {
                fullname: accountType === "user" ? user.fullname : user.companyName,
                email: user.email,
                password: user.password,
                role: accountType === "user" ? "user" : "company"
            };

            // Add company-specific fields if company registration
            if (accountType === "company") {
                registerData.companyName = user.companyName;
                registerData.location = user.location;
                registerData.website = user.website;
            }

            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            if (data.success) {
                setSuccessMessage(`Successfully registered as ${accountType}!`);
                // Reset form
                setUser({
                    fullname: "",
                    email: "",
                    password: "",
                    companyName: "",
                    location: "",
                    website: "",
                });

                // Redirect to login or show success message
                setTimeout(() => {
                    // You can redirect to login page here
                    // window.location.href = '/login';
                }, 2000);
            }

        } catch (error) {
            console.error('Registration error:', error);
            setErrors({
                submit: error.message || 'Registration failed. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    // Render error message
    const renderError = (fieldName) => {
        if (errors[fieldName]) {
            return <div className="text-danger mt-1 small">{errors[fieldName]}</div>;
        }
        return null;
    };

    return (
        <div className="col-md-8 offset-md-2 mt-4">
            <div className="card shadow-lg border-0 rounded-3">
                <div className="card-body p-4">
                    <h3 className="text-center mb-4 fw-bold text-primary">Register Account</h3>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            {successMessage}
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setSuccessMessage("")}
                            ></button>
                        </div>
                    )}

                    {/* Submit Error Message */}
                    {errors.submit && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {errors.submit}
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setErrors({ ...errors, submit: "" })}
                            ></button>
                        </div>
                    )}

                    {/* Toggle Buttons */}
                    <div className="d-flex justify-content-center mb-4">
                        <button
                            type="button"
                            className={`btn me-2 ${accountType === "user" ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => {
                                setAccountType("user");
                                setErrors({});
                                setSuccessMessage("");
                            }}
                            disabled={loading}
                        >
                            User Register
                        </button>
                        <button
                            type="button"
                            className={`btn ${accountType === "company" ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => {
                                setAccountType("company");
                                setErrors({});
                                setSuccessMessage("");
                            }}
                            disabled={loading}
                        >
                            Company Register
                        </button>
                    </div>

                    {/* Register Form */}
                    <form onSubmit={handleRegister}>
                        {accountType === "user" ? (
                            <>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        className={`form-control ${errors.fullname ? 'is-invalid border border-danger' : ''}`}
                                        placeholder="Enter your full name"
                                        value={user.fullname}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        required
                                    />
                                    {renderError('fullname')}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        className={`form-control ${errors.companyName ? 'is-invalid border border-danger' : ''}`}
                                        placeholder="Enter your company name"
                                        value={user.companyName}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        required
                                    />
                                    {renderError('companyName')}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        className={`form-control ${errors.location ? 'is-invalid border border-danger' : ''}`}
                                        placeholder="Enter company location"
                                        value={user.location}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        required
                                    />
                                    {renderError('location')}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Website</label>
                                    <input
                                        type="text"
                                        name="website"
                                        className="form-control"
                                        placeholder="https://example.com"
                                        value={user.website}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                    />
                                </div>
                            </>
                        )}

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Email</label>
                            <input
                                type="email"
                                name="email"
                                className={`form-control ${errors.email ? 'is-invalid border border-danger' : ''}`}
                                placeholder="Enter email address"
                                value={user.email}
                                onChange={handleInputChange}
                                disabled={loading}
                                required
                            />
                            {renderError('email')}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Password</label>
                            <input
                                type="password"
                                name="password"
                                className={`form-control ${errors.password ? 'is-invalid border border-danger' : ''}`}
                                placeholder="Enter a strong password"
                                value={user.password}
                                onChange={handleInputChange}
                                disabled={loading}
                                required
                            />
                            {renderError('password')}
                            <div className="form-text">
                                Password must contain: 8+ characters, 1 uppercase letter, 1 number, 1 special character
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success w-100 mt-2 py-2 fw-semibold"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Registering...
                                </>
                            ) : (
                                `Register as ${accountType === "user" ? "User" : "Company"}`
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-3">
                        <p className="mb-0">
                            Already have an account?{" "}
                            <a href="/login" className="text-decoration-none fw-semibold">
                                Login here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;