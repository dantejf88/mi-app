import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import PhraseButton from "./PhraseButton";
import * as actions from "./actions/logginAction";


const mapStateToProps = (state) => {
  return {

    mappedAppState: state.appState
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getPhrase: actions.getPhrase,
                             getPrivatePhrase: actions.getPrivatePhrase}, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(PhraseButton)
