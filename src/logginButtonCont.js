import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import LogginButton from "./logginButton";
import * as actions from "./actions/logginAction";


const mapStateToProps = (state) => {
  return {

    mappedAppState: state.appState
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({loggin: actions.loggin,
                             getPhrase: actions.getPhrase,
                             getPrivatePhrase: actions.getPrivatePhrase,
                             logout: actions.logout}, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(LogginButton)
