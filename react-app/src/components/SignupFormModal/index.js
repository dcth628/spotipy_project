import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dOB, setDOB] = useState("");
	const [userImage, setUserImage] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, lastName, firstName, dOB, userImage, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
				history.push('/collection')
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-form-modal">
			<h1 id='sign-up-h1'>Sign Up</h1>
			<form className="signup-form" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email
					<input
						placeholder="Email"
						className="signup-form-input"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						placeholder="Username"
						className="signup-form-input"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					First Name
					<input
						placeholder="First Name"
						className="signup-form-input"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input
						placeholder="Last Name"
						className="signup-form-input"
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label>
					Date of Birth
					<input
						type="date"
						className="signup-form-input"
						value={dOB}
						onChange={(e) => setDOB(e.target.value)}
						required
					/>
				</label>
				<label>
					Profile Image
					<input
						placeholder="Profile Image URL"
						className="signup-form-input"
						type="text"
						value={userImage}
						onChange={(e) => setUserImage(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						placeholder="Password"
						className="signup-form-input"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						placeholder="Confirm Password"
						className="signup-form-input"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button className="signup-form-button" type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
