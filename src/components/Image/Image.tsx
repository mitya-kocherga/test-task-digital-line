interface P {
    svg: string;
  }
  
  function ImageComponent({svg}: P) {
    return <img src={svg} alt="React Logo" />;
  }
  
  export default ImageComponent;
  