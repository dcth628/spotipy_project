import React from "react";

import './AboutDevsModal.css'

function AboutDevsModal() {
    return (
        <div className="about-devs-modal">
            <div className="dev-container">
                <p className="dev-name">Caitlyn St.Andre</p>
                <a href="https://github.com/cstandre" target="_blank" className="github-link">GitHub</a>
                <a href="https://www.linkedin.com/in/caitlyn-st-andre/" target="_blank" className="linkedin-link">LinkedIn</a>
            </div>
            <div className="dev-container">
                <p className="dev-name">David Winter</p>
                <a href="https://github.com/Winter3531" target="_blank" className="github-link">GitHub</a>
                <a href="https://www.linkedin.com/in/david-winter-474a671b7/" target="_blank" className="linkedin-link">LinkedIn</a>
            </div>
            <div className="dev-container">
                <p className="dev-name">Dean Hsieh</p>
                <a href="https://github.com/dcth628" target="_blank" className="github-link">GitHub</a>
                <a href="https://www.linkedin.com/in/deanhsieh/" target="_blank" className="linkedin-link">LinkedIn</a>
            </div>
        </div>
    )
};

export default AboutDevsModal;
