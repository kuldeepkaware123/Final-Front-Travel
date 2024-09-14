import axios from 'axios'
import { toast } from 'react-toastify'

// const baseUrl = 'http://localhost:8080/api'
export const RZ_API_KEY = 'rzp_test_IiW0nLyus4Zr7T'
export const RZ_API_SECRET = 'ofy3jAelXAVmwX9dXTSG3N4l'
// const baseUrl = 'https://rajputana-routes-backend.vercel.app/api'
const baseUrl = 'https://rajputana-routes-backend.onrender.com/api'

export const MyAPI = {
  GET: async (url, token = null) => {
    try {
      const response = await axios.get(`${baseUrl}${url}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      })
      return {
        status: response.status,
        data: response.data,
        message: response.data.message || response.message,
      }
    } catch (error) {
      let errorMessage = 'An error occurred while processing your request.'
      if (error.response) {
        // The request was made and the server responded with a status code
        errorMessage = error.response.data.message || errorMessage
        return {
          status: error.response.status,
          message: errorMessage,
          data: error.response.data,
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response received from server.'
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message || errorMessage
      }
      return {
        status: 500,
        message: errorMessage,
      }
    }
  },

  POST: async (url, data, token = null) => {
    try {
      const response = await axios.post(`${baseUrl}${url}`, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
      })
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      let errorMessage = 'An error occurred while processing your request.'
      if (error.response) {
        // The request was made and the server responded with a status code
        errorMessage = error.response.data.message || errorMessage
        return {
          status: error.response.status,
          message: errorMessage,
          data: error.response.data,
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response received from server.'
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message || errorMessage
      }
      return {
        status: 500,
        message: errorMessage,
      }
    }
  },

  FORM_DATA_POST: async (url, formData, token = null) => {
    try {
      const response = await axios.post(`${baseUrl}${url}`, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'multipart/form-data', // Use multipart/form-data for form data
        },
      })
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      let errorMessage = 'An error occurred while processing your request.'
      if (error.response) {
        // The request was made and the server responded with a status code
        errorMessage = error.response.data.message || errorMessage
        return {
          status: error.response.status,
          message: errorMessage,
          data: error.response.data,
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response received from server.'
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message || errorMessage
      }
      return {
        status: 500,
        message: errorMessage,
      }
    }
  },

  PUT: async (url, data, token = null) => {
    try {
      // Determine if the data is a FormData object
      const isFormData = data instanceof FormData

      const response = await axios.put(`${baseUrl}${url}`, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        },
      })
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      let errorMessage = 'An error occurred while processing your request.'
      if (error.response) {
        // The request was made and the server responded with a status code
        errorMessage = error.response.data.message || errorMessage
        return {
          status: error.response.status,
          message: errorMessage,
          data: error.response.data,
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response received from server.'
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message || errorMessage
      }
      return {
        status: 500,
        message: errorMessage,
      }
    }
  },

  DELETE: async (url, token = null) => {
    try {
      const response = await axios.delete(`${baseUrl}${url}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
      })
      return {
        status: response.status,
        data: response.data,
      }
    } catch (error) {
      let errorMessage = 'An error occurred while processing your request.'
      if (error.response) {
        // The request was made and the server responded with a status code
        errorMessage = error.response.data.message || errorMessage
        return {
          status: error.response.status,
          message: errorMessage,
          data: error.response.data,
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response received from server.'
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message || errorMessage
      }
      return {
        status: 500,
        message: errorMessage,
      }
    }
  },
}

export const MyToken = {
  getItem: () => {
    return sessionStorage.getItem('token')
  },
  setItem: (value) => {
    sessionStorage.setItem('token', value)
  },
  removeItem: () => {
    sessionStorage.removeItem('token')
  },
}

export const MyError = {
  success: (message) => {
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  },
  warn: (message) => {
    toast.warn(message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  },
  error: (message) => {
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  },
}

export const truncateText = (text, wordLimit) => {
  const words = text.split(' ')
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...'
  }
  return text
}

export const calculateDiscountedPrice = (discountType, actualPrice, discountValue) => {
  if (discountType === 'percentage') {
    return actualPrice - actualPrice * (discountValue / 100)
  } else if (discountType === 'price') {
    return actualPrice - discountValue
  } else {
    throw new Error('Invalid discount type')
  }
}
