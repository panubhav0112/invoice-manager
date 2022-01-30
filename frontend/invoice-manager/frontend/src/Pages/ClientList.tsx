import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { Spin, Button, Pagination } from 'antd';
import axios from 'axios';
import NavigationBar from '../components/Navbar';
import './ClientList.css';
import { Table, Dropdown, Menu } from 'antd';
import ViewDetails from '../Pages/ViewDetails';
import NewInvoice from '../Pages/NewInvoice';

const ClientList = ({ setSelectedCompany }: any) => {
  const [loading, setLoading] = useState(false);
  const [allCompanies, setAllCompanies] = useState<Array<any>>([]);
  const [current, setCurrent] = useState(1);
  const [gstnumber, setGstnumber] = useState('');
  const [companyCount, setCompanyCount] = useState(0);
  const menu = (
    <Menu>
      <Menu.Item>
        View Details
        <Routes>
          <Route path='/viewDetails' element={<ViewDetails />}></Route>
        </Routes>
        <Link to={`/viewDetails/${gstnumber}`}></Link>
      </Menu.Item>
      <Menu.Item>
        Raise Invoice
        <Routes>
          <Route path='/newInvoice' element={<NewInvoice />}></Route>
        </Routes>
        <Link to='/newInvoice'></Link>
      </Menu.Item>
    </Menu>
  );
  let companiesName: Array<any> = [];

  useEffect(() => {
    setLoading(true);
    const getComapnies = async () => {
      try {
        axios
          .get('http://localhost:5000/api/companiesPage/getCompaniesPage/1')
          .then((companies) => {
            // console.log(companies);
            setLoading(false);
            // companies.data.data[0]
            companiesName = companies.data.data[0];
            const updatedCompanies = companiesName.map((company) => ({
              ...company,
              lastInvoice: '2',
              invoiceDate: '22/12/21',
              lastTransaction: '12000',
            }));
            setAllCompanies(updatedCompanies);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      } catch (error) {
        console.log('myError');
      }
    };
    getComapnies();
    axios
      .get('http://localhost:5000/api/companiesCount/getCompaniesCount')
      .then((companyCount) => setCompanyCount(companyCount.data.data[0]))
      .catch((error) => {
        console.log(error);
      });
    return;
  }, []);

  let data_company: any = [];
  data_company = allCompanies;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'companyName',
    },
    {
      title: 'City',
      dataIndex: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
    },
    {
      title: 'GST No.',
      dataIndex: 'gstNumber',
    },
    {
      title: 'Last Invoice',
      dataIndex: 'lastInvoice',
    },
    {
      title: 'Invoice Date',
      dataIndex: 'invoiceDate',
    },
    {
      title: 'Last Transaction',
      dataIndex: 'lastTransaction',
      width: 150,
    },
    {
      title: '',
      key: 'more',
      render: (text: any, record: any, index: any) => (
        <div
          onClick={() => {
            // alert(record.gstNumber);
            setGstnumber(record.gstNumber);
          }}
        >
          <Dropdown overlay={menu}>
            <a
              className='ant-dropdown-link'
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              . . .
            </a>
          </Dropdown>
        </div>
      ),
    },
    // {
    //   title: 'Active',
    //   dataIndex: 'active',
    //   key: 'active',
    //   width: 0,
    //   render: (text: any, record: any, index: any) => (
    //     <div
    //       className='btn-wrap'
    //       style={{
    //         width: '10px',
    //       }}
    //     >
    //       {' '}
    //       <Button
    //         className='viewDetailsBtn'
    //         onClick={(e) => {
    //           console.log(record.gstNumber);
    //         }}
    //       >
    //         {' '}
    //         Click{' '}
    //       </Button>
    //     </div>
    //   ),
    // },
  ];

  setSelectedCompany(gstnumber);

  useEffect(() => {
    setLoading(true);
    const getComapnies = async () => {
      try {
        axios
          .get(
            `http://localhost:5000/api/companiesPage/getCompaniesPage/${current}`
          )
          .then((companies) => {
            console.log(companies.data.data[0]);
            setLoading(false);
            // companies.data.data[0]
            companiesName = companies.data.data[0];
            const updatedCompanies = companiesName.map((company) => ({
              ...company,
              lastInvoice: '2',
              invoiceDate: '22/12/21',
              lastTransaction: '12000',
            }));
            setAllCompanies(updatedCompanies);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      } catch (error) {
        console.log('myError');
      }
    };
    getComapnies();
    return;
  }, [current]);

  const pageSize = 10;

  const getData = (current: any, pageSize: any) => {
    // Normally you should get the data from the server
    return allCompanies;
  };

  console.log(allCompanies);

  // Custom pagination component
  const MyPagination = ({ page, onChange, current }: any) => {
    return (
      <Pagination
        total={companyCount}
        current={current}
        pageSize={pageSize}
        className='paginateCompanies'
        onChange={onChange}
      />
    );
  };

  // console.log(data_company);

  return (
    <>
      <div className='myNav'>
        <NavigationBar />
      </div>
      <div className='clientTable'>
        <h1 className='listClient'>Clients</h1>
        {loading ? (
          <Spin size='large' className='listSpinner' />
        ) : (
          <>
            <MyPagination
              total={allCompanies.length}
              current={current}
              onChange={setCurrent}
            />
            <Table
              columns={columns}
              dataSource={getData(current, pageSize)}
              className='list'
              pagination={false}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ClientList;
