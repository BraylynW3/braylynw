// create new class for admin box
var AdminBox = React.createClass ({
  // set initial state to grab contact form data
  getInitialState: function () {
    // return the data
    return { data: []};
  },
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
    // render to the screen 
    render: function() {
      // return the following
        return (
          // set div for admin box
            <div className="AdminBox">
              {/* title for the page */}
                <h1>Contact Forms</h1>
                {/* call adminform2 where data 
                is equal to the current state data*/}
                <AdminList2 data={this.state.data}/>
            </div>
        );
    }
});

// create a new class for admin list 2
var AdminList2 = React.createClass({
    // render function 
    render: function () {
      // define contact nodes
      var contactNodes = this.props.data.map(function(contact) {
        // return the following to the screen 
        return (
          //  map data to individual contact form 
          <Contact 
            // set id as key
            key={contact.id}
            // set client name
            clientname={contact.clientname}
            // set client email 
            clientemail={contact.clientemail}
            // set client phone
            clientphone={contact.clientphone}
            // set desired service
            desiredservice={contact.desiredservice}
            // set desired date
            desireddate={contact.desireddate}
            // set desired time
            desiredtime={contact.desiredtime}
            // set desired employee
            desiredemployee={contact.desiredemployee}
            // set client comments
            clientcomments={contact.clientcomments}
            // set marketing from 
            marketingfrom={contact.marketingfrom}
            // set newsletter text 
            newslettertext={contact.newslettertext}
            // set newsletter email 
            newsletteremail={contact.newsletteremail}
          >

          </Contact>
           
        );
      });
      // output all of the contact forms in the list
      return (
        // create a div to hold the contacts
        <div className="contactList">
          {/* display all the contact nodes */}
          {contactNodes}
        </div>
      )
    }
});

// define contact class
var Contact = React.createClass({
  // render to the screen 
  render: function () {
    // return a contact form 
    return (
      // div for the contact
      <div className="contact">
        {/* h2 for the full name */}
        <h2 className="clientName">
          {this.props.clientname}: 
        </h2>
        <table>
          <tbody>
            <tr>
              <th>Email:</th><td>{this.props.clientemail}</td><th>Desired Time:</th><td>{this.props.desiredtime}</td>
            </tr>
            <tr>
              <th>Phone:</th><td>{this.props.clientphone}</td><th>Desired Employee:</th><td>{this.props.desiredemployee}</td>
            </tr>
            <tr>
              <th>Desired Service:</th><td>{this.props.desiredservice}</td><th>Marketing Method:</th><td>{this.props.marketingfrom}</td>
            </tr>
            <tr>
              <th>Desired Date:</th><td>{this.props.desireddate}</td><th>Newsletter via Text:</th><td>{this.props.newslettertext}</td>
            </tr>
            <tr>
              <th>Comments:</th><td>{this.props.clientcomments}</td><th>Newsletter via Email:</th><td>{this.props.newsletteremail}</td>
            </tr>
          </tbody>
        </table>
        {this.props.children}
      </div>
    );
  }
});



// render everything to the screen 
ReactDOM.render(
    // call admin box
    <AdminBox url="http://localhost:3000/save-contact" pollInterval={2000}/>,
    // set it in the content id 
    document.getElementById('content')
);