using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Models
{
    public class AplicationDBContext: DbContext
    {
        public AplicationDBContext(DbContextOptions<AplicationDBContext> options): base(options) 
        {

        }

        public DbSet<Mascota> Mascotas { get; set;}
    }
}
