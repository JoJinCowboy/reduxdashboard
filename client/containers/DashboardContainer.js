import {connect} from 'react-redux';

import DashboardComponent from '../components/DashboardComponent';
import {getTranslations} from '../actions/actions';

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTranslations: (lang) => {
      dispatch(getTranslations(lang));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);