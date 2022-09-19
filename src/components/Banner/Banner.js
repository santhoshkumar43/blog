import React from "react";
import "../Banner/Banner.css"

function Banner({onChange, onSearch , value}) {
    return (
        <div className="main-banner">
            <h1>Let's Blog</h1>
            <input value={value} onChange={onChange} />
            <button onClick={() => onSearch(value)} >Search</button>
            <div className="banner">
                <h2>Explore intresting blogs</h2>
                
                
                <p>You can also show your writing skills by starting a blog, just click on the Create Blog button.</p>
               

            </div>

        </div>
    )
}
export default Banner;




