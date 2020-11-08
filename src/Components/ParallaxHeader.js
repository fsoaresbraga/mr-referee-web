import React from 'react'

export const ParallaxHeader = ({title,description}) => {
    return (
        <>
             <div className="page-header page-header-dark bg-gradient-primary-to-secondary">
                <div className="page-header-content pt-10">
                    <div className="container text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <h1 className="page-header-title mb-3">{title}</h1>
                                <p className="page-header-text">{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="svg-border-rounded text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none" fill="currentColor"><path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0" /></svg>
                </div>
            </div>
        </>
    )
}
