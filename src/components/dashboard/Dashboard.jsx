import './dashboard.css';

const Dashboard =() => {
    
    const month = ['January','February','March','April','June','July','August', 'September','October','November','December'];
    const currentMonth = month[new Date().getMonth() - 1];
    const currentYear = new Date().getFullYear();

    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

    return <>
    <div className='main-dashboard'>
        <div className="head-title">
            <div className="left">
                <h1 className='header-color'>Dashboard</h1>
            </div>
            
            <a href="#" className="btn-download">
                <i className="bx bxs-cloud-download"></i>
                <span className="text">Download_PDF</span>
            </a>
        </div>
        <h3 className='header-color'> {currentMonth} {currentYear} </h3>
        <ul className="box-info">
            <li>
            <i className="bx bi bi-piggy-bank-fill"></i>
            <span className="text">
                <h3> {formatter.format(5300)} </h3>
                <p className='p-color'>Total Savings</p>
            </span>
            </li>
            <li>
            <i className="bx bi bi-bar-chart-line-fill light-orage-color"></i>
            <span className="text">
                 <h3>{formatter.format(2000)}</h3> {/* <i className="bi bi-currency-rupee"></i> */}
                <p className='p-color'>Limit p<span className='seperator'>/</span>m to be saved</p>
            </span> 
            {/* Per month limit to save */}
            </li>
            <li>
            <i className="bx bi bi-calendar2-fill light-green-color  "></i>
            <span className="text">
                <h3> {formatter.format(19950)}</h3>
                <p className='p-color'>Salary p<span className='seperator'>/</span>m</p>
            </span>
            </li>
            <li>
            <i className="bx bi bi-wallet-fill light-yellow-color "></i>
            <span className="text">
                <h3>{formatter.format(8000)}</h3>
                <p className='p-color'>Current Balance</p>
            </span>
            </li>
        </ul>

    </div>
    </>
}

export default Dashboard;