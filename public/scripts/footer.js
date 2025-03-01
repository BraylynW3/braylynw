// create a new class for footer
var Footer = React.createClass ({
      // render function 
      render: function() {
        // return the following to the screen 
          return (
            <footer>
                <p>2025 Braylyn Williams. All rights reserved.</p>
                
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