const CarTypePicker = ({carType}) => {
    return (

            
                <select
                //value={type.id}
                //onChange={(e) => setType(e.target.value)}
                >
                {carType.map((type) => (
                    <option value={type.id}>{type.name}</option>
                ))}
                </select>
    );
};

export default CarTypePicker;