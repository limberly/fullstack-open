const Filter = ({filter, changeFilter}) => {
    return (
        <p>filter shown with <input value={filter} onChange={changeFilter}/></p>
    );
};

export default Filter