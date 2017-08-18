
//import { GaggleClient } from "../utils/GaggleClient.js";



const loginPageReducer = (state=null, action) => {
     switch (action.type) {
         case "USER_LOGIN":
            //the action holds the object with our credentials
             // whatever we return here will be stored in our reducer i.e.
             // either the user information, or bad request
            console.log("user wants to LOGIN regular", action);
            break;

        case "USER_FACEBOOK_LOGIN":
            //the action holds the object with our credentials
            console.log("user wants to LOGIN with Facebook", "***********", action);
            break;
    }
    
    return state;
};

export default loginPageReducer;