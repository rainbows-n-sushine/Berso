import React, {Component} from 'react'
import './BusinessListing.css';
import './UserManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSearch, faBell, faUser, faSignOutAlt ,  faBuilding, faStore, faHotel, faUtensils, faCog, faHome, faGift, faBriefcase, faCar, faShoppingBag} from '@fortawesome/free-solid-svg-icons';


// Sample data for businesses and categories
const businesses = [
    { id: 1, name: 'Business A', category: 'Category 1', icon: faBuilding },
    { id: 2, name: 'Business B', category: 'Category 2', icon: faStore },
    { id: 3, name: 'Business C', category: 'Category 1', icon: faHotel },
    { id: 4, name: 'Business D', category: 'Category 2', icon: faUtensils },
    { id: 5, name: 'Business E', category: 'Category 3', icon: faCog },
    { id: 6, name: 'Business F', category: 'Category 2', icon: faHome },
    { id: 7, name: 'Business G', category: 'Category 3', icon: faGift },
    { id: 8, name: 'Business H', category: 'Category 1', icon: faBriefcase },
    { id: 9, name: 'Business I', category: 'Category 2', icon: faCar },
    { id: 10, name: 'Business J', category: 'Category 3', icon: faShoppingBag },
  ];
class BusinessListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
    };
  }

  handleCategoryClick = (category) => {
    this.setState({ selectedCategory: category });
  };

  render() {
    const { selectedCategory } = this.state;

    // Filter businesses based on selected category
    const filteredBusinesses = selectedCategory
      ? businesses.filter((business) => business.category === selectedCategory)
      : businesses;

    // Get unique categories from businesses
    const categories = [...new Set(businesses.map((business) => business.category))];

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
      <div className="business-listings">
        <div className="categories">
      <div className='user-management'>

          <h2>Categories</h2></div>
          <ul>
            <li
              className={selectedCategory === null ? 'active' : ''}
              onClick={() => this.handleCategoryClick(null)}
            >
              All
            </li>
            {categories.map((category) => (
              <li
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => this.handleCategoryClick(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="businesses">
            
          <h2>Businesses</h2>
          {filteredBusinesses.length > 0 ? (
  <div className="business-grid">
    {filteredBusinesses.map((business) => (
      <div key={business.id} className="business-card">
        <FontAwesomeIcon icon={business.icon} className="icon" style={{size:"lg"}} />
        <span className="business-name">{business.name}</span>
      </div>
    ))}
  </div>
) : (
  <p>No businesses found.</p>
)}
        </div>
      </div>
      </div>
    );
  }
}

export default BusinessListing;