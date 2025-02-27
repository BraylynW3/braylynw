// create a new class for footer
var Footer = React.createClass ({
      // render function 
      render: function() {
        // return the following to the screen 
          return (
            <footer>
                <p>&copy; 2024 Critters & Code. All rights reserved.</p>
                <nav id="footerNav">
                    <ul>
                        <li><a href="privacy.html">Privacy Policy</a></li>
                        <li><a href="terms.html">Terms of Service</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>
            </footer>
          );
      }
  });
  
  
  // Render everything to the screen 
  ReactDOM.render(
      <Footer></Footer>,
      // set it in content id
      document.getElementById('footer')
  );