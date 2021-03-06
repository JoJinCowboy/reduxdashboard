import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ModalFormBlock from '../../reusable/ModalFormBlock';
import CustomButton from '../../reusable/CustomButton';
import ContentBlock from "../../reusable/ContentBlock";

import { getTranslations, addLocation, fetchLocationData, uploadFile } from '../../../actions/actions';

class PoiModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      file: '',
      location: {
        LocationID: '',
        LocationReferenceCode: '',
        LocationPhoto: '',
        LocationDocument: '',
        LocationMapImage: '',
        LocationName: '',
        LocationStreet: '',
        LocationCity: '',
        LocationPostalCode: '',
        LocationCountry: '',
        LocationCOCOM: '',
        LocationRegion: '',
        LocationLatitude: '',
        LocationLongitude: '',
        LocationMGRS: '',
        LocationElevation: '',
        LocationPointofContact: '',
        LocationFrequency: '',
        KML: '',
      }
    }

    // this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentWillMount(){
    // console.log("---hereis eoirmodal---------");
    // this.props.fetchLocationData();
  }

  handleLocationGeneralData = (generalData) => {
    const {location} = this.state;
    this.setState({
      location: {
        ...location,
        LocationPOI: generalData.LocationPOI,
        LocationName: generalData.LocationName,
        LocationStreet: generalData.LocationStreet,
        LocationCity: generalData.LocationCity,
        LocationCountry: generalData.LocationCountry,
        LocationCOCOM: generalData.LocationCOCOM,
        LocationRegion: generalData.LocationRegion,
        LocationCategory: generalData.LocationCategory
       
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.location);
    });
  }

  handleLocationPositionData = (positionData) => {
    const {location} = this.state;
    this.setState({
      location: {
        ...location,
        LocationLatitude: positionData.LocationLatitude,
        LocationLongitude: positionData.LocationLongitude,
        LocationMGRS: positionData.LocationMGRS,
        LocationElevation: positionData.LocationElevation,
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.location);
    });
  }

  handleUploadFile(event){
      event.preventDefault();
      const {location} = this.state;
      
      let parametername = event.target.id;

      this.setState({
          location: {
              ...location,
              [parametername] : event.target.files[0].name
          }
      }, () => {
          console.log("New state in ASYNC callback:", this.state.location);
      });

      const data = new FormData();

      data.append('file', event.target.files[0]);
      data.append('name', event.target.files[0].name);

      this.props.uploadFile(data);
  }

  handleChange = (e) =>{
    const { id, value } = e.target;
    console.log(", Value: "+e.target.value);
    console.log(", id: "+e.target.id);
    const { location } = this.state;
    this.setState({
        location: {
            ...location,
            [id]: value
        }
    }, () =>{
       
       console.log(this.state.location);
    });

  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('---here--');
    console.log(this.state.location);
    console.log()
    //this.props.addLocation(this.state.location);
  }

  resetForm(){
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm("Do you want to clear all data from this form?")) {
      let inputs = document.body.getElementsByTagName('input');
      let drops = document.body.getElementsByTagName('select');
      for (let item of inputs) {
        item.value = '';
      }
      for (let item of drops) {
        item.value = 0;
      }
    }
  }

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    const {munition} = this.state;
    const {translations: {translations}} = this.props;


    const generalFields = [
      {name: translations['POI#'], type: 'input', domID: 'LocationPOI', valFieldID: 'LocationPOI'},
      {name: translations['Name/Title'], type: 'input', domID: 'LocationName', valFieldID: 'LocationName'},
      {name: translations['City/Town'], type: 'input', domID: 'LocationCity', valFieldID: 'LocationCity'},
      {name: translations['COCOM'], type: 'dropdown', domID: 'dispLocationCOCOM', ddID: 'COCOM',valFieldID: 'LocationCOCOM'},
      {name: translations['Country'], type: 'dropdown', domID: 'dispLocationCountry', ddID: 'Countries', valFieldID: 'LocationCountry'},
      {name: translations['Region'], type: 'dropdown', domID: 'dispLocationRegion', ddID: 'Regions', valFieldID: 'LocationRegion'},
      {name: translations['Category'], type: 'input', domID: 'LocationCategory', valFieldID: 'LocationCategory'},
    ];

    const locationFields = [
      {name: translations['Latitude'], type: 'input', domID: 'LocationLat', valFieldID: 'LocationLatitude'},
      {name: translations['Longitude'], type: 'input', domID: 'LocationLon', valFieldID: 'LocationLongitude'},
      {name: translations['MGRS'], type: 'input', domID: 'LocationMGRS', valFieldID: 'LocationMGRS'},
      {name: translations['Elevation'], type: 'input', domID: 'LocationElevation', valFieldID: 'LocationElevation'},
    ];

    return (
      <div className="nai-modal modal-overlay" >
      <form action="" onSubmit={this.handleSubmit} >
        <div className="modal-content">
          <div className="close-button" >
            <img src="/images/general/close.png" onClick={this.props.onClose} />
          </div>
          <div className="modal-header-text">{translations["Point of Interest (POI) Administration"]}</div>
          <div className="col-md-6">
            <ModalFormBlock fields={generalFields} data={this.handleLocationGeneralData} initstate ={this.state.location} />
          </div>
          <div className="col-md-6">
            <ModalFormBlock fields={locationFields} data={this.handleLocationPositionData} initstate ={this.state.location} />
            <div className="col-md-12 form-fields-gap">
              <div className="col-md-4 label-title">{translations['Upload KML']}</div>
              <div className="col-md-8 pull-right">
                <input type="file"  name="file" id="KML" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
              </div>
            </div>
            <div className="col-md-12 form-fields-gap">
              <div className="col-md-4 label-title">{translations['Upload Image']}</div>
              <div className="col-md-8 pull-right">
                <input type="file"  name="file" id="LocationImage" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
              </div>
            </div>
            <div className="col-md-12 form-fields-gap">
              <div className="col-md-6 label-title">{translations['Upload Doc']}</div>
              <div className="col-md-6 pull-right">
                <input type="file"  name="file" id="LocationDoc" onChange= {this.handleUploadFile.bind(this)} className="hidden_input pull-right" required />
              </div>
            </div>
          </div>
          <div className="col-md-12 form-fields-gap">
            <div className="nai-description">
              <div className="description-label">
                {translations["Description"]}
              </div>
              <div className="description-detail">
                <textarea className="form-control" id="LocationDescription" rows="6" className="description-detail" onChange={this.handleChange}/>
              </div>
            </div>
          </div>
          <div className="col-md-12" style={{textAlign:'center', paddingTop:20}}>
            <div className="action-buttons" >
              <img className="line" src="/images/admin/edit_up.png" alt=""/>
              <button type="submit" className="highlighted-button">
                {translations['save']}
              </button>
              <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
            </div>
          </div>
        </div>
      </form>
      </div>
    );
  }
}

PoiModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    translations: state.translationsReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTranslations: (lang) => {
      dispatch(getTranslations(lang));
    },

    addLocation: (location) => {
      dispatch(addLocation(location));
    },

    fetchLocations: () => {
      dispatch(fetchLocationData());
    },

    uploadFile: (fileData) => {
      dispatch(uploadFile(fileData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PoiModal);