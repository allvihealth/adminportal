import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://127.0.0.1:5000'
  : import.meta.env.VITE_SERVER_URL || '';

// Existing Platform Thunk...
export const fetchPlatformOverview = createAsyncThunk(
  'admin/fetchPlatformOverview',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/api/admin/platform-overview`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to sync platform records.');
    }
  }
);


// Add this import-ready code inside your src/store/slices/adminSlice.js

// 🚀 ASYNCHRONOUS THUNK: Submits a new whitelabel organization block directly
export const createOrganisation = createAsyncThunk(
  'admin/createOrganisation',
  async (orgData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${baseURL}/api/admin/organisations`, orgData);
      
      // Sync dashboard memory records cleanly 
      dispatch(fetchPlatformOverview());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to initialize organization profile.');
    }
  }
);

// Add these builders directly inside your extraReducers block:
// .addCase(createOrganisation.pending, (state) => { state.loading = true; state.error = null; })
// .addCase(createOrganisation.fulfilled, (state) => { state.loading = false; state.activeTab = 'orgs'; })
// .addCase(createOrganisation.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

// 🚀 NEW ASYNCHRONOUS THUNK: Submits patient form data to enrollment route
export const enrollPatient = createAsyncThunk(
  'admin/enrollPatient',
  async (patientData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${baseURL}/api/patient/enroll`, patientData);
      
      // 🌟 Re-fetch the layout matrix overview so the new patient appears instantly in your directories
      dispatch(fetchPlatformOverview());
      
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to enroll patient invitation.');
    }
  }
);

const initialState = {
  activeTab: 'overview',
  metrics: { totalPatients: 0, activeOrganisations: 0, reviewQueueCount: 0, activeRedFlags: 0 },
  organisations: [],
  patients: [],
  reviewQueue: [],
  alerts: [],
  auditLogs: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Platform Overview Cases */
      .addCase(fetchPlatformOverview.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchPlatformOverview.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success) {
          state.metrics = action.payload.metrics || state.metrics;
          state.organisations = action.payload.organisations || [];
          state.patients = action.payload.patients || [];
          state.auditLogs = action.payload.auditLogs || [];
        }
      })
      .addCase(fetchPlatformOverview.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      /* 🚀 Enroll Patient Cases */
      .addCase(enrollPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollPatient.fulfilled, (state) => {
        state.loading = false;
        state.activeTab = 'patients'; // ➔ Swaps view panel automatically on success
      })
      .addCase(enrollPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveTab } = adminSlice.actions;
export default adminSlice.reducer;