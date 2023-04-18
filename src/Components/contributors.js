import React from 'react'

export const contributors = () => {
  return (
    <>
    <div className="outer_container">

      <h2 className="contributor_heading">Contributors</h2>

      <div className="contributor_div">

            <div className="contributor_div_inner">

                <div className="contributor_image">
                    <img className="contributor_img" src={require('../assets/contributors_images/Vardan_IOP.jpg')}  alt="Vardan Image"></img>
                    <div className="contributor_names">Vardan Jain</div>
                </div>
                <div className="contributor_image">
                    <img src={require('../assets/contributors_images/Vardan_IOP.jpg')}  alt="Vardan Image"></img>
                    <div className="contributor_names">Vardan Jain</div>
                </div>
                <div className="contributor_image">
                    <img src={require('../assets/contributors_images/Vardan_IOP.jpg')}  alt="Vardan Image"></img>
                    <div className="contributor_names" >Vardan Jain</div>
                </div>
                
                <div className="contributor_image">
                    <img src={require('../assets/contributors_images/Vardan_IOP.jpg')}  alt="Vardan Image"></img>
                    <div className="contributor_names" >Vardan Jain</div>
                </div>
                
                <div className="contributor_image">
                    <img src={require('../assets/contributors_images/Vardan_IOP.jpg')}  alt="Vardan Image"></img>
                    <div className="contributor_names" >Vardan Jain</div>
                </div>
              
            </div>
        </div>
    </div>
    </>
  )
}
