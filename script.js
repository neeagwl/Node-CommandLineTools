let counter=0;
module.exports=({
    get(){
        return counter;
    },
    set(){
        return counter=counter+1;
    }
});