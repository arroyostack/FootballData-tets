import { ref } from "vue";

const getTeams = async () => {
    try {
      let res = await fetch(
        "https://raw.githubusercontent.com/arroyostack/json-file/main/response_1663676637086.json"
      );

      if(!res.ok){
        throw Error('Not Data Available')
      }

      let data = await res.json();
      
      return data;
  
    } catch (err) {
      console.log(err.message);
    }
  };
  
  export default getTeams