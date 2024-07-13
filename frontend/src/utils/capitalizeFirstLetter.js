const capitalizeFirstLetter = (str) => {
    if(str){
        return str[0].toUpperCase()+str.slice(1).toLowerCase();
    }
}
export default capitalizeFirstLetter;