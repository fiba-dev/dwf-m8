const dev = process.env.NODE_ENV === "development";
 let API_URL="";


dev? API_URL = "http://localhost:3003"
    : API_URL = "https://m7-final.herokuapp.com"


    export{API_URL}