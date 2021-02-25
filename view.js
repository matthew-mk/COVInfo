'use strict';

class View{
    constructor() {
    }

    registerClickListener(listener){
        // document.getElementById("xxxxxxx").addEventListener("click", listener);
    }

    // when called by controller will update the number of new cases in glasgow
    updateGlasgowNewCases(cases) {
        document.getElementById("glasgow-new-cases").innerText = cases;
    }



}
