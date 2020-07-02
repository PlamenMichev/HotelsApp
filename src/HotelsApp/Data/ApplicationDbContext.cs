namespace HotelsApp.Data
{
    using HotelsApp.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) 
            : base(options)
        {
        }

        public DbSet<Hotel> Hotels { get; set; }
    }
}
