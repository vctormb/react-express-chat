import update from 'immutability-helper';
import { LOGIN, NEW_ONLINE_USER, REMOVE_ONLINE_USER, } from './types';

const INITIAL_STATE = {
	user: {
		isLoading: false,
		isLoggedIn: false,
		data: {
		},
	},
	onlineUsers: [],
}

const auth = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN.REQUEST:
			return {
				...state,
				user: {
					...state.user,
					isLoading: true,
				}
			}

		case LOGIN.SUCCESS:
			return {
				...state,
				user: {
					...state.user,
					isLoading: false,
					isLoggedIn: true,
					data: {
						...action.user,
					},
				},
				onlineUsers: action.onlineUsers,
			}

		case NEW_ONLINE_USER.SUCCESS:
			return {
				...state,
				onlineUsers: update(state.onlineUsers, {
					$push: [action.newOnlineUser]
				}),
			}

		case REMOVE_ONLINE_USER.SUCCESS:
			const userIndex = state.onlineUsers.findIndex(x => x._id === action.userId);

			return {
				...state,
				onlineUsers: update(state.onlineUsers, {
					$splice: [[userIndex, 1]]
				}),
			}

		default:
			return state
	}
}

export default auth;