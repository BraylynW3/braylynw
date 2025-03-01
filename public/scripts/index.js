var ContentBox = React.createClass({
    // render function 
    render: function() {
      // return the following to the screen 
        return (
          <div className="ContentBox">
            <Content2 />
          </div>
        );
    }
});

var Content2 = React.createClass({
  // render function 
  render: function() {
    // return the following to the screen 
      return (
        <div>
          <div className="front-page">
        <div className="text">
          <h1 className="ml11">
            <span className="text-wrapper">
              <span className="line line1"></span>
              <span className="letters">Hi, I'm Braylyn!</span>
            </span>
          </h1>
          <p>
          I thrive on tackling complex challenges, whether it’s designing seamless web experiences, optimizing databases, or developing efficient backend and frontend solutions. <br /><br />

        Beyond coding, I love puzzles and reading—both of which fuel my analytical thinking and curiosity. I’m always eager to learn new technologies and refine my skills to build innovative and effective solutions. <br /><br />

        Let's connect!
          </p>
        </div>
        <div className="image">
          <img src="BW_home1.jpg" alt="Portfolio Image" />
        </div>
      </div>
        </div>
      );
  },
  componentDidMount: function() {
    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml11 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w|[^\w\s])/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: false}) // Set loop to false to run once
      .add({
        targets: '.ml11 .line',
        scaleY: [0,1],
        opacity: [0.5,1],
        easing: "easeOutExpo",
        duration: 1000 // Increase duration to slow down
      })
      .add({
        targets: '.ml11 .line',
        translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
        easing: "easeOutExpo",
        duration: 1000, // Increase duration to slow down
        delay: 200 // Increase delay
      }).add({
        targets: '.ml11 .letter',
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 800, // Increase duration to slow down
        offset: '-=875',
        delay: (el, i) => 50 * (i+1) // Increase delay
      }).add({ 
        targets: '.ml11 .line',
        opacity: 0, // Set opacity to 0 to make the line disappear
        easing: "easeOutExpo",
        duration: 1000, // Increase duration to slow down
        delay: 200 // Increase delay 
      }).add({
        targets: '.ml11 .letters',
        opacity: 1, // Ensure letters remain visible
        easing: "easeOutExpo",
        duration: 1000, // Increase duration to slow down
        delay: 200 // Increase delay 
      });
  }
});

ReactDOM.render(
    <ContentBox />,
    document.getElementById('content')
);
