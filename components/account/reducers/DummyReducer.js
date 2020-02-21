const initialState = {
	text_1: false,
	text_2: null,
	text_3: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'CREATE':
			let {text_1, text_2, text_3} = action.data;
			
			return {
				text_1: true,
				text_2,
				text_3,
			};
		case 'DELETE':
			return initialState;
		default:
			return state;
	}
}