using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models.Repository;

namespace WebAPI.Models.DataManager
{
    public class UserManager : IDataRepositoryUser<Users>
    {
        private List<Users> users = new List<Users>();

        readonly AuthenticationContext _userContext;
        public UserManager(AuthenticationContext context)
        {
            _userContext = context;
        }

        public IEnumerable<Users> GetAll()
        {
            //return _userContext.Users.ToList();
            return null;
        }

        public Users Get(string id)
        {
            return users.Find(p => p.Id == id);
        }

    }
}
