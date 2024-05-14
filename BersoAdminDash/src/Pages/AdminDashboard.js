import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartBar, faCog, faSearch, faBell, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './UserManagement'
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class AdminDashboard extends Component {

	
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
		this.addSymbols = this.addSymbols.bind(this);
	}
	addSymbols(e) {
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
		if (order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	render() {
		const options = {
			animationEnabled: true,
			colorSet: "colorSet2",
			title: {
				text: "Monthly Sales"
			},
			axisX: {
				valueFormatString: "MMMM"
			},
			axisY: {
				prefix: "$",
				labelFormatter: this.addSymbols
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries,
				verticalAlign: "top"
			},
			data: [{
				type: "column",
				name: "Actual Sales",
				showInLegend: true,
				xValueFormatString: "MMMM YYYY",
				yValueFormatString: "$#,##0",
				dataPoints: [
					{ x: new Date(2017, 0), y: 27500 },
					{ x: new Date(2017, 1), y: 29000 },
					{ x: new Date(2017, 2), y: 22000 },
					{ x: new Date(2017, 3), y: 26500 },
					{ x: new Date(2017, 4), y: 33000 },
					{ x: new Date(2017, 5), y: 37000 },
					{ x: new Date(2017, 6), y: 32000 },
					{ x: new Date(2017, 7), y: 27500 },
					{ x: new Date(2017, 8), y: 29500 },
					{ x: new Date(2017, 9), y: 43000 },
					{ x: new Date(2017, 10), y: 55000, indexLabel: "High Renewals" },
					{ x: new Date(2017, 11), y: 39500 }
				]
			},{
				type: "line",
				name: "Expected Sales",
				showInLegend: true,
				yValueFormatString: "$#,##0",
				dataPoints: [
					{ x: new Date(2017, 0), y: 38000 },
					{ x: new Date(2017, 1), y: 39000 },
					{ x: new Date(2017, 2), y: 35000 },
					{ x: new Date(2017, 3), y: 37000 },
					{ x: new Date(2017, 4), y: 42000 },
					{ x: new Date(2017, 5), y: 48000 },
					{ x: new Date(2017, 6), y: 41000 },
					{ x: new Date(2017, 7), y: 38000 },
					{ x: new Date(2017, 8), y: 42000 },
					{ x: new Date(2017, 9), y: 45000 },
					{ x: new Date(2017, 10), y: 48000 },
					{ x: new Date(2017, 11), y: 47000 }
				]
			},{
				type: "area",
				name: "Profit",
				markerBorderColor: "white",
				markerBorderThickness: 2,
				showInLegend: true,
				yValueFormatString: "$#,##0",
				dataPoints: [
					{ x: new Date(2017, 0), y: 11500 },
					{ x: new Date(2017, 1), y: 10500 },
					{ x: new Date(2017, 2), y: 9000 },
					{ x: new Date(2017, 3), y: 13500 },
					{ x: new Date(2017, 4), y: 13890 },
					{ x: new Date(2017, 5), y: 18500 },
					{ x: new Date(2017, 6), y: 16000 },
					{ x: new Date(2017, 7), y: 14500 },
					{ x: new Date(2017, 8), y: 15880 },
					{ x: new Date(2017, 9), y: 24000 },
					{ x: new Date(2017, 10), y: 31000 },
					{ x: new Date(2017, 11), y: 19000 }
				]
			}]
		}
    return (
      <div>
      <div className='user-management'>
      <div className="top-bar">
      <input type="text" placeholder="Search" />
      <FontAwesomeIcon icon={faSearch} className="icon" />
      <div className="top-bar2">
        
        <FontAwesomeIcon icon={faBell} className="icon" />
        <FontAwesomeIcon icon={faUser} className="icon" />
        <FontAwesomeIcon icon={faSignOutAlt } className="icon" />
      </div>
    </div>
    </div>
      <div className='user-management'>
        
        <div className="side-menu">
          <h2>Menu</h2>
          <ul>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} className="menu-icon" /> Home
              </Link>
            </li>
            <li>
              <Link to="/UserManagement">
                <FontAwesomeIcon icon={faChartBar} className="menu-icon" /> User 
              </Link>
            </li>
			<li>
              <Link to="/BusinessListing">
                <FontAwesomeIcon icon={faChartBar} className="menu-icon" /> Business Listings 
              </Link>
            </li>
            <li>
			<li>
              <Link to="/">
                <FontAwesomeIcon icon={faChartBar} className="menu-icon" /> Report
              </Link>
            </li>
              <Link to="/settings">
                <FontAwesomeIcon icon={faCog} className="menu-icon" /> Settings
              </Link>
            </li>
          </ul>
        </div>

		<div className="overview">
  <h2>Overview</h2>
  <div className="overview-item">
    <span className="overview-label">Active listing </span>
    <div className="progress-bar active-listing">
      <div className="progress-bar-fill" ></div>
    </div>
    <span className="overview-percentage active-listing">95%</span>
  </div>
  <div className="overview-item">
    <span className="overview-label">Claimed listing </span>
    <div className="progress-bar claimed-listing">
      <div className="progress-bar-fill" ></div>
    </div>
    <span className="overview-percentage claimed-listing">75%</span>
  </div>
  <div className="overview-item">
    <span className="overview-label">Reported listing </span>
    <div className="progress-bar reported-listing">
      <div className="progress-bar-fill" ></div>
    </div>
    <span className="overview-percentage reported-listing">55%</span>
  </div>
  <div className="overview-item">
    <span className="overview-label">Pending listing </span>
    <div className="progress-bar pending-listing">
      <div className="progress-bar-fill" ></div>
    </div>
    <span className="overview-percentage pending-listing">25%</span>
  </div>
</div>

<div className="graph-container">
  <CanvasJSChart options={options} onRef={ref => (this.chart = ref)} />
</div>
       
        <div className="side-component">
          <Link>
      <div className="count-item">
    <div className="count">50+</div>
    <div className="label">Total Categories</div>
  </div>
  </Link>
  <Link>
  <div className="count-item">
    <div className="count">100+</div>
    <div className="label">Total Listings</div>
  </div>
  </Link>
  <Link>
  <div className="count-item">
    <div className="count">20+</div>
    <div className="label">Claimed Listings</div>
  </div>
  </Link>
  <Link>
  <div className="count-item">
    <div className="count">10+</div>
    <div className="label">Reported Listings</div>
  </div>
  </Link>
</div>
<p></p>
<br/>




        </div>
        </div> 
    );
  }
}

export default AdminDashboard;    