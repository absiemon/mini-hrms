import axios from 'axios';
console.log("process.env.MODE", process.env.REACT_APP_MODE)

const api = axios.create({
    baseURL: `${process.env.REACT_APP_MODE === 'DEVELOPMENT' ? process.env.REACT_APP_DEV_BASE_URL : process.env.REACT_APP_PROD_BASE_URL}/api`,
    withCredentials: true,
})

// Add a request interceptor
api.interceptors.request.use(
    async function (config) {
        // Set headers
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        config.headers['refresh-token'] = localStorage.getItem('refreshToken');
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

//Auth
export const doLogin = data => api.post('/auth/login', data);
export const dLogout = () => api.get('/auth/logout');

//Admin
export const getCounts = () => api.get('/admin/counts');
export const getEmployees = () => api.get('/admin/employees');
export const getAdmins = () => api.get('/admin/admins');

export const addUser = data => api.post('/admin/user', data);
export const updateUser = (id, data) => api.patch(`/admin/user/${id}`, data);
export const getEmployee = data => api.get(`/admin/employee/${data}`);
export const getUser = data => api.get(`/admin/user/${data}`);
export const getAttendance = data => api.post('admin/view-employee-attendance', data);
export const viewLeaves = data => api.post('admin/view-leave-applications', data);
export const updateLeave = (id, data) => api.post(`admin/update-leave/${id}`, data);
export const assignSalary = data => api.post('admin/assign-employee-salary', data);
export const updateSalary = data => api.post('admin/update-employee-salary', data);
export const viewAllSalaries = data => api.post('admin/view-all-salary', data);


// Employee
export const markEmployeeAttendance = data => api.post('/employee/mark-employee-attendance', data);
export const viewEmployeeAttendance = data => api.post('/employee/view-employee-attendance', data);
export const employeeCheckedInToday = data => api.get(`/employee/checkedIn-today`);
export const applyforleave = data => api.post('/employee/apply-leave-application', data);
export const viewLeaveApplications = data => api.post('/employee/view-leave-applications', data);
export const viewEmployeePayroll = data => api.get('employee/view-payroll');

api.interceptors.response.use((response) => {
    console.log("All Cookies", document.cookie);
    return response.data;
}, (error) => {
    console.log(error);
    return error.response.data
})

export default api;