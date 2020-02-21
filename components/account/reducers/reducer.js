const initialState = {
	isLoggedIn: false,
	authToken: null,
	id: null,
	name: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'LOG_IN':
			let {authToken, id, name} = action.data;
			
			return {
				isLoggedIn: true,
				authToken,
				id,
				name,
			};
		case 'LOG_OUT':
			return initialState;
		default:
			return state;
	}
}