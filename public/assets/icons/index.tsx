export const getSVG = ({ name }: { name: string }) => {
	switch (name) {
		case "usericon":
			return (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "hashicon":
			return (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M4 9H20"
						stroke="black"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M4 15H20"
						stroke="black"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M10 3L8 21"
						stroke="black"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M16 3L14 21"
						stroke="black"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "badgeicon":
			return (
				<svg
					width="24"
					height="25"
					viewBox="0 0 24 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#clip0_623_799)">
						<path
							d="M12 15.5C15.866 15.5 19 12.366 19 8.5C19 4.63401 15.866 1.5 12 1.5C8.13401 1.5 5 4.63401 5 8.5C5 12.366 8.13401 15.5 12 15.5Z"
							stroke="black"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M8.21 14.3899L7 23.4999L12 20.4999L17 23.4999L15.79 14.3799"
							stroke="black"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</g>
					<defs>
						<clipPath id="clip0_623_799">
							<rect
								width="24"
								height="24"
								fill="white"
								transform="translate(0 0.5)"
							/>
						</clipPath>
					</defs>
				</svg>
			);
		case "bellicon":
			return (
				<svg
					width="24"
					height="25"
					viewBox="0 0 24 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18 8.5C18 6.9087 17.3679 5.38258 16.2426 4.25736C15.1174 3.13214 13.5913 2.5 12 2.5C10.4087 2.5 8.88258 3.13214 7.75736 4.25736C6.63214 5.38258 6 6.9087 6 8.5C6 15.5 3 17.5 3 17.5H21C21 17.5 18 15.5 18 8.5Z"
						stroke="black"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M13.73 21.5C13.5542 21.8031 13.3019 22.0547 12.9982 22.2295C12.6946 22.4044 12.3504 22.4965 12 22.4965C11.6496 22.4965 11.3054 22.4044 11.0018 22.2295C10.6982 22.0547 10.4458 21.8031 10.27 21.5"
						stroke="black"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "messageicon":
			return (
				<svg
					width="24"
					height="25"
					viewBox="0 0 24 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M21 15.5C21 16.0304 20.7893 16.5391 20.4142 16.9142C20.0391 17.2893 19.5304 17.5 19 17.5H7L3 21.5V5.5C3 4.96957 3.21071 4.46086 3.58579 4.08579C3.96086 3.71071 4.46957 3.5 5 3.5H19C19.5304 3.5 20.0391 3.71071 20.4142 4.08579C20.7893 4.46086 21 4.96957 21 5.5V15.5Z"
						stroke="black"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "searchicon":
			return (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
						stroke="#8E8E8E"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M20.9999 21.0004L16.6499 16.6504"
						stroke="#8E8E8E"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "octagonicon":
			return (
				<svg
					width="26"
					height="25"
					viewBox="0 0 26 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.8739 0H10.1364C7.51443 0 5.09724 1.44024 3.78357 3.76981L0.997126 8.71112C-0.336106 11.0754 -0.332115 13.9973 1.0076 16.3577L3.7837 21.2487C5.10003 23.5679 7.51158 25 10.1261 25H15.8842C18.5031 25 20.9178 23.5633 22.2326 21.2381L24.9984 16.3471C26.3302 13.992 26.3341 11.0806 25.0088 8.72171L22.2328 3.78038C20.9206 1.44486 18.5002 0 15.8739 0Z"
						fill="url(#paint0_linear_513_5224)"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_513_5224"
							x1="5.90909"
							y1="-5"
							x2="22.698"
							y2="26.7463"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#0029FF" />
							<stop
								offset="0.0001"
								stopColor="#7187FF"
							/>
							<stop
								offset="1"
								stopColor="#F36BFF"
							/>
						</linearGradient>
					</defs>
				</svg>
			);
		case "downarrowicon":
			return (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M6 9L12 15L18 9"
						stroke="#808080"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "logouticon":
			return (
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6"
						stroke="#8E8E8E"
						strokeWidth="1.33333"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M10.6665 11.3337L13.9998 8.00033L10.6665 4.66699"
						stroke="#8E8E8E"
						strokeWidth="1.33333"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M14 8H6"
						stroke="#8E8E8E"
						strokeWidth="1.33333"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case "ethereumicon":
			return (
				<svg
					width="12"
					height="12"
					viewBox="0 0 12 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#clip0_512_4649)">
						<path
							d="M9.5 4C10.3284 4 11 3.32843 11 2.5C11 1.67157 10.3284 1 9.5 1C8.67157 1 8 1.67157 8 2.5C8 3.32843 8.67157 4 9.5 4Z"
							stroke="#959494"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M4.5 8C5.32843 8 6 7.32843 6 6.5C6 5.67157 5.32843 5 4.5 5C3.67157 5 3 5.67157 3 6.5C3 7.32843 3.67157 8 4.5 8Z"
							stroke="#959494"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
							stroke="#959494"
							strokeWidth="0.666667"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M2 11C2.55228 11 3 10.5523 3 10C3 9.44772 2.55228 9 2 9C1.44772 9 1 9.44772 1 10C1 10.5523 1.44772 11 2 11Z"
							stroke="#959494"
							strokeWidth="0.666667"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M9.5 11C10.3284 11 11 10.3284 11 9.5C11 8.67157 10.3284 8 9.5 8C8.67157 8 8 8.67157 8 9.5C8 10.3284 8.67157 11 9.5 11Z"
							stroke="#959494"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M6 8L8 9"
							stroke="#959494"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M8 3L6 5"
							stroke="#959494"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M2.5 3L4 5"
							stroke="#959494"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M3.5 8L2.5 9"
							stroke="#959494"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</g>
					<defs>
						<clipPath id="clip0_512_4649">
							<rect
								width="12"
								height="12"
								fill="white"
							/>
						</clipPath>
					</defs>
				</svg>
			);
		case "calendaricon":
			return (
				<svg
					width="12"
					height="12"
					viewBox="0 0 12 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#clip0_512_4653)">
						<path
							d="M9.5 2H2.5C1.94772 2 1.5 2.44772 1.5 3V10C1.5 10.5523 1.94772 11 2.5 11H9.5C10.0523 11 10.5 10.5523 10.5 10V3C10.5 2.44772 10.0523 2 9.5 2Z"
							stroke="#959494"
							strokeWidth="1.08333"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M8 1V3"
							stroke="#959494"
							strokeWidth="1.08333"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M4 1V3"
							stroke="#959494"
							strokeWidth="1.08333"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M1.5 5H10.5"
							stroke="#959494"
							strokeWidth="1.08333"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</g>
					<defs>
						<clipPath id="clip0_512_4653">
							<rect
								width="12"
								height="12"
								fill="white"
							/>
						</clipPath>
					</defs>
				</svg>
			);
		case "badgeindicationicon":
			return (
				<svg
					width="15"
					height="15"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						cx="7.5"
						cy="7.5"
						r="7.5"
						fill="#9C4040"
					/>
				</svg>
			);
		default:
			return <svg />;
	}
};

const SVGIcon = ({ name }: { name: string }) => <>{getSVG({ name })}</>;

export default SVGIcon;
