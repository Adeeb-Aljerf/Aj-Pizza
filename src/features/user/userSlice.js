import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(resolve, reject);

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in.
    // Payload of the FULFILLED state
    return { position, address };
  },
);

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error =
          "Location access denied, Please enable GPS or type your address manually to continue";
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

//? without using addCase and builder
/*
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle pending state
    case 'user/fetchAddress/pending':
      return {
        ...state,
        status: 'loading'
      };

    // Handle success state  
    case 'user/fetchAddress/fulfilled':
      return {
        ...state,
        position: action.payload.position,
        address: action.payload.address,
        status: 'idle'
      };

    // Handle error state
    case 'user/fetchAddress/rejected':
      return {
        ...state,
        status: 'error',
        error: 'There was a problem getting your address. Make sure to fill this field!'
      };

    // Handle name updates
    case 'user/updateName':
      return {
        ...state,
        username: action.payload
      };

    default:
      return state;
  }
*/
