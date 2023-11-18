using Microsoft.EntityFrameworkCore;

namespace asp.net_backend.Controllers.Models
{
    public class ListContext : DbContext
    {
        public ListContext(DbContextOptions<ListContext> options) : base (options)
        {
            
        }

        public DbSet<List> Lists { get; set; }

    }
}
