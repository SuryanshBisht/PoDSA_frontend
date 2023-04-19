import React from 'react'
import './contributors.css'

const Contributors = () => {
  return (
    <>
    <div className="outer_container ">

      <div className="contributor_div">


            <h1>Following Students have Contributed towards the Open-Source Application</h1>
            <div className="contributor_div_inner">

                <div className="contributor_image">
                    <img className="contributor_img" src={require('../assets/contributors_images/suryansh_iop.jpeg')}  alt="Suryansh"></img>
                    <a className="contributor_names" href="https://www.linkedin.com/in/suryansh-singh-bisht-3b38871b8/" target="_blank">Suryansh Singh Bisht</a>
                </div>
                <div className="contributor_image">
                    <img className="contributor_img" src={require('../assets/contributors_images/swapnil_iop.jpg')}  alt="Swapnil"></img>
                    <a className="contributor_names" href="https://www.linkedin.com/in/swapnil-chourasiya-377103212/" target="_blank">Swapnil Chourasiya</a>
                </div>
                <div className="contributor_image">
                    <img className="contributor_img"  src={require('../assets/contributors_images/tanmay_iop.jpeg')}  alt="Tanmay"></img>
                    <a className="contributor_names" href="https://www.linkedin.com/in/tanmay-gupta-8a2200214/" target="_blank">Tanmay Gupta</a>
                </div>
                
                <div className="contributor_image">
                    <img className="contributor_img"  src={require('../assets/contributors_images/tushar_iop.jpeg')}  alt="Tushar"></img>
                    <a className="contributor_names" href="https://www.linkedin.com/in/tushar-gupta-669150202/" target="_blank" >Tushar N Gupta</a>
                </div>
                
                <div className="contributor_image">
                    <img className="contributor_img" src={require('../assets/contributors_images/vardan_iop.jpg')}  alt="Vardan"></img>
                    <a className="contributor_names" href="https://www.linkedin.com/in/vardan-jain-59b64421a/" target="_blank" >Vardan Jain</a>
                </div>
              
            </div>

        </div>
    </div>
    </>
  )

}

export default Contributors;