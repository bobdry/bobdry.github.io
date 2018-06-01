////////////// standard React JSON parse
var destination = document.querySelector("#timeline");
var xhr;

/// pull feed value pairs | CONTAINER
var IPAddressContainer = React.createClass({
  getInitialState: function() {
    return {
        chartHeader: "",
        vehicleLoans: "",
        creditCards: "",
        salaryAdvance: "",
        personalLoans: ""
    };
  },
  componentDidMount: function() {
    xhr = new XMLHttpRequest();
    xhr.open('GET', "../react-json/json/jsoningLoans.json", true);
    xhr.send();
 
    xhr.addEventListener("readystatechange", this.processRequest, false);
  },
  processRequest: function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        //parse JSON 
        var response = JSON.parse(xhr.responseText);
        var jsonLength = response.Loans.length;

        //Array holders        
        const chartOnly = [];     
        const vehOnly = []; 
        const creditcardOnly = [];
        const salaryOnly = []; 
        const personalOnly = []; 
          
        for (var i=0; i<jsonLength; i++) {
            if ( response.Loans[i].LoanType === "LoanType" ) {
                chartOnly.push(response.Loans[i])
            };
            if ( response.Loans[i].LoanType === "Vehicle Loans" ) {
                vehOnly.push(response.Loans[i])
            };
            if ( response.Loans[i].LoanType === "Credit Card" ) {
                creditcardOnly.push(response.Loans[i])
            };
            if ( response.Loans[i].LoanType === "Salary Advance Loan" ) {
                salaryOnly.push(response.Loans[i])
            };
            if ( response.Loans[i].LoanType === "Personal Loans" ) {
                personalOnly.push(response.Loans[i])
            };
        }  
		  
		  console.log(vehOnly);
		  console.log(vehicleBuilt);

        const chartBuilt = chartOnly.map((item) => 
        <div className="row chart-header" key={item.Counter}>
            <div className="col-sm-6">{item.AccountName}</div>
            <div className="col-sm-2">{item.LoanDetailsArray.Term}</div>  
            <div className="col-sm-2">{item.LoanDetailsArray.PayrollAPR}</div>
            <div className="col-sm-2">{item.LoanDetailsArray.DirectPayAPR}</div>
        </div>);
                                                         
        const vehicleBuilt = vehOnly.map((item) => 
        <div className="row vehicle-loans" key={item.Counter}>
            <div className="col-sm-6">{item.AccountName}</div>
            <div className="col-sm-2">{item.LoanDetailsArray.Term}</div>  
            <div className="col-sm-2">{item.LoanDetailsArray.PayrollAPR}</div>
            <div className="col-sm-2">{item.LoanDetailsArray.DirectPayAPR}</div>
        </div>);
            
        const creditBuilt = creditcardOnly.map((item) => 
        <div className="row credit-cards" key={item.Counter}>
            <div className="col-sm-6">{item.AccountName}</div>
            <div className="col-sm-2">{item.LoanDetailsArray.Term}</div>  
            <div className="col-sm-2">{item.LoanDetailsArray.PayrollAPR}</div>
            <div className="col-sm-2">{item.LoanDetailsArray.DirectPayAPR}</div>
        </div>);
                                                     
        const salaryBuilt = salaryOnly.map((item) => 
        <div className="row salary-advance" key={item.Counter}>
            <div className="col-sm-6">{item.AccountName}</div>
            <div className="col-sm-2">{item.LoanDetailsArray.Term}</div>  
            <div className="col-sm-2">{item.LoanDetailsArray.PayrollAPR}</div>
            <div className="col-sm-2">{item.LoanDetailsArray.DirectPayAPR}</div>
        </div>);
            
        const personalBuilt = personalOnly.map((item) => 
        <div className="row personal-loans" key={item.Counter}>
            <div className="col-sm-6">{item.AccountName}</div>
            <div className="col-sm-2">{item.LoanDetailsArray.Term}</div>  
            <div className="col-sm-2">{item.LoanDetailsArray.PayrollAPR}</div>
            <div className="col-sm-2">{item.LoanDetailsArray.DirectPayAPR}</div>
        </div>);
                                        
         
        // set State
        this.setState ({
            chartHeader: chartBuilt,
            vehicleLoans: vehicleBuilt,
            creditCards: creditBuilt,
            salaryAdvance: salaryBuilt,
            personalLoans: personalBuilt
        });
      }
  },
  render: function() {
      return (
          <div>
		  <h2>Vehicle Loans</h2>
          {this.state.chartHeader}
          {this.state.vehicleLoans}
		  <h2>Credit Card</h2>
          {this.state.chartHeader}
          {this.state.creditCards}
		  <h2>Salary Advance Loan</h2>
          {this.state.chartHeader}
          {this.state.salaryAdvance}
		  <h2>Personal Loans</h2>
          {this.state.chartHeader}
          {this.state.personalLoans}
          </div>
      );
    }
});

ReactDOM.render(
  <div>
    <IPAddressContainer/>
  </div>,
  destination
);


// excess
// easy way to index first item of value pair equals
// var VehFirst = response.Loans.findIndex(i => i.LoanType === "Vehicle Loans");