import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FullHeaderLine from '../reusable/FullHeaderLine';
import ShortHeaderLine from '../reusable/ShortHeaderLine';
import StatusTable from '../reusable/StatusTable';
import Dropdown from "../reusable/Dropdown";
import FormBlock from "../reusable/FormBlock";
import CustomDatePicker from "../reusable/CustomDatePicker";

import FilterDropdown from '../reusable/FilterDropdown';
import FilterDatePicker from '../reusable/FilterDatePicker';

import "react-table/react-table.css";
import ReactTable from 'react-table';



class CurrentIntelComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  onClear(){
    console.log("clear");
  }

  onEnter(){
    console.log("enter");
  }


  render() {

    const {translations: {translations}} = this.props;

    const searchResult = [
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
    ];

    const searchResultColumns = [
      {
        Header: translations["date"],
        accessor: 'date', 
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),
        
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },
      {
        Header: translations['mission'],
        accessor: 'mission',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['type'],
        accessor: 'type',
      }, 
      {
        Header: translations['start'],
        accessor: 'start',
      },
      {
        Header: translations['end'],
        accessor: 'end',
      },

      {
        Header: translations['classification'],
        accessor: 'classification',
      },
        
      {
        Header: translations['air track'],
        accessor: 'air_track',
        filterable: false,
        Cell: props => <input type="checkbox" className="checkbox"  />
      },

      {
        Header: translations['video'],
        accessor: 'video',
        filterable: false,
        Cell: props => <input type="checkbox" className="checkbox" />
      },

      {
        Header: translations['images'],
        accessor: 'images',
        filterable: false,
        Cell: props => <input type="checkbox" className="checkbox" />
       
      },

      {
        Header: translations['sigacts'],
        accessor: 'sigacts',
        filterable: false,
        Cell: props => <input type="checkbox" className="checkbox" />
      },

      {
        Header: translations['email'],
        accessor: 'email',
        filterable: false,
        Cell: props => <span className='number'><img src="/images/general/email_icon.png"  /></span> // Custom cell components!
      }, 

      {
        Header: translations['export'],
        accessor: 'export',
        filterable: false,
        Cell: props => <span className='number'><img src="/images/general/export_icon.png"  /></span> // Custom cell components!
      }, 

      {
        Header: translations['detail'],
        accessor: 'detail',
        filterable: false,
        Cell: props => <span className='number'><img src="/images/general/detail_icon.png"  /></span> // Custom cell components!
      }
    ];


    const dateTime = [
      {name: '', type: 'calendar'},
      {name: '', type: 'calendar'},
    ];

    const dataType = [
      {name: '', type: 'dropdown'},
      {name: '', type: 'dropdown'},
    ];

    const keyWord = [
      {name: '', type: 'input'},
      {name: '', type: 'dropdown'},
    ];

    let langs = ['val 1', 'val 2'];

    return (
      <div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["search criteria"]} />
          </div>
          <div className="col-md-12 search-content">
            <div className="content-block">
              <ShortHeaderLine headerText={translations["geo selection"]} />
              <div className="content-geo">
                <img src="/images/intel_request/current_intel/geo_1.png" />
                <img src="/images/intel_request/current_intel/geo_2.png" />
                <img src="/images/intel_request/current_intel/geo_3.png" />
                <img src="/images/intel_request/current_intel/geo_4.png" />
              </div>
            </div>
            <div className="content-block">
              <ShortHeaderLine headerText={translations["date/time range"]} />
              <div className="content-other">
                <div>
                  <CustomDatePicker headerText={translations["Start Date/Time"]} style={{margin:0}} />
                </div>
                <div>
                  <CustomDatePicker headerText={translations["End Date/Time"]} style={{margin:"0 !important"}} />
                </div>
              </div>
            </div>
            <div className="content-block">
              <ShortHeaderLine headerText={translations["data type filtering"]} />
              <div className="content-other">
                <Dropdown key="1" id="1" items={langs}/>
                <Dropdown key="2" id="2" items={langs}/>
              </div>
            </div>
            <div className="content-block">
              <ShortHeaderLine headerText={translations["key word/phrase"]} />
              <div className="content-other">
                <div><input type="text"/></div>
                <Dropdown key="1" id="1" items={langs}/>
              </div>
            </div>
            <div className="button-group">
              <div className="content-button">
                <div className="col-md-6">
                  <img clasName="button-line" src="/images/admin/edit_up.png" alt=""/>
                  <button className="highlighted-button" onClick={this.onClear.bind(this)}>
                    {translations["clear"]}
                  </button>
                  <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
                </div>
                <div className="col-md-6">
                  <img clasName="button-line" src="/images/admin/edit_up.png" alt=""/>
                  <button className="highlighted-button" onClick={this.onEnter.bind(this)}>
                    {translations["route"]}
                  </button>
                  <img className="line mirrored-Y-image" src="/images/admin/edit_up.png" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["search criteria"]} />
          </div>
          <div className="col-md-12">
            <img className="large-map" src="/images/intel_request/operating_picture/large_map.png" alt="" />
          </div>
        </div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["search result"]} />
          </div>
          <div className="col-md-12">
            <div className="col-md-12">
              <ReactTable
                data={searchResult}
                columns={searchResultColumns}
                defaultPageSize={5}
                className="-striped -highlight"
                filterable
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CurrentIntelComponent.propTypes = {
  children: PropTypes.element,
};

export default CurrentIntelComponent;
