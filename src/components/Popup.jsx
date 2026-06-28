import { useEffect } from 'react';

const Popup = ({ message, isActive, onClose, isError }) => {
	useEffect(() => {
		if (isActive) {
			const timer = setTimeout(() => {
				onClose(); // tell parent to hide popup
			}, 3000);

			return () => clearTimeout(timer); // clean up
		}
	}, [isActive, onClose]);

	return (
		<div
			className={`bg-black text-white flex flex-row items-center fixed bottom-[50px] right-0 h-[60px] rounded-l-md overflow-hidden transition-all duration-500 ease-in-out
				${isActive ? 'translate-x-0' : 'translate-x-full'}`}
		>
			<div className={`w-[10px] h-full ${isError ? 'bg-red-800' : 'bg-green-800'}`}></div>
			<p className='ml-4 mr-5'>{message}</p>
		</div>
	);
};

export default Popup;
