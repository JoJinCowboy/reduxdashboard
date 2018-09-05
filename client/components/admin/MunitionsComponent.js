import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UploadBlock from "../reusable/UploadBlock";
import ContentBlock from "../reusable/ContentBlock";
import FilterDropdown from '../reusable/FilterDropdown';
import ButtonsList from "../reusable/ButtonsList";
import MissionMgtDropDown from '../reusable/MissionMgtDropDown';
import CustomDatePicker from '../reusable/CustomDatePicker';
import DropDownButton from '../reusable/DropDownButton';
import StatusTable from '../reusable/StatusTable';

import MissileModal from './munitions/MissileModal';
import RocketModal from './munitions/RocketModal';
import GunModal from './munitions/GunModal';
import TableRowDetailModal from '../reusable/TableRowDetailModal';

import "react-table/react-table.css";
import ReactTable from 'react-table';

class MunitionsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      filterValue: '',
      filter: [], 
      missileModalOpen:false,
      rocketModalOpen: false,
      gunModalOpen: false,
      tableRowDetailModalOpen: false,
    }
  }

  onFind(){
    console.log("find");
  }

  missileModal = () => {
    this.setState({
      missileModalOpen: !this.state.missileModalOpen
    });
  }

  rocketModal = () => {
    this.setState({
      rocketModalOpen: !this.state.rocketModalOpen
    });
  }

  gunModal = () => {
    this.setState({
      gunModalOpen: !this.state.gunModalOpen
    });
  }

  tableRowDetailModal = () => {
    this.setState({
      tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
    })
  }

  componentWillMount() {
    this.props.fetchMunitions();
    // console.log("--here is Munitions---");
    // console.log(data);
  }

  render() {

    const {translations: {translations}} = this.props;
    
    const munitions = [
      {name:translations['Missile'], onClick:this.missileModal},
      {name:translations['Rocket'], onClick:this.rocketModal},
      {name:translations['Guns'], onClick:this.gunModal}
    ];

    const { all_munitions } = this.props;

    const columns = [
      {
        Header: translations["type"],
        accessor: 'role',
        Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="MunitionRoles" dropdownData={(value)=>{onChange({filterValue:value}); console.log(value);}} value={this.state.filterValue}/>, 
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },
      {
        Header: translations['Name'],
        accessor: 'munition',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),
      },
      {
        Header: translations['serial#'],
        accessor: 'serial'
      }, 
      {
        Header: translations['cocom'],
        accessor: 'COCOM',
        Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="COCOM" dropdownData={(value)=>{onChange({filterValue:value});}} value={this.state.filterValue}/>
      },
      {
        Header: translations['unit'],
        accessor: 'unit',
        Filter: ({ filter, onChange }) =>
                    <FilterDropdown dropdownDataUrl="Units" dropdownData={(value)=>{onChange({filterValue:value}); console.log(value);}} value={this.state.filterValue}/>
      },
      {
        Header: translations['Location'],
        accessor: 'location'
      },
        
      {
        Header: translations['Record Date'],
        accessor: 'lastUpdate'
      }, 
      {
        Header: translations['view'],
        accessor: 'view',
        filterable: false,
        Cell: props => <span className='number'><img src="/images/general/eye_icon.png" onClick={this.tableRowDetailModal} /></span> // Custom cell components!
      }
    ];

    const rowFields = [
      {name: translations['Type'], type: 'dropdown'},
      {name: translations['Name'], type: 'input'},
      {name: translations['Serial#'], type: 'input'},
      {name: translations['COCOM'], type: 'dropdown'},
      {name: translations['Unit'], type: 'dropdown'},
      {name: translations['Location'], type: 'dropdown'},
      {name: translations['Record Date'], type: 'date'},
    ];

    return (
      <div>
        <div className="row orders-assets">
          <div className="header-line">
            <img src="/images/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations["Munitions"]} 
            </div>
            <img className="mirrored-X-image" src="/images/admin/personnel_1.png" alt=""/>
          </div>
          <div className="col-md-12 filter-line">
            <div className="add-button">
              <DropDownButton key = '1' label={translations["Add Munition"]} id="1" items={munitions} />
            </div>
          </div>
          <div className="col-md-12">
            <ReactTable
              data={all_munitions}
              columns={columns}
              defaultPageSize={5}
              className="-striped -highlight"
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
            />
          </div>
        </div>

        <MissileModal show={this.state.missileModalOpen} onClose={this.missileModal} translations = {translations}/>
        <RocketModal show={this.state.rocketModalOpen} onClose={this.rocketModal} translations = {translations}/>
        <GunModal show={this.state.gunModalOpen} onClose={this.gunModal} translations = {translations}/>
        <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} translations = {translations}/>
      </div>
    );
  }
}

MunitionsComponent.propTypes = {
  children: PropTypes.element,

};

export default MunitionsComponent;
