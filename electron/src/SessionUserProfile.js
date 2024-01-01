var UserProfile = (function() {
    var full_name = "Şükrü Çiriş";
    var user_id = 1;
    var group_name = ""
  
    var getName = function() {
      return full_name;
    };
  
    var setName = function(name) {
      full_name = name;
    };

    var getId = function() {
        return user_id;
    };
    
    var setId = function(id) {
        user_id = id;
    };

    var getGroupName = function() {
      return group_name;
    };
  
    var setGroupName = function(name) {
      group_name = name;
    };
  
    return {
      getName: getName,
      setName: setName,
      getId:getId,
      setId:setId,
      getGroupName:getGroupName,
      setGroupName:setGroupName
    }
  
  })();
  
  export default UserProfile;