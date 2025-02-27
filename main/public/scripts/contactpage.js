// create a new class for contact box 
var ContactBox = React.createClass ({
  // load the contacts from the server 
  loadContactsFromServer: function() {
    // call ajax 
    $.ajax({
      // set url 
      url: this.props.url,
      // set datatype
      dataType: 'json',
      // set no cache
      cache: false,
      // define success 
      success: function(data) {
        //set the state with the newly loaded data so the display will update
        this.setState({data: data});
        // bind it to this
      }.bind(this),
      // if there is an error
      error: function(xhr, status, err) {
        // log the error to the console as string
        console.error(this.props.url, status, err.toString());
        // bind to this 
      }.bind(this)
    });
  },
  // function to see if the component mounted 
  componentDidMount: function() {
    //Once the component is fully loaded, we grab the contacts
    this.loadContactsFromServer();
    //... and set an interval to continuously load new data:
    setInterval(this.loadContactsFromServer, this.props.pollInterval);
  },
  // handle contact submit function 
  handleContactSubmit: function(contact) {
    // call ajax
    $.ajax({
      // set url 
      url: this.props.url,
      // set datatype
      dataType: 'json',
      // set type to POST
      type: 'POST',
      // set data as contact
      data: contact,
      // when sucessful 
      success: function(data) {
        //We set the state again after submission, to update with the submitted data
        this.setState({data: data});
        // bind to this
      }.bind(this),
      // if there is an error
      error: function(xhr, status, err) {
        // write error to console as a string
        console.error(this.props.url, status, err.toString());
        // bind to this 
      }.bind(this)
      });
    },
    // render function 
    render: function() {
      // return the following to the screen 
        return (
          // div for the contact box
            <div className="ContactBox">
              {/* title for the contact form */}
                <h1>Contact Form</h1>
                {/* paragraph for requried disclaimer */}
                <p>Required fields are marked with an <span className="required">*</span>.</p>
                {/* image */}
                <img
                    // image src
                    src="images/Critters & Code.png" 
                    // image class name to float to the right
                    className="contactLogo"
                />
                {/* call the contact form and when submitted call handlecontactsubmit*/}
                <Contactform2 onContactSubmit={this.handleContactSubmit}/>
                {/* end div */}
            </div>
        );
    }
});

// define new class for contactform2 
var Contactform2 = React.createClass({
    // set the initial state 
    getInitialState: function () {
      // return the following properties 
        return {
            // set client name
            clientname: "",
            // set client email 
            clientemail: "",
            // set client phone
            clientphone: "",
            // set desired service
            desiredservice: "",
            // set desired date
            desireddate: "",
            // set desired time
            desiredtime: "",
            // set desired employee
            desiredemployee: "",
            // set client comments
            clientcomments: "",
            // set marketing from 
            marketingfrom: "",
            // set newsletter text 
            newslettertext: false,
            // set newsletter email 
            newsletteremail: false,
            // set alert message 
            alertMessage: "",
            // set alert visibility 
            alertVisible: false

        };
    },
    // function to validate email 
    validateEmail: function (value) {
        // email regex
        var re=  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // return the result of the test 
        return re.test(value);
    },
    // function to validate phone
    validatePhone: function (value) {
      //phone regex 
      var re=  /^(\+?\d{1,4}[-.\s]?)?((\(\d{1,4}\))|\d{1,4})[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
      // return the result of the test
      return re.test(value);
    },
    // common validate function
    commonValidate: function () {
      // return true
        return true;
    },
    // handle submit function 
    handleSubmit: function(e) {
      // prevent default behavior 
      e.preventDefault();
      
      // set variable to hold contact data 
      var contactData = {
        // set and trim client name
        clientname: this.state.clientname.trim(),
        // set and trim client email 
        clientemail: this.state.clientemail.trim(),
        // set and trim client phone
        clientphone: this.state.clientphone.trim(),
        // set and trim desired service
        desiredservice: this.state.desiredservice.trim(),
        // set and trim desired date
        desireddate: this.state.desireddate.trim(),
        // set and trim desired time
        desiredtime: this.state.desiredtime.trim(),
        // set and trim desired employee
        desiredemployee: this.state.desiredemployee.trim(),
        // set and trim client comments
        clientcomments: this.state.clientcomments.trim(),
        // set and trim marketing from
        marketingfrom: this.state.marketingfrom.trim(),
        // set newsletter text 
        newslettertext: this.state.newslettertext,
        // set newsletter email 
        newsletteremail: this.state.newsletteremail
      }
      
      // if client name is empty 
      if (contactData.clientname === "") {
        // set alert message and make it visible 
        this.setState({ alertMessage: "Please enter a valid full name.", alertVisible: true });
        // return 
        return;
      }
    
      // if client email is not valid 
      if (!this.validateEmail(contactData.clientemail)) {
        // set alert message and make it visible 
        this.setState({ alertMessage: "Please enter a valid email address.", alertVisible: true });
        // return 
        return;
      }
    
      // if client phone is not valid 
      if (!this.validatePhone(contactData.clientphone)) {
        // set alert message and make it visible
        this.setState({ alertMessage: "Please enter a valid phone number.", alertVisible: true });
        // return 
        return;
      }
    
      // if desired service is empty 
      if (contactData.desiredservice === "") {
        // set alert message and make it visible
        this.setState({ alertMessage: "Please select a desired service.", alertVisible: true });
        // return 
        return;
      }

      // if newsletter email is false
      if (contactData.newsletteremail === false){
        // save it as No
        contactData.newsletteremail = "No"
      }
      // if newsletter email is true
      else {
        // save it as yes
        contactData.newsletteremail = "Yes"
      }

      // if newsletter email is false
      if (contactData.newslettertext === false){
        // save it as No
        contactData.newslettertext = "No"
      }
      // if newsletter email is true
      else {
        // save it as yes
        contactData.newslettertext = "Yes"
      }
    
      // if everything is filled out, submit data 
      this.props.onContactSubmit(contactData);
    
      // set alert message and make it visible
      this.setState({ alertMessage: "Form submitted! We will contact you soon.", alertVisible: true });
    
      // Set timeout
      setTimeout(() => {
        // set alert to be empty and not visible 
        this.setState({ alertVisible: false, alertMessage: "" });
        // set for 3 seconds
      }, 3000);

      // empty the field states 
      this.setState({
        // reset client name
        clientname: "",
        // reset client email 
        clientemail: "",
        // reset client phone 
        clientphone: "",
        // reset desired service
        desiredservice: "",
        // reset desired date
        desireddate: "",
        // reset desired time
        desiredtime: "",
        // reset desired employee
        desiredemployee: "",
        // reset client comments
        clientcomments: "",
        // reset marketing
        marketingfrom: "",
        // reset newsletter text 
        newslettertext: false,
        // reset newsletter email 
        newsletteremail: false
      });
      
    },
    // set value function 
    setValue: function (field, event) {
      // hold objects 
        var object = {};
        // set the field to the target value 
        object[field] = event.target.value;
        // set the state of the object
        this.setState(object);
    },
    // when the checkbox changes 
    handleCheckboxChange: function (field, event) {
      // set the field state to be the selected choice 
      this.setState({ [field]: event.target.checked });
    },
    
    // render the form to the screen
    render: function () {
      // return the following
        return (
          // create a form that calls handle submit when submitted
            <form className="contactForm" onSubmit={this.handleSubmit}>
              {/* h2 for section */}
                <h2>Contact Information</h2>
                {/* table */}
                <table>
                  {/* table body */}
                    <tbody>
                      {/* table row */}
                        <tr>
                            {/* table header */}
                            <th><span className="required">*</span>Full Name:</th>
                            {/* table data */}
                            <td>
                              {/* text input */}
                                <TextInput
                                    // set the value for client name 
                                    value={this.state.clientname}
                                    // set the name to client name
                                    uniqueName="clientname"
                                    // set text area to false
                                    textArea={false}
                                    // set required to true
                                    required={true}
                                    // set min characters to 4
                                    minCharacters={4}
                                    // use common validate 
                                    validate={this.commonValidate}
                                    // bind the value to client name 
                                    onChange={this.setValue.bind(this, 'clientname')}
                                    // set error message 
                                    errorMessage="Full name is invalid"
                                    // set empty message
                                    emptyMessage="Full name is required" />
                            </td>
                        </tr>
                        {/* table row */}
                        <tr>
                            {/* table header  */}
                            <th><span className="required">*</span>E-Mail Address:</th>
                            {/* table data */}
                            <td>
                              {/* text input */}
                                <TextInput
                                    // set value to client email 
                                    value={this.state.clientemail}
                                    // set name to client email 
                                    uniqueName="clientemail"
                                    // set text area to false
                                    textArea={false}
                                    // set required to true 
                                    required={true}
                                    // set min characters to 6
                                    minCharacters={6}
                                    // use validate email function 
                                    validate={this.validateEmail}
                                    // bind this to client email 
                                    onChange={this.setValue.bind(this, 'clientemail')}
                                    // set error message
                                    errorMessage="Invalid E-Mail Address"
                                    // set empty message
                                    emptyMessage="E-Mail Address is Requried" />
                            </td>
                        </tr>
                        {/* table row */}
                        <tr>
                            {/* table header */}
                            <th><span className="required">*</span>Phone Number:</th>
                            {/* data */}
                            <td>
                              {/* text input */}
                            <TextInput
                                    // set value to client phone
                                    value={this.state.clientphone}
                                    // set name to client phone 
                                    uniqueName="clientphone"
                                    // set text area to false
                                    textArea={false}
                                    // set required to true
                                    required={true}
                                    // set min characters to 10
                                    minCharacters={10}
                                    // validate phone number
                                    validate={this.validatePhone}
                                    // bind this to client phone
                                    onChange={this.setValue.bind(this, 'clientphone')}
                                    // set error message 
                                    errorMessage="Invalid Phone Number"
                                    // set empty message
                                    emptyMessage="Phone Number is Requried" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* header for section */}
                <h2>Desired Appointment Details</h2>
                {/* table */}
                <table>
                  {/* table body */}
                    <tbody>
                      {/* table row */}
                        <tr>
                          {/* table header */}
                            <th><span className="required">*</span>Desired Service:</th>
                            {/* table data */}
                            <td>
                              {/* select input */}
                              <select
                                // set value
                                value={this.state.desiredservice} 
                                // set name
                                uniqueName="desiredservice"
                                // update the value when the option is changed
                                onChange={this.setValue.bind(this, 'desiredservice')} 
                                // set required to false to bypass validation
                                required={false}
                              >
                                {/* option for no selection */}
                                <option value="" disabled>  -- Select a Service --  </option>
                                {/* option for mens haircut */}
                                <option value="Men's Haircut">Men's Haircut</option>
                                {/* option for womens haircut */}
                                <option value="Women's Haircut">Women's Haircut</option>
                                {/* option for all over color */}
                                <option value="All Over Color">All Over Color</option>
                                {/* option for highlights */}
                                <option value="Highlights">Highlights</option>
                                {/* option for manicure */}
                                <option value="Manicure">Manicure</option>
                                {/* option for pedicure */}
                                <option value="Pedicure">Pedicure</option>
                              </select>
                            </td>
                        </tr>
                        {/* table row */}
                        <tr>
                          {/* table header */}
                          <th>Desired Date:</th>
                          {/* table data */}
                          <td>
                            {/* input */}
                            <input
                              // type is date
                              type="date"
                              // set value
                              value={this.state.desireddate} 
                              // update state on change
                              onChange={this.setValue.bind(this, 'desireddate')} 
                            />
                          </td>
                        </tr>
                        {/* table row */}
                        <tr>
                          {/* table header */}
                          <th>Desired Time:</th>
                          {/* table data */}
                          <td>
                            {/* select element */}
                            <select
                              // set default value
                              value={this.state.desiredtime} 
                              // update value on change
                              onChange={this.setValue.bind(this, 'desiredtime')} 
                            >
                              {/* ption for no selection */}
                              <option value="" disabled>  -- Select a Time --  </option>
                              {/* 9am */}
                              <option value="09:00">09:00 AM</option>
                              {/* 930am */}
                              <option value="09:30">09:30 AM</option>
                              {/* 10am */}
                              <option value="10:00">10:00 AM</option>
                              {/* 1030am */}
                              <option value="10:30">10:30 AM</option>
                              {/* 11am */}
                              <option value="11:00">11:00 AM</option>
                              {/* 1130am */}
                              <option value="11:30">11:30 AM</option>
                              {/* 12pm */}
                              <option value="12:00">12:00 PM</option>
                              {/* 1230pm */}
                              <option value="12:30">12:30 PM</option>
                              {/* 1pm */}
                              <option value="13:00">01:00 PM</option>
                              {/* 130pm */}
                              <option value="13:30">01:30 PM</option>
                              {/* 2pm */}
                              <option value="14:00">02:00 PM</option>
                              {/* 230pm */}
                              <option value="14:30">02:30 PM</option>
                              {/* 3pm */}
                              <option value="15:00">03:00 PM</option>
                              {/* 330pm */}
                              <option value="15:30">03:30 PM</option>
                            </select>
                          </td>
                        </tr>
                        {/* table row */}
                        <tr>
                          {/* table header */}
                            <th>Desired Staff Member:</th>
                            {/* table data */}
                            <td>
                              {/* select element */}
                              <select
                                // set value
                                value={this.state.desiredemployee} 
                                // set name
                                uniqueName="desiredemployee"
                                // update the value when the option is changed
                                onChange={this.setValue.bind(this, 'desiredemployee')} 
                              >
                                {/* option for no selection  */}
                                <option value="" disabled>  -- Select a Staff Member --  </option>
                                {/* jamie */}
                                <option value="Jamie Cole">Jamie Cole</option>
                                {/* me */}
                                <option value="Braylyn Williams">Braylyn Williams</option>
                                {/* henry */}
                                <option value="Henry Campbell">Henry Campbell</option>
                                {/* penelope */}
                                <option value="Penelope Asher">Penelope Asher</option>
                              </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* next section header */}
                <h2>Additional Details</h2>
                {/* table */}
                <table>
                  {/* table body */}
                    <tbody>
                      {/* table row */}
                        <tr>
                          {/* table header */}
                            <th>Comments:</th>
                            {/* table data */}
                            <td>
                              {/* text input */}
                                <TextInput
                                    // set value
                                    value={this.state.clientcomments}
                                    // set name
                                    uniqueName="clientcomments"
                                    // set text area
                                    textArea={true}
                                    // set required
                                    required={false}
                                    // set text
                                    text="Please enter any comments or issues we should be aware of."
                                    // set validate
                                    validate={this.commonValidate}
                                    // set onchange 
                                    onChange={this.setValue.bind(this, 'clientcomments')}
                                    />
                            </td>
                        </tr>
                        {/* table row */}
                        <tr>
                          {/* table header */}
                            <th>How did you hear about us?</th>
                            {/* table data */}
                            <td>
                              {/* select element */}
                              <select
                              // set value
                                value={this.state.marketingfrom} 
                                // set name
                                uniqueName="marketingfrom"
                                // update the value when the option is changed
                                onChange={this.setValue.bind(this, 'marketingfrom')} 
                                
                              >
                                {/* no selection */}
                                <option value="" disabled>  -- Select an Option --  </option>
                                {/* Facebook */}
                                <option value="Facebook">Facebook</option>
                                {/* Tiktok */}
                                <option value="TikTok">TikTok</option>
                                {/* Google */}
                                <option value="Google">Google</option>
                                {/* Friend */}
                                <option value="A Friend">A Friend</option>
                                {/* Promotion */}
                                <option value="Special Promotion">Special Promotion</option>
                              </select>
                            </td>
                        </tr>
                        {/* table row */}
                        <tr>
                          {/* table header */}
                          <th>Would you like to subscribe to <br />our monthly newsletter?</th>
                          {/* table data */}
                          <td>
                            {/* label */}
                            <label>
                              {/* input */}
                              <input
                              // set type
                                type="checkbox"
                                // set checked
                                checked={this.state.newslettertext} 
                                // update on change
                                onChange={this.handleCheckboxChange.bind(this, 'newslettertext')} 
                              />
                              {/* label text */}
                              Subscribe via Text
                            </label>
                            {/* line break */}
                            <br />
                            {/* label */}
                            <label>
                              {/* input */}
                              <input
                                // set type
                                type="checkbox"
                                // set checked 
                                checked={this.state.newsletteremail} 
                                // update on change
                                onChange={this.handleCheckboxChange.bind(this, 'newsletteremail')} 
                              />
                              {/* label text */}
                              Subscribe via Email
                            </label>
                          </td>
                        </tr>
                    </tbody>
                </table>
                {/* div for submit box */}
                <div id="submitBox">
                  {/* submit button */}
                  <input type="submit" value="Submit" id="submit"/>
                </div>

                {/* alert visibility */}
                {this.state.alertVisible && (
                  // div with class alert
                  <div className="alert">
                    {/* set message */}
                    {this.state.alertMessage}
                  </div>
                )}

            </form>
        );
    }
});

// input error class
var InputError = React.createClass({
  // set initial state
    getInitialState: function () {
      // return 
        return{
          // set invalid message
            message: 'Input is invalid'
        };
    },
    // render the following to the screen 
    render: function () {
      // set error class 
        var errorClass = classNames(this.props.className, {
            // error container is true
            'error_container': true,
            // visible is visible
            'visible': this.props.visible,
            // invisible is invisible 
            'invisible': !this.props.visible
        });
        // return 
        return (
          // span with the error message
            <span id="error"> {this.props.errorMessage} </span>
        )
    }
});

// text input class
var TextInput = React.createClass({
  // set initial state
    getInitialState: function(){
      // return
      return {
        // is empty to true
        isEmpty: true,
        // value is null
        value: null,
        // valid is false
        valid: false,
        // error message is empty
        errorMessage: "",
        // error visible is false
        errorVisible: false
      };
    },
  
    // handle change function 
    handleChange: function(event){
      // validate the field locally
      this.validation(event.target.value);
  
      //Call onChange method on the parent component for updating it's state
      if(this.props.onChange) {
        // call onchange for the event 
        this.props.onChange(event);
      }
    },
  
    // validation function 
    validation: function (value, valid) {
      //The valid variable is optional, and true if not passed in:
      if (typeof valid === 'undefined') {
        // valid is true
        valid = true;
      }
      
      // set message to empty 
      var message = "";
      // set visibility to false
      var errorVisible = false;
      
      //we know how to validate text fields based on information passed through props
      if (!valid) {
        //This happens when the user leaves the field, but it is not valid
        // set message to error message
        message = this.props.errorMessage;
        // valid is false
        valid = false;
        // error is visible
        errorVisible = true;
      }
      // if it required and is empty 
      else if (this.props.required && jQuery.isEmptyObject(value)) {
        //this happens when we have a required field with no text entered
        //in this case, we want the "emptyMessage" error message
        // set empty message 
        message = this.props.emptyMessage;
        // set valid to false
        valid = false;
        // set error to visible
        errorVisible = true;
      }
      // if the value is below min char
      else if (value.length < this.props.minCharacters) {
        //This happens when the text entered is not the required length,
        //in which case we show the regular error message
        message = this.props.errorMessage;
        // valid is false
        valid = false;
        // show error
        errorVisible = true;
      }
      
      //setting the state will update the display,
      //causing the error message to display if there is one.
      this.setState({
        // value is value
        value: value,
        // is empty is the empty value
        isEmpty: jQuery.isEmptyObject(value),
        // valid is valid
        valid: valid,
        // error message is error message
        errorMessage: message,
        // error visibility is error visibility 
        errorVisible: errorVisible
      });
  
    },
  
    // handle blur function 
    handleBlur: function (event) {
      //Complete final validation from parent element when complete
      var valid = this.props.validate(event.target.value);
      //pass the result to the local validation element for displaying the error
      this.validation(event.target.value, valid);
    },
    // render to screen
    render: function() {
      // if the prop is a text area
      if (this.props.textArea) {
        // return 
        return (
          // div with the unqiue name as class
          <div className={this.props.uniqueName}>
            {/* text area element */}
            <textarea
            // text as placeholder
              placeholder={this.props.text}
              // classname as input and unique name
              className={'input input-' + this.props.uniqueName}
              // set handle change function
              onChange={this.handleChange}
              // set on blur function
              onBlur={this.handleBlur}
              // set value
              value={this.props.value} />
        
            {/* input error */}
            <InputError 
            // visibility 
              visible={this.state.errorVisible} 
              // error message
              errorMessage={this.state.errorMessage} />
          </div>
          );
          // if it isnt a text area 
      } else {
        // return 
        return (
          // div with classname as uniquename
          <div className={this.props.uniqueName}>
            {/* input element */}
            <input
            // placeholder text
              placeholder={this.props.text}
              // classname
              className={'input input-' + this.props.uniqueName}
              // on change function 
              onChange={this.handleChange}
              // on blur function
              onBlur={this.handleBlur}
              // value
              value={this.props.value} />
        
            {/* input error */}
            <InputError 
            // visibility 
              visible={this.state.errorVisible} 
              // error message
              errorMessage={this.state.errorMessage} />
          </div>
        );
      }
    }
  });

// Render everything to the screen 
ReactDOM.render(
  // call contact box with url for the json 
    <ContactBox url="http://localhost:3000/save-contact" pollInterval={2000}/>,
    // set it in content id
    document.getElementById('content')
);