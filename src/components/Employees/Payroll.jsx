import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { viewEmployeePayroll } from '../../http';
import { toast } from "react-toastify";
import Loading from '../Loading';
import moment from 'moment';


const Salary = () => {
  const { user } = useSelector(state => state.authSlice);
  const [salary, setSalary] = useState();

  useEffect(() => {
    const obj = {
      "employeeID": user.id
    }
    const fetchData = async () => {
      const res = await viewEmployeePayroll(obj);
      const { success, data, message } = res;

      if (success) {
        setSalary(data)
      }
      else {
        toast.error('Failed to fetch salary data')
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="main-content">
        <section className="section">
          {
            salary ?
              (
                <>
                  <div className="card">
                    <div className="card-header d-flex justify-content-between">

                      <h4>Payroll for the month {moment(salary.month).format('MMMM Y')}</h4>

                    </div>
                  </div>

                  <div className={`card ${salary ? "" : "d-none"}`}>
                    <div className="card-body row">
                      <div className="col-md-3 ">
                        <img className='img-fluid img-thumbnail' src={user.image} alt="" />
                      </div>
                      <div className="col-md-9">
                        <table className='table'>
                          <tbody>
                            <tr>
                              <th>Name</th>
                              <td>{user.name}</td>
                            </tr>
                            <tr>
                              <th>Email</th>
                              <td>{user.email}</td>
                            </tr>
                            <tr>
                              <th>Base Salary</th>
                              <td> Rs. {salary?.baseSalary}</td>
                            </tr>
                            <tr>
                              <th>Total Working Days</th>
                              <td> Rs. {salary?.totalWorkingDays}</td>
                            </tr>

                            <tr>
                              <th>Days Present</th>
                              <td>{salary?.daysPresent}</td>
                            </tr>

                            <tr>
                              <th>Bonus</th>
                              <td>{salary?.bonus}</td>
                            </tr>

                            <tr>
                              <th>Deductions</th>
                              <td>{salary?.deductions}</td>
                            </tr>

                            <tr>
                              <th>Final Salary</th>
                              <td>{salary?.finalSalary}</td>
                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )
              :
              <h5 style={{ margin: '20rem 27rem' }}>No Payroll found for this month</h5>
          }
        </section>
      </div>
    </>
  )
}

export default Salary;
