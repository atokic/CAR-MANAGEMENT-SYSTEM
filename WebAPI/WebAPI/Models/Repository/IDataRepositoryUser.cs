using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models.Repository
{
    public interface IDataRepositoryUser <TEntity>
    {
        IEnumerable<TEntity> GetAll();
        Users Get(string id);
    }
}
