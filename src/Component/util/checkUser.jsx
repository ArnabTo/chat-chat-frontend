
export const checkUser = () => {
    const storageData = localStorage.getItem('userdata');
    if(storageData){
        return JSON.parse(storageData);
    }
    return null
}

