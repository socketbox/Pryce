import { connect } from 'react-redux';
import Login from '../Login';
import AppNavigator from '../../AppNavigator';

const mapStateToProps = state => (state)

const mapDispatchToProps = (dispatch) => ({
	log_in: (userData) => { dispatch({ type: 'LOG_IN', data: userData }) },
	log_out: () => { dispatch({ type: 'LOG_OUT' }) },
})

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator)