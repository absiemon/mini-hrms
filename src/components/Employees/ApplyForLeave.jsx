import { useState } from "react";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { applyforleave } from "../../http";
import Modal from '../../components/modal/Modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";


const ApplyForLeave = () => {
    const { user } = useSelector(state => state.authSlice);
    const initialState = { title: '', type: '', period: '', startDate: '', endDate: '', reason: '' }
    const [formData, setFormData] = useState(initialState);
    const [maxEndDate, setMaxEndDate] = useState('');

    const inputEvent = (e) => {
        console.log(formData);
        const { name, value } = e.target;
        setFormData((old) => {
            return {
                ...old,
                [name]: value
            }
        })

        // If the start date changes, update the max end date
        if (name === 'startDate') {
            const startDate = new Date(value);
            const maxDate = new Date(startDate);
            maxDate.setDate(startDate.getDate() + 10);
            setMaxEndDate(maxDate.toISOString().split('T')[0]);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const { title, type, startDate, endDate, reason, period } = formData;
        if (!title || !type || !startDate || !endDate || !period || !reason) return toast.error('All Field Required');

        const d = new Date();

        formData["applicantID"] = user.id;
        formData["appliedDate"] = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

        const res = await applyforleave(formData);
        const { success } = res;
        if (success) {
            toast.success("Leave Application Sent!");
            setFormData(initialState);
        }
        else {
            toast.error(res?.error?.message?.toString() ?? "Cannot apply leave please check for leave criteria!");
        }
    }

    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <HeaderSection title='Apply for Leave' />
                    <div className="card">
                        <div className="card-body pr-5 pl-5 m-1">
                            <form className='row' onSubmit={onSubmit} id='addUserForm'>

                                <div className="form-group col-md-4">
                                    <label>Enter Title</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fas fa-pen"></i>
                                            </div>
                                        </div>
                                        <input onChange={inputEvent} value={formData.title} type="text" id='title' name='title' className="form-control" />
                                    </div>
                                </div>

                                <div className="form-group col-md-4">
                                    <label>Leave Type</label>
                                    <select name='type' onChange={inputEvent} value={formData.type} className="form-control select2">
                                        <option>Select</option>
                                        <option>Sick Leave</option>
                                        <option>Casual Leave</option>
                                        <option>Earned Leave</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Enter Period</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fas fa-pen"></i>
                                            </div>
                                        </div>
                                        <input onChange={inputEvent} value={formData.period} type="number" id='period' name='period' className="form-control" max={10} min={0} />
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Start Date</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                        <input onChange={inputEvent} value={formData.startDate} type="date" id="startDate" name="startDate" className="form-control" min={today} ></input>

                                    </div>
                                </div>

                                <div className="form-group col-md-6">
                                    <label>End Date</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                        <input onChange={inputEvent} value={formData.endDate} type="date" id="endDate" name="endDate" className="form-control" min={formData.startDate} max={maxEndDate} disabled={!formData.startDate} ></input>

                                    </div>
                                </div>



                                <div className="form-group col-md-12 ">
                                    <label>Enter Reason</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fas fa-book"></i>
                                            </div>
                                        </div>
                                        <input onChange={inputEvent} value={formData.reason} type="text" id='reason' name='reason' className="form-control" />
                                    </div>
                                </div>

                                <div className="form-group text-center col-md-12">
                                    <button className='btn btn-primary btn-lg' type='submit' style={{ width: '30vh' }}>Apply Leave</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ApplyForLeave;

