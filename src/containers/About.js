import React from 'react';


export const About = props => {
    return (
        <div id='about'><hr />
            <h3 id='title'>Happy to see you</h3>
            <div className="container">
                <div className="card">
                    <div className="face face1">
                        <div className="content">
                            <img alt='a' src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/design_128.png?raw=true" />
                            <h3>Our Story</h3>
                        </div>
                    </div>
                    <div className="face face2">
                        <div className="content">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                            <a href="/">Read More</a>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="face face1">
                        <div className="content">
                            <img alt='a' src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/code_128.png?raw=true" />
                            <h3>About Us</h3>
                        </div>
                    </div>
                    <div className="face face2">
                        <div className="content">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                            <a href="/">Read More</a>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="face face1">
                        <div className="content">
                            <img alt='a' src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/launch_128.png?raw=true" />
                            <h3>Contact</h3>
                        </div>
                    </div>
                    <div className="face face2">
                        <div className="content">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                            <a href="/">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default About;