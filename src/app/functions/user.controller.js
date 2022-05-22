const checkIdType = (id) =>{
    if(id.match(/^[0-9a-fA-F]{24}$/))
        return true;
    return false;
}

const handleQuerySort = (query) => {
    try{
      const toJSONString = ("{" + query + "}").replace(/(\w+:)|(\w+ :)/g, (matched => {
          return '"' + matched.substring(0, matched.length - 1) + '":';
      }));

      return JSON.parse(toJSONString);
    }catch(error){
      return JSON.parse("{}");
    }
}

module.exports = {
    checkIdType,
    handleQuerySort
}