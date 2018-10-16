import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import LogginButton from "./LogginButton";
import * as actions from "./actions/logginAction";


const mapStateToProps = (state) => {
  return {

    mappedAppState: state.appState
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({loggin: actions.loggin,
                             logout: actions.logout}, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(LogginButton)
