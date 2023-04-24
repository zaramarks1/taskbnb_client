import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/api/v1/listings";

const getAllListings = () => {
  return axios.get(API_URL);
};

const getListingById = (id) =>{

  return axios.get(API_URL +'/' +id, {headers: authHeader()});
};

const getMyListings = () => {
  return axios.get(API_URL + '/my', {headers: authHeader()});
};

const addListings = (capacity,address,unitType) => {

  return axios.post(API_URL,{
        capacity: capacity,
        address: address,
        unitType: unitType
},  { headers: authHeader() })
};

const updateListing = (id, capacity, address, unitType) => {

  return axios.put(API_URL + '/' + id ,{
    capacity: capacity,
    address: address,
    unitType: unitType
},  { headers: authHeader() })

};

const deleteListing = (id) => {
  return axios.delete(API_URL + '/' + id, { headers: authHeader() })
};



const listingService = {
  getAllListings,
  addListings,
  getMyListings,
  getListingById,
  updateListing,
  deleteListing,
};

export default listingService;