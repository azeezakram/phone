import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import defaultProfileImage from '../assets/images/static/defaultProfileImage.png';
import bgImage from '../assets/images/static/sam.jpg';
import OfflinePinOutlinedIcon from '@mui/icons-material/OfflinePinOutlined';
import 'react-phone-input-2/lib/material.css';
import PhoneInput from 'react-phone-input-2';
import { isValidPhoneNumber } from 'libphonenumber-js';
import Loader from '../components/loader/Loader';
import Popup from '../components/Popup';
import axiosInsence from '../utils/axios';
import { AnimatePresence, motion } from "framer-motion";

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

const CreateContact = () => {
	const [contact, setContact] = useState({
		name: '',
		mobileNumber: '',
	});

	const [image, setImage] = useState(null);
	const [message, setMessage] = useState({
		nameMessage: '',
		mobileNumberMessage: '',
		imageMessage: '',
		save: {
			message: '',
			isError: false,
		},
	});

	const [loading, setLoading] = useState(false);

	const handleInput = (e) => {
		if (e.target.name === 'contactImage') {
			let file = e.target.files[0];
			setImage(file);
			console.log(file);
		}

		if (e.target.name === 'name') {
			setContact({ ...contact, [e.target.name]: e.target.value });
			if (isValidName(e.target.value)) {
				setMessage((prev) => ({ ...prev, ['nameMessage']: '' }));
			} else {
				setMessage((prev) => ({
					...prev,
					['nameMessage']: 'Name required',
				}));
			}
		}
	};

	const handleMobileNumber = (value) => {
		setContact({ ...contact, mobileNumber: '+' + value });

		if (isValidPhoneNumber('+' + value)) {
			setMessage((prev) => ({ ...prev, ['mobileNumberMessage']: '' }));
			return true;
		} else {
			setMessage((prev) => ({
				...prev,
				['mobileNumberMessage']: 'Mobile number is not valid',
			}));
			return false;
		}
	};

	const isValidName = (name) => {
		if (name === '' || name === null) {
			return false;
		} else {
			return true;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log('clicked');

		setLoading(true);

		if (
			!isValidPhoneNumber(contact.mobileNumber) ||
			!isValidName(contact.name)
		) {
			console.log('Please fill all fields');
			setMessage((prev) => ({
				...prev,
				['nameMessage']: 'Name required',
				['mobileNumberMessage']: 'Mobile number required',
			}));

			return;
		}

		let defaultImage = image;

		if (!defaultImage) {
			try {
				const res = await fetch(defaultProfileImage);
				const blob = await res.blob();
				defaultImage = new File([blob], 'default.png', {
					type: 'image/png',
				});
			} catch (error) {
				console.error('Failed to load default image:', error);
				return;
			}
		}

		const formData = new FormData();

		formData.append('imageFile', defaultImage);

		formData.append(
			'contact',
			new Blob([JSON.stringify(contact)], {
				type: 'application/json',
			})
		);

		console.log(formData);

		const url = '/api/contact';

		try {
			const response = await axiosInsence.post(url, formData);

			if (!response || response.status !== 201) {
				throw new Error(response.message);
			}

			setMessage((prev) => ({
				...prev,
				save: {
					...prev.save,
					message: 'Contact successfully saved!',
					isError: false,
				},
			}));

			handlePopup();
			resetForm();
		} catch (e) {
			console.log('Server error: ', e);
			setMessage((prev) => ({
				...prev,
				save: {
					...prev.save,
					message: 'Something went wrong, Try again!',
					isError: true,
				},
			}));
			handlePopup();
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setContact((prev) => ({ ...prev, name: '', mobileNumber: '' }));
		setImage(null);
	};

	const [showPopup, setShowPopup] = useState(false);

	const handlePopup = () => {
		setShowPopup(true);
	};

	return (
		<>
			<AnimatePresence>
				<motion.section
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className={`h-screen w-full bg-cover bg-center overflow-hidden `}
					style={{ backgroundImage: `url(${bgImage})` }}>
					<div className='bg-white shadow-xl  p-16 w-fit absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md'>
						<form
							className='w-[300px] h-full flex flex-col gap-y-5 mx-auto justify-center'
							onSubmit={(e) => handleSubmit(e)}>
							<div className='w-full flex justify-center'>
								<img
									src={
										!image
											? defaultProfileImage
											: URL.createObjectURL(image)
									}
									alt='Profile Preview'
									className='w-[100px] h-[100px] object-cover rounded-full'
								/>
							</div>

							<h1 className='text-xl font-[300]'>
								Create New Contact
							</h1>

							<TextField
								error={message.nameMessage != ''}
								helperText={message.nameMessage}
								id='name'
								label='Name'
								name='name'
								variant='outlined'
								value={contact.name}
								onChange={(e) => handleInput(e)}
								sx={{
									'& .MuiInputBase-root': {
										fontFamily: 'Inter, sans-serif',
										letterSpacing: 0,
									},
									'& .MuiFormLabel-root': {
										fontFamily: 'Inter, sans-serif',
										letterSpacing: 0,
									},
									'& .MuiFormHelperText-root': {
										fontFamily: 'Inter, sans-serif',
										letterSpacing: 0,
									},
								}}
							/>

							<div>
								<PhoneInput
									country={'us'}
									value={contact.mobileNumber.replace(
										'+',
										''
									)}
									label='contactNumber'
									specialLabel=''
									onChange={(value) =>
										handleMobileNumber(value)
									}
									containerClass='my-custom-container'
									inputClass={`!w-full !border !rounded-sm ${
										message.mobileNumberMessage
											? '!border-[#d32f2f]'
											: ''
									}`}
								/>

								{message.mobileNumberMessage && (
									<span className='text-[#d32f2f] text-[0.75rem] mx-[14px]'>
										{message.mobileNumberMessage}
									</span>
								)}
							</div>

							<Button
								component='label'
								role={undefined}
								variant='contained'
								tabIndex={-1}
								className='block'
								startIcon={!image && <CloudUploadIcon />}
								endIcon={image && <OfflinePinOutlinedIcon />}>
								{!image ? 'Upload image' : 'Edit image'}
								<VisuallyHiddenInput
									type='file'
									accept='image/*'
									name='contactImage'
									onChange={(e) => handleInput(e)}
								/>
							</Button>
							<Button
								className={
									!isValidName(contact.name) ||
									!isValidPhoneNumber(contact.mobileNumber)
										? 'cursor-progress'
										: ''
								}
								disabled={
									!isValidName(contact.name) ||
									!isValidPhoneNumber(contact.mobileNumber)
								}
								variant='outlined'
								type='submit'>
								Save
							</Button>
						</form>
					</div>
				</motion.section>
			</AnimatePresence>
			{loading && <Loader />}

			{/* <button onClick={handleClick} className='bg-amber-700 text-white p-2 m-5'>
				Show Popup
			</button> */}

			<Popup
				message={message.save.message}
				isActive={showPopup}
				isError={message.save.isError}
				onClose={() => setShowPopup(false)}
			/>
		</>
	);
};

export default CreateContact;
