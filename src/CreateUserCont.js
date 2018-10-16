import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import CreateUser from "./CreateUser";
import * as actions from "./actions/logginAction";


const mapStateToProps = (state) => {
  return {

    mappedAppState: state.appState
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createUserAction: actions.createUser}, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
