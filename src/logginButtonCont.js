import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import LogginButton from "./logginButton";
import * as actions from "./actions/logginAction";


const mapStateToProps = (state) => {
  return {

    mappedAppState: state.reducers
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({loggin: actions.loggin }, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(LogginButton)
