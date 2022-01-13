import banner from '../../../img/banner.jpg'

const Banner = ({title}) => {
    return (  
        <div className="banner ">
            <img src={banner} alt="logo" className="img-banner" />
            <h1 className="">{title}</h1>
        </div>
    );
}

export default Banner;