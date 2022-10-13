const ZoomControl = () => {
    return (
        <div className=" absolute top-[50vh] left-4 cursor-pointer rounded-lg  ">
            <div className="zoom-controls rounded-t-lg ">+</div>
            <div className=" zoom-controls rounded-b-lg">−</div>
        </div>
    );
};

export default ZoomControl;
