import React, { useEffect } from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import { FaRegEdit } from 'react-icons/fa'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FaTruckMoving } from 'react-icons/fa'
import { FaMapMarkedAlt } from 'react-icons/fa'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import { Pagination, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MyToken } from '../../MyAPI'
import { setToken } from '../../store'

const Dashboard = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    let token = MyToken.getItem()
    if (token) {
      dispatch(setToken(token))
    }
  }, [])

  const token = useSelector((state) => state.token)

  useEffect(() => {
    if (!token || token === '') {
      navigate('/admin/login')
    }
  }, [token])

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      {/* <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Recent Jobs
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3"></CButtonGroup>
            </CCol>
          </CRow>

          <Table className="mt-3" striped responsive hover>
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Client Id</th>
                <th className="text-center">AWB</th>
                <th className="text-center">Driver Id</th>
                <th className="text-center">Date</th>
                <th className="text-center">Status</th>
                <th className="text-center" colSpan={4}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">1</td>
                <td className="text-center">12345</td>
                <td className="text-center">Reference Id 1</td>
                <td className="text-center">Client Id 1</td>
                <td className="text-center">AWB 1</td>
                <td className="text-center">Driver Id 1</td>
                <td className="text-center">13/05/2024</td>
                <td className="text-center">
                  <div
                    className="px-1 py-1 rounded-5"
                    style={{ color: '#6C5CE7', backgroundColor: '#DFDDFD' }}
                  >
                    Picked Up
                  </div>
                </td>
                <td className="text-center cursor-pointer">
                  <FaRegEdit size={22} color="#624DE3" />
                </td>
                <td className="text-center cursor-pointer">
                  <RiDeleteBin5Line size={22} color="#A30D11" />
                </td>
                <td className="text-center cursor-pointer">
                  <FaTruckMoving size={22} color="#0984E3" />
                </td>
                <td className="text-center cursor-pointer">
                  <FaMapMarkedAlt onClick={() => navigate('/location')} size={22} color="#FDCB6E" />
                </td>
              </tr>
              <tr>
                <td className="text-center">1</td>
                <td className="text-center">12345</td>
                <td className="text-center">Reference Id 1</td>
                <td className="text-center">Client Id 1</td>
                <td className="text-center">AWB 1</td>
                <td className="text-center">Driver Id 1</td>
                <td className="text-center">13/05/2024</td>
                <td className="text-center">
                  <div
                    className="px-1 py-1 rounded-5"
                    style={{ color: '#6C5CE7', backgroundColor: '#DFDDFD' }}
                  >
                    Picked Up
                  </div>
                </td>
                <td className="text-center cursor-pointer">
                  <FaRegEdit size={22} color="#624DE3" />
                </td>
                <td className="text-center cursor-pointer">
                  <RiDeleteBin5Line size={22} color="#A30D11" />
                </td>
                <td className="text-center cursor-pointer">
                  <FaTruckMoving size={22} color="#0984E3" />
                </td>
                <td className="text-center cursor-pointer">
                  <FaMapMarkedAlt onClick={() => navigate('/location')} size={22} color="#FDCB6E" />
                </td>
              </tr>
              <tr>
                <td className="text-center">1</td>
                <td className="text-center">12345</td>
                <td className="text-center">Reference Id 1</td>
                <td className="text-center">Client Id 1</td>
                <td className="text-center">AWB 1</td>
                <td className="text-center">Driver Id 1</td>
                <td className="text-center">13/05/2024</td>
                <td className="text-center">
                  <div
                    className="px-1 py-1 rounded-5"
                    style={{ color: '#CD6200', backgroundColor: '#FEF2E5' }}
                  >
                    Pending
                  </div>
                </td>
                <td className="text-center cursor-pointer">
                  <FaRegEdit size={22} color="#624DE3" />
                </td>
                <td className="text-center cursor-pointer">
                  <RiDeleteBin5Line size={22} color="#A30D11" />
                </td>
                <td className="text-center cursor-pointer">
                  <FaTruckMoving size={22} color="#0984E3" />
                </td>
                <td className="text-center cursor-pointer">
                  <FaMapMarkedAlt onClick={() => navigate('/location')} size={22} color="#FDCB6E" />
                </td>
              </tr>
              <tr>
                <td className="text-center">1</td>
                <td className="text-center">12345</td>
                <td className="text-center">Reference Id 1</td>
                <td className="text-center">Client Id 1</td>
                <td className="text-center">AWB 1</td>
                <td className="text-center">Driver Id 1</td>
                <td className="text-center">13/05/2024</td>
                <td className="text-center">
                  <div
                    className="px-1 py-1 rounded-5"
                    style={{ color: '#CD6200', backgroundColor: '#FEF2E5' }}
                  >
                    Pending
                  </div>
                </td>
                <td className="text-center cursor-pointer">
                  <FaRegEdit size={22} color="#624DE3" />
                </td>
                <td className="text-center cursor-pointer">
                  <RiDeleteBin5Line size={22} color="#A30D11" />
                </td>
                <td className="text-center cursor-pointer">
                  <FaTruckMoving size={22} color="#0984E3" />
                </td>
                <td className="text-center cursor-pointer">
                  <FaMapMarkedAlt onClick={() => navigate('/location')} size={22} color="#FDCB6E" />
                </td>
              </tr>
              <tr>
                <td className="text-center">1</td>
                <td className="text-center">12345</td>
                <td className="text-center">Reference Id 1</td>
                <td className="text-center">Client Id 1</td>
                <td className="text-center">AWB 1</td>
                <td className="text-center">Driver Id 1</td>
                <td className="text-center">13/05/2024</td>
                <td className="text-center">
                  <div
                    className="px-1 py-1 rounded-5"
                    style={{ color: '#1F9254', backgroundColor: '#EBF9F1' }}
                  >
                    Delivered
                  </div>
                </td>
                <td className="text-center cursor-pointer">
                  <FaRegEdit size={22} color="#624DE3" />
                </td>
                <td className="text-center cursor-pointer">
                  <RiDeleteBin5Line size={22} color="#A30D11" />
                </td>
                <td className="text-center cursor-pointer">
                  <FaTruckMoving size={22} color="#0984E3" />
                </td>
                <td className="text-center cursor-pointer">
                  <FaMapMarkedAlt onClick={() => navigate('/location')} size={22} color="#FDCB6E" />
                </td>
              </tr>
            </tbody>
          </Table>

          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
        </CCardBody>
      </CCard> */}
    </>
  )
}

export default Dashboard
